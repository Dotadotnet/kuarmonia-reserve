/* internal import */
const Tag = require("../models/tag.model");
const Translation = require("../models/translation.model");
const { generateSlug, generateSeoFields } = require("../utils/seoUtils");
const translateFields = require("../utils/translateFields");

const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;
exports.addTag = async (req, res) => {
  try {
    const { title, description, keynotes, robots } = req.body;

    const parsedKeynotes = JSON.parse(keynotes);
    const parsedRobots = JSON.parse(robots);

    const robotsArray = parsedRobots.map((value, index) => ({
      id: index + 1,
      value
    }));

    const tag = new Tag({
      title:title,
      creator: req.admin._id,
      robots: robotsArray
    });

    const result = await tag.save();
    const slug = await generateSlug(title);
    const canonicalUrl = `${defaultDomain}/tag/${slug}`;
    const { metaTitle, metaDescription } = generateSeoFields({
      title,
      summary: description
    });
    try {
      const translations = await translateFields(
        {
          title,
          description,
          metaTitle,
          metaDescription,
          keynotes: parsedKeynotes,
          canonicalUrl
        },
        {
          stringFields: [
            "title",
            "description",
            "content",
            "metaTitle",
            "metaDescription",
            "canonicalUrl"
          ],
          arrayStringFields: ["keynotes"]
        }
      );
      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "Tag",
          refId: result._id,
          fields
        })
      );
      const savedTranslations = await Translation.insertMany(translationDocs);
      const translationInfos = savedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));
      await Tag.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });
    } catch (translationError) {
      console.log(translationError.message);
      await Tag.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها.  کلمه کلیدی حذف شد.",
        error: translationError.message
      });
    }

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "تگ با موفقیت ترجمه و ذخیره شد"
    });
  } catch (error) {
    console.error("Error in addTag:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ایجاد تگ رخ داد",
      error: error.message
    });
  }
};

exports.getTags = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const skip = (page - 1) * limit;

  try {
    let matchedTagIds = [];

    if (search) {
      const translations = await Translation.find({
        language: req.locale,
        refModel: "Tag",
        "fields.title": { $regex: search, $options: "i" }
      }).select("refId");

      matchedTagIds = translations.map((t) => t.refId);
    }

    const query = {
      isDeleted: false,
      ...(search ? { _id: { $in: matchedTagIds } } : {})
    };

    const tags = await Tag.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "translations.translation",
          match: { language: req.locale }
        },
        {
          path: "creator",
          select: "name avatar"
        }
      ]);

    const total = await Tag.countDocuments(query);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "تگ‌ها با موفقیت دریافت شدند",
      data: tags,
      total
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت تگ‌ها",
      error: error.message
    });
  }
};

/* get a tag */
exports.getTag = async (req, res) => {
  const tag = await Tag.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "تگ با موفقیت دریافت شد",
    data: tag
  });
};

/* update tag */
/* 📌 بروزرسانی تگ */
exports.updateTag = async (req, res) => {
  try {
    let updatedTag = req.body;

    const parsedKeynotes = JSON.parse(req.keynotes);
    const parsedRobots = JSON.parse(req.robots);

    const robotsArray = parsedRobots.map((value, index) => ({
      id: index + 1,
      value
    }));

    updatedTag.keynotes = parsedKeynotes;
    updatedTag.robots = robotsArray;

    let translatedTitleEn = "";
    let translatedTitleTr = "";
    let translatedDescriptionEn = "";
    let translatedDescriptionTr = "";
    let translatedKeynotesEn = [];
    let translatedKeynotesTr = [];

    if (
      updatedTag.title ||
      updatedTag.description ||
      parsedKeynotes.length > 0
    ) {
      try {
        if (updatedTag.title) {
          translatedTitleEn = (
            await translate(updatedTag.title, { to: "en", client: "gtx" })
          ).text;
          translatedTitleTr = (
            await translate(updatedTag.title, { to: "tr", client: "gtx" })
          ).text;
        }

        if (updatedTag.description) {
          translatedDescriptionEn = (
            await translate(updatedTag.description, { to: "en", client: "gtx" })
          ).text;
          translatedDescriptionTr = (
            await translate(updatedTag.description, { to: "tr", client: "gtx" })
          ).text;
        }

        if (parsedKeynotes.length > 0) {
          translatedKeynotesEn = await Promise.all(
            parsedKeynotes.map((k) =>
              translate(k, { to: "en", client: "gtx" }).then((res) => res.text)
            )
          );
          translatedKeynotesTr = await Promise.all(
            parsedKeynotes.map((k) =>
              translate(k, { to: "tr", client: "gtx" }).then((res) => res.text)
            )
          );
        }

        // ذخیره یا بروزرسانی ترجمه انگلیسی
        await Translation.updateOne(
          { refModel: "Tag", refId: req.params.id, language: "en" },
          {
            $set: {
              ...(translatedTitleEn && { "fields.title": translatedTitleEn }),
              ...(translatedDescriptionEn && {
                "fields.description": translatedDescriptionEn
              }),
              ...(translatedKeynotesEn.length > 0 && {
                "fields.keynotes": translatedKeynotesEn
              })
            }
          },
          { upsert: true }
        );

        // ذخیره یا بروزرسانی ترجمه ترکی
        await Translation.updateOne(
          { refModel: "Tag", refId: req.params.id, language: "tr" },
          {
            $set: {
              ...(translatedTitleTr && { "fields.title": translatedTitleTr }),
              ...(translatedDescriptionTr && {
                "fields.description": translatedDescriptionTr
              }),
              ...(translatedKeynotesTr.length > 0 && {
                "fields.keynotes": translatedKeynotesTr
              })
            }
          },
          { upsert: true }
        );
      } catch (translateErr) {
        console.error("❌ خطا در ترجمه:", translateErr.message);
        return res.status(404).json({
          acknowledgement: false,
          message: "ترجمه نشد",
          description: "خطا در فرآیند ترجمه"
        });
      }
    }
    if (updatedTag.title) {
      updatedTag.slug = await generateSlug(updatedTag.title);
    }
    const result = await Tag.findByIdAndUpdate(req.params.id, updatedTag, {
      new: true
    });

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "تگ مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "تگ با موفقیت ویرایش و ترجمه شد",
      data: result
    });
  } catch (error) {
    console.error("Error in updateTag:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی تگ رخ داد",
      error: error.message
    });
  }
};

/* delete tag */
exports.deleteTag = async (req, res) => {
  const tag = await Tag.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!tag) {
    return res.status(404).json({
      acknowledgement: false,
      message: "تگ پیدا نشد",
      description: "تگی که می‌خواهید حذف کنید، وجود ندارد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "تگ با موفقیت حذف شد"
  });
};
