const express = require("express");
const multer = require("multer");
const router = express.Router();
const uploadFileController = require("../controllers/uploadFileController");
const upload = multer({ dest: "./uploads" });

router.post(
  "/upload-image",
  upload.single("image"),
  uploadFileController.uploadFile
);

module.exports = router;
