/* internal imports */
const VisaType = require("../models/visaType.model");
const remove = require("../utils/remove.util");
const mongoose = require("mongoose");
const { generateSlug } = require("../utils/seoUtils");
const translateFields = require("../utils/translateFields");

/* 📌 اضافه کردن نوع ویزا جدید */
exports.addVisaType = async (req, res) => {
  try {
    console.log("1. شروع addVisaType",req.body);

    const {
      title, summary, tags, category,
      content, roadmap, faqs, costs, durations,
      conditions, advantages, disadvantages,
      icon,
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
    if (!costs || !costs.length) {
      console.log("خطا: costs نامعتبر", costs);
      return res.status(400).json({ acknowledgement: false, description: "Costs الزامی است" });
    }
    if (!durations || !durations.length) {
      console.log("خطا: durations نامعتبر", durations);
      return res.status(400).json({ acknowledgement: false, description: "Durations الزامی است" });
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
    const parsedCosts = Array.isArray(costs) ? costs : JSON.parse(costs || "[]");
    const parsedDurations = Array.isArray(durations) ? durations : JSON.parse(durations || "[]");
    const parsedConditions = Array.isArray(conditions) ? conditions : JSON.parse(conditions || "[]");
    const parsedAdvantages = Array.isArray(advantages) ? advantages : JSON.parse(advantages || "[]");
    const parsedDisadvantages = Array.isArray(disadvantages) ? disadvantages : JSON.parse(disadvantages || "[]");

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
      costs: parsedCosts.map(item => ({
        country: item.country || "",
        fee: item.fee || ""
      })),
      durations: parsedDurations.map(item => ({
        country: item.country || "",
        validity: item.validity || ""
      })),
      conditions: parsedConditions,
      advantages: parsedAdvantages,
      disadvantages: parsedDisadvantages
    };

    console.log("7. dataForTranslation آماده شد");

    // === ترجمه قبل از ذخیره ===
    console.log("8. شروع ترجمه با translateFields...");
    const translations = await translateFields(dataForTranslation, {
      stringFields: ["title", "summary"],
      arrayObjectFields: ["roadmap", "faqs", "costs", "durations"],
      arrayStringFields: ["conditions", "advantages", "disadvantages"],
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

    const structuredCosts = parsedCosts.map((item, i) => ({
      country: {
        fa: item.country || "",
        en: en.costs?.[i]?.country || item.country || "",
        tr: tr.costs?.[i]?.country || item.country || ""
      },
      fee: {
        fa: item.fee || "",
        en: en.costs?.[i]?.fee || item.fee || "",
        tr: tr.costs?.[i]?.fee || item.fee || ""
      }
    }));

    const structuredDurations = parsedDurations.map((item, i) => ({
      country: {
        fa: item.country || "",
        en: en.durations?.[i]?.country || item.country || "",
        tr: tr.durations?.[i]?.country || item.country || ""
      },
      validity: {
        fa: item.validity || "",
        en: en.durations?.[i]?.validity || item.validity || "",
        tr: tr.durations?.[i]?.validity || item.validity || ""
      }
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

    // === ساخت نوع ویزا کامل ===
    const visaType = new VisaType({
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
      costs: structuredCosts,
      durations: structuredDurations,
      conditions: structuredConditions,
      advantages: structuredAdvantages,
      disadvantages: structuredDisadvantages,
      icon,
      slug: { fa: "", en: "", tr: "" },
      tags: parsedTags,
      category,
      thumbnail,
      creator: req.admin._id,
    });

    console.log("11. نوع ویزا ساخته شد، آماده ذخیره...");

    // === ذخیره اولیه ===
    const result = await visaType.save();
    console.log("12. ذخیره اولیه موفق! visaTypeId:", result.visaTypeId);

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
      description: "نوع ویزا با موفقیت ایجاد و ترجمه شد",
      data: result
    });

  } catch (err) {
    console.error("خطا در addVisaType (مرحله نهایی):", {
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

/* 📌 دریافت همه نوع ویزا با pagination و search */
exports.getVisaTypes = async (req, res) => {
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
          visaTypeId: 1,
          icon: 1,
          thumbnail: 1,
          status: 1,
          views: 1,
          createdAt: 1,
          title: `$title.${locale}`,
          summary: `$summary.${locale}`,
          slug: `$slug.${locale}`,
          canonicalUrl: `$canonicalUrl.${locale}`,
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

    const visaTypes = await VisaType.aggregate(pipeline);

    // Get total count
    const total = await VisaType.countDocuments(matchStage);
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "انواع ویزا با موفقیت دریافت شدند",
      data: visaTypes,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    console.error("Error fetching visa types:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت انواع ویزا",
      error: error.message,
    });
  }
};

/* 📌 دریافت یک نوع ویزا */
exports.getVisaType = async (req, res) => {
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
          visaTypeId: 1,
          icon: 1,
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
          costs: {
            $map: {
              input: "$costs",
              as: "item",
              in: {
                country: `$$item.country.${locale}`,
                fee: `$$item.fee.${locale}`
              }
            }
          },
          durations: {
            $map: {
              input: "$durations",
              as: "item",
              in: {
                country: `$$item.country.${locale}`,
                validity: `$$item.validity.${locale}`
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

    const [visaType] = await VisaType.aggregate(pipeline);

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
    console.log(error.message);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت نوع ویزا رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت نوع ویزا با visaTypeId */
exports.getVisaTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const locale = req.locale || "fa";

    // Validate visaTypeId
    if (!id) {
      return res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: "شناسه نوع ویزا الزامی است"
      });
    }

    const pipeline = [
      { $match: { visaTypeId: Number(id), isDeleted: false } },

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
          visaTypeId: 1,
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
              as: "step",
              in: {
                title: `$$step.title.${locale}`,
                description: `$$step.description.${locale}`,
                duration: `$$step.duration.${locale}`,
                link: `$$step.link.${locale}`
              }
            }
          },
          faqs: {
            $map: {
              input: "$faqs",
              as: "faq",
              in: {
                question: `$$faq.question.${locale}`,
                answer: `$$faq.answer.${locale}`
              }
            }
          },
          costs: {
            $map: {
              input: "$costs",
              as: "cost",
              in: {
                country: `$$cost.country.${locale}`,
                fee: `$$cost.fee.${locale}`
              }
            }
          },
          durations: {
            $map: {
              input: "$durations",
              as: "duration",
              in: {
                country: `$$duration.country.${locale}`,
                validity: `$$duration.validity.${locale}`
              }
            }
          },
          conditions: `$conditions.${locale}`,
          advantages: `$advantages.${locale}`,
          disadvantages: `$disadvantages.${locale}`,
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
              in: {
                _id: "$$tag._id",
                title: `$$tag.title.${locale}`
              }
            }
          }
        }
      }
    ];

    const [visaType] = await VisaType.aggregate(pipeline);

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
    console.error("Error fetching visa type by ID:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت نوع ویزا",
      error: error.message
    });
  }
};



