/* internal import */
const Contact = require("../models/contact.model");

/* create new contact message */
exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create new contact message
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    // Save contact message to database
    await contact.save();

    res.status(201).json({
      acknowledgement: true,
      message: "پیام شما با موفقیت ارسال شد",
      description: "پیام شما در سیستم ثبت شد و به زودی با شما تماس خواهیم گرفت",
      data: contact,
    });
  } catch (error) {
    console.error("Error creating contact message:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "خطای سرور",
      description: "مشکلی در ثبت پیام پیش آمده است",
    });
  }
};

/* get all contact messages */
exports.getContacts = async (res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "دریافت موفق پیام‌ها",
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "خطای سرور",
      description: "مشکلی در دریافت پیام‌ها پیش آمده است",
    });
  }
};

/* get single contact message */
exports.getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    
    if (!contact) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "پیام مورد نظر یافت نشد",
      });
    }
    
    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "دریافت موفق پیام",
      data: contact,
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "خطای سرور",
      description: "مشکلی در دریافت پیام پیش آمده است",
    });
  }
};

/* update contact message */
exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "پیام مورد نظر یافت نشد",
      });
    }
    
    res.status(200).json({
      acknowledgement: true,
      message: "به‌روزرسانی موفق",
      description: "وضعیت پیام با موفقیت به‌روزرسانی شد",
      data: contact,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "خطای سرور",
      description: "مشکلی در به‌روزرسانی پیام پیش آمده است",
    });
  }
};

/* delete contact message */
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findByIdAndDelete(id);
    
    if (!contact) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "پیام مورد نظر یافت نشد",
      });
    }
    
    res.status(200).json({
      acknowledgement: true,
      message: "حذف موفق",
      description: "پیام با موفقیت حذف شد",
      data: contact,
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "خطای سرور",
      description: "مشکلی در حذف پیام پیش آمده است",
    });
  }
};