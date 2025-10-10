const PromoBanner = require("../models/promoBanner.model");
const Banner = require("../models/banner.model");
const remove = require("../utils/remove.util");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");

exports.addBannerSlider = async (req, res) => {
  const { link } = req.body;
  const image = req.uploadedFiles.thumbnail[0];
  console.log(link)
  const sliderBanner = new Banner({
    image: { url: image.url, public_id: image.public_id },
    link: (link !== "undefined" || link !== undefined) ? link : null
  });
  const result = await sliderBanner.save();
  res.status(200).json({
    acknowledgement: true,
    description: "بنر با موفقیت ثبت شد",
  });
};

exports.addPromoBanner = async (req, res) => {
  try {
    const { title, description, position } = req.body;

    const thumbnail = req.uploadedFiles?.thumbnail?.[0]
      ? {
        url: req.uploadedFiles.thumbnail[0].url,
        public_id: req.uploadedFiles.thumbnail[0].key
      }
      : null;

    const promoBanner = new PromoBanner({
      thumbnail,
      position: position || 0, // اگر position نیاد پیش‌فرض 0
      creator: req.admin._id
    });

    const result = await promoBanner.save();

    try {
      const translations = await translateFields(
        { title, description },
        { stringFields: ["title", "description"] }
      );

      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "PromoBanner",
          refId: result._id,
          fields
        })
      );

      const insertedTranslations = await Translation.insertMany(
        translationDocs
      );

      const translationInfos = insertedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));

      await PromoBanner.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });

      return res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "بنر با موفقیت ایجاد و ترجمه شد.",
        data: result
      });
    } catch (translationError) {
      await PromoBanner.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. بنر حذف شد.",
        error: translationError.message
      });
    }
  } catch (error) {
    console.error("Error in addPromoBanner:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در ایجاد بنر",
      error: error.message
    });
  }
};

exports.getbanners = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const skip = (page - 1) * limit;

  try {
    let matchedIds = [];

    if (search) {
      const translations = await Translation.find({
        language: req.locale,
        refModel: "PromoBanner",
        "fields.title ": { $regex: search, $options: "i" }
      }).select("refId");

      matchedIds = translations.map((t) => t.refId);
    }

    const query = {
      isDeleted: false,
      ...(search ? { _id: { $in: matchedIds } } : {})
    };

    const banners = await PromoBanner.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "translations.translation",
          match: { language: req.locale }
        },
        {
          path: "stories",
          populate: [
            {
              path: "translations.translation",
              match: { language: req.locale }
            },
            {
              path: "creator",
              select: "avatar translations",
              populate: {
                path: "translations.translation",
                match: { language: req.locale },
                select: "fields.name"

              }
            }
          ]
        },
        {
          path: "creator",
          select: "name avatar"
        }
      ]);

    const total = await PromoBanner.countDocuments(query);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "بنرها با موفقیت دریافت شدند",
      data: banners,
      total
    });
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت بنرها",
      error: error.message
    });
  }
};

exports.getPromoBanner = async (req, res) => {
  const promoBanner = await PromoBanner.findById(req.params.id).populate({
    path: "translations.translation",
    match: { language: req.locale }
  });

  if (!promoBanner) {
    return res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "بنر پیدا نشد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "بنر با موفقیت دریافت شد",
    data: promoBanner
  });
};

exports.updatePromoBanner = async (req, res) => {
  try {
    const promoBanner = await PromoBanner.findById(req.params.id);

    if (!promoBanner) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "بنر پیدا نشد"
      });
    }

    let updated = req.body;

    // حذف تصویر قبلی در صورت آپلود جدید
    if (!req.body.thumbnail && req.file) {
      if (promoBanner.thumbnail?.public_id) {
        await remove(promoBanner.thumbnail.public_id);
      }
      updated.thumbnail = {
        url: req.file.path,
        public_id: req.file.filename
      };
    }

    const changedFields = [];
    if (updated.title && updated.title !== promoBanner.title) {
      changedFields.push("title");
    }

    if (changedFields.length > 0) {
      const translations = await translateFields(updated, changedFields);

      for (const [language, { fields }] of Object.entries(translations)) {
        await Translation.findOneAndUpdate(
          {
            language,
            refModel: "PromoBanner",
            refId: promoBanner._id
          },
          { fields },
          { upsert: true, new: true }
        );
      }
    }

    await PromoBanner.findByIdAndUpdate(req.params.id, updated);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "بنر با موفقیت ویرایش شد"
    });
  } catch (error) {
    console.error("Error in updatePromoBanner:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در بروزرسانی بنر",
      error: error.message
    });
  }
};

exports.deletePromoBanner = async (req, res) => {
  const promoBanner = await PromoBanner.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!promoBanner) {
    return res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "بنری که می‌خواهید حذف کنید وجود ندارد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "بنر با موفقیت حذف شد"
  });
};
