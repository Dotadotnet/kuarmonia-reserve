// controllers/story.controller.js
const Story = require("../models/story.model");
const Translation = require("../models/translation.model");
const PromoBanner = require("../models/promoBanner.model");
const translateFields = require("../utils/translateFields");

exports.addStory = async (req, res) => {
  try {
    const { title, caption, promoBanner ,tags} = req.body;
    let media = null;
    if (!promoBanner) {
      return res.status(400).json({
        acknowledgement: false,
        message: "PromoBanner Required",
        description: "آیدی بنر الزامی است"
      });
    }
console.log("req.uploadedFiles:", req.uploadedFiles?.media?.[0]);
 if (req.uploadedFiles["media"].length) {
      media = {
        url: req.uploadedFiles["media"][0].url,
        public_id: req.uploadedFiles["media"][0].key
      };
    }

    const story = new Story({
      promoBanner,
      media,
      tags: JSON.parse(tags),
      creator: req.admin._id
    });

    const result = await story.save();
await PromoBanner.findByIdAndUpdate(promoBanner, {
  $push: { stories: result._id }
});
    try {
      const translations = await translateFields(
        { title, caption },
        { stringFields: ["title", "caption"] }
      );

      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "Story",
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

      await Story.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });

      return res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "استوری با موفقیت ایجاد و ترجمه شد.",
        data: result
      });
    } catch (translationError) {
      await Story.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. استوری حذف شد.",
        error: translationError.message
      });
    }
  } catch (error) {
    console.error("Error in addStory:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در ایجاد استوری",
      error: error.message
    });
  }
};

exports.getStories = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const skip = (page - 1) * limit;

  try {
    let matchedIds = [];

    if (search) {
      const translations = await Translation.find({
        language: req.locale,
        refModel: "Story",
        "fields.title": { $regex: search, $options: "i" }
      }).select("refId");

      matchedIds = translations.map((t) => t.refId);
    }

    const query = {
      isDeleted: false,
      ...(search ? { _id: { $in: matchedIds } } : {})
    };

    const stories = await Story.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "translations.translation",
          match: { language: req.locale }
        },
        {
          path: "promoBanner",
          select: "_id translations thumbnail",
          populate: {
            path: "translations.translation",
            match: { language: req.locale }
          }
        },
        {
          path: "creator",
          select: "name avatar"
        }
      ]);

    const total = await Story.countDocuments(query);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "استوری‌ها با موفقیت دریافت شدند",
      data: stories,
      total
    });
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت استوری‌ها",
      error: error.message
    });
  }
};


exports.getStory = async (req, res) => {
  try {
    const { bannerId } = req.params;
console.log("Banner ID:", bannerId);
    const stories = await Story.find({
      promoBanner: bannerId,
      isDeleted: false
    })
      .populate([
        {
          path: "translations.translation",
          match: { language: req.locale }
        },
        {
          path: "creator",
          select: "name avatar"
        }
      ])
      .sort({ createdAt: -1 });

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "استوری‌ها با موفقیت دریافت شدند",
      data: stories
    });
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت استوری‌ها",
      error: error.message
    });
  }
};

exports.deleteStory = async (req, res) => {
  const story = await Story.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!story) {
    return res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "استوری پیدا نشد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "استوری با موفقیت حذف شد"
  });
};
