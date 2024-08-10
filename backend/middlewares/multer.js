const multer = require("multer");
const path = require("path");

/**
 * In this Multer Middleware:
 * 1. Checking File Type
 * 2. Checking File Size
 *
 * Brief Guide:
 * 1. Make sure to put upload() from multer function before body() from express-validator.
 *
 * Reason:
 * When handling multipart/form-data requests, Multer is responsible for processing and extracting files and form fields from the request. If the express-validator's body() is executed before Multer, the form data will not yet be available for validation because it has not been processed.
 * By placing upload() before body(), we ensure that all form fields are extracted and accessible for validation by express-validator.
 *
 *
 * 2. Import and use errorHandling Middleware in the the route to catch Multer Errors (e.g file size and file type errors).
 * 3. In the controllers, import checkRequiredFields from utils to ensure all required images/files are uploaded without exception.
 */

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("File type must be jpeg, jpg, png, or pdf"));
  }
}

const upload = multer({
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

module.exports = upload;
