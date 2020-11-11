const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/produce_images/",
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = function (req, file, callback) {
  let ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
    return callback(null, false);
  }

  callback(file, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload.single('image');
