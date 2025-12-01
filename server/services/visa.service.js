/* internal imports */
const Visa = require("../models/visa.model");
const remove = require("../utils/remove.util");
const mongoose = require("mongoose");
const { generateSlug } = require("../utils/seoUtils");
const translateFields = require("../utils/translateFields");

const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;

/* 📌 اضافه کردن ویزا جدید */
exports.addVisa = async (req, res) => {
  try {
    console.log("1. شروع addVisa");

    const {
      title, summary, tags, type, country,
      content, processingTime, validity, difficultyLevel,
      roadmap, faqs, costs, documents, conditions,
      advantages, disadvantages, rejectionReasons, successTips,
      ...other
    } = req.body;

    console.log("2. ورودی‌ها:", { title, summary, type, country, tags });

    // === Validation اولیه ===
    if (!title) return res.status(400).json({ acknowledgement: false, description: "عنوان الزامی است" });
    if (!summary) return res.status(400).json({ acknowledgement: false, description: "خلاصه الزامی است" });
    if (!processingTime) return res.status(400).json({ acknowledgement: false, description: "زمان پردازش الزامی است" });
    if (!validity) return res.status(400).json({ acknowledgement: false, description: "اعتبار الزامی است" });
    if (!difficultyLevel) return res.status(400).json({ acknowledgement: false, description: "سطح دشواری الزامی است" });
    if (!roadmap || !roadmap.length) {
      console.log("خطا: roadmap نامعتبر", roadmap);
      return res.status(400).json({ acknowledgement: false, description: "Roadmap الزامی است" });
    }
    if (!faqs  || !faqs.length) {
      console.log("خطا: faqs نامعتبر", faqs);
      return res.status(400).json({ acknowledgement: false, description: "FAQs الزامی است" });
    }
    if (!costs || !costs.length) {
      console.log("خطا: costs نامعتبر", costs);
      return res.status(400).json({ acknowledgement: false, description: "Costs الزامی است" });
    }
    if (!documents || !documents.length) {
      console.log("خطا: documents نامعتبر", documents);
      return res.status(400).json({ acknowledgement: false, description: "Documents الزامی است" });
    }

    console.log("3. Validation اولیه: OK");

    // === Thumbnail ===
    if (!req.uploadedFiles?.["thumbnail"]?.length) {
      return res.status(400).json({ acknowledgement: false, description: "تصویر بندانگشتی الزامی است" });
    }
    const thumbnail = {
      url: req.uploadedFiles["thumbnail"][0].url,
      public_id: req.uploadedFiles["thumbnail"][0].public_id || req.uploadedFiles["thumbnail"][0].key
    };
    console.log("4. Thumbnail:", thumbnail);

    // === Parse ورودی‌ها ===
    const parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags || "[]");
    const parsedRoadmap = Array.isArray(roadmap) ? roadmap : JSON.parse(roadmap || "[]");
    const parsedFaqs = Array.isArray(faqs) ? faqs : JSON.parse(faqs || "[]");
    const parsedCosts = Array.isArray(costs) ? costs : JSON.parse(costs || "[]");
    const parsedDocuments = Array.isArray(documents) ? documents : JSON.parse(documents || "[]");
    const parsedConditions = Array.isArray(conditions) ? conditions : JSON.parse(conditions || "[]");
    const parsedAdvantages = Array.isArray(advantages) ? advantages : JSON.parse(advantages || "[]");
    const parsedDisadvantages = Array.isArray(disadvantages) ? disadvantages : JSON.parse(disadvantages || "[]");
    const parsedRejectionReasons = Array.isArray(rejectionReasons) ? rejectionReasons : JSON.parse(rejectionReasons || "[]");
    const parsedSuccessTips = Array.isArray(successTips) ? successTips : JSON.parse(successTips || "[]");

    console.log("5. Parsed Roadmap (اولین آیتم):", parsedRoadmap[0]);
    console.log("5. Parsed Faqs (اولین آیتم):", parsedFaqs[0]);
    console.log("5. Parsed Documents (اولین آیتم):", parsedDocuments[0]);

    // === آماده‌سازی داده برای ترجمه ===
    const dataForTranslation = {
      title,
      summary,
      content: content || "",
      processingTime,
      validity,
      difficultyLevel,
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
      costs: parsedCosts.map(item => ({
        title: item.title || "",
        fee: item.fee || ""
      })),
      documents: parsedDocuments.map(item => ({
        title: item.title || "",
        description: item.description || "",
        type: item.type || ""
      })),
      conditions: parsedConditions,
      advantages: parsedAdvantages,
      disadvantages: parsedDisadvantages,
      rejectionReasons: parsedRejectionReasons,
      successTips: parsedSuccessTips
    };

    console.log("7. dataForTranslation آماده شد");

    // === ترجمه قبل از ذخیره ===
    console.log("8. شروع ترجمه با translateFields...");
    const translations = await translateFields(dataForTranslation, {
      stringFields: ["title", "summary", "processingTime", "validity", "difficultyLevel"],
      arrayObjectFields: ["roadmap", "faqs", "costs", "documents"],
      arrayStringFields: ["conditions", "advantages", "disadvantages", "rejectionReasons", "successTips"],
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
        fa: item.question || "",
        en: en.faqs?.[i]?.question || "",
        tr: tr.faqs?.[i]?.question || ""
      },
      answer: {
        fa: item.answer || "",
        en: en.faqs?.[i]?.answer || "",
        tr: tr.faqs?.[i]?.answer || ""
      }
    }));

    const structuredCosts = parsedCosts.map((item, i) => ({
      title: {
        fa: item.title || title,
        en: en.costs?.[i]?.title || item.title || title,
        tr: tr.costs?.[i]?.title || item.title || title
      },
      fee: {
        fa: item.fee || "",
        en: en.costs?.[i]?.fee || item.fee || "",
        tr: tr.costs?.[i]?.fee || item.fee || ""
      }
    }));

    const structuredDocuments = parsedDocuments.map((item, i) => ({
      title: {
        fa: item.title || title,
        en: en.documents?.[i]?.title || item.title || title,
        tr: tr.documents?.[i]?.title || item.title || title
      },
      description: {
        fa: item.description || "",
        en: en.documents?.[i]?.description || item.description || "",
        tr: tr.documents?.[i]?.description || item.description || ""
      },
      type: item.type || "optional"
    }));

    const structuredConditions = parsedConditions.map((item, i) => ({
      fa: item || title,
      en: en.conditions?.[i] || item || title,
      tr: tr.conditions?.[i] || item || title
    }));

    const structuredAdvantages = parsedAdvantages.map((item, i) => ({
      fa: item || title,
      en: en.advantages?.[i] || item || title,
      tr: tr.advantages?.[i] || item || title
    }));

    const structuredDisadvantages = parsedDisadvantages.map((item, i) => ({
      fa: item || title,
      en: en.disadvantages?.[i] || item || title,
      tr: tr.disadvantages?.[i] || item || title
    }));

    const structuredRejectionReasons = parsedRejectionReasons.map((item, i) => ({
      fa: item || title,
      en: en.rejectionReasons?.[i] || item || title,
      tr: tr.rejectionReasons?.[i] || item || title
    }));

    const structuredSuccessTips = parsedSuccessTips.map((item, i) => ({
      fa: item || title,
      en: en.successTips?.[i] || item || title,
      tr: tr.successTips?.[i] || item || title
    }));

    // === ساخت ویزا کامل ===
    const visa = new Visa({
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
      processingTime: {
        fa: processingTime,
        en: en.processingTime || processingTime,
        tr: tr.processingTime || processingTime
      },
      validity: {
        fa: validity,
        en: en.validity || validity,
        tr: tr.validity || validity
      },
      difficultyLevel: {
        fa: difficultyLevel,
        en: en.difficultyLevel || difficultyLevel,
        tr: tr.difficultyLevel || difficultyLevel
      },
      roadmap: structuredRoadmap,
      faqs: structuredFaqs,
      costs: structuredCosts,
      documents: structuredDocuments,
      conditions: structuredConditions,
      advantages: structuredAdvantages,
      disadvantages: structuredDisadvantages,
      rejectionReasons: structuredRejectionReasons,
      successTips: structuredSuccessTips,
      slug: {
        fa: await generateSlug(title),
        en: await generateSlug(en.title || title),
        tr: await generateSlug(tr.title || title)
      },
      tags: parsedTags,
      type,
      country,
      thumbnail,
      creator: req.admin._id,
    });

    console.log("11. ویزا ساخته شد، آماده ذخیره...");

    // === ذخیره اولیه ===
    const result = await visa.save();
    console.log("12. ذخیره اولیه موفق! visaId:", result.visaId);

    // === تولید canonical URLs ===
    const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL || "";
    const canonicalUrl = {
      fa: `${defaultDomain}/visa/${result.slug.fa}/${result.visaId}`,
      en: `${defaultDomain}/en/visa/${result.slug.en}/${result.visaId}`,
      tr: `${defaultDomain}/tr/visa/${result.slug.tr}/${result.visaId}`
    };
    
    await Visa.findByIdAndUpdate(result._id, {
      $set: { canonicalUrl }
    });
    
    console.log("13. canonicalUrl تولید و ذخیره شد:", canonicalUrl);

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "ویزا با موفقیت ایجاد شد",
      data: result
    });

  } catch (err) {
    console.error("خطا در addVisa (مرحله نهایی):", {
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

/* 📌 دریافت همه ویزاها با pagination و search */
exports.getVisas = async (req, res) => {
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
        { [`summary.${locale}`]: { $regex: search, $options: "i" } }
      ];
    }

    const pipeline = [
      { $match: matchStage },
      { $sort: { createdAt: -1 } },
      { $skip: Number(skip) },
      { $limit: Number(limit) },

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

      // Populate type
      {
        $lookup: {
          from: "visatypes",
          localField: "type",
          foreignField: "_id",
          as: "type",
        },
      },
      { $unwind: { path: "$type", preserveNullAndEmptyArrays: true } },

      // Populate country
      {
        $lookup: {
          from: "countries",
          localField: "country",
          foreignField: "_id",
          as: "country",
        },
      },
      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },

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
          visaId: 1,
          thumbnail: 1,
          status: 1,
          views: 1,
          createdAt: 1,
          title: `$title.${locale}`,
          summary: `$summary.${locale}`,
          slug: `$slug.${locale}`,
          canonicalUrl: `$canonicalUrl.${locale}`,
          "creator._id": 1,
          "creator.name": { $ifNull: [`$creator.name.${locale}`, `$creator.name`] },
          "creator.avatar": "$creator.avatar",
          "type._id": 1,
          "type.title": `$type.title.${locale}`,
          "type.icon": "$type.icon",
          "country._id": 1,
          "country.title": `$country.title.${locale}`,
          tagsCount: { $size: "$tags" }
        },
      },
    ];

    const visas = await Visa.aggregate(pipeline);
