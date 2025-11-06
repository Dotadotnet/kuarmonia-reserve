/* internal imports */
const Request = require("../models/request.model");
const Visa = require("../models/visa.model");
const Service = require("../models/service.model");
const remove = require("../utils/remove.util");

/* create a new request */
exports.createRequest = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, description, serviceType, specificTypeId } = req.body;
    console.log(req.body);
    // Handle file upload if exists
    let fileData = {};
    if (req.file) {
      fileData = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    // Prepare request data
    const requestData = {
      firstName,
      lastName,
      phone,
      email,
      description,
      file: fileData,
      serviceType,
    };

    // If specificTypeId is provided, store the reference
    if (specificTypeId && (serviceType === "visa" || serviceType === "service")) {
      requestData.specificTypeId = specificTypeId;
      requestData.serviceTypeRef = serviceType === "visa" ? "Visa" : "Service";
    }

    const request = new Request(requestData);
    await request.save();

    res.status(201).json({
      acknowledgement: true,
      message: "درخواست شما با موفقیت ثبت شد",
      description: "درخواست شما در سیستم ثبت شد و به زودی با شما تماس خواهیم گرفت",
      data: request,
    });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "خطای سرور",
      description: "مشکلی در ثبت درخواست پیش آمده است",
    });
  }
};

/* get all requests */
exports.getRequests = async (res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "دریافت موفق درخواست‌ها",
      data: requests,
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "خطای سرور",
      description: "مشکلی در دریافت درخواست‌ها پیش آمده است",
    });
  }
};

/* get single request */
exports.getRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findById(id);
    
    if (!request) {
      return res.status(404).json({
        acknowledgement: false,
        message: "درخواست یافت نشد",
        description: "درخواست مورد نظر یافت نشد",
      });
    }
    
    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "دریافت موفق درخواست",
      data: request,
    });
  } catch (error) {
    console.error("Error fetching request:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "خطای سرور",
      description: "مشکلی در دریافت درخواست پیش آمده است",
    });
  }
};

/* update request status */
exports.updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const request = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!request) {
      return res.status(404).json({
        acknowledgement: false,
        message: "درخواست یافت نشد",
        description: "درخواست مورد نظر یافت نشد",
      });
    }
    
    res.status(200).json({
      acknowledgement: true,
      message: "به‌روزرسانی موفق",
      description: "وضعیت درخواست با موفقیت به‌روزرسانی شد",
      data: request,
    });
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "خطای سرور",
      description: "مشکلی در به‌روزرسانی درخواست پیش آمده است",
    });
  }
};

/* delete request */
exports.deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    
    const request = await Request.findByIdAndDelete(id);
    
    if (!request) {
      return res.status(404).json({
        acknowledgement: false,
        message: "درخواست یافت نشد",
        description: "درخواست مورد نظر یافت نشد",
      });
    }
    
    // Remove file if exists
    if (request.file && request.file.public_id) {
      await remove(request.file.public_id);
    }
    
    res.status(200).json({
      acknowledgement: true,
      message: "حذف موفق",
      description: "درخواست با موفقیت حذف شد",
    });
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "خطای سرور",
      description: "مشکلی در حذف درخواست پیش آمده است",
    });
  }
};