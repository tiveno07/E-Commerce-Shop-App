const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Event Product Name"],
  },
  description: {
    type: String,
    required: [true, "Please Enter Your Event Product Description"],
  },
  category: {
    type: String,
    required: [true, "Please Enter Your Event Category"],
  },
  tags: {
    type: String,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please Enter Your Event Product Price"],
  },
  originalPrice: {
    type: Number,
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Your Event Stock"],
  },
  images: [],
  shopId: {
    type: String,
    required: true,
  },
  start_Date: {
    type: Date,
    required: true,
  },
  Finish_Date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "Running",
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Events", eventSchema);