/* 📌 بروزرسانی نوع ویزا */
exports.updateVisaType = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, summary, tags, category,
      content, roadmap, faqs, costs, durations,
      conditions, advantages, disadvantages,
      icon,
      ...other 
    } = req.body;
    
    let updateData = { ...other };
    
    // Parse JSON fields if provided
    if (tags) updateData.tags = JSON.parse(tags);
    if (category) updateData.category = category;
    if (icon) updateData.icon = icon;
    
    // Handle roadmap update
    if (roadmap) {
      const parsedRoadmap = JSON.parse(roadmap);
      updateData.roadmap = parsedRoadmap.map(item => ({
        title: {
          fa: item.title?.fa || "",
          en: item.title?.en || "",
          tr: item.title?.tr || ""
        },
        description: {
          fa: item.description?.fa || "",
          en: item.description?.en || "",
          tr: item.description?.tr || ""
        },
        duration: {
          fa: item.duration?.fa || "",
          en: item.duration?.en || "",
          tr: item.duration?.tr || ""
        },
        link: {
          fa: item.link?.fa || "",
          en: item.link?.en || "",
          tr: item.link?.tr || ""
        }
      }));
    }
    
    // Handle faqs update
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
    
    // Handle costs update
    if (costs) {
      const parsedCosts = JSON.parse(costs);
      updateData.costs = parsedCosts.map(item => ({
        country: {
          fa: item.country?.fa || "",
          en: item.country?.en || "",
          tr: item.country?.tr || ""
        },
        fee: {
          fa: item.fee?.fa || "",
          en: item.fee?.en || "",
          tr: item.fee?.tr || ""
        }
      }));
    }
    
    // Handle durations update
    if (durations) {
      const parsedDurations = JSON.parse(durations);
      updateData.durations = parsedDurations.map(item => ({
        country: {
          fa: item.country?.fa || "",
          en: item.country?.en || "",
          tr: item.country?.tr || ""
        },
        validity: {
          fa: item.validity?.fa || "",
          en: item.validity?.en || "",
          tr: item.validity?.tr || ""
        }
      }));
    }
    
    // Handle array fields update
    if (conditions) updateData.conditions = JSON.parse(conditions);
    if (advantages) updateData.advantages = JSON.parse(advantages);
    if (disadvantages) updateData.disadvantages = JSON.parse(disadvantages);
    
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

    // Update the visa type document
    const result = await VisaType.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    // If title was updated, also update canonical URLs
    if (title) {
      const visaType = await VisaType.findById(id);
      const canonicalUrls = {
        fa: `${defaultDomain}/visa-type/${result.slug.fa}/${result.visaTypeId}`,
        en: `${defaultDomain}/visa-type/${result.slug.en}/${result.visaTypeId}`,
        tr: `${defaultDomain}/visa-type/${result.slug.tr}/${result.visaTypeId}`
      };
      
      await VisaType.findByIdAndUpdate(id, {
        $set: { canonicalUrl: canonicalUrls }
      });
    }

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "نوع ویزا مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Updated",
      description: "نوع ویزا با موفقیت بروزرسانی شد",
      data: result
    });
  } catch (error) {
    console.error("Error updating visa type:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در به‌روزرسانی نوع ویزا",
      error: error.message
    });
  }
};

