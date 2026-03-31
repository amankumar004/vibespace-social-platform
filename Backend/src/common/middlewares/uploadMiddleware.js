const cloudinary = require("../../config/cloudinary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "vibespace_posts",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // Limit file size to 5MB

module.exports = upload;
