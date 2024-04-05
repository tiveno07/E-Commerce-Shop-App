const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0];
    cb(null, filename + "-" + uniqueSuffix + ".png");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(
      {
        message: "unsupported file format",
      },
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter: multerFilter,
  limits: { fieldSize: 2000000 },
});

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`uploads/${file.filename}`);
      fs.rmSync(`uploads/${file.filename}`, {
        force: true,
      });
    })
  );
  next();
};

const userImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(50, 50)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`uploads/${file.filename}`);
      fs.rmSync(`uploads/${file.filename}`, {
        force: true,
      });
    })
  );
  next();
};
module.exports = { upload, productImgResize, userImgResize };
