require("dotenv").config();
const fs = require("fs");
const driveService = require("../utils/driveService");

const uploadFile = async (req, res) => {
  //const path = req.body.path;
  const image = req.file;

  console.log(req.file);
  console.log(req.body);

  await fs.promises.rename(
    image.destination + "/" + image.filename,
    image.destination + "/" + image.originalname
  );

  const metaData = {
    name: image.originalname.substring(0, image.originalname.lastIndexOf(".")),
    parents: [process.env.FOLDER_ID],
  };
  const media = {
    mimeType: image.mimeType,
    body: fs.createReadStream(image.destination + "/" + image.originalname),
  };

  const response = await driveService.files.create({
    resource: metaData,
    media: media,
    fields: "id",
  });

  console.log("ID:", response.data.id);

  res.send(response);
};

module.exports = {
  uploadFile: uploadFile,
};
