/* internal imports */
const VisaType = require("../models/visaType.model");
const { translate } = require("google-translate-api-x");
const Translation = require("../models/translation.model");
const { generateSlug } = require("../utils/seoUtils");
const translateFields = require("../utils/translateFields");

/* 📌 اضافه کردن نوع ویزا جدید */
exports.addVisaType = async (req, res) => {
  try {
    const {
      title,
      summary,
      content,
      roadmap,
      faqs,
      costs,
      durations,
      conditions,
      advantages,
      disadvantages,
      tags,
      icon,
      category
    } = req.body;
    let thumbnail = null;

    const parsedRoadmap = JSON.parse(roadmap);
    const parsedFaqs = JSON.parse(faqs);
    const parsedCosts = JSON.parse(costs);
    const parsedDurations = JSON.parse(durations);
    const parsedConditions = JSON.parse(conditions);
    const parsedAdvantages = JSON.parse(advantages);
    const parsedDisadvantages = JSON.parse(disadvantages);
    const parsedTags = JSON.parse(tags);
    console.log("🚀 ~ file: visaType.service.js:57 ~ exports.addVisaType= ~ req.file", req.uploadedFiles);
    if (req.uploadedFiles["thumbnail"].length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key
      };
    }

    const visaType = new VisaType({
      title,
      thumbnail,
      icon,
      category,
      tags: parsedTags,
      creator: req.admin._id
    });


    const result = await visaType.save();

    try {
      const translations = await translateFields(
        {
          title,
          content,
          summary,
          roadmap: parsedRoadmap,
          faqs: parsedFaqs,
          costs: parsedCosts,
          durations: parsedDurations,
          conditions: parsedConditions,
          advantages: parsedAdvantages,
          disadvantages: parsedDisadvantages
        },
        {
          stringFields: ["title", "summery"],
          arrayObjectFields: ["faqs", "roadmap", "costs","durations"],
          arrayStringFields:['conditions',"advantages","disadvantages"],
          longTextFields: ["content"]
        }
      );
      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "VisaType",
          refId: result._id,
          fields
        })
      );
      const savedTranslations = await Translation.insertMany(translationDocs);
      const translationInfos = savedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));
      await VisaType.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });
      res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "نوع ویزا با موفقیت ایجاد شد",
        data: result
      });
    } catch (translationError) {
      await VisaType.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. نوع ویزا حذف شد.",
        error: translationError.message
      });
    }
  } catch (error) {
    const errorMessage = error.message.split(":")[2]?.trim();

    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: errorMessage,
      error: error.message
    });
  }
};

/* 📌 دریافت همه نوع ویزا */
exports.getVisaTypes = async (req, res) => {
  try {
    const visaType = await VisaType.find({ isDeleted: false }).populate([
      {
        path: "translations.translation",
        match: { language: req.locale }
      },
      {
        path: "creator",
        select: "name avatar"
      }
    ]);
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست نوع ویزا با موفقیت دریافت شد",
      data: visaType
    });
  } catch (error) {
    console.error("❌ خطا در دریافت نوع ویزا:", error.message);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت نوع ویزا رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت یک نوع ویزا */
exports.getVisaType = async (req, res) => {
  try {
    const visaType = await VisaType.findById(req.params.id);

    if (!visaType) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "نوع ویزا مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع ویزا با موفقیت دریافت شد",
      data: visaType
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت نوع ویزا رخ داد",
      error: error.message
    });
  }
};

/* 📌 بروزرسانی نوع ویزا */
exports.updateVisaType = async (req, res) => {
  try {
    const updatedVisaType = req.body;

    let translatedTitleEn = "";
    let translatedTitleTr = "";
    let translatedDescriptionEn = "";
    let translatedDescriptionTr = "";

    if (updatedVisaType.title || updatedVisaType.description) {
      try {
        if (updatedVisaType.title) {
          const resultTitleEn = await translate(updatedVisaType.title, {
            to: "en",
            client: "gtx"
          });
          translatedTitleEn = resultTitleEn.text;

          const resultTitleTr = await translate(updatedVisaType.title, {
            to: "tr",
            client: "gtx"
          });
          translatedTitleTr = resultTitleTr.text;
        }

        if (updatedVisaType.description) {
          const resultDescriptionEn = await translate(
            updatedVisaType.description,
            {
              to: "en",
              client: "gtx"
            }
          );
          translatedDescriptionEn = resultDescriptionEn.text;

          const resultDescriptionTr = await translate(
            updatedVisaType.description,
            {
              to: "tr",
              client: "gtx"
            }
          );
          translatedDescriptionTr = resultDescriptionTr.text;
        }

        await Translation.updateOne(
          { refModel: "VisaType", refId: req.params.id, language: "en" },
          {
            $set: {
              ...(translatedTitleEn && { "fields.title": translatedTitleEn }),
              ...(translatedDescriptionEn && {
                "fields.description": translatedDescriptionEn
              })
            }
          },
          { upsert: true }
        );

        await Translation.updateOne(
          { refModel: "VisaType", refId: req.params.id, language: "tr" },
          {
            $set: {
              ...(translatedTitleTr && { "fields.title": translatedTitleTr }),
              ...(translatedDescriptionTr && {
                "fields.description": translatedDescriptionTr
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
          description: "خطا در  فرآیند ترجمه"
        });
      }
    }
    if (updatedVisaType.title) {
      updatedVisaType.slug = await generateSlug(updatedVisaType.title);
    }
    const result = await VisaType.findByIdAndUpdate(
      req.params.id,
      updatedVisaType,
      { new: true }
    );

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "نوع ویزا مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع ویزا با موفقیت دریافت و بروزرسانی شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت یا بروزرسانی نوع ویزا رخ داد",
      error: error.message
    });
  }
};

/* 📌 حذف نوع ویزا */
exports.deleteVisaType = async (req, res) => {
  try {
    const visaType = await VisaType.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!visaType) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "نوع ویزا مورد نظر برای حذف یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع ویزا با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف نوع ویزا رخ داد",
      error: error.message
    });
  }
};
