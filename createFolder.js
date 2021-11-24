const { google } = require("googleapis");
require("dotenv").config();
console.log(process.env.CRED_FILE_PATH);

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.CRED_FILE_PATH,
  scopes: SCOPES,
});

const driveService = google.drive({ version: "v3", auth });

const fileMetaData = {
  name: "test-images",
  mimeType: "application/vnd.google-apps.folder",
};

driveService.files
  .create({
    resource: fileMetaData,
    fields: "id",
  })
  .then((response) => {
    console.log(response);
    console.log(response.data.id);
    setPermission(response.data.id);
  })
  .catch((err) => console.log(err));

const setPermission = (fileId) => {
  driveService.permissions
    .create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
