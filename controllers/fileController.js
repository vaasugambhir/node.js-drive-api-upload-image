require("dotenv").config();
const fs = require("fs");
const driveService = require("../utils/driveService");

// controller to upload files
const uploadFile = async (req, res) => {
  const image = req.file;
  console.log(req.file);

  try {
    // as the file name stored is gibberish with no extension, that file is replaced by the original filename
    await fs.promises.rename(
      image.destination + "/" + image.filename,
      image.destination + "/" + image.originalname
    );

    const metaData = {
      name: image.originalname.substring(
        0,
        image.originalname.lastIndexOf(".")
      ),
      parents: [process.env.FOLDER_ID], // the ID of the folder you get from createFolder.js is used here
    };

    const media = {
      mimeType: image.mimeType,
      body: fs.createReadStream(image.destination + "/" + image.originalname), // the image sent through multer will be uploaded to Drive
    };

    // uploading the file
    const response = await driveService.files.create({
      resource: metaData,
      media: media,
      fields: "id",
    });

    console.log("ID:", response.data.id);

    res.send(response);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const getAllFiles = async (req, res) => {
  const query = `${process.env.FOLDER_ID} in parents`;
  const response = await driveService.files.list({
    q: query, // comment this if you want all possible files
    fields: "files(id, name)",
  });
  res.send(response);
};

const deleteFile = async (req, res) => {
  const fileId = req.body.fileId; // the file to delete
  const response = await driveService.files.delete({
    fileId: fileId,
    parentId: `${process.env.FOLDER_ID}`,
  });
  res.send(response);
};

const updateFile = async (req, res) => {
  try {
    const image = req.file; // the file to replace with
    const fileId = req.body.fileId; // the file to be replaced
    await fs.promises.rename(
      image.destination + "/" + image.filename,
      image.destination + "/" + image.originalname
    );
    const media = {
      mimeType: image.mimeType,
      body: fs.createReadStream(image.destination + "/" + image.originalname), // the image sent through multer will be uploaded to Drive
    };

    const response = await driveService.files.update({
      addParents: `${process.env.FOLDER_ID}`,
      fileId: fileId,
      media: media,
      fields: "id",
    });

    res.send(response);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  uploadFile: uploadFile,
  deleteFile: deleteFile,
  updateFile: updateFile,
  getAllFiles: getAllFiles,
};