console.log(visas)
    // Get total count
    const total = await Visa.countDocuments(matchStage);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "ویزاها با موفقیت دریافت شدند",
      data: visas,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    console.error("Error fetching visas:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت ویزاها",
      error: error.message,
    });
  }
};

/* 📌 دریافت همه ویزاها برای کلاینت (نسخه سبک) */
exports.getVisasClient = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const skip = (page - 1) * limit;
  const locale = req.locale || "fa";

  try {
    // Log incoming request parameters

    const matchStage = {
      isDeleted: false,
      // Temporarily remove status filter to see if that's the issue
      // status: "published"
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

      // Populate type
      {
        $lookup: {
          from: "visatypes",
          localField: "type",
          foreignField: "_id",
          as: "type",
        },
      },
      { $unwind: { path: "$type", preserveNullAndEmptyArrays: true } },

      // Populate country
      {
        $lookup: {
          from: "countries",
          localField: "country",
          foreignField: "_id",
          as: "country",
        },
      },
      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },

      // Select only the required fields for client
      {
        $project: {
          _id: 1,
          title: `$title.${locale}`,
          thumbnail: 1,
          canonicalUrl: `$canonicalUrl.${locale}`,
          "type._id": 1,
          "type.title": `$type.title.${locale}`,
          "type.icon": "$type.icon",
          "country._id": 1,
          "country.name": `$country.name.${locale}`,
          status: 1 // Include status for debugging
        },
      },
    ];

    const visas = await Visa.aggregate(pipeline);

    const total = await Visa.countDocuments(matchStage);
    

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "ویزاها با موفقیت دریافت شدند",
      data: visas,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    console.error("❌ Error fetching client visas:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت ویزاها",
      error: error.message,
    });
  }
};

