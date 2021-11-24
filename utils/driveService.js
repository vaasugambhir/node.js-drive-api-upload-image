const { google } = require("googleapis");
require("dotenv").config();

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.CRED_FILE_PATH,
  scopes: SCOPES,
});

module.exports = google.drive({ version: "v3", auth: auth });
