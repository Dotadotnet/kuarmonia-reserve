/* internal import */
const Tag = require("../models/tag.model");
const mongoose = require("mongoose");
const translateFields = require("../utils/translateFields");
const { generateSlug } = require("../utils/seoUtils");

exports.addTag = async (req, res) => {
  try {
    let { title, description, keynotes } = req.body;
    const parsedKeynotes = JSON.parse(keynotes || "[]");

    // Use automatic translation for title
    const titleTranslations = await translateFields(
      { title },
      { stringFields: ["title"] }
    );

    const translatedTitle = {
      fa: title,
      en: titleTranslations.en.fields.title,
      tr: titleTranslations.tr.fields.title
    };

    // Use automatic translation for description
    const descriptionTranslations = await translateFields(
      { description },
      { stringFields: ["description"] }
    );

    const translatedDescription = {
      fa: description,
      en: descriptionTranslations.en.fields.description,
      tr: descriptionTranslations.tr.fields.description
    };

    // Use automatic translation for keynotes
    const keynotesTranslations = await translateFields(
      { keynotes: parsedKeynotes },
      { arrayStringFields: ["keynotes"] }
    );

    const translatedKeynotes = {
      fa: parsedKeynotes,
      en: keynotesTranslations.en.fields.keynotes,
      tr: keynotesTranslations.tr.fields.keynotes
    };

    const tag = new Tag({
      title: translatedTitle,
      description: translatedDescription,
      keynotes: translatedKeynotes,
      slug: await generateSlug(titleTranslations.en.fields.title),
      creator: req.admin._id
    });

    const result = await tag.save();

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "تگ با موفقیت ایجاد و ترجمه شد",
      data: result
    });
  } catch (error) {
    console.error("Error in addTag:", error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).json({
        acknowledgement: false,
        message: "Validation Error",
        description: "خطا در اعتبارسنجی داده‌ها",
        errors
      });
    }

    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ایجاد تگ رخ داد",
      error: error.message
    });
  }
};

exports.getTags = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const skip = (page - 1) * limit;
  const locale = req.locale || "fa";

  try {
    const matchStage = {
      isDeleted: false,
    };

    // Add search functionality
    if (search) {
      matchStage.$or = [
        { [`title.${locale}`]: { $regex: search, $options: "i" } },
        { [`description.${locale}`]: { $regex: search, $options: "i" } }
      ];
    }

    // Handle limit and skip values
    const safeLimit = isFinite(Number(limit)) ? Number(limit) : 10;
    const safeSkip = isFinite(Number(skip)) ? Number(skip) : 0;

    const pipeline = [
      { $match: matchStage },
      { $sort: { createdAt: -1 } },
      { $skip: safeSkip },
      { $limit: safeLimit },

      // Populate creator with only necessary fields
      {
        $lookup: {
          from: "admins",
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: { path: "$creator", preserveNullAndEmptyArrays: true } },

      // Select final fields with localization
      {
        $project: {
          tagId: 1,
          title: `$title.${locale}`,
          description: `$description.${locale}`,
          keynotes: `$keynotes.${locale}`,
          slug: 1,
          canonicalUrl: 1,
          status: 1,
          createdAt: 1,
          "creator._id": 1,
          "creator.name": 1,
          "creator.avatar": 1,
        },
      },
    ];

    const tags = await Tag.aggregate(pipeline);

    // Get total count
    const total = await Tag.countDocuments(matchStage);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "تگ‌ها با موفقیت دریافت شدند",
      data: tags,
      total,
      page: Number(page),
      limit: safeLimit,
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت تگ‌ها",
      error: error.message,
    });
  }
};

exports.getTag = async (req, res) => {
  try {
    const { id } = req.params;
    const locale = req.locale || "fa";

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: "شناسه نامعتبر است"
      });
    }

    const objectId = new mongoose.Types.ObjectId(id);

    const pipeline = [
      { $match: { _id: objectId, isDeleted: false } },

      // Populate creator
      {
        $lookup: {
          from: "admins",
          localField: "creator",
          foreignField: "_id",
          as: "creator"
        }
      },
      { $unwind: { path: "$creator", preserveNullAndEmptyArrays: true } },

      // Select final fields with localization
      {
        $project: {
          tagId: 1,
          title: `$title.${locale}`,
          description: `$description.${locale}`,
          keynotes: `$keynotes.${locale}`,
          slug: 1,
          canonicalUrl: 1,
          status: 1,
          createdAt: 1,
          creator: {
            _id: "$creator._id",
            name: { $ifNull: [`$creator.name.${locale}`, `$creator.name`] },
            avatar: "$creator.avatar"
          }
        }
      }
    ];

    const [tag] = await Tag.aggregate(pipeline);

    if (!tag) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "تگ پیدا نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "تگ با موفقیت دریافت شد",
      data: tag
    });
  } catch (error) {
    console.error("Error fetching tag:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت تگ",
      error: error.message
    });
  }
};

/* update tag */
/* 📌 بروزرسانی تگ */
exports.updateTag = async (req, res) => {
  try {
    let updatedTag = req.body;

    const parsedKeynotes = JSON.parse(req.body.keynotes || "[]");

    // Use automatic translation for title if provided
    if (updatedTag.title) {
      const translations = await translateFields(
        { title: updatedTag.title },
        { stringFields: ["title"] }
      );

      updatedTag.title = {
        fa: updatedTag.title,
        en: translations.en.fields.title,
        tr: translations.tr.fields.title
      };
      
      updatedTag.slug = await generateSlug(translations.en.fields.title);
    }

    // Use automatic translation for description if provided
    if (updatedTag.description) {
      const translations = await translateFields(
        { description: updatedTag.description },
        { stringFields: ["description"] }
      );

      updatedTag.description = {
        fa: updatedTag.description,
        en: translations.en.fields.description,
        tr: translations.tr.fields.description
      };
    }

    // Use automatic translation for keynotes if provided
    if (updatedTag.keynotes) {
      const translations = await translateFields(
        { keynotes: parsedKeynotes },
        { arrayStringFields: ["keynotes"] }
      );

      updatedTag.keynotes = {
        fa: parsedKeynotes,
        en: translations.en.fields.keynotes,
        tr: translations.tr.fields.keynotes
      };
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

exports.getItem = async (req, res) => {
  let { page, id } = req.params;
  // مهم
  const modelsNames = [ "visa" ,"service", "property", "rent", "opportunity", "news", "blog"]
  // مهم
  let items = [];
  for (let i = 0; i < modelsNames.length; i++) {
    const modelsName = modelsNames[i];
    const Model = dynamicImportModel(modelsName);
    const FieldsModel = await Model.find({ tags: id }).lean();
    FieldsModel.forEach(FieldModel => {
      items.push(FieldModel);
    });
  }
  
  const total = items.length;
  items = paginateArray(items, page, 10);
  if(req.query.scope){
    items = [items[0]]
  }
  const replaceRefClass = new replaceRef(items, req);
  const result = await replaceRefClass.getRefFields();
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "تگ‌ها با موفقیت دریافت شدند",
    data: {
      total: total,
      data: result,
    },
  });

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