/* 📌 دریافت یک ویزا */
exports.getVisa = async (req, res) => {
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

      // Populate type
      {
        $lookup: {
          from: "visatypes",
          localField: "type",
          foreignField: "_id",
          as: "type"
        }
      },
      { $unwind: { path: "$type", preserveNullAndEmptyArrays: true } },

      // Populate country
      {
        $lookup: {
          from: "countries",
          localField: "country",
          foreignField: "_id",
          as: "country"
        }
      },
      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },

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
          visaId: 1,
          thumbnail: 1,
          status: 1,
          views: 1,
          createdAt: 1,
          title: `$title.${locale}`,
          summary: `$summary.${locale}`,
          content: `$content.${locale}`,
          processingTime: `$processingTime.${locale}`,
          validity: `$validity.${locale}`,
          difficultyLevel: `$difficultyLevel.${locale}`,
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
          costs: {
            $map: {
              input: "$costs",
              as: "item",
              in: {
                title: `$$item.title.${locale}`,
                fee: `$$item.fee.${locale}`
              }
            }
          },
          documents: {
            $map: {
              input: "$documents",
              as: "item",
              in: {
                title: `$$item.title.${locale}`,
                description: `$$item.description.${locale}`,
                type: "$$item.type"
              }
            }
          },
          conditions: `$conditions.${locale}`,
          advantages: `$advantages.${locale}`,
          disadvantages: `$disadvantages.${locale}`,
          rejectionReasons: `$rejectionReasons.${locale}`,
          successTips: `$successTips.${locale}`,
          slug: `$slug.${locale}`,
          canonicalUrl: `$canonicalUrl.${locale}`,
          "creator._id": 1,
          "creator.name": 1,
          "creator.avatar": 1,
          "type._id": 1,
          "type.title": 1,
          "type.icon": 1,
          "country._id": 1,
          "country.title": 1,
          tags: {
            $map: {
              input: "$tags",
              as: "tag",
              in: {
                _id: "$$tag._id",
                tagId: "$$tag.tagId",
                slug: "$$tag.slug",
                title: `$$tag.title.${locale}`
              }
            }
          }
        }
      }
    ];

    const [visa] = await Visa.aggregate(pipeline);

    if (!visa) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "ویزا مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "ویزا با موفقیت دریافت شد",
      data: visa
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت ویزا رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت یک ویزا با visaId */
exports.getVisaById = async (req, res) => {
  try {
    const { id } = req.params;
    const locale = req.locale || "fa";
console.log("locale",locale);

    const pipeline = [
      { $match: { visaId: Number(id), isDeleted: false } },

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

      // Populate type
      {
        $lookup: {
          from: "visatypes",
          localField: "type",
          foreignField: "_id",
          as: "type"
        }
      },
      { $unwind: { path: "$type", preserveNullAndEmptyArrays: true } },

      // Populate country
      {
        $lookup: {
          from: "countries",
          localField: "country",
          foreignField: "_id",
          as: "country"
        }
      },
      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },

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
    visaId: 1,
    thumbnail: 1,
    status: 1,
    views: 1,
    createdAt: 1,
    title: `$title.${locale}`,
    summary: `$summary.${locale}`,
    content: `$content.${locale}`,
    processingTime: `$processingTime.${locale}`,
    validity: `$validity.${locale}`,
    difficultyLevel: `$difficultyLevel.${locale}`,
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
    costs: {
      $map: {
        input: "$costs",
        as: "item",
        in: {
          title: `$$item.title.${locale}`,
          fee: `$$item.fee.${locale}`
        }
      }
    },
    documents: {
      $map: {
        input: "$documents",
        as: "item",
        in: {
          title: `$$item.title.${locale}`,
          description: `$$item.description.${locale}`,
          type: `$$item.type`
        }
      }
    },
    conditions: {
      $map: {
        input: "$conditions",
        as: "item",
        in: `$$item.${locale}`
      }
    },
    advantages: {
      $map: {
        input: "$advantages",
        as: "item",
        in: `$$item.${locale}`
      }
    },
    disadvantages: {
      $map: {
        input: "$disadvantages",
        as: "item",
        in: `$$item.${locale}`
      }
    },
    rejectionReasons: {
      $map: {
        input: "$rejectionReasons",
        as: "item",
        in: `$$item.${locale}`
      }
    },
    successTips: {
      $map: {
        input: "$successTips",
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
    type: {
      _id: "$type._id",
      title: `$type.title.${locale}`,
      icon: "$type.icon"
    },
    country: {
      _id: "$country._id",
      title: `$country.title.${locale}`
    },
    tags: {
      $map: {
        input: "$tags",
        as: "tag",
        in: {
          _id: "$$tag._id",
          tagId: "$$tag.tagId",
          slug: "$$tag.slug",
          title: `$$tag.title.${locale}`
        }
      }
    }
  }
}

    ];

    const [visa] = await Visa.aggregate(pipeline);

console.log("visa",visa)
    if (!visa) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "ویزا مورد نظر یافت نشد"
      });
    }
