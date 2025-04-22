const Faq = require("../models/faq.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");

/* add new faq */
exports.addFaq = async (req, res) => {
  try {
    const { question, answer,tags, ...other } = req.body;
console.log(req.body.tags)
    let translations;
    try {
      translations = await translateFields({ question, answer }, [
        "question",
        "answer"
      ]);
    } catch (err) {
      console.error("خطا در ترجمه:", err.message);
      return res.status(500).json({
        acknowledgement: false,
        message: "Error",
        description: "خطا در ترجمه",
        error: err.message
      });
    }

    const faq = new Faq({
      question,
      answer,
      tags: JSON.parse(tags),
      ...other,
      creator: req.admin._id,
    });

    const result = await faq.save();

    const translationDocs = Object.entries(translations).map(
      ([lang, { fields }]) => ({
        language: lang,
        refModel: "Faq",
        refId: result._id,
        fields
      })
    );

    try {
      await Translation.insertMany(translationDocs);
    } catch (translationError) {
      await Faq.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. دسته‌بندی حذف شد.",
        error: translationError.message
      });
    }

    await Admin.findByIdAndUpdate(result.creator, {
      $set: { faq: result._id }
    });

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "سوال متداول با موفقیت ایجاد شد",
      data: result
    });
  } catch (error) {
    console.error("Error in addFaq:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: error.message,
      error: error.message
    });
  }
};

/* get all faqses */
exports.getFaqs = async ( res) => {
  try {
    const faqses = await Faq.find({ isDeleted: { $ne: true } }).populate(
      {
        path: "creator",
        select: "name avatar"
      }
    );
    console.log("faqses", faqses);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "سوالات متداول با موفقیت دریافت شدند",
      data: faqses
    });
  } catch (error) {
    console.error("خطا در دریافت سوالات متداول:", error);

    res.status(500).json({
      acknowledgement: false,
      message: "خطا در دریافت اطلاعات",
      description: error.message,
      data: null
    });
  }
};


/* get a faq */
exports.getFaq = async (req, res) => {
  const faq = await Faq.findById(req.params.id);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "سوال متداول با موفقیت دریافت شد",
    data: faq
  });
};

/* update faq */
exports.updateFaq = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "دسته‌بندی پیدا نشد"
      });
    }

    let updatedFaq = req.body;
    // حذف تصویر قبلی در صورت آپلود جدید
    if (!req.body.thumbnail && req.file) {
      if (faq.thumbnail?.public_id) {
        await remove(faq.thumbnail.public_id);
      }

      updatedFaq.thumbnail = {
        url: req.file.path,
        public_id: req.file.filename
      };
    }

    const translatableFields = ["question", "description"];

    const changedFields = translatableFields.filter(
      (field) => updatedFaq[field] && updatedFaq[field] !== faq[field]
    );

    if (changedFields.length > 0) {
      const translations = await translateFields(updatedFaq, changedFields);

      for (const [language, { fields }] of Object.entries(translations)) {
        await Translation.findOneAndUpdate(
          {
            language,
            refModel: "Faq",
            refId: faq._id
          },
          { fields },
          { upsert: true, new: true }
        );
      }
    }
    console.log("Updated Faq:", updatedFaq);
    await Faq.findByIdAndUpdate(req.params.id, updatedFaq);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "دسته‌بندی با موفقیت ویرایش شد"
    });
  } catch (error) {
    console.error("Error in updateFaq:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در بروزرسانی دسته‌بندی",
      error: error.message
    });
  }
};
/* delete faq */
exports.deleteFaq = async (req, res) => {
  const faq = await Faq.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!faq) {
    return res.status(404).json({
      acknowledgement: false,
      message: "سوال متداول پیدا نشد",
      description: "سوال متداول  که می‌خواهید حذف کنید، وجود ندارد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "سوال متداول با موفقیت حذف شد"
  });
};
