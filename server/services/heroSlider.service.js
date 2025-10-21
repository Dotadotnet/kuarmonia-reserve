const HeroSlider = require("../models/heroSlider.model");
const remove = require("../utils/remove.util");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");

exports.addHeroSlider = async (req, res) => {
  try {
    const { link, title, subtitle, description } = req.body;
    const image = req.uploadedFiles.thumbnail[0];
    
    // Only include defined fields in the main model
    const heroSliderData = {
      image: { url: image.url, public_id: image.public_id },
      link: (link !== "undefined" && link !== undefined) ? link : null
    };
    
    const heroSlider = new HeroSlider(heroSliderData);
    
    const result = await heroSlider.save();
    
    // Handle translations
    try {
      const translations = await translateFields(
        { title, subtitle, description },
        { stringFields: ["title", "subtitle", "description"] }
      );

      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "HeroSlider",
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

      await HeroSlider.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });

      return res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "هرو اسلایدر با موفقیت ایجاد و ترجمه شد.",
        data: result
      });
    } catch (translationError) {
      await HeroSlider.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. هرو اسلایدر حذف شد.",
        error: translationError.message
      });
    }
  } catch (error) {
    console.error("Error in addHeroSlider:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در ایجاد هرو اسلایدر",
      error: error.message
    });
  }
};

exports.getHeroSliders = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const skip = (page - 1) * limit;

  try {
    const query = {
      isDeleted: false,
      ...(search ? { link: { $regex: search, $options: "i" } } : {})
    };

    const heroSliders = await HeroSlider.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .populate({
        path: "translations.translation",
        match: { language: req.locale },
        select: "fields language"
      })
      .lean();

    const result = heroSliders.map(slider => {

      const translationObj = slider.translations?.find(
        t => t.language === req.locale && t.translation
      );

      const fields = translationObj?.translation?.fields || {};

      return {
        _id: slider._id,
        heroSliderId: slider.heroSliderId,
        image: slider.image,
        link: slider.link,
        status: slider.status,
        isDeleted: slider.isDeleted,
        createdAt: slider.createdAt,
        updatedAt: slider.updatedAt,
        // Merge translated fields at the top level
        ...fields
      };
    });

    const total = await HeroSlider.countDocuments(query);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "هرو اسلایدرها با موفقیت دریافت شدند",
      data: result,
      total
    });
  } catch (error) {
    console.error("Error fetching hero sliders:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت هرو اسلایدرها",
      error: error.message
    });
  }
};

exports.getHeroSlider = async (req, res) => {
  try {
    const heroSlider = await HeroSlider.findById(req.params.id)
      .populate({
        path: "translations.translation",
        match: { language: req.locale },
        select: "fields language"
      })
      .lean();

    if (!heroSlider) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "هرو اسلایدر پیدا نشد"
      });
    }

    // Find the translation that matches both the language and has a valid translation object
    const translationObj = heroSlider.translations?.find(
      t => t.language === req.locale && t.translation
    );

    // Extract fields from translation
    const fields = translationObj?.translation?.fields || {};

    const result = {
      _id: heroSlider._id,
      heroSliderId: heroSlider.heroSliderId,
      image: heroSlider.image,
      link: heroSlider.link,
      status: heroSlider.status,
      isDeleted: heroSlider.isDeleted,
      createdAt: heroSlider.createdAt,
      updatedAt: heroSlider.updatedAt,
      // Merge translated fields at the top level
      ...fields
    };

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "هرو اسلایدر با موفقیت دریافت شد",
      data: result
    });
  } catch (error) {
    console.error("Error in getHeroSlider:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت هرو اسلایدر",
      error: error.message
    });
  }
};

exports.updateHeroSlider = async (req, res) => {
  try {
    const heroSlider = await HeroSlider.findById(req.params.id);

    if (!heroSlider) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "هرو اسلایدر پیدا نشد"
      });
    }

    // Only include defined fields in the update
    const { link, title, subtitle, description, ...otherFields } = req.body;
    let updated = {};

    // Handle image update
    if (req.uploadedFiles && req.uploadedFiles.thumbnail) {
      const image = req.uploadedFiles.thumbnail[0];
      // Remove old image if exists
      if (heroSlider.image?.public_id) {
        await remove(heroSlider.image.public_id);
      }
      updated.image = { url: image.url, public_id: image.public_id };
    }

    // Handle link update
    if (link !== undefined) {
      updated.link = (link !== "undefined" && link !== undefined) ? link : null;
    }

    // Handle other defined fields
    Object.keys(otherFields).forEach(key => {
      if (heroSlider.schema.paths[key]) {
        updated[key] = otherFields[key];
      }
    });

    // Update the hero slider first
    await HeroSlider.findByIdAndUpdate(req.params.id, updated);

    // Handle translations if any text fields are provided
    if (title !== undefined || subtitle !== undefined || description !== undefined) {
      const fieldsToUpdate = {};
      if (title !== undefined) fieldsToUpdate.title = title;
      if (subtitle !== undefined) fieldsToUpdate.subtitle = subtitle;
      if (description !== undefined) fieldsToUpdate.description = description;

      const translations = await translateFields(
        fieldsToUpdate,
        { stringFields: ["title", "subtitle", "description"] }
      );

      // Update or create translations for each language
      for (const [language, { fields }] of Object.entries(translations)) {
        await Translation.findOneAndUpdate(
          {
            language,
            refModel: "HeroSlider",
            refId: heroSlider._id
          },
          { fields },
          { upsert: true, new: true }
        );
      }
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "هرو اسلایدر با موفقیت ویرایش شد"
    });
  } catch (error) {
    console.error("Error in updateHeroSlider:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در بروزرسانی هرو اسلایدر",
      error: error.message
    });
  }
};

exports.deleteHeroSlider = async (req, res) => {
  try {
    const heroSlider = await HeroSlider.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true,
        deletedAt: Date.now()
      },
      { new: true }
    );

    if (!heroSlider) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "هرو اسلایدری که می‌خواهید حذف کنید وجود ندارد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "هرو اسلایدر با موفقیت حذف شد"
    });
  } catch (error) {
    console.error("Error in deleteHeroSlider:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در حذف هرو اسلایدر",
      error: error.message
    });
  }
};








































