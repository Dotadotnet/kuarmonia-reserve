/* internal imports */
const Visa = require("../models/visa.model");
const { translate } = require("google-translate-api-x");
const Translation = require("../models/translation.model");
const { generateSlug } = require("../utils/seoUtils");
const translateFields = require("../utils/translateFields");
const Counter = require("../models/counter");
const { encodeBase62 } = require("../utils/translationUtils");

const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;

/* 📌 اضافه کردن ویزا جدید */
exports.addVisa = async (req, res) => {
  try {
    const {
      title,
      summary,
      content,
      processingTime,
      validity,
      roadmap,
      faqs,
      costs,
      documents,
      rejectionReasons,
      successTips,
      conditions,
      country,
      difficultyLevel,
      advantages,
      disadvantages,
      type,
      tags
    } = req.body;
    const parsedTags = JSON.parse(tags || "[]");

    let thumbnail = null;
    if (req.uploadedFiles?.["thumbnail"]?.length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key
      };
    }

    const visa = new Visa({
      title,
      thumbnail,
      type,
      tags: parsedTags,
      creator: req.admin._id
    });

    const counter = await Counter.findOneAndUpdate(
      { name: "visaId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    visa.visaId = counter.seq;
    const base62Code = encodeBase62(visa.visaId);
    visa.shortUrl = `${defaultDomain}/v/${base62Code}`;

    const result = await visa.save();

    // ترجمه خودکار فیلدها
    try {
      const parsedRoadmap = JSON.parse(roadmap || "[]");
      const parsedFaqs = JSON.parse(faqs || "[]");
      const parsedCosts = JSON.parse(costs || "[]");
      const parsedDocuments = JSON.parse(documents || "[]");
      const parsedConditions = JSON.parse(conditions || "[]");
      const parsedAdvantages = JSON.parse(advantages || "[]");
      const parsedDisadvantages = JSON.parse(disadvantages || "[]");
      const parsedSejectionReasons = JSON.parse(rejectionReasons || "[]");
      const parsedSuccessTips = JSON.parse(successTips || "[]");

      const translations = await translateFields(
        {
          title,
          content,
          summary,
          processingTime,
          validity,
          country,
          difficultyLevel,
          roadmap: parsedRoadmap,
          faqs: parsedFaqs,
          costs: parsedCosts,
          documents: parsedDocuments,
          conditions: parsedConditions,
          advantages: parsedAdvantages,
          disadvantages: parsedDisadvantages,
          rejectionReasons: parsedSejectionReasons,
          successTips: parsedSuccessTips
        },
        {
          stringFields: ["title", "summary", "processingTime", "validity", "country", "difficultyLevel"],
          arrayObjectFields: ["faqs", "roadmap", "costs", "documents"],
          arrayStringFields: [
            "conditions",
            "advantages",
            "disadvantages",
            "rejectionReasons",
            "successTips"
          ],
          longTextFields: ["content"]
        }
      );

      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "Visa",
          refId: result._id,
          fields
        })
      );

      const savedTranslations = await Translation.insertMany(translationDocs);
      const translationInfos = savedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));

      await Visa.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });

      res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "ویزای جدید با موفقیت ایجاد شد",
        data: result
      });
    } catch (translationError) {
      await Visa.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. ویزا حذف شد.",
        error: translationError.message
      });
    }
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: error.message,
      error: error.message
    });
  }
};

/* 📌 دریافت همه  ویزا */
exports.getVisas = async (req, res) => {
  try {
    const visas = await Visa.find({ isDeleted: false }).populate([
      {
        path: "translations.translation",
        match: { language: req.locale }
      },
      {
        path: "creator",
        select: "name avatar"
      },
      {
        path: "type",
        select: " translations icon",
        populate: {
          path: "translations.translation", 
          select: "fields.title "
        }
      }
    ]);
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست  ویزا با موفقیت دریافت شد",
      data: visas
    });
  } catch (error) {
    console.error("❌ خطا در دریافت  ویزا:", error.message);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت  ویزا رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت یک  ویزا */
exports.getVisa = async (req, res) => {
  try {
    const visa = await Visa.findById(req.params.id);

    if (!visa) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: " ویزا مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: " ویزا با موفقیت دریافت شد",
      data: visa
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت  ویزا رخ داد",
      error: error.message
    });
  }
};

/* 📌 بروزرسانی  ویزا */
exports.updateVisa = async (req, res) => {
  try {
    const updatedVisa = req.body;

    let translatedTitleEn = "";
    let translatedTitleTr = "";
    let translatedDescriptionEn = "";
    let translatedDescriptionTr = "";

    if (updatedVisa.title || updatedVisa.description) {
      try {
        if (updatedVisa.title) {
          const resultTitleEn = await translate(updatedVisa.title, {
            to: "en",
            client: "gtx"
          });
          translatedTitleEn = resultTitleEn.text;

          const resultTitleTr = await translate(updatedVisa.title, {
            to: "tr",
            client: "gtx"
          });
          translatedTitleTr = resultTitleTr.text;
        }

        if (updatedVisa.description) {
          const resultDescriptionEn = await translate(updatedVisa.description, {
            to: "en",
            client: "gtx"
          });
          translatedDescriptionEn = resultDescriptionEn.text;

          const resultDescriptionTr = await translate(updatedVisa.description, {
            to: "tr",
            client: "gtx"
          });
          translatedDescriptionTr = resultDescriptionTr.text;
        }

        await Translation.updateOne(
          { refModel: "Visa", refId: req.params.id, language: "en" },
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
          { refModel: "Visa", refId: req.params.id, language: "tr" },
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
    if (updatedVisa.title) {
      updatedVisa.slug = await generateSlug(updatedVisa.title);
    }
    const result = await Visa.findByIdAndUpdate(req.params.id, updatedVisa, {
      new: true
    });

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: " ویزا مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: " ویزا با موفقیت دریافت و بروزرسانی شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت یا بروزرسانی  ویزا رخ داد",
      error: error.message
    });
  }
};

/* 📌 حذف  ویزا */
exports.deleteVisa = async (req, res) => {
  try {
    const visa = await Visa.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!visa) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: " ویزا مورد نظر برای حذف یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: " ویزا با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف  ویزا رخ داد",
      error: error.message
    });
  }
};
