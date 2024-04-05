const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Product Name"],
  },
  description: {
    type: String,
    required: [true, "Please Enter Your Product Description"],
  },
  category: {
    type: String,
    required: [true, "Please Enter Your Category"],
  },
  tags: {
    type: String,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please Enter Your Product Price"],
  },
  originalPrice: {
    type: Number,
  },
  qty: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Your Stock"],
  },
  images: [],
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  ratings: {
    type: Number,
  },
  shopId: {
    type: String,
    // required: true,
  },
  shop: {
    type: Object,
    // required: true,
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

module.exports = mongoose.model("Product", productSchema);
