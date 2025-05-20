/* internal imports */
const Opportunity = require("../models/opportunity.model");
const remove = require("../utils/remove.util");
const translateFields = require("../utils/translateFields");
const Translation = require("../models/translation.model");
const { generateSlug, generateSeoFields } = require("../utils/seoUtils");
const Country = require("../models/country.model");
const Category = require("../models/category.model");
const JobOpportunity = require("../models/jobOpportunity.model");
const City = require("../models/city.model");
const Address = require("../models/address.model");
const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;
const Owner = require("../models/owner.model");

exports.addJobOpportunity = async (req, res) => {
  try {
    const {
      title,
      summary,
      description,
      startDate,
      endDate,
      currency,
      country,
      city,
      salary,
      capacity,
      vacancy,
      location,
      jobTime,
      jobMode,
      jobType,
      employmentType,
      experienceLevel,
      employerInformationDisplay,
      skills,
      responsibilities,
      targetCountries,
      targetCities,
      documents,
      qualifications,
      benefits,
      languages,
      company,
      address,
      citizenshipOutcome,
      tags,
      category,
      socialLinks
    } = req.body;
    let thumbnail = null;
    let employerImage = null;
    let gallery = [];
    const parseSalary = JSON.parse(salary);
    const parseExperienceLevel = JSON.parse(experienceLevel);
    const parseSkills = JSON.parse(skills);
    const parseResponsibilities = JSON.parse(responsibilities);
    const parseTargetCountries = JSON.parse(targetCountries);
    const parseTargetCities = JSON.parse(targetCities);
    const parseDocuments = JSON.parse(documents);
    const parseQualifications = JSON.parse(qualifications);
    const parseBenefits = JSON.parse(benefits);
    const parseLanguages = JSON.parse(languages);
    const parseAddress = JSON.parse(address);
    const parseCompany = JSON.parse(company);
    const parsedLocation = JSON.parse(location);

    if (req.uploadedFiles["employerImage"].length) {
      employerImage = {
        url: req.uploadedFiles["employerImage"][0].url,
        public_id: req.uploadedFiles["employerImage"][0].key
      };
    }
    let addressProp = await Address.findOne({ phone: parseAddress.phone });

    if (!addressProp) {
      addressProp = await Address.create({
        country: parseAddress.country,
        state: parseAddress.state,
        city: parseAddress.city,
        street: parseAddress.street,
        plateNumber: parseAddress.plateNumber,
        phone: parseAddress.phone,
        email: parseAddress.email,
        postalCode: parseAddress.postalCode,
        location:parsedLocation,
        creator: req.admin._id
      });
    }

    let owner = await Owner.findOne({
      creator: req.admin._id,
      address: addressProp._id
    });

    if (!owner) {
      owner = await Owner.create({
        creator: req.admin._id,
        employerImage,
        address: addressProp._id
      });

      try {
        const translateOwner = await translateFields(
          {
            name: parseCompany.name,
            bio: parseCompany.bio
          },
          {
            stringFields: ["name", "bio"]
          }
        );
        const translationDocs = Object.entries(translateOwner).map(
          ([lang, { fields }]) => ({
            language: lang,
            refModel: "Owner",
            refId: owner._id,
            fields
          })
        );
        const savedTranslations = await Translation.insertMany(translationDocs);

        const translationInfos = savedTranslations.map((t) => ({
          translation: t._id,
          language: t.language
        }));

        await Owner.findByIdAndUpdate(owner._id, {
          $set: { translations: translationInfos }
        });
      } catch (translationError) {
        await Owner.findByIdAndDelete(owner._id);
        return res.status(500).json({
          acknowledgement: false,
          message: "Translation Save Error",
          description: "خطا در ذخیره ترجمه‌ها. کارفرما حذف شد.",
          error: translationError.message
        });
      }
    }

    if (req.uploadedFiles["thumbnail"].length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key
      };
    }
    if (req.uploadedFiles["gallery"]?.length > 0) {
      gallery = req.uploadedFiles["gallery"].map((file) => ({
        url: file.url,
        public_id: file.key
      }));
    }

    let countryProp = await Country.findOne({ name: country });
    if (!countryProp) {
      countryProp = await Country.create({ name: country });
    }
    try {
      const translateCountry = await translateFields(
        {
          country
        },
        {
          stringFields: ["country"]
        }
      );
      const translationDocs = Object.entries(translateCountry).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "Country",
          refId: countryProp._id,
          fields
        })
      );
      const savedTranslations = await Translation.insertMany(translationDocs);

      const translationInfos = savedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));

      await Country.findByIdAndUpdate(countryProp._id, {
        $set: { translations: translationInfos }
      });
    } catch (translationError) {
      console.log(translationError.message);
      await Country.findByIdAndDelete(countryProp._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. کشور حذف شد.",
        error: translationError.message
      });
    }
    let cityProp = await City.findOne({ name: city });
    if (!cityProp) {
      cityProp = await City.create({ name: city });
    }
    try {
      const translateCity = await translateFields(
        {
          city
        },
        {
          stringFields: ["city"]
        }
      );
      const translationDocs = Object.entries(translateCity).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "title",
          refId: cityProp._id,
          fields
        })
      );
      const savedTranslations = await Translation.insertMany(translationDocs);

      const translationInfos = savedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));

      await City.findByIdAndUpdate(cityProp._id, {
        $set: { translations: translationInfos }
      });
    } catch (translationError) {
      console.log(translationError.message);

      await City.findByIdAndDelete(cityProp._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. شهر حذف شد.",
        error: translationError.message
      });
    }

    const jobOpportunity = await JobOpportunity.create({
      owner: owner._id,
      jobType: jobType,
      jobTime: jobTime,
      jobMode: jobMode,
      employmentType: employmentType,
      experienceLevel: parseExperienceLevel,
      currency: currency,
      salary: parseSalary,
      employerInformationDisplay: employerInformationDisplay
    });

    const opportunity = new Opportunity({
      thumbnail,
      startDate,
      endDate,
      gallery,
      category,
      citizenshipOutcome,
      refModel: "JobOpportunity",
      refId: jobOpportunity._id,
      tags: JSON.parse(tags),
      country: countryProp._id,
      city: cityProp._id,
      socialLinks: JSON.parse(socialLinks),
      creator: req.admin._id,
      capacity,
      vacancy
    });

    const result = await opportunity.save();
    const slug = await generateSlug(title);
    const { metaTitle, metaDescription } = generateSeoFields({
      title,
      summary,
      categoryTitle: await Category.findById(category).title
    });
    const canonicalUrl = `${defaultDomain}/opportunity/${opportunity.opportunityId}/${slug}`;

    try {
      const translations = await translateFields(
        {
          title,
          summary,
          description,
          slug,
          metaTitle,
          metaDescription,
          canonicalUrl,
          skills: parseSkills,
          responsibilities: parseResponsibilities,
          targetCountries: parseTargetCountries,
          targetCities: parseTargetCities,
          documents: parseDocuments,
          qualifications: parseQualifications,
          benefits: parseBenefits,
          languages: parseLanguages
        },
        {
          stringFields: [
            "title",
            "summary",
            "description",
            "slug",
            "metaTitle",
            "metaDescription",
            "canonicalUrl",
            "description"
          ],
          arrayStringFields: [
            "skills",
            "responsibilities",
            "targetCountries",
            "targetCities",
            "documents",
            "qualifications",
            "benefits",
            "languages"
          ]
        }
      );
      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "Opportunity",
          refId: result._id,
          fields
        })
      );
      const savedTranslations = await Translation.insertMany(translationDocs);

      const translationInfos = savedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));

      await Opportunity.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });

      res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "فرصت شغلی با موفقیت ایجاد شد",
        data: result
      });
    } catch (translationError) {
      console.log(translationError.message);
      await Opportunity.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. فرصت حذف شد.",
        error: translationError.message
      });
    }
  } catch (error) {
    console.log("Error during opportunity creation:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: error.message,
      error: error.message
    });
  }
};

