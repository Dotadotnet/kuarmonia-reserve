// controllers/story.controller.js
const Story = require("../models/story.model");
const translateFields = require("../utils/translateFields");
const mongoose = require("mongoose");
const deleteFromCloudinary = require("../middleware/delete.middleware");

exports.addStory = async (req, res) => {
  try {
    let { title, caption, parent, tags, order } = req.body;
    let media = null;
    console.log("parent",parent)
    console.log("parent", parent)
    if (req.uploadedFiles["media"].length) {
      media = {
        url: req.uploadedFiles["media"][0].url,
        public_id: req.uploadedFiles["media"][0].key
      };
    }

    // If no order is provided, assign the next available order number
    if (!order) {
      const maxOrderStory = await Story.findOne({}, { order: 1 }).sort({ order: -1 });
      order = maxOrderStory ? maxOrderStory.order + 1 : 1;
    }

    const translations = await translateFields(
      {
        title,
        caption
      },
      {
        stringFields: ["title", "caption"]
      }
    );
    const translatedTitle = {
      fa: title,
      en: translations.en.fields.title,
      tr: translations.tr.fields.title
    };

    const translatedCaption = {
      fa: caption,
      en: translations.en.fields.caption,
      tr: translations.tr.fields.caption
    };

    const story = new Story({
      parent: parent || null,
      title: translatedTitle,
      caption: translatedCaption,
      media,
      tags: JSON.parse(tags),
      creator: req.admin._id,
      order: parseInt(order)
    });

    const result = await story.save();

    // If this is a child story, add it to the parent's children array
    if (parent) {
      await Story.findByIdAndUpdate(parent, {
        $push: { children: result._id }
      });
    }

    return res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "استوری با موفقیت ایجاد و ترجمه شد.",
      data: result
    });
  } catch (error) {
    console.error("Error in addStory:", error);

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

    // Handle duplicate order error
    if (error.message === 'ترتیب استوری باید منحصر به فرد باشد') {
      return res.status(400).json({
        acknowledgement: false,
        message: "Duplicate Order",
        description: "ترتیب استوری باید منحصر به فرد باشد"
      });
    }

    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در ایجاد استوری",
      error: error.message
    });
  }
};

exports.getStories = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const skip = (page - 1) * limit;
  const locale = req.locale || "fa";

  try {
    const matchStage = {
      isDeleted: false,
      parent: null,
    };

    if (search) {
      matchStage[`title.${locale}`] = { $regex: search, $options: "i" };
    }

    const pipeline = [
      { $match: matchStage },

      // مرتب‌سازی و paging
      { $sort: { order: 1 } },
      { $skip: Number(skip) },
      { $limit: Number(limit) },

      // populate creator با فقط فیلدهای لازم
      {
        $lookup: {
          from: "admins",
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: { path: "$creator", preserveNullAndEmptyArrays: true } },

      // انتخاب فیلدهای نهایی و فقط زبان انتخابی
      {
        $project: {
          storyId: 1,
          order: 1,
          media: 1,
          status: 1,
          createdAt: 1,
          title: `$title.${locale}`,
          caption: `$caption.${locale}`,
          childrenCount: { $size: "$children" },
          "creator._id": 1,
          "creator.name": 1,
          "creator.avatar": 1,
        },
      },
    ];

    const stories = await Story.aggregate(pipeline);

    // تعداد کل
    const total = await Story.countDocuments(matchStage);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "استوری‌ها با موفقیت دریافت شدند",
      data: stories,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت استوری‌ها",
      error: error.message,
    });
  }
};

