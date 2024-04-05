const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Event = require("../model/events");
const Product = require("../model/product");
const Shop = require("../model/shop");
const { upload, productImgResize } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const fs = require("fs");
const { cloudinaryUploadImg } = require("../utils/cloudinary");

// Create Event
router.post(
  "/create-event",
  // productImgResize,
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("ShopId is inValid", 400));
      } else {
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
        const eventData = req.body;
        eventData.images = urls.map((file) => {
          return file;
        });
        eventData.shop = shop;

        const event = await Event.create(eventData);

        res.status(201).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//Get All Event
router.get(
  "/get-all-events/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//Get All Event
router.get("/get-all-event", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});
//Delete Event
router.delete(
  "/delete-shop-event/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const eventData = await Event.findById(productId);

      eventData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `upload/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const event = await Event.findByIdAndDelete(productId);

      if (!event) {
        return next(new ErrorHandler("Event not found with this id", 400));
      }

      res.status(201).json({
        success: true,
        message: "Event deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;
