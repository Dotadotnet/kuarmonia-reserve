/* internal imports */
const TeamMember = require("../models/teamMember.model");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");

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
    let translations;
    try {
      translations = await translateFields(
        {
          fullName,
          description,
          department,
          position,
          nationality,
          activeCountry
        },
        [
          "fullName",
          "description",
          "department",
          "position",
          "nationality",
          "activeCountry"
        ]
      );
      console.log("translations", translations);
    } catch (err) {
      console.error("خطا در ترجمه:", err.message);
      return res.status(500).json({
        acknowledgement: false,
        message: "Error",
        description: "خطا در ترجمه",
        error: err.message
      });
    }

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
      fullName,
      description,
      department,
      position,
      nationality,
      activeCountry,
      socialLinks: JSON.parse(socialLinks),
      creator: req.admin._id
    });
    const result = await teamMember.save();

    try {
      const translations = await translateFields(
        {
          fullName,
          description,
          department,
          position,
          nationality,
          activeCountry
        },
        {
          stringFields: [
            "fullName",
            "description",
            "department",
            "position",
            "nationality",
            "activeCountry"
          ]
        }
      );
      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "TeamMember",
          refId: result._id,
          fields
        })
      );

      const savedTranslations = await Translation.insertMany(translationDocs);
      const translationInfos = savedTranslations.map((t) => ({
        translationId: t._id,
        language: t.language
      }));
      await TeamMember.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });
    } catch (translationError) {
      await TeamMember.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. پست بلاگ حذف شد.",
        error: translationError.message
      });
    }
    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "عضو با موفقیت ایجاد شد",
      data: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ثبت  رخ داد",
      error: error.message
    });
  }
};

exports.getTeamMembers = async (req, res) => {
  try {
    console.log("Locale:", req.locale);
    const teamMembers = await TeamMember.find({
      isDeleted: false,
      position: { $ne: "رهبر" }
    }).populate([
      {
        path: "translations.translationId",
        match: { language: req.locale },
        select:
          "fields.fullName fields.description fields.department fields.position"
      },
      {
        path: "socialLinks.network",
        select: "title icon platform"
      },
      {
        path: "creator",
        select: "name avatar"
      }
    ]);

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
    const leaders = await TeamMember.find({
      isDeleted: false,
      position: "رهبر"
    }).populate([
      {
        path: "translations.translationId",
        match: { language: req.locale },
        select:
          "fields.fullName fields.description fields.department fields.position"
      },
      {
        path: "socialLinks.network",
        select: "title icon platform"
      },
      {
        path: "creator",
        select: "name avatar"
      }
    ]);
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
      description: "خطایی در دریافت اعضای پوزیشن رهبر رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت یک عضو */
exports.getTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
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
      data: teamMember
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
    const updatedTeamMember = req.body;
    console.log("Updated TeamMember:", updatedTeamMember);
    console.log("TeamMember ID:", req.params.id);

    const result = await TeamMember.findByIdAndUpdate(
      req.params.id,
      updatedTeamMember,
      {
        new: true
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
      description: "عضو با موفقیت بروزرسانی شد",
      data: result
    });
  } catch (error) {
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
