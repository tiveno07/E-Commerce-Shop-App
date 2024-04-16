const express = require("express");
const path = require("path");
const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middleware/auth");
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");

// create user
router.post("/create-user", upload.array("file"), async (req, res, next) => {
  try {
    const { avatar, name, phoneNumber, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
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

    const user = {
      phoneNumber,
      name,
      email,
      password,
      avatar: urls.map((file) => {
        return file;
      }),
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `https://e-commerce-shop-app-i2k5.vercel.app/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate Your Account",
        message: `Hello ${user.name}, please click on the link to activate your account : ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account`,
      });
    } catch (error) {
      next(new ErrorHandler(error.response.data, 500));
      return;
    }
  } catch (error) {
    next(new ErrorHandler(error.response.data, 500));
    return;
  }
});

//create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Activate User
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      } else {
        const { name, password, email, avatar } = newUser;

        let user = await User.findOne({ email });

        if (user) {
          return next(new ErrorHandler("User Already Exists", 400));
        }
        user = await User.create({
          name,
          email,
          password,
          avatar,
        });
        sendToken(user, 201, res);
      }
    } catch (error) {
      next(new ErrorHandler(error.response.data, 500));
      return;
    }
  })
);

//Change Upload Photo
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existUser = await User.findById(req.user.id);
      console.log(existUser, "tive");

      const deleteImage = await cloudinaryDeleteImg(existUser.avatar, "images");
      await deleteImage.deleteOne();
      // const deleteImage = (path) => cloudinaryDeleteImg(existUser, "images");

      console.log(deleteImage, "dfvb");
      console.log(path, "dfvb");

      // const fileUrl = path.join(req.file.filename);
      // const user = await User.findByIdAndUpdate(req.user.id, {
      //   avatar: fileUrl,
      // });

      return res.json(200).json({ success: true, deleteImage });
    } catch (error) {
      next(new ErrorHandler(error.response.data, 500));
    }
  })
);

// Delete User Address
router.delete(
  "/delete-user-addresses/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req?.user?._id;
      const addressId = req.params.id;
      await User?.updateOne(
        { _id: userId },
        { $pull: { addresses: { _id: addressId } } }
      );
      const user = await User?.findById(userId);

      res.status(200).json({ success: true, user });
    } catch (error) {
      next(new ErrorHandler(error.response.data, 500));
    }
  })
);

// Update User Info
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, name, phoneNumber } = req.body;
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User Doesn't Exist", 400));
      }

      const isPasswordValid = await user.comparePassword(password);
      console.log(isPasswordValid, "sdvfb");
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }
      user.email = email;
      user.name = name;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      next(new ErrorHandler(error.response.data, 500));
    }
  })
);

//Login User
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        next(new ErrorHandler("Please provide your valid credentials", 400));
        return;
      }
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User Doesn't Exist", 400));
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }
      sendToken(user, 201, res);
    } catch (error) {
      next(new ErrorHandler(error.response.data.message, 500));
      return;
    }
  })
);

// Login User
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        next(new ErrorHandler("User doesn't exist", 500));
        return;
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      next(new ErrorHandler(error.response.data, 500));
      return;
    }
  })
);

//Update User Addresses
router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exists`)
        );
      }
      const existAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existAddress) {
        Object.assign(existAddress, req.body);
      } else {
        // add the new address to the array
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({ success: true, user });
    } catch (error) {
      next(new ErrorHandler(error.response.data, 500));
      return;
    }
  })
);

// Update User Password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password Is Incorrect", 400));
      }
      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password Doesn't Match", 400));
      }
      user.password = req.body.newPassword;
      await user.save();
      res
        .status(200)
        .json({ success: true, user, message: "password updated" });
    } catch (error) {
      next(new ErrorHandler(error.response.data, 500));
      return;
    }
  })
);

//Get User Info
router.get(
  "/user-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      next(new ErrorHandler(error.response.data, 500));
      return;
    }
  })
);
//Log Out User

router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res?.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({ success: true, message: "Log Out Successful!" });
    } catch (error) {
      next(new ErrorHandler(error.response.data, 500));
    }
  })
);

module.exports = router;
