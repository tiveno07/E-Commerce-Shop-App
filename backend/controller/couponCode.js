const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Event = require("../model/events");
const Product = require("../model/product");
const Shop = require("../model/shop");
const CouponCode = require("../model/coupon");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const fs = require("fs");

//Create Coupon
router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    // try {
    //   const shopId = req.body.shopId;
    //   const shop = await Shop.findById(shopId);
    //   if (!shop) {
    //     return next(new ErrorHandler("ShopId is inValid", 400));
    //   } else {
    //     const isCouponAlreadyExist = await CouponCode.find({
    //       name: req.body.name,
    //     });

    //     if (isCouponAlreadyExist?.length !== 0) {
    //       return next(new ErrorHandler("Coupon Exist Already", 400));
    //     }
    //     const couponData = req.body;
    //     couponData.shop = shop;
    //     const couponCode = await CouponCode.create(couponData);

    //     res.status(201).json({
    //       success: true,
    //       couponCode,
    //     });
    //   }
    // } catch (error) {
    //   return next(new ErrorHandler(error, 400));
    // }
    try {
      const isCouponCodeExists = await CouponCode.find({ name: req.body.name });

      if (isCouponCodeExists.length !== 0) {
        return next(new ErrorHandler("Coupon code already exist!", 400));
      }

      const couponCode = await CouponCode.create(req.body);
      res.status(201).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//Get  Coupons
router.get(
  "/get-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CouponCode.find({
        shop: { _id: req.params.id },
      });
      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//Get Coupon Code Value By Its Name
router.get(
  "/get-coupon-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CouponCode.findOne({ name: req.params.name });

      console.log(couponCode);
      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
