const HeroSlider = require("../models/heroSlider.model");
const remove = require("../utils/remove.util");
const translateFields = require("../utils/translateFields");
const mongoose = require("mongoose");
const deleteFromCloudinary = require("../middleware/delete.middleware");

exports.addHeroSlider = async (req, res) => {
  try {
    let { title, subtitle, caption, link } = req.body;
    let media = null;
    
    if (req.uploadedFiles["media"] && req.uploadedFiles["media"].length) {
      media = {
        url: req.uploadedFiles["media"][0].url,
        public_id: req.uploadedFiles["media"][0].key,
        type: "image" // Assuming image for now, could be extended for video
      };
    }

    const translations = await translateFields(
      {
        title,
        subtitle,
        caption
      },
      {
        stringFields: ["title", "subtitle", "caption"]
      }
    );
    
    const translatedTitle = {
      fa: title,
      en: translations.en.fields.title,
      tr: translations.tr.fields.title
    };

    const translatedSubtitle = {
      fa: subtitle,
      en: translations.en.fields.subtitle,
      tr: translations.tr.fields.subtitle
    };

    const translatedCaption = {
      fa: caption,
      en: translations.en.fields.caption,
      tr: translations.tr.fields.caption
    };

    const heroSlider = new HeroSlider({
      title: translatedTitle,
      subtitle: translatedSubtitle,
      caption: translatedCaption,
      media,
      link: link || null,
      creator: req.admin._id,
    });

    const result = await heroSlider.save();

    return res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "اسلایدر با موفقیت ایجاد و ترجمه شد.",
      data: result
    });
  } catch (error) {
    console.error("Error in addHeroSlider:", error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        // Only return the Persian validation message
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
      description: "خطا در ایجاد اسلایدر",
      error: error.message
    });
  }
};

exports.getHeroSliders = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const skip = (page - 1) * limit;
  const locale = req.locale || "fa";

  try {
    const matchStage = {
      isDeleted: false,
    };

    if (search) {
      matchStage.$or = [
        { [`title.${locale}`]: { $regex: search, $options: "i" } },
        { [`subtitle.${locale}`]: { $regex: search, $options: "i" } },
        { [`caption.${locale}`]: { $regex: search, $options: "i" } }
      ];
    }

    const pipeline = [
      { $match: matchStage },

      // Sort by heroSliderId
      { $sort: { heroSliderId: 1 } },
      { $skip: Number(skip) },
      { $limit: Number(limit) },

      // populate creator with only required fields
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
          heroSliderId: 1,
          media: 1,
          link: 1,
          status: 1,
          createdAt: 1,
          title: `$title.${locale}`,
          subtitle: `$subtitle.${locale}`,
          caption: `$caption.${locale}`,
          "creator._id": 1,
          "creator.name": 1,
          "creator.avatar": 1,
        },
      },
    ];

    const heroSliders = await HeroSlider.aggregate(pipeline);

    // Total count
    const total = await HeroSlider.countDocuments(matchStage);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "اسلایدرها با موفقیت دریافت شدند",
      data: heroSliders,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    console.error("Error fetching hero sliders:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت اسلایدرها",
      error: error.message,
    });
  }
};

exports.getHeroSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const locale = req.locale || "fa";

    const objectId = new mongoose.Types.ObjectId(id);

    const pipeline = [
      { $match: { _id: objectId, isDeleted: false } },

      // populate creator
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
          heroSliderId: 1,
          media: 1,
          link: 1,
          status: 1,
          createdAt: 1,
          title: `$title.${locale}`,
          subtitle: `$subtitle.${locale}`,
          caption: `$caption.${locale}`,
          creator: {
            _id: "$creator._id",
            name: { $ifNull: [`$creator.name.${locale}`, `$creator.name`] },
            avatar: "$creator.avatar"
          }
        }
      }
    ];

    const [heroSlider] = await HeroSlider.aggregate(pipeline);

    if (!heroSlider) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "اسلایدر پیدا نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "اسلایدر با موفقیت دریافت شد",
      data: heroSlider
    });
  } catch (error) {
    console.error("Error fetching hero slider:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت اسلایدر",
      error: error.message
    });
  }
};

