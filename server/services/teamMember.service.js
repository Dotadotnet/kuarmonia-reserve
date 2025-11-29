/* internal imports */
const TeamMember = require("../models/teamMember.model");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");
const mongoose = require("mongoose");

/* 📌 اضافه کردن عضو جدید */
exports.addTeamMember = async (req, res) => {
  try {
    const {
      socialLinks,
      fullName,
      description,
      department,
      position,
      nationality,
      activeCountry,
      ...otherInfo
    } = req.body;
    
    // Validate required fields
    if (!fullName) {
      return res.status(400).json({
        acknowledgement: false,
        message: "Error",
        description: "نام و نام خانوادگی الزامی است"
      });
    }
    
    if (!position) {
      return res.status(400).json({
        acknowledgement: false,
        message: "Error",
        description: "سمت عضو تیم الزامی است"
      });
    }
    
    if (!description) {
      return res.status(400).json({
        acknowledgement: false,
        message: "Error",
        description: "توضیحات الزامی است"
      });
    }

    // Prepare data for translation
    const dataForTranslation = {
      fullName,
      position,
      description
    };

    // Translate fields
    const translations = await translateFields(
      dataForTranslation,
      {
        stringFields: ["fullName", "position", "description"]
      }
    );

    const translatedFullName = {
      fa: fullName,
      en: translations.en.fields.fullName || fullName,
      tr: translations.tr.fields.fullName || fullName
    };

    const translatedPosition = {
      fa: position,
      en: translations.en.fields.position || position,
      tr: translations.tr.fields.position || position
    };
    
    const translatedDescription = {
      fa: description,
      en: translations.en.fields.description || description,
      tr: translations.tr.fields.description || description
    };

    let avatar = null;
    if (req.uploadedFiles["teamMember"]?.length) {
      avatar = {
        url: req.uploadedFiles["teamMember"][0].url,
        public_id: req.uploadedFiles["teamMember"][0].key
      };
    }
    
    const teamMember = new TeamMember({
      ...otherInfo,
      avatar,
      fullName: translatedFullName,
      position: translatedPosition,
      description: translatedDescription,
      socialLinks: JSON.parse(socialLinks),
      creator: req.admin._id
    });
    
    const result = await teamMember.save();

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "عضو با موفقیت ایجاد و ترجمه شد",
      data: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ثبت عضو رخ داد",
      error: error.message
    });
  }
};

exports.getTeamMembers = async (req, res) => {
  try {
    const locale = req.locale || "fa";
    
    const pipeline = [
      { $match: { isDeleted: false, "position.fa": { $ne: "رهبر" } } },
      
      // Populate social links network
      {
        $lookup: {
          from: "sociallinks",
          localField: "socialLinks.network",
          foreignField: "_id",
          as: "populatedSocialLinks"
        }
      },
      
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
          memberId: 1,
          avatar: 1,
          socialLinks: {
            $map: {
              input: "$socialLinks",
              as: "link",
              in: {
                link: "$$link.link",
                network: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$populatedSocialLinks",
                        cond: { $eq: ["$$this._id", "$$link.network"] }
                      }
                    },
                    0
                  ]
                }
              }
            }
          },
          status: 1,
          createdAt: 1,
          fullName: `$fullName.${locale}`,
          position: `$position.${locale}`,
          description: `$description.${locale}`,
          "creator._id": 1,
          "creator.name": 1,
          "creator.avatar": 1
        }
      }
    ];

    const teamMembers = await TeamMember.aggregate(pipeline);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست عضوها با موفقیت دریافت شد",
      data: teamMembers
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت عضوها رخ داد",
      error: error.message
    });
  }
};

