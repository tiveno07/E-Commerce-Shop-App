const express = require("express");
const path = require("path");
const Shop = require("../model/shop");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const { isSeller } = require("../middleware/auth");
const sendShopToken = require("../utils/shopToken");
const { cloudinaryUploadImg } = require("../utils/cloudinary");

router.post("/create-shop", upload.array("file"), async (req, res, next) => {
  try {
    const { zipCode, avatar, address, name, phoneNumber, email, password } =
      req.body;
    const sellerEmail = await Shop.findOne({ email });

    if (sellerEmail) {
      next(new ErrorHandler("User already exists", 400));
      return;
    }

    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const imageUrls = await uploader(path);
      urls.push(imageUrls);
      fs.rmSync(path, {
        force: true,
      });
    }

    console.log(avatar, "gfdfd");

    const seller = {
      name,
      email,
      password,
      address,
      phoneNumber,
      zipCode,
      avatar: urls.map((file) => {
        return file;
      }),
    };
    console.log(seller, "fdgf");
    const activationToken = createActivationToken(seller);

    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate Your  Shop Account",
        message: `Hello ${seller.name}, please click on the link to activate your shop account : ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${seller.email} to activate your shop account`,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
      return;
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Activate User
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      } else {
        const { name, password, email, avatar, zipCode, address, phoneNumber } =
          newSeller;

        let seller = await Shop.findOne({ email });

        if (seller) {
          return next(new ErrorHandler("Seller Already Exists", 400));
        }

        seller = await Shop.create({
          name,
          email,
          password,
          avatar,
          zipCode,
          address,
          phoneNumber,
        });
        sendShopToken(seller, 201, res);
      }
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
      return;
    }
  })
);

//Login Shop
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        next(new ErrorHandler("Please provide your valid credentials", 400));
        return;
      }
      const user = await Shop.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User Doesn't Exist", 400));
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }
      sendShopToken(user, 201, res);
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
      return;
    }
  })
);

// Get User
router.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);
      if (!seller) {
        next(new ErrorHandler("Seller doesn't exist", 500));
        return;
      }
      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
      return;
    }
  })
);

//Log Out User

router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res?.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({ success: true, message: "Log Out Successful!" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Change Upload Photo
router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existUser = await Shop.findById(req.seller._id);
      console.log(existUser);
      const existAvatarPath = `uploads/${existUser?.avatar}`;
      fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);
      const user = await Shop.findByIdAndUpdate(req.seller._id, {
        avatar: fileUrl,
      });

      res.json(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update Seller Info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;
      let shop = await Shop.findOne(req?.seller?._id);
      console.log(shop, "tiebofdn");
      if (!shop) {
        return next(new ErrorHandler("Seller not found!", 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