console.log("visa",visa)
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "ویزا با موفقیت دریافت شد",
      data: visa
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت ویزا رخ داد",
      error: error.message
    });
  }
};

/* 📌 بروزرسانی ویزا */
exports.updateVisa = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, summary, tags, type, country,
      content, processingTime, validity, difficultyLevel,
      roadmap, faqs, costs, documents, conditions,
      advantages, disadvantages, rejectionReasons, successTips,
      ...other 
    } = req.body;
    
    // Parse JSON fields if provided
    const parsedTags = tags ? JSON.parse(tags) : undefined;
    const parsedRoadmap = roadmap ? JSON.parse(roadmap) : undefined;
    const parsedFaqs = faqs ? JSON.parse(faqs) : undefined;
    const parsedCosts = costs ? JSON.parse(costs) : undefined;
    const parsedDocuments = documents ? JSON.parse(documents) : undefined;
    const parsedConditions = conditions ? JSON.parse(conditions) : undefined;
    const parsedAdvantages = advantages ? JSON.parse(advantages) : undefined;
    const parsedDisadvantages = disadvantages ? JSON.parse(disadvantages) : undefined;
    const parsedRejectionReasons = rejectionReasons ? JSON.parse(rejectionReasons) : undefined;
    const parsedSuccessTips = successTips ? JSON.parse(successTips) : undefined;
    
    // Prepare data for translation
    const dataForTranslation = {};
    
    if (title) dataForTranslation.title = title;
    if (summary) dataForTranslation.summary = summary;
    if (content) dataForTranslation.content = content;
    if (processingTime) dataForTranslation.processingTime = processingTime;
    if (validity) dataForTranslation.validity = validity;
    if (difficultyLevel) dataForTranslation.difficultyLevel = difficultyLevel;
    
    if (parsedRoadmap) {
      dataForTranslation.roadmap = parsedRoadmap.map(item => ({
        title: item.title || "",
        description: item.description || "",
        duration: item.duration || "",
        link: typeof item.link === "string" ? item.link : (item.link?.url || "")
      }));
    }
    
    if (parsedFaqs) {
      dataForTranslation.faqs = parsedFaqs.map(item => ({
        question: item.question || "",
        answer: item.answer || ""
      }));
    }
    
    if (parsedCosts) {
      dataForTranslation.costs = parsedCosts.map(item => ({
        title: item.title || "",
        fee: item.fee || ""
      }));
    }
    
    if (parsedDocuments) {
      dataForTranslation.documents = parsedDocuments.map(item => ({
        title: item.title || "",
        description: item.description || "",
        type: item.type || ""
      }));
    }
    
    if (parsedConditions) dataForTranslation.conditions = parsedConditions;
    if (parsedAdvantages) dataForTranslation.advantages = parsedAdvantages;
    if (parsedDisadvantages) dataForTranslation.disadvantages = parsedDisadvantages;
    if (parsedRejectionReasons) dataForTranslation.rejectionReasons = parsedRejectionReasons;
    if (parsedSuccessTips) dataForTranslation.successTips = parsedSuccessTips;
    
    // Translate fields
    const translations = await translateFields(dataForTranslation, {
      stringFields: ["title", "summary", "processingTime", "validity", "difficultyLevel"],
      arrayObjectFields: ["roadmap", "faqs", "costs", "documents"],
      arrayStringFields: ["conditions", "advantages", "disadvantages", "rejectionReasons", "successTips"],
      longTextFields: ["content"]
    });

    const en = translations.en?.fields || {};
    const tr = translations.tr?.fields || {};
    
    let updateData = { ...other };
    
    // Handle translated fields
    if (title) {
      updateData.title = {
        fa: title,
        en: en.title || title,
        tr: tr.title || title
      };
    }
    
    if (summary) {
      updateData.summary = {
        fa: summary,
        en: en.summary || summary,
        tr: tr.summary || summary
      };
    }
    
    if (content) {
      updateData.content = {
        fa: content,
        en: en.content || content,
        tr: tr.content || content
      };
    }
    
    if (processingTime) {
      updateData.processingTime = {
        fa: processingTime,
        en: en.processingTime || processingTime,
        tr: tr.processingTime || processingTime
      };
    }
    
    if (validity) {
      updateData.validity = {
        fa: validity,
        en: en.validity || validity,
        tr: tr.validity || validity
      };
    }
    
    if (difficultyLevel) {
      updateData.difficultyLevel = {
        fa: difficultyLevel,
        en: en.difficultyLevel || difficultyLevel,
        tr: tr.difficultyLevel || difficultyLevel
      };
    }
    
    // Handle roadmap update with translations
    if (parsedRoadmap) {
      updateData.roadmap = parsedRoadmap.map((item, i) => ({
        title: {
          fa: item.title || "",
          en: en.roadmap?.[i]?.title || item.title || "",
          tr: tr.roadmap?.[i]?.title || item.title || ""
        },
        description: {
          fa: item.description || "",
          en: en.roadmap?.[i]?.description || item.description || "",
          tr: tr.roadmap?.[i]?.description || item.description || ""
        },
        duration: {
          fa: item.duration || "",
          en: en.roadmap?.[i]?.duration || item.duration || "",
          tr: tr.roadmap?.[i]?.duration || item.duration || ""
        },
        link: {
          fa: typeof item.link === "string" ? item.link : (item.link?.url || ""),
          en: typeof item.link === "string" ? item.link : (item.link?.url || ""),
          tr: typeof item.link === "string" ? item.link : (item.link?.url || "")
        }
      }));
    }
    
    // Handle faqs update with translations
    if (parsedFaqs) {
      updateData.faqs = parsedFaqs.map((item, i) => ({
        question: {
          fa: item.question || "",
          en: en.faqs?.[i]?.question || item.question || "",
          tr: tr.faqs?.[i]?.question || item.question || ""
        },
        answer: {
          fa: item.answer || "",
          en: en.faqs?.[i]?.answer || item.answer || "",
          tr: tr.faqs?.[i]?.answer || item.answer || ""
        }
      }));
    }
    
    // Handle costs update with translations
    if (parsedCosts) {
      updateData.costs = parsedCosts.map((item, i) => ({
        title: {
          fa: item.title || "",
          en: en.costs?.[i]?.title || item.title || "",
          tr: tr.costs?.[i]?.title || item.title || ""
        },
        fee: {
          fa: item.fee || "",
          en: en.costs?.[i]?.fee || item.fee || "",
          tr: tr.costs?.[i]?.fee || item.fee || ""
        }
      }));
    }
    
    // Handle documents update with translations
    if (parsedDocuments) {
      updateData.documents = parsedDocuments.map((item, i) => ({
        title: {
          fa: item.title || "",
          en: en.documents?.[i]?.title || item.title || "",
          tr: tr.documents?.[i]?.title || item.title || ""
        },
        description: {
          fa: item.description || "",
          en: en.documents?.[i]?.description || item.description || "",
          tr: tr.documents?.[i]?.description || item.description || ""
        },
        type: item.type || "optional"
      }));
    }
    
    // Handle array fields update with translations
    if (parsedConditions) {
      updateData.conditions = parsedConditions.map((item, i) => ({
        fa: item || "",
        en: en.conditions?.[i] || item || "",
        tr: tr.conditions?.[i] || item || ""
      }));
    }
    
    if (parsedAdvantages) {
      updateData.advantages = parsedAdvantages.map((item, i) => ({
        fa: item || "",
        en: en.advantages?.[i] || item || "",
        tr: tr.advantages?.[i] || item || ""
      }));
    }
    
    if (parsedDisadvantages) {
      updateData.disadvantages = parsedDisadvantages.map((item, i) => ({
        fa: item || "",
        en: en.disadvantages?.[i] || item || "",
        tr: tr.disadvantages?.[i] || item || ""
      }));
    }
    
    if (parsedRejectionReasons) {
      updateData.rejectionReasons = parsedRejectionReasons.map((item, i) => ({
        fa: item || "",
        en: en.rejectionReasons?.[i] || item || "",
        tr: tr.rejectionReasons?.[i] || item || ""
      }));
    }
    
    if (parsedSuccessTips) {
      updateData.successTips = parsedSuccessTips.map((item, i) => ({
        fa: item || "",
        en: en.successTips?.[i] || item || "",
        tr: tr.successTips?.[i] || item || ""
      }));
    }
    
    // Handle other fields
    if (parsedTags) updateData.tags = parsedTags;
    if (type) updateData.type = type;
    if (country) updateData.country = country;
    
    // Handle thumbnail update if new file is uploaded
    if (req.uploadedFiles?.["thumbnail"]?.length) {
      const file = req.uploadedFiles["thumbnail"][0];
      updateData.thumbnail = { url: file.url, public_id: file.public_id || file.key };
    }
    
    // Generate slug if title was updated
    if (title) {
      updateData.slug = {
        fa: await generateSlug(title),
        en: await generateSlug(en.title || title),
        tr: await generateSlug(tr.title || title)
      };
    }

    // Update the visa document
    const result = await Visa.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    // If title was updated, also update canonical URL
    if (title) {
      const visa = await Visa.findById(id);
      const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL || "";
      const canonicalUrl = {
        fa: `${defaultDomain}/visa/${result.slug.fa}/${result.visaId}`,
        en: `${defaultDomain}/en/visa/${result.slug.en}/${result.visaId}`,
        tr: `${defaultDomain}/tr/visa/${result.slug.tr}/${result.visaId}`
      };
      
      await Visa.findByIdAndUpdate(id, {
        $set: { canonicalUrl }
      });
    }

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "ویزا مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Updated",
      description: "ویزا با موفقیت بروزرسانی شد",
      data: result
    });
  } catch (error) {
    console.error("Error updating visa:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در به‌روزرسانی ویزا",
      error: error.message
    });
  }
};

