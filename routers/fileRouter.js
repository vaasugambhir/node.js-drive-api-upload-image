const express = require("express");
const multer = require("multer");
const router = express.Router();
const uploadFileController = require("../controllers/uploadFileController");
const upload = multer({ dest: "./uploads" });

// multer is passed as a middleware here, it adds the received file into 'req.file'
router.post(
  "/upload-image",
  upload.single("image"),
  uploadFileController.uploadFile
);

module.exports = router;
