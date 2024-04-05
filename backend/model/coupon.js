const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, " please enter your coupon name!"],
    unique: true,
  },
  value: {
    type: Number,
    require: true,
  },
  shopId: {
    type: String,
    required: true,
  },
  minAmount: {
    type: Number,
  },
  maxAmount: {
    type: Number,
  },
  shop: {
    type: Object,
    required: true,
  },
  selectedProduct: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("CouponCode", couponCodeSchema);
