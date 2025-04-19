/* internal import */
const Tag = require("../models/tag.model");
const Admin = require("../models/admin.model");
const Translation = require("../models/translation.model");
const { translate } = require("google-translate-api-x");
const { generateSlug } = require("../utils/translationUtils");
exports.addTag = async (req, res) => {
  try {
    const { body } = req;

    const parsedKeynotes = JSON.parse(body.keynotes);
    const parsedRobots = JSON.parse(body.robots);

    let translatedTitleEn = "";
    let translatedDescriptionEn = "";
    let translatedKeynotesEn = [];

    let translatedTitleTr = "";
    let translatedDescriptionTr = "";
    let translatedKeynotesTr = [];

    try {
      console.log("Translating to English...");
      translatedTitleEn = (
        await translate(body.title, { to: "en", client: "gtx" })
      ).text;
      translatedDescriptionEn = (
        await translate(body.description, { to: "en", client: "gtx" })
      ).text;
      translatedKeynotesEn = await Promise.all(
        parsedKeynotes.map((k) =>
          translate(k, { to: "en", client: "gtx" }).then((res) => res.text)
        )
      );

      console.log("Translating to Turkish...");
      translatedTitleTr = (
        await translate(body.title, { to: "tr", client: "gtx" })
      ).text;
      translatedDescriptionTr = (
        await translate(body.description, { to: "tr", client: "gtx" })
      ).text;
      translatedKeynotesTr = await Promise.all(
        parsedKeynotes.map((k) =>
          translate(k, { to: "tr", client: "gtx" }).then((res) => res.text)
        )
      );
    } catch (err) {
      console.error("خطا در ترجمه تگ:", err);
      return res.status(500).json({
        acknowledgement: false,
        message: "Error",
        description: "خطایی در ترجمه تگ رخ داد",
        error: err.message
      });
    }

    // ✅ مرحله سوم: ساخت تگ
    const robotsArray = parsedRobots.map((value, index) => ({
      id: index + 1,
      value
    }));

    const tag = new Tag({
      title: body.title,
      description: body.description,
      keynotes: parsedKeynotes,
      creator: req.admin._id,
      robots: robotsArray
    });

    const result = await tag.save();

    // ✅ مرحله چهارم: ثبت ترجمه‌ها
    const translationData = [
      {
        language: "en",
        refModel: "Tag",
        refId: result._id,
        fields: {
          title: translatedTitleEn,
          description: translatedDescriptionEn,
          keynotes: translatedKeynotesEn
        }
      },
      {
        language: "tr",
        refModel: "Tag",
        refId: result._id,
        fields: {
          title: translatedTitleTr,
          description: translatedDescriptionTr,
          keynotes: translatedKeynotesTr
        }
      }
    ];

    await Translation.insertMany(translationData);

    await Admin.findByIdAndUpdate(result.creator, {
      $set: { tag: result._id }
    });

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

/* get all tags */
exports.getTags = async (res) => {
  const tags = await Tag.find({ isDeleted: false }).populate({
    path: "creator",
    select: "name avatar" // دریافت نام و آواتار سازنده
  });
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "تگ ها با موفقیت دریافت شدند",
    data: tags
  });
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

    const parsedKeynotes = JSON.parse(req.body.keynotes);
    const parsedRobots = JSON.parse(req.body.robots);

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
