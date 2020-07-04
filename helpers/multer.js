const cloudinary = require("cloudinary").v2;
const {
  CoudinaryStorage,
  CloudinaryStorage,
} = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  coud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "meeu",
    use_filename: true,
  },
});

module.exports = multer({ storage });