exports.getStory = async (req, res) => {
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
      
      // populate children
      {
        $lookup: {
          from: "stories",
          localField: "children",
          foreignField: "_id",
          as: "children"
        }
      },

      // populate creator for each child
      {
        $unwind: {
          path: "$children",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "admins",
          localField: "children.creator",
          foreignField: "_id",
          as: "children.creator"
        }
      },
      {
        $unwind: {
          path: "$children.creator",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: "$_id",
          storyId: { $first: "$storyId" },
          order: { $first: "$order" },
          media: { $first: "$media" },
          status: { $first: "$status" },
          createdAt: { $first: "$createdAt" },
          title: { $first: `$title.${locale}` },
          caption: { $first: `$caption.${locale}` },
          creator: { $first: "$creator" },
          children: {
            $push: {
              _id: "$children._id",
              storyId: "$children.storyId",
              order: "$children.order",
              media: "$children.media",
              status: "$children.status",
              createdAt: "$children.createdAt",
              title: `$children.title.${locale}`,
              caption: `$children.caption.${locale}`,
              creator: "$children.creator"
            }
          }
        }
      },
      
      // Remove null children if any
      {
        $addFields: {
          children: {
            $filter: {
              input: "$children",
              cond: { $ne: ["$$this._id", null] }
            }
          }
        }
      },

      // فقط فیلدهای لازم + زبان انتخابی
      {
        $project: {
          storyId: 1,
          order: 1,
          media: 1,
          status: 1,
          createdAt: 1,
          title: 1,
          caption: 1,
          creator: {
            _id: "$creator._id",
            name: { $ifNull: [`$creator.name.${locale}`, `$creator.name`] },
            avatar: "$creator.avatar"
          },
          children: 1
        }
      }
    ];

    const [story] = await Story.aggregate(pipeline);

    console.log("story", story);

    if (!story) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "استوری پیدا نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "استوری با موفقیت دریافت شد",
      data: story
    });

  } catch (error) {
    console.error("Error fetching story:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت استوری",
      error: error.message
    });
  }
};



exports.updateStory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, caption, parent, tags, order } = req.body;
    let updateData = {};

    // Use automatic translation for title if provided
    if (title) {
      const translations = await translateFields(
        { title },
        { stringFields: ["title"] }
      );

      updateData.title = {
        fa: title,
        en: translations.en.fields.title,
        tr: translations.tr.fields.title
      };
    }

    // Use automatic translation for caption if provided
    if (caption) {
      const translations = await translateFields(
        { caption },
        { stringFields: ["caption"] }
      );

      updateData.caption = {
        fa: caption,
        en: translations.en.fields.caption,
        tr: translations.tr.fields.caption
      };
    }

    // Handle parent relationship if provided
    if (parent !== undefined) {
      // Get the current story to check its existing parent
      const currentStory = await Story.findById(id);

      // If parent is being changed
      if (currentStory.parent?.toString() !== parent) {
        // Remove from old parent's children array if it had a parent
        if (currentStory.parent) {
          await Story.findByIdAndUpdate(currentStory.parent, {
            $pull: { children: id }
          });
        }

        // Add to new parent's children array if parent is not null
        if (parent) {
          await Story.findByIdAndUpdate(parent, {
            $push: { children: id }
          });
        }

        // Update the parent field
        updateData.parent = parent || null;
      }
    }

    // Update tags if provided
    if (tags) {
      updateData.tags = JSON.parse(tags);
    }

    // Update order if provided
    if (order !== undefined) {
      updateData.order = parseInt(order);
    }

    // Handle media update if new file is uploaded
    if (req.uploadedFiles && req.uploadedFiles["media"] && req.uploadedFiles["media"].length) {
      // Get the current story to access old media info
      const currentStory = await Story.findById(id);

      // If there's an existing media file, we should remove it
      if (currentStory.media && currentStory.media.public_id) {
        // Delete the old media file from Cloudinary
        try {
          await deleteFromCloudinary(currentStory.media.public_id, 'image');
        } catch (error) {
          console.error("Error deleting old media from Cloudinary:", error);
        }
      }

      updateData.media = {
        url: req.uploadedFiles["media"][0].url,
        public_id: req.uploadedFiles["media"][0].key
      };
    }

    const story = await Story.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!story) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "استوری پیدا نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Updated",
      description: "استوری با موفقیت به‌روزرسانی و ترجمه شد",
      data: story
    });
  } catch (error) {
    console.error("Error updating story:", error);

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

    // Handle duplicate order error
    if (error.message === 'ترتیب استوری باید منحصر به فرد باشد') {
      return res.status(400).json({
        acknowledgement: false,
        message: "Duplicate Order",
        description: "ترتیب استوری باید منحصر به فرد باشد"
      });
    }

    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در به‌روزرسانی استوری",
      error: error.message
    });
  }
};

exports.updateStoryOrder = async (req, res) => {
  try {
    const { stories } = req.body; // Array of { id, order } objects
    const locale = req.locale || "fa";
    
    // Validate input
    if (!stories || !Array.isArray(stories) || stories.length === 0) {
      return res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: "داده‌های ورودی نامعتبر است"
      });
    }
    
    // Update order for each story
    const bulkOps = stories.map(({ id, order }) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: parseInt(order) } }
      }
    }));
    
    await Story.bulkWrite(bulkOps);
    
    // Fetch updated stories
    const updatedStories = await Story.find({
      _id: { $in: stories.map(s => s.id) }
    }).sort({ order: 1 });
    
    res.status(200).json({
      acknowledgement: true,
      message: "Updated",
      description: "ترتیب استوری‌ها با موفقیت به‌روزرسانی شد",
      data: updatedStories
    });
  } catch (error) {
    console.error("Error updating story order:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در به‌روزرسانی ترتیب استوری‌ها",
      error: error.message
    });
  }
};