exports.deleteVisa = async (req, res) => {
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

    const visa = await Visa.findById(id);

    if (!visa) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "ویزا مورد نظر برای حذف یافت نشد"
      });
    }

    // Delete the visa
    await Visa.findByIdAndDelete(id);
    
    // Remove thumbnail if exists
    if (visa.thumbnail && visa.thumbnail.public_id) {
      await remove("visa", visa.thumbnail.public_id);
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "ویزا با موفقیت حذف شد"
    });
  } catch (error) {
    console.log(error.message); 
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف ویزا رخ داد",
      error: error.message
    });
  }
};

// Get all visas without pagination (for dashboard)
exports.getAllVisas = async (req, res) => {
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

      // Populate type
      {
        $lookup: {
          from: "visatypes",
          localField: "type",
          foreignField: "_id",
          as: "type",
        },
      },
      { $unwind: { path: "$type", preserveNullAndEmptyArrays: true } },

      // Populate country
      {
        $lookup: {
          from: "countries",
          localField: "country",
          foreignField: "_id",
          as: "country",
        },
      },
      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },

      // Populate tags
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tags",
        },
      },

      // Select final fields
      {
        $project: {
          visaId: 1,
          thumbnail: 1,
          status: 1,
          views: 1,
          createdAt: 1,
          title: 1,
          summary: 1,
          content: 1,
          processingTime: 1,
          validity: 1,
          difficultyLevel: 1,
          roadmap: 1,
          faqs: 1,
          costs: 1,
          documents: 1,
          conditions: 1,
          advantages: 1,
          disadvantages: 1,
          rejectionReasons: 1,
          successTips: 1,
          slug: 1,
          canonicalUrl: 1,
          "creator._id": 1,
          "creator.name": 1,
          "creator.avatar": 1,
          "type._id": 1,
          "type.title": 1,
          "type.icon": 1,
          "country._id": 1,
          "country.title": 1,
          tags: {
            _id: 1,
            title: 1
          }
        }
      }
    ];

    const visas = await Visa.aggregate(pipeline);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "همه ویزاها با موفقیت دریافت شدند",
      data: visas,
    });
  } catch (error) {
    console.error("Error fetching all visas:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت همه ویزاها",
      error: error.message,
    });
  }
};






















