exports.deleteVisaType = async (req, res) => {
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

    const visaType = await VisaType.findById(id);

    if (!visaType) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "نوع ویزا مورد نظر برای حذف یافت نشد"
      });
    }

    // Delete the visa type
    await VisaType.findByIdAndDelete(id);
    
    // Remove thumbnail if exists
    if (visaType.thumbnail && visaType.thumbnail.public_id) {
      await remove("visa-type", visaType.thumbnail.public_id);
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع ویزا با موفقیت حذف شد"
    });
  } catch (error) {
    console.log(error.message); 
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف نوع ویزا رخ داد",
      error: error.message
    });
  }
};

// Get all visa types without pagination (for dashboard)
exports.getAllVisaTypes = async (req, res) => {
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
          visaTypeId: 1,
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
          costs: {
            country: `$costs.country.${locale}`,
            fee: `$costs.fee.${locale}`
          },
          durations: {
            country: `$durations.country.${locale}`,
            validity: `$durations.validity.${locale}`
          },
          conditions: `$conditions.${locale}`,
          advantages: `$advantages.${locale}`,
          disadvantages: `$disadvantages.${locale}`,
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

    const visaTypes = await VisaType.aggregate(pipeline);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "همه انواع ویزا با موفقیت دریافت شدند",
      data: visaTypes,
    });
  } catch (error) {
    console.error("Error fetching all visa types:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت همه انواع ویزا",
      error: error.message,
    });
  }
};




