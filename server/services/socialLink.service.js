
const SocialLink = require("../models/socialLink.model");
const remove = require("../utils/remove.util");

/* add new socialLink */
exports.addSocialLink = async (req, res) => {
  const { ...otherInformation } = req.body;
  const socialLink = new SocialLink({
    ...otherInformation,
    creator: req.admin._id,
  });

  const result = await socialLink.save();


  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "شبکه اجتماعی با موفقیت ایجاد شد",
  });
};
/* get all socialLinks */
exports.getCategories = async (res) => {
  const socialLinks = await SocialLink.find({ isDeleted: { $ne: true } })
  .populate({
    path: "creator",
    select: "name avatar", 
  });
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "شبکه اجتماعی ها با موفقیت دریافت شدند",
    data: socialLinks,
  });
};




exports.getProductCategories = async (res) => {
  const socialLinks = await SocialLink.find().populate({
    path: "products",
    match: { isDeleted: false, status: "active" ,publishStatus:"approved"},
    select: "_id",
  });
  const filteredCategories = socialLinks.filter(socialLink => socialLink.products.length > 0);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "شبکه اجتماعی ها با موفقیت دریافت شدند",
    data: filteredCategories,
  });
};
/* get a socialLink */
exports.getSocialLink = async (req, res) => {
  const socialLink = await SocialLink.findById(req.params.id);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "شبکه اجتماعی با موفقیت دریافت شد",
    data: socialLink,
  });
};

/* update socialLink */
exports.updateSocialLink = async (req, res) => {
  const socialLink = await SocialLink.findById(req.params.id);
  let updatedSocialLink = req.body;
  if (!req.body.thumbnail && req.file) {
    await remove(socialLink.thumbnail.public_id);

    updatedSocialLink.thumbnail = {
      url: req.file.path,
      public_id: req.file.filename,
    };
  }

  updatedSocialLink.keynotes = JSON.parse(req.body.keynotes);
  updatedSocialLink.tags = JSON.parse(req.body.tags);

  await SocialLink.findByIdAndUpdate(req.params.id, updatedSocialLink);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "SocialLink updated successfully",
  });
};

/* delete socialLink */
exports.deleteSocialLink = async (req, res) => {

  const socialLink = await SocialLink.findByIdAndUpdate(req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now(),
    },
    { new: true }
  );
    
  if (!socialLink) {
    return res.status(404).json({
      acknowledgement: false,
      message: "شبکه اجتماعی پیدا نشد",
      description: "شبکه اجتماعی  که می‌خواهید حذف کنید، وجود ندارد",
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "شبکه اجتماعی با موفقیت حذف شد",
  });
};
