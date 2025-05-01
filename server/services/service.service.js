/* internal imports */
const Service = require("../models/service.model");
const Product = require("../models/product.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");
const translateFields = require("../utils/translateFields");
const Translation = require("../models/translation.model");
const { generateSlug, generateSeoFields } = require("../utils/seoUtils");
const Category = require("../models/category.model");


const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;

exports.addService = async (req, res) => {
  try {
    const { title, summary, tags,category, content, roadmap, faqs, ...other } = req.body;
    const parsedRoadmap = JSON.parse(roadmap);
    const parsedFaqs = JSON.parse(faqs);
    const parsedTags = JSON.parse(tags);

    let thumbnail = null;
    if (req.uploadedFiles?.["thumbnail"]?.length) {
      const file = req.uploadedFiles["thumbnail"][0];
      thumbnail = { url: file.url, public_id: file.key };
    }

    const service = new Service({
      ...other,
      tags: parsedTags,
      roadmap: parsedRoadmap,
      faqs: parsedFaqs,
      thumbnail,
      category,
      creator: req.admin._id
    });

    const result = await service.save();
        const slug = await generateSlug(title);
        const canonicalUrl = `${defaultDomain}/service/${slug}`;

    const { metaTitle, metaDescription } = generateSeoFields({
      title,
      summary,
      categoryTitle: await Category.findById(category).title
    });
    try {
      const translations = await translateFields(
        {
          title,
          summary,
          content,
          metaTitle,
          metaDescription,
          parsedRoadmap,
          parsedFaqs,
          slug,
          canonicalUrl
        },
        {
          stringFields: [
            "title",
            "summary",
            "metaTitle",
            "metaDescription",
            "slug",
            "canonicalUrl"
          ],
          arrayObjectFields: ["parsedFaqs","parsedRoadmap"],
          longTextFields: ["content"]

        }
      );
      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "Service",
          refId: result._id,
          fields
        })
      );
      const savedTranslations = await Translation.insertMany(translationDocs);
      const translationInfos = savedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));
      await Service.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });

      res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "خدمت با موفقیت ایجاد شد",
        data: result
      });
    } catch (err) {
      console.log(err.message)
      await Service.findByIdAndDelete(result._id);
      res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. خدمت حذف شد.",
        error: err.message
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: err.message,
      error: err.message
    });
  }
};
/* 📌 دریافت همه خدمت */
exports.getAllService = async (res) => {
  try {
    const service = await Service.find().populate([
      {
        path: "category",
        select: "title _id icon"
      }
    ]);
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست خدمت با موفقیت دریافت شد",
      data: service
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت خدمت رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت یک خدمت */
exports.getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate([
      {
        path: "creator",
        select: "name avatar"
      },
      {
        path: "tags",
        select: "title _id keynotes"
      },
      {
        path: "categories",
        select: "title _id icon"
      },
      {
        path: "socialLinks.network",
        select: "title platform icon"
      }
    ]);
    if (!service) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "خدمت مورد نظر یافت نشد"
      });
    }
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "خدمت با موفقیت دریافت شد",
      data: service
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت خدمت رخ داد",
      error: error.message
    });
  }
};

/* 📌 بروزرسانی خدمت */
exports.updateService = async (req, res) => {
  try {
    const updatedService = req.body;
    console.log("Updated Service:", updatedService);
    console.log("Service ID:", req.params.id);

    const result = await Service.findByIdAndUpdate(
      req.params.id,
      updatedService,
      {
        new: true
      }
    );

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "خدمت مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "خدمت با موفقیت بروزرسانی شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی خدمت رخ داد",
      error: error.message
    });
  }
};

/* 📌 حذف خدمت */
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "خدمت مورد نظر برای حذف یافت نشد"
      });
    }

    await remove(service.logo?.public_id);

    await Product.updateMany(
      { service: req.params.id },
      { $unset: { service: "" } }
    );
    await Admin.findByIdAndUpdate(service.creator, {
      $unset: { service: "" }
    });

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "خدمت با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف خدمت رخ داد",
      error: error.message
    });
  }
};