exports.getLeader = async (req, res) => {
  try {
    const locale = req.locale || "fa";
    console.log("get leader")
    const pipeline = [
      { $match: { isDeleted: false, "position.fa": "رهبر" } },
      
      // Populate social links network
      {
        $lookup: {
          from: "sociallinks",
          localField: "socialLinks.network",
          foreignField: "_id",
          as: "populatedSocialLinks"
        }
      },
      
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
          memberId: 1,
          avatar: 1,
          socialLinks: {
            $map: {
              input: "$socialLinks",
              as: "link",
              in: {
                link: "$$link.link",
                network: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$populatedSocialLinks",
                        cond: { $eq: ["$$this._id", "$$link.network"] }
                      }
                    },
                    0
                  ]
                }
              }
            }
          },
          status: 1,
          createdAt: 1,
          fullName: `$fullName.${locale}`,
          position: `$position.${locale}`,
          description: `$description.${locale}`,
          "creator._id": 1,
          "creator.name": 1,
          "creator.avatar": 1
        }
      }
    ];

    const leaders = await TeamMember.aggregate(pipeline);
    
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست اعضای با پوزیشن رهبر با موفقیت دریافت شد",
      data: leaders
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت رهبران رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت یک عضو */
exports.getTeamMember = async (req, res) => {
  try {
    const locale = req.locale || "fa";
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: "شناسه نامعتبر است"
      });
    }

    const objectId = new mongoose.Types.ObjectId(req.params.id);

    const pipeline = [
      { $match: { _id: objectId, isDeleted: false } },
      
      // Populate social links network
      {
        $lookup: {
          from: "sociallinks",
          localField: "socialLinks.network",
          foreignField: "_id",
          as: "populatedSocialLinks"
        }
      },
      
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
          memberId: 1,
          avatar: 1,
          socialLinks: {
            $map: {
              input: "$socialLinks",
              as: "link",
              in: {
                link: "$$link.link",
                network: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$populatedSocialLinks",
                        cond: { $eq: ["$$this._id", "$$link.network"] }
                      }
                    },
                    0
                  ]
                }
              }
            }
          },
          status: 1,
          createdAt: 1,
          fullName: `$fullName.${locale}`,
          position: `$position.${locale}`,
          description: `$description.${locale}`,
          "creator._id": 1,
          "creator.name": 1,
          "creator.avatar": 1
        }
      }
    ];

    const teamMembers = await TeamMember.aggregate(pipeline);
    
    if (!teamMembers || teamMembers.length === 0) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "عضو مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "عضو با موفقیت دریافت شد",
      data: teamMembers[0]
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت عضو رخ داد",
      error: error.message
    });
  }
};

/* 📌 بروزرسانی عضو */
exports.updateTeamMember = async (req, res) => {
  try {
    const {
      socialLinks,
      fullName,
      description,
      department,
      position,
      nationality,
      activeCountry,
      ...otherInfo
    } = req.body;
    
    // Prepare update data
    const updateData = { ...otherInfo };
    
    // Handle fullName updates
    if (fullName !== undefined) {
      if (fullName === null || fullName.trim() === "") {
        return res.status(400).json({
          acknowledgement: false,
          message: "Error",
          description: "نام و نام خانوادگی نمی‌تواند خالی باشد"
        });
      }
      
      // Prepare data for translation
      const dataForTranslation = {
        fullName
      };

      // Translate fields
      const translations = await translateFields(
        dataForTranslation,
        {
          stringFields: ["fullName"]
        }
      );

      updateData.fullName = {
        fa: fullName,
        en: translations.en.fields.fullName || fullName,
        tr: translations.tr.fields.fullName || fullName
      };
    }
    
    // Handle position updates
    if (position !== undefined) {
      if (position === null || position.trim() === "") {
        return res.status(400).json({
          acknowledgement: false,
          message: "Error",
          description: "سمت عضو تیم نمی‌تواند خالی باشد"
        });
      }
      
      // Prepare data for translation
      const dataForTranslation = {
        position
      };

      // Translate fields
      const translations = await translateFields(
        dataForTranslation,
        {
          stringFields: ["position"]
        }
      );

      updateData.position = {
        fa: position,
        en: translations.en.fields.position || position,
        tr: translations.tr.fields.position || position
      };
    }
    
    // Handle description updates
    if (description !== undefined) {
      if (description === null || description.trim() === "") {
        return res.status(400).json({
          acknowledgement: false,
          message: "Error",
          description: "توضیحات نمی‌تواند خالی باشد"
        });
      }
      
      // Prepare data for translation
      const dataForTranslation = {
        description
      };

      // Translate fields
      const translations = await translateFields(
        dataForTranslation,
        {
          stringFields: ["description"]
        }
      );

      updateData.description = {
        fa: description,
        en: translations.en.fields.description || description,
        tr: translations.tr.fields.description || description
      };
    }

    if (socialLinks) {
      updateData.socialLinks = JSON.parse(socialLinks);
    }

    const result = await TeamMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "عضو مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "عضو با موفقیت بروزرسانی و ترجمه شد",
      data: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی عضو رخ داد",
      error: error.message
    });
  }
};

/* 📌 حذف عضو */
exports.deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!teamMember) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "عضو مورد نظر برای حذف یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "عضو با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف عضو رخ داد",
      error: error.message
    });
  }
};
