/* 📌 دریافت همه فرصت */
exports.getAllOpportunity = async (res, req) => {
  try {
    const opportunities = await Opportunity.find()
      .select(
        "startDate endDate isFeatured thumbnail opportunityId refModel refId"
      )
      .populate({
        path: "refId",
        populate: [
          {
            path: "jobType",
            populate: {
              path: "translations.translation",
              match: { language: req.locale },
              select: "fields.title language"
            },
            select: "translations icon"
          },
          {
            path: "currency",
            select: "title code symbol"
          },
          {
            path: "jobTime",
            populate: {
              path: "translations.translation",
              match: { language: req.locale },
              select: "fields.title language"
            },
            select: "translations"
          },
          {
            path: "jobMode",
            populate: {
              path: "translations.translation",
              match: { language: req.locale },
              select: "fields.title language"
            },
            select: "translations"
          },
          {
            path: "employmentType",
            populate: {
              path: "translations.translation",
              match: { language: req.locale },
              select: "fields.title language"
            },
            select: "translations"
          },
          {
            path: "experienceLevel",
            populate: {
              path: "translations.translation",
              match: { language: req.locale },
              select: "fields.title language"
            },
            select: "translations"
          }
        ]
      })
      .sort({ createdAt: -1 })

      .populate([
        {
          path: "translations.translation",
          match: { language: req.locale }
        },
        {
          path: "creator",
          select: "name avatar"
        },
        {
          path: "citizenshipOutcome",
          populate: {
            path: "translations.translation",
            match: { language: req.locale },
            select: "fields.title  language"
          },
          select: "translations "
        },
        {
          path: "city",
          populate: {
            path: "translations.translation",
            match: { language: req.locale }
          },
          select: "translations "
        },
        {
          path: "category",
          select: "icon title _id"
        }
      ]);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست فرصت با موفقیت دریافت شد",
      data: opportunities
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت فرصت رخ داد",
      error: error.message
    });
  }
};

