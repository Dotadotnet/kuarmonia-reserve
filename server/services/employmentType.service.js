const EmploymentType = require("../models/employmentType.model");
const remove = require("../utils/remove.util");
const Translation = require("../models/translation.model");
const { generateSlug } = require("../utils/seoUtils");
const translateFields = require("../utils/translateFields");

exports.addEmploymentType = async (req, res) => {
  try {
    const { title, description} = req.body;
    if (!title || !description ) {
      return res.status(400).json({
        acknowledgement: false,
        message: "درخواست نادرست",
        description: "همه فیلدها الزامی است",
        isSuccess: false
      });
    }

    const employmentType = new EmploymentType({
      creator: req.admin._id,

    });

    const result = await employmentType.save();
    const slug = await generateSlug(title);

    try {
      const translations = await translateFields(
        {
          title,
          description,
          slug,
        },
        {
          stringFields: ["title", "description", "slug"]
        }
      );
      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "EmploymentType",
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
      await EmploymentType.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });

      return res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "نوع همکاری   با موفقیت ایجاد و ترجمه شد.",
        data: result
      });
    } catch (translationError) {
      console.log(translationError.message);
      await EmploymentType.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. نوع همکاری   حذف شد.",
        error: translationError.message
      });
    }
  } catch (error) {
    console.error("Error in addEmploymentType:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: " ها خطا در ایجاد نوع همکاری",
      error: error.message
    });
  }
};


exports.getEmploymentTypes = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const skip = (page - 1) * limit;

  try {
    let matchedEmploymentTypeIds = [];

    if (search) {
      const translations = await Translation.find({
        language: req.locale,
        refModel: "EmploymentType",
        "fields.title": { $regex: search, $options: "i" }
      }).select("refId");

      matchedEmploymentTypeIds = translations.map((t) => t.refId);
    }

    const query = {
      isDeleted: false,
      ...(search ? { _id: { $in: matchedEmploymentTypeIds } } : {})
    };

    const employmentTypes = await EmploymentType.find(query)
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

    const total = await EmploymentType.countDocuments(query);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع همکاری  ها با موفقیت دریافت شدند",
      data: employmentTypes,
      total
    });
  } catch (error) {
    console.error("Error fetching employmentTypes:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت نوع همکاری ها",
      error: error.message
    });
  }
};

/* get a employmentType */
exports.getEmploymentType = async (req, res) => {
  const employmentType = await EmploymentType.findById(req.params.id);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع همکاری با موفقیت دریافت شد",
    data: employmentType
  });
};

/* update employmentType */
exports.updateEmploymentType = async (req, res) => {
  try {
    const employmentType = await EmploymentType.findById(req.params.id);

    if (!employmentType) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "نوع همکاری  پیدا نشد"
      });
    }

    let updatedEmploymentType = req.body;
    // حذف تصویر قبلی در صورت آپلود جدید
    if (!req.body.thumbnail && req.file) {
      if (employmentType.thumbnail?.public_id) {
        await remove(employmentType.thumbnail.public_id);
      }

      updatedEmploymentType.thumbnail = {
        url: req.file.path,
        public_id: req.file.filename
      };
    }

    const translatableFields = ["title", "description"];

    const changedFields = translatableFields.filter(
      (field) =>
        updatedEmploymentType[field] && updatedEmploymentType[field] !== employmentType[field]
    );

    if (changedFields.length > 0) {
      const translations = await translateFields(
        updatedEmploymentType,
        changedFields
      );

      for (const [language, { fields }] of Object.entries(translations)) {
        await Translation.findOneAndUpdate(
          {
            language,
            refModel: "EmploymentType",
            refId: employmentType._id
          },
          { fields },
          { upsert: true, new: true }
        );
      }
    }
    console.log("Updated EmploymentType:", updatedEmploymentType);
    await EmploymentType.findByIdAndUpdate(req.params.id, updatedEmploymentType);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع همکاری  با موفقیت ویرایش شد"
    });
  } catch (error) {
    console.error("Error in updateEmploymentType:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در بروزرسانی نوع همکاری ",
      error: error.message
    });
  }
};
/* delete employmentType */
exports.deleteEmploymentType = async (req, res) => {
  const employmentType = await EmploymentType.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!employmentType) {
    return res.status(404).json({
      acknowledgement: false,
      message: "نوع همکاری پیدا نشد",
      description: "نوع همکاری  که می‌خواهید حذف کنید، وجود ندارد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع همکاری با موفقیت حذف شد"
  });
};
