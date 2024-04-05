import axios from "axios";
import { server } from "../../server";

// get all orders of a user
export const getAllOrdersOfUser = async (userId) => {
  try {
    const response = await axios.get(`${server}order/get-all-orders/${userId}`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

// get all orders to a Seller
export const getAllOrdersShop = async (shopId) => {
  try {
    const response = await axios.get(
      `${server}order/get-seller-all-orders/${shopId}`
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const orderService = {
  getAllOrdersOfUser,
  getAllOrdersShop,
};