exports.deleteStory = async (req, res) => {
  try {
    const { id } = req.params;

    // First, find the story to check if it has a parent
    const story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "استوری پیدا نشد"
      });
    }

    // Delete media file from Cloudinary if it exists
    if (story.media && story.media.public_id) {
      try {
        await deleteFromCloudinary(story.media.public_id, 'image');
      } catch (error) {
        console.error("Error deleting media from Cloudinary:", error);
      }
    }

    // If this story has a parent, remove it from the parent's children array
    if (story.parent) {
      await Story.findByIdAndUpdate(story.parent, {
        $pull: { children: id }
      });
    }

    // If this story has children, delete them as well (cascade delete)
    if (story.children && story.children.length > 0) {
      // Delete media files for all children first
      const childrenStories = await Story.find({ _id: { $in: story.children } });
      for (const child of childrenStories) {
        if (child.media && child.media.public_id) {
          try {
            await deleteFromCloudinary(child.media.public_id, 'image');
          } catch (error) {
            console.error("Error deleting child media from Cloudinary:", error);
          }
        }
      }

      await Story.deleteMany({
        _id: { $in: story.children }
      });
    }

    // Finally, delete the story itself
    await Story.findByIdAndDelete(id);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "استوری با موفقیت حذف شد"
    });
  } catch (error) {
    console.error("Error deleting story:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در حذف استوری",
      error: error.message
    });
  }
};

exports.getStoriesWithChildren = async (req, res) => {
  const locale = req.locale || "fa";

  try {
    const matchStage = {
      isDeleted: false,
      parent: null,
      children: { $exists: true, $ne: [] } // Only stories with children
    };

    const pipeline = [
      { $match: matchStage },
      { $sort: { order: 1 } },

      // Project fields with localization
      {
        $project: {
          storyId: 1,
          order: 1,
          media: 1,
          status: 1,
          createdAt: 1,
          "creator": 1,
          title: `$title.${locale}`,
          caption: `$caption.${locale}`,
          childrenCount: { $size: "$children" } // Add children count
        },
      },

      // Populate creator from Admin collection
      {
        $lookup: {
          from: "admins",
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: { path: "$creator", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          storyId: 1,
          order: 1,
          media: 1,
          status: 1,
          createdAt: 1,
          title: 1,
          caption: 1,
          childrenCount: 1,
          "creator._id": 1,
          "creator.name": `$creator.name.${locale}`,
          "creator.avatar": 1,
        },
      },
    ];

    // Execute aggregation pipeline
    const stories = await Story.aggregate(pipeline);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "استوری‌های دارای فرزند با موفقیت دریافت شدند",
      data: stories
    });
  } catch (error) {
    console.error("Error fetching stories with children:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت استوری‌های دارای فرزند",
      error: error.message,
    });
  }
};

exports.getAllStories = async (req, res) => {
  const locale = req.locale || "fa";

  try {
    const matchStage = {
      isDeleted: false,
    };

    const pipeline = [
      { $match: matchStage },
      { $sort: { createdAt: -1 } }, // Sort by creation date, newest first

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

      // Populate parent story
      {
        $lookup: {
          from: "stories",
          localField: "parent",
          foreignField: "_id",
          as: "parentStory",
        },
      },
      { $unwind: { path: "$parentStory", preserveNullAndEmptyArrays: true } },

      // Project final fields with localization
      {
        $project: {
          storyId: 1,
          order: 1,
          media: 1,
          status: 1,
          createdAt: 1,
          title: `$title.${locale}`,
          caption: `$caption.${locale}`,
          "creator._id": 1,
          "creator.name": `$creator.name.${locale}`,
          "creator.avatar": 1,
          parent: {
            _id: "$parentStory._id",
            title: `$parentStory.title.${locale}`,
          },
          childrenCount: { $size: "$children" }
        },
      },
    ];

    const stories = await Story.aggregate(pipeline);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "همه استوری‌ها با موفقیت دریافت شدند",
      data: stories,
    });
  } catch (error) {
    console.error("Error fetching all stories:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت همه استوری‌ها",
      error: error.message,
    });
  }
};




