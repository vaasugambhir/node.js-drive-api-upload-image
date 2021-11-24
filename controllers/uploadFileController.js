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

module.exports = {
  uploadFile: uploadFile,
};
