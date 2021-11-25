const express = require("express");
const multer = require("multer");
const router = express.Router();
const fileController = require("../controllers/fileController");
const upload = multer({ dest: "./uploads" });

// multer is passed as a middleware here, it adds the received file into 'req.file'
router.post("/upload-file", upload.single("file"), fileController.uploadFile);
router.put("/update-file", upload.single("file"), fileController.updateFile);
router.delete("/delete-file", fileController.deleteFile);
router.get("/get-all-files", fileController.getAllFiles);

module.exports = router;
