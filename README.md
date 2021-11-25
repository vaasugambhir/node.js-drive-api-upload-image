# Node.js with Multer and Drive API

A Node.js backend code that receives a file through multer and uploads it to Google Drive, using the Drive API and a service account

Steps:

- Create a service account and enable the Drive API from Google Cloud Console: https://console.cloud.google.com/
- Download the service account's credential.json file
- Create a new folder in Drive using createFolder.js (folder is made publicly available as a viewer and can be changed according to your needs)
- Store the new folder's ID in your .env file
- Run the code and use Postman to upload files and check the /uploads folder
