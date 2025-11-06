const uploadService = require("../services/upload.service");

const uploadController = {
  // add new upload
  addUpload: async (req, res) => {
    try {
      return await uploadService.addUpload(req, res);
    } catch (error) {
      console.error("Error uploading file:", error);
      return res.status(500).json({
        acknowledgement: false,
        message: "Error",
        description: "خطا در آپلود فایل",
        error: error.message
      });
    }
  },
  
  // delete upload
  deleteUpload: async (req, res) => {
    try {
      return await uploadService.deleteUpload(req, res);
    } catch (error) {
      console.error("Error deleting file:", error);
      return res.status(500).json({
        acknowledgement: false,
        message: "Error",
        description: "خطا در حذف فایل",
        error: error.message
      });
    }
  }
};

module.exports = uploadController;