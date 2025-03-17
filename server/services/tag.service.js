

/* internal import */
const Tag = require("../models/tag.model");
const User = require("../models/user.model");

/* add new tag */
exports.addTag = async (req, res) => {
  const { body } = req;
  const parsedRobots = JSON.parse(body.robots);
  const robotsArray = parsedRobots.map((value, index) => ({
    id: index + 1, 
    value,
  }));
  const tag = new Tag({
    title: body.title,
    description: body.description,
    keynotes: JSON.parse(body.keynotes),
    creator: req.admin._id,
    robots: robotsArray,
  });

  const result = await tag.save();

  await User.findByIdAndUpdate(result.creator, {
    $set: { tag: result._id },
  });

  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "تگ باموفقیت دریافت شد",
  });
};

/* get all tags */
exports.getTags = async (res) => {
  const tags = await Tag.find({isDeleted:false})
  .populate({
    path: "creator",
    select: "name avatar", // دریافت نام و آواتار سازنده
  });
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "تگ ها با موفقیت دریافت شدند",
    data: tags,
  });
};


/* get a tag */
exports.getTag = async (req, res) => {
  const tag = await Tag.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "تگ با موفقیت دریافت شد",
    data: tag,
  });
};

/* update tag */
exports.updateTag = async (req, res) => {
  let updatedTag = req.body;
  const parsedRobots = JSON.parse(req.body.robots);
  const robotsArray = parsedRobots.map((value, index) => ({
    id: index + 1, 
    value,
  }));


  updatedTag.keynotes = JSON.parse(req.body.keynotes);
  updatedTag.robots = robotsArray;
  await Tag.findByIdAndUpdate(req.params.id, updatedTag);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "تگ با موفقیت ویرایش شد",
  });
};

/* delete tag */
exports.deleteTag = async (req, res) => {
  const tag = await Tag.findByIdAndUpdate(req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now(),
    },
    { new: true }
  );
    
  if (!tag) {
    return res.status(404).json({
      acknowledgement: false,
      message: "تگ پیدا نشد",
      description: "تگی که می‌خواهید حذف کنید، وجود ندارد",
    });
  }



  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "تگ با موفقیت حذف شد",
  });
};