exports.updateHeroSlider = async (req, res) => {
  try {
    console.log("Starting updateHeroSlider function");
    console.log("Request params:", req.params);
    console.log("Request body:", req.body);
    console.log("Uploaded files:", req.uploadedFiles);
    
    const { id } = req.params;
    const { title, subtitle, caption, link } = req.body;
    let updateData = {};

    // Use automatic translation for title if provided
    if (title) {
      console.log("Processing title translation:", title);
      const translations = await translateFields(
        { title },
        { stringFields: ["title"] }
      );

      updateData.title = {
        fa: title,
        en: translations.en.fields.title,
        tr: translations.tr.fields.title
      };
      console.log("Title translation completed:", updateData.title);
    }

    // Use automatic translation for subtitle if provided
    if (subtitle) {
      console.log("Processing subtitle translation:", subtitle);
      const translations = await translateFields(
        { subtitle },
        { stringFields: ["subtitle"] }
      );

      updateData.subtitle = {
        fa: subtitle,
        en: translations.en.fields.subtitle,
        tr: translations.tr.fields.subtitle
      };
      console.log("Subtitle translation completed:", updateData.subtitle);
    }

    // Use automatic translation for caption if provided
    if (caption) {
      console.log("Processing caption translation:", caption);
      const translations = await translateFields(
        { caption },
        { stringFields: ["caption"] }
      );

      updateData.caption = {
        fa: caption,
        en: translations.en.fields.caption,
        tr: translations.tr.fields.caption
      };
      console.log("Caption translation completed:", updateData.caption);
    }

    // Update link if provided
    if (link !== undefined) {
      console.log("Updating link:", link);
      updateData.link = link || null;
    }

    // Handle media update if new file is uploaded
    if (req.uploadedFiles && req.uploadedFiles["media"] && req.uploadedFiles["media"].length) {
      console.log("Processing media update");
      console.log("Uploaded media files:", req.uploadedFiles["media"]);
      
      // Get the current heroSlider to access old media info
      const currentHeroSlider = await HeroSlider.findById(id);
      console.log("Current heroSlider:", currentHeroSlider);

      // If there's an existing media file, we should remove it
      if (currentHeroSlider && currentHeroSlider.media && currentHeroSlider.media.public_id) {
        console.log("Deleting old media from Cloudinary:", currentHeroSlider.media.public_id);
        // Delete the old media file from Cloudinary
        try {
          await deleteFromCloudinary(currentHeroSlider.media.public_id, 'image');
          console.log("Old media deleted successfully");
        } catch (error) {
          console.error("Error deleting old media from Cloudinary:", error);
        }
      }

      updateData.media = {
        url: req.uploadedFiles["media"][0].url,
        public_id: req.uploadedFiles["media"][0].key,
        type: "image" // Assuming image for now, could be extended for video
      };
      console.log("New media data:", updateData.media);
    }

    console.log("Update data to be saved:", updateData);
    const heroSlider = await HeroSlider.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    console.log("Updated heroSlider:", heroSlider);

    if (!heroSlider) {
      console.log("HeroSlider not found with id:", id);
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "اسلایدر پیدا نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Updated",
      description: "اسلایدر با موفقیت به‌روزرسانی و ترجمه شد",
      data: heroSlider
    });
  } catch (error) {
    console.error("Error updating hero slider:", error);
    console.error("Error stack:", error.stack);

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
      description: "خطا در به‌روزرسانی اسلایدر",
      error: error.message
    });
  }
};

// Updated function to update heroSlider IDs for reordering using a safer approach
exports.updateHeroSliderIds = async (req, res) => {
  try {
    const { heroSliders } = req.body; // Array of { id, heroSliderId } objects
    
    // Validate input
    if (!heroSliders || !Array.isArray(heroSliders) || heroSliders.length === 0) {
      return res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: "داده‌های ورودی نامعتبر است"
      });
    }
    
    // Get the session for transaction
    const session = await mongoose.startSession();
    
    try {
      await session.withTransaction(async () => {
        // First, collect all the heroSlider IDs that need to be updated
        const heroSliderIds = heroSliders.map(item => item.id);
        
        // Get all heroSliders that need to be updated
        const existingHeroSliders = await HeroSlider.find({
          _id: { $in: heroSliderIds }
        }).session(session);
        
        // Create a map for quick lookup
        const existingHeroSlidersMap = {};
        existingHeroSliders.forEach(slider => {
          existingHeroSlidersMap[slider._id.toString()] = slider;
        });
        
        // Update each heroSlider with its new heroSliderId
        const updatePromises = heroSliders.map(async ({ id, heroSliderId }) => {
          const slider = existingHeroSlidersMap[id];
          if (slider) {
            slider.heroSliderId = parseInt(heroSliderId);
            return slider.save({ session });
          }
        });
        
        // Wait for all updates to complete
        await Promise.all(updatePromises);
      });
      
      // Fetch updated heroSliders
      const updatedHeroSliders = await HeroSlider.find({
        _id: { $in: heroSliders.map(s => s.id) }
      }).sort({ heroSliderId: 1 });
      
      res.status(200).json({
        acknowledgement: true,
        message: "Updated",
        description: "شناسه اسلایدرها با موفقیت به‌روزرسانی شد",
        data: updatedHeroSliders
      });
    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.error("Error updating hero slider IDs:", error);
    
    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return res.status(400).json({
        acknowledgement: false,
        message: "Duplicate Key",
        description: "شناسه اسلایدر تکراری است. لطفاً مجدداً تلاش کنید."
      });
    }
    
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در به‌روزرسانی شناسه اسلایدرها",
      error: error.message
    });
  }
};

exports.deleteHeroSlider = async (req, res) => {
  try {
    const heroSlider = await HeroSlider.findById(req.params.id);

    if (!heroSlider) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "اسلایدری که می‌خواهید حذف کنید وجود ندارد"
      });
    }

    // Delete media file from Cloudinary if it exists
    if (heroSlider.media && heroSlider.media.public_id) {
      try {
        await deleteFromCloudinary(heroSlider.media.public_id, 'image');
      } catch (error) {
        console.error("Error deleting media from Cloudinary:", error);
      }
    }

    const result = await HeroSlider.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true,
        deletedAt: Date.now()
      },
      { new: true }
    );

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "اسلایدر با موفقیت حذف شد"
    });
  } catch (error) {
    console.error("Error in deleteHeroSlider:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در حذف اسلایدر",
      error: error.message
    });
  }
};