exports.getOpportunity = async (req, res) => {
  try {
    const opportunityId = parseInt(req.params.id, 10);
    const opportunity = await Opportunity.findOne({ opportunityId })
      .populate({
        path: "refId",
        populate: [
          {
            path: "jobType",
            populate: {
              path: "translations.translation",
              match: { language: req.locale },
              select: "fields.title language"
            },
            select: "translations icon"
          },
          {
            path: "currency",
            select: "title code symbol"
          },
          {
            path: "jobTime",
            populate: {
              path: "translations.translation",
              match: { language: req.locale },
              select: "fields.title language"
            },
            select: "translations"
          },
          {
            path: "jobMode",
            populate: {
              path: "translations.translation",
              match: { language: req.locale },
              select: "fields.title language"
            },
            select: "translations"
          },
          {
            path: "employmentType",
            populate: {
              path: "translations.translation",
              match: { language: req.locale },
              select: "fields.title language"
            },
            select: "translations"
          },
          {
            path: "experienceLevel",
            populate: {
              path: "translations.translation",
              match: { language: req.locale },
              select: "fields.title language"
            },
            select: "translations"
          }
        ]
      })
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "translations.translation",
          match: { language: req.locale }
        },
        {
          path: "creator",
          select: "name avatar"
        },
        {
          path: "citizenshipOutcome",
          populate: {
            path: "translations.translation",
            match: { language: req.locale },
            select: "fields.title  language"
          },
          select: "translations "
        },
       
        {
          path: "city",
          populate: {
            path: "translations.translation",
            match: { language: req.locale }
          },
          select: "translations "
        },
        {
          path: "category",
          select: "icon title _id"
        }
      ]);
    console.log(opportunity);
    if (!opportunity) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "فرصت مورد نظر یافت نشد"
      });
    }
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "فرصت با موفقیت دریافت شد",
      data: opportunity
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت فرصت رخ داد",
      error: error.message
    });
  }
};

/* 📌 بروزرسانی فرصت */
exports.updateOpportunity = async (req, res) => {
  try {
    const updatedOpportunity = req.body;
    console.log("Updated Opportunity:", updatedOpportunity);
    console.log("Opportunity ID:", req.params.id);

    const result = await Opportunity.findByIdAndUpdate(
      req.params.id,
      updatedOpportunity,
      {
        new: true
      }
    );

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "فرصت مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "فرصت با موفقیت بروزرسانی شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی فرصت رخ داد",
      error: error.message
    });
  }
};

exports.deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "فرصت مورد نظر برای حذف یافت نشد"
      });
    }

    const translationIds = opportunity.translations.map(
      (item) => item.translation
    );

    await Translation.deleteMany({ _id: { $in: translationIds } });

    await Opportunity.findByIdAndDelete(req.params.id);
    await remove("opportunity", opportunity.thumbnail.public_id);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "فرصت و ترجمه‌های مرتبط با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف فرصت رخ داد",
      error: error.message
    });
  }
};
