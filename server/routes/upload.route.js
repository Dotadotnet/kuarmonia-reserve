/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

const router = express.Router();
router.post(
    '/add-upload',
    upload('upload').single('upload'),
    (req, res) => {
      if (!req.uploadedFiles?.upload?.[0]) {
        console.log("No file uploaded");
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const file = req.uploadedFiles?.upload?.[0].url;
      console.log("req.uploadedFiles?.upload?.[0]",req.uploadedFiles?.upload?.[0].url)
      const filePath = file
      console.log("File uploaded:", filePath);
      return res.status(200).json({ url: filePath });
    }
  );
  

module.exports = router;
