const Service = require("../models/service.model");
const remove = require("../utils/remove.util");
const mongoose = require("mongoose");
const { generateSlug } = require("../utils/seoUtils");
const translateFields = require("../utils/translateFields");
const { encodeBase62 } = require("../utils/translationUtils");

const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;

exports.addService = async (req, res) => {
  try {
    console.log("1. شروع addService");

    const {
      title, summary, tags, category,
      content, roadmap, faqs, whatYouWillRead, icon,
      ...other
    } = req.body;

    console.log("2. ورودی‌ها:", { title, summary, icon, category, tags });

    // === Validation اولیه ===
    if (!title) return res.status(400).json({ acknowledgement: false, description: "عنوان فارسی الزامی است" });
    if (!summary) return res.status(400).json({ acknowledgement: false, description: "خلاصه فارسی الزامی است" });
    if (!roadmap || !roadmap.length) {
      console.log("خطا: roadmap نامعتبر", roadmap);
      return res.status(400).json({ acknowledgement: false, description: "Roadmap الزامی است" });
    }
    if (!faqs  || !faqs.length) {
      console.log("خطا: faqs نامعتبر", faqs);
      return res.status(400).json({ acknowledgement: false, description: "FAQs الزامی است" });
    }
    if (!whatYouWillRead || !whatYouWillRead.length) {
      console.log("خطا: whatYouWillRead نامعتبر", whatYouWillRead);
      return res.status(400).json({ acknowledgement: false, description: "WhatYouWillRead الزامی است" });
    }
    if (!icon) return res.status(400).json({ acknowledgement: false, description: "آیکون الزامی است" });

    console.log("3. Validation اولیه: OK");

    // === Thumbnail ===
    if (!req.uploadedFiles?.["thumbnail"]?.length) {
      return res.status(400).json({ acknowledgement: false, description: "تصویر بندانگشتی الزامی است" });
    }
    const thumbnail = {
      url: req.uploadedFiles["thumbnail"][0].url,
      public_id: req.uploadedFiles["thumbnail"][0].key
    };
    console.log("4. Thumbnail:", thumbnail);

    // === Parse ورودی‌ها ===
    const parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags || "[]");
    const parsedRoadmap = Array.isArray(roadmap) ? roadmap : JSON.parse(roadmap || "[]");
    const parsedFaqs = Array.isArray(faqs) ? faqs : JSON.parse(faqs || "[]");
    const parsedWhatYouWillRead = Array.isArray(whatYouWillRead) ? whatYouWillRead : JSON.parse(whatYouWillRead || "[]");

    console.log("5. Parsed Roadmap (اولین آیتم):", parsedRoadmap[0]);
    console.log("5. Parsed Faqs (اولین آیتم):", parsedFaqs[0]);

    // === آماده‌سازی داده برای ترجمه ===
    const dataForTranslation = {
      title,
      summary,
      content: content || "",
      roadmap: parsedRoadmap.map((item, i) => {
        const link = typeof item.link === "string" ? item.link : (item.link?.url || "");
        console.log(`6. Roadmap[${i}] link:`, item.link, "→", link);
        return {
          title: item.title || "",
          description: item.description || "",
          duration: item.duration || "",
          link
        };
      }),
      faqs: parsedFaqs.map(item => ({
        question: item.question || "",
        answer: item.answer || ""
      })),
      whatYouWillRead: parsedWhatYouWillRead
    };

    console.log("7. dataForTranslation آماده شد");

    // === ترجمه قبل از ذخیره ===
    console.log("8. شروع ترجمه با translateFields...");
    const translations = await translateFields(dataForTranslation, {
      stringFields: ["title", "summary"],
      arrayObjectFields: ["roadmap", "faqs"],
      arrayStringFields: ["whatYouWillRead"],
      longTextFields: ["content"]
    });

    const en = translations.en?.fields || {};
    const tr = translations.tr?.fields || {};

    console.log("9. ترجمه موفق:", {
      en_title: en.title?.substring(0, 50),
      tr_title: tr.title?.substring(0, 50),
      en_roadmap_count: en.roadmap?.length,
      tr_roadmap_count: tr.roadmap?.length
    });

    // === ساختار نهایی (fa + en + tr) ===
    const structuredRoadmap = parsedRoadmap.map((item, i) => {
      const link = typeof item.link === "string" ? item.link : (item.link?.url || "");
      return {
        title: {
          fa: item.title || `مسیر ${i + 1}`,
          en: en.roadmap?.[i]?.title || item.title || `Step ${i + 1}`,
          tr: tr.roadmap?.[i]?.title || item.title || `Adım ${i + 1}`
        },
        description: {
          fa: item.description || `توضیحات ${i + 1}`,
          en: en.roadmap?.[i]?.description || item.description || `Description ${i + 1}`,
          tr: tr.roadmap?.[i]?.description || item.description || `Açıklama ${i + 1}`
        },
        duration: {
          fa: item.duration || `مدت ${i + 1}`,
          en: en.roadmap?.[i]?.duration || item.duration || `Duration ${i + 1}`,
          tr: tr.roadmap?.[i]?.duration || item.duration || `Süre ${i + 1}`
        },
        link: {
          fa: link,
          en: link,
          tr: link
        }
      };
    });

    console.log("10. structuredRoadmap ساخته شد (اولین آیتم):", structuredRoadmap[0]);

    const structuredFaqs = parsedFaqs.map((item, i) => ({
      question: {
        fa: item.question || title,
        en: en.faqs?.[i]?.question || item.question || title,
        tr: tr.faqs?.[i]?.question || item.question || title
      },
      answer: {
        fa: item.answer || summary,
        en: en.faqs?.[i]?.answer || item.answer || summary,
        tr: tr.faqs?.[i]?.answer || item.answer || summary
      }
    }));

    const structuredWhatYouWillRead = parsedWhatYouWillRead.map((item, i) => ({
      fa: item || title,
      en: en.whatYouWillRead?.[i] || item || title,
      tr: tr.whatYouWillRead?.[i] || item || title
    }));

    // === ساخت سرویس کامل ===
    const service = new Service({
      ...other,
      title: {
        fa: title,
        en: en.title || title,
        tr: tr.title || title
      },
      summary: {
        fa: summary,
        en: en.summary || summary,
        tr: tr.summary || summary
      },
      content: {
        fa: content || "",
        en: en.content || content || "",
        tr: tr.content || content || ""
      },
      roadmap: structuredRoadmap,
      faqs: structuredFaqs,
      whatYouWillRead: structuredWhatYouWillRead,
      icon,
      slug: { fa: "", en: "", tr: "" },
      tags: parsedTags,
      thumbnail,
      category,
      creator: req.admin._id,
    });

    console.log("11. سرویس ساخته شد، آماده ذخیره...");

    // === ذخیره اولیه ===
    const result = await service.save();
    console.log("12. ذخیره اولیه موفق! serviceId:", result.serviceId);

    // === تولید slug ===
    result.slug = {
      fa: await generateSlug(title),
      en: await generateSlug(en.title || title),
      tr: await generateSlug(tr.title || title)
    };

    result.markModified('slug');
    await result.save();
    console.log("13. slug تولید و ذخیره شد:", result.slug);

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "خدمت با موفقیت ایجاد و ترجمه شد",
      data: result
    });

  } catch (err) {
    console.error("خطا در addService (مرحله نهایی):", {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: err.message || "خطای ناشناخته"
    });
  }
};

/* 📌 دریافت همه خدمت با pagination و search */
exports.getServices = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
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
        { [`summary.${locale}`]: { $regex: search, $options: "i" } }
      ];
    }

    const pipeline = [
      { $match: matchStage },
      { $sort: { createdAt: -1 } },
      { $skip: Number(skip) },
      { $limit: Number(limit) },

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

      // Populate category
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

      // Populate tags
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tags",
        },
      },

      // Select final fields with localization
      {
        $project: {
          serviceId: 1,
          icon: 1,
          thumbnail: 1,
          status: 1,
          views: 1,
          createdAt: 1,
          title: `$title.${locale}`,
          summary: `$summary.${locale}`,
          slug: `$slug.${locale}`,
          canonicalUrl: `$canonicalUrl.${locale}`,
          whatYouWillRead: `$whatYouWillRead.${locale}`,
          "creator._id": 1,
          "creator.name": 1,
          "creator.avatar": 1,
          "category._id": 1,
          "category.title": `$category.title.${locale}`,
          "category.icon": 1,
          tagsCount: { $size: "$tags" }
        },
      },
    ];

    const services = await Service.aggregate(pipeline);

    // Get total count
    const total = await Service.countDocuments(matchStage);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "خدمت‌ها با موفقیت دریافت شدند",
      data: services,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت خدمت‌ها",
      error: error.message,
    });
  }
};

/* 📌 دریافت یک خدمت */
exports.getService = async (req, res) => {
  try {
    console.log("req.params",req.params)
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

      // Populate category
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category"
        }
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

      // Populate tags
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tags"
        }
      },

      // Select final fields with localization
      {
        $project: {
          serviceId: 1,
          icon: 1,
          thumbnail: 1,
          status: 1,
          views: 1,
          createdAt: 1,
          title: `$title.${locale}`,
          summary: `$summary.${locale}`,
          content: `$content.${locale}`,
          roadmap: `$roadmap.${locale}`,
          faqs: {
            question: `$faqs.question.${locale}`,
            answer: `$faqs.answer.${locale}`
          },
          whatYouWillRead: `$whatYouWillRead.${locale}`,
          slug: `$slug.${locale}`,
          canonicalUrl: `$canonicalUrl.${locale}`,
          creator: {
            _id: "$creator._id",
            name: { $ifNull: [`$creator.name.${locale}`, `$creator.name`] },
            avatar: "$creator.avatar"
          },
          category: {
            _id: "$category._id",
            title: `$category.title.${locale}`,
            icon: "$category.icon"
          },
          tags: {
            _id: 1,
            title: `$tags.title.${locale}`
          }
        }
      }
    ];

    const [service] = await Service.aggregate(pipeline);

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
    console.log(error.message);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت خدمت رخ داد",
      error: error.message
    });
  }
};
/* 📌 دریافت یک خدمت */
exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const locale = req.locale || "fa";
console.log("locale",locale);




    const pipeline = [
      { $match: { serviceId: Number(id), isDeleted: false } },

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

      // Populate category
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category"
        }
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

      // Populate tags
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tags"
        }
      },

      // Select final fields with localization
    {
  $project: {
    serviceId: 1,
    thumbnail: 1,
    status: 1,
    views: 1,
    createdAt: 1,
    title: `$title.${locale}`,
    summary: `$summary.${locale}`,
    content: `$content.${locale}`,
    roadmap: {
      $map: {
        input: "$roadmap",
        as: "item",
        in: {
          title: `$$item.title.${locale}`,
          description: `$$item.description.${locale}`,
          duration: `$$item.duration.${locale}`,
          link: `$$item.link.${locale}`
        }
      }
    },
    faqs: {
      $map: {
        input: "$faqs",
        as: "item",
        in: {
          question: `$$item.question.${locale}`,
          answer: `$$item.answer.${locale}`
        }
      }
    },
    whatYouWillRead: {
      $map: {
        input: "$whatYouWillRead",
        as: "item",
        in: `$$item.${locale}`
      }
    },
    slug: `$slug.${locale}`,
    canonicalUrl: `$canonicalUrl.${locale}`,
    creator: {
      _id: "$creator._id",
      name: { $ifNull: [`$creator.name.${locale}`, `$creator.name`] },
      avatar: "$creator.avatar"
    },
    category: {
      _id: "$category._id",
      title: `$category.title.${locale}`,
      icon: "$category.icon"
    },
tags: {
  $map: {
    input: "$tags",
    as: "tag",
    in: "$$tag._id"
  }
}
  }
}

    ];

    const [service] = await Service.aggregate(pipeline);

console.log("service",service)
    if (!service) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "خدمت مورد نظر یافت نشد"
      });
    }
console.log("service",service)
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "خدمت با موفقیت دریافت شد",
      data: service
    });
  } catch (error) {
    console.log(error.message);
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
    const { id } = req.params;
    const { title, summary, tags, category, content, roadmap, faqs, whatYouWillRead, ...other } = req.body;
    
    let updateData = { ...other };
    
    // Parse JSON fields if provided
    if (tags) updateData.tags = JSON.parse(tags);
    if (roadmap) {
      const parsedRoadmap = JSON.parse(roadmap);
      updateData.roadmap = parsedRoadmap.map(item => ({
        fa: item.fa || "",
        en: item.en || "",
        tr: item.tr || ""
      }));
    }
    if (faqs) {
      const parsedFaqs = JSON.parse(faqs);
      updateData.faqs = parsedFaqs.map(item => ({
        question: {
          fa: item.question?.fa || "",
          en: item.question?.en || "",
          tr: item.question?.tr || ""
        },
        answer: {
          fa: item.answer?.fa || "",
          en: item.answer?.en || "",
          tr: item.answer?.tr || ""
        }
      }));
    }
    if (whatYouWillRead) {
      updateData.whatYouWillRead = JSON.parse(whatYouWillRead);
    }
    
    // Handle thumbnail update if new file is uploaded
    if (req.uploadedFiles?.["thumbnail"]?.length) {
      const file = req.uploadedFiles["thumbnail"][0];
      updateData.thumbnail = { url: file.url, public_id: file.key };
    }
    
    // Parse multilingual fields
    if (title) {
      const parsedTitle = JSON.parse(title);
      updateData.title = parsedTitle;
      
      // Generate slugs for each language
      const generatedSlugs = {
        fa: await generateSlug(parsedTitle.fa),
        en: await generateSlug(parsedTitle.en),
        tr: await generateSlug(parsedTitle.tr)
      };
      
      updateData.slug = generatedSlugs;
    }
    
    if (summary) updateData.summary = JSON.parse(summary);
    if (content) updateData.content = JSON.parse(content);

    // Update the service document
    const result = await Service.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    // If title was updated, also update canonical URLs
    if (title) {
      const service = await Service.findById(id);

      
      await Service.findByIdAndUpdate(id, {
        $set: { canonicalUrl: canonicalUrls }
      });
    }

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "خدمت مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Updated",
      description: "خدمت با موفقیت بروزرسانی شد",
      data: result
    });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در به‌روزرسانی خدمت",
      error: error.message
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: "شناسه نامعتبر است"
      });
    }

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "خدمت مورد نظر برای حذف یافت نشد"
      });
    }

    // Delete the service
    await Service.findByIdAndDelete(id);
    
    // Remove thumbnail if exists
    if (service.thumbnail && service.thumbnail.public_id) {
      await remove("service", service.thumbnail.public_id);
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "خدمت با موفقیت حذف شد"
    });
  } catch (error) {
    console.log(error.message); 
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف خدمت رخ داد",
      error: error.message
    });
  }
};

// Get all services without pagination (for dashboard)
exports.getAllServices = async (req, res) => {
  const locale = req.locale || "fa";

  try {
    const matchStage = {
      isDeleted: false,
    };

    const pipeline = [
      { $match: matchStage },
      { $sort: { createdAt: -1 } },

      // Populate creator
      {
        $lookup: {
          from: "admins",
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: { path: "$creator", preserveNullAndEmptyArrays: true } },

      // Populate category
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

      // Populate tags
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tags",
        },
      },

      // Select final fields with localization
      {
        $project: {
          serviceId: 1,
          icon: 1,
          thumbnail: 1,
          status: 1,
          views: 1,
          createdAt: 1,
          title: `$title.${locale}`,
          summary: `$summary.${locale}`,
          content: `$content.${locale}`,
          roadmap: 1, // Return full roadmap data
          faqs: {
            question: `$faqs.question.${locale}`,
            answer: `$faqs.answer.${locale}`
          },
          whatYouWillRead: `$whatYouWillRead.${locale}`,
          slug: `$slug.${locale}`,
          canonicalUrl: `$canonicalUrl.${locale}`,
          creator: {
            _id: "$creator._id",
            name: { $ifNull: [`$creator.name.${locale}`, `$creator.name`] },
            avatar: "$creator.avatar"
          },
          category: {
            _id: "$category._id",
            title: `$category.title.${locale}`,
            icon: "$category.icon"
          },
          tags: {
            $map: {
              input: "$tags",
              as: "tag",
              in: "$$tag._id"
            }
          }
        }
      }
    ];

    const services = await Service.aggregate(pipeline);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "همه خدمت‌ها با موفقیت دریافت شدند",
      data: services,
    });
  } catch (error) {
    console.error("Error fetching all services:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت همه خدمت‌ها",
      error: error.message,
    });
  }
};






















































































