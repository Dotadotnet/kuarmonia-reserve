/* internal imports */
const TeamMember = require("../models/teamMember.model");

/* 📌 اضافه کردن عضو جدید */
exports.addTeamMember = async (req, res) => {
  try {
    const {socialLinks, ...otherInfo } = req.body;
    let avatar = null;
    console.log("req.uploadedFiles", req.uploadedFiles["teamMember"]);
    if (req.uploadedFiles["teamMember"]?.length) {
      avatar = {
        url: req.uploadedFiles["teamMember"][0].url,
        public_id: req.uploadedFiles["teamMember"][0].key
      };
    }
    console.log("Avatar:", avatar);
    const teamMember = new TeamMember({
      ...otherInfo,
      avatar,
      socialLinks:JSON.parse(socialLinks),
      creator: req.admin._id,
    });
    const result = await teamMember.save();



    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "عضو با موفقیت ایجاد شد",
      data: result,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ثبت  رخ داد",
      error: error.message,
    });
  }
};

/* 📌 دریافت همه عضوها */
exports.getTeamMembers = async (res) => {
  try {
    const venueAminities = await TeamMember.find({ isDeleted: false }).populate("creator");
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست عضوها با موفقیت دریافت شد",
      data: venueAminities,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت عضوها رخ داد",
      error: error.message,
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
        description: "عضو مورد نظر یافت نشد",
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "عضو با موفقیت دریافت شد",
      data: teamMember,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت عضو رخ داد",
      error: error.message,
    });
  }
};

/* 📌 بروزرسانی عضو */
exports.updateTeamMember = async (req, res) => {
  try {
    const updatedTeamMember = req.body;
    console.log("Updated TeamMember:", updatedTeamMember);
    console.log("TeamMember ID:", req.params.id);

    const result = await TeamMember.findByIdAndUpdate(req.params.id, updatedTeamMember, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "عضو مورد نظر برای بروزرسانی یافت نشد",
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "عضو با موفقیت بروزرسانی شد",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی عضو رخ داد",
      error: error.message,
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
        description: "عضو مورد نظر برای حذف یافت نشد",
      });
    }


    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "عضو با موفقیت حذف شد",
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف عضو رخ داد",
      error: error.message,
    });
  }
};
