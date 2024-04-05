const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  cart: {
    type: Array,
    require: true,
  },
  shippingAddress: {
    type: Object,
    require: true,
  },
  user: {
    type: Object,
    require: true,
  },
  totalPrice: {
    type: Number,
    require: true,
  },
  status: {
    type: String,
    default: "Processing",
  },
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
    default: Date.now(),
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", orderSchema);
