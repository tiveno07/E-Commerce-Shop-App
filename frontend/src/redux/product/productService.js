import axios from "axios";
import { server } from "../../server";

//Create Product
const createProduct = async (newForm) => {
  const config = { headers: { "Content-Type": "multerpart/form-data" } };

  const response = await axios.post(
    `${server}product/create-product`,
    newForm,
    config
  );
  if (response.data) {
    return response.data;
  }
};

//Get Single Product
const getAProduct = async (id) => {
  const response = await axios.get(`${server}product/get-a-product/${id}`);
  if (response.data) {
    return response.data;
  }
};

//Get All Product
const getAllProduct = async () => {
  const response = await axios.get(`${server}product/get-all-product/`);
  if (response.data) {
    return response.data;
  }
};

//Delete Product
const deleteProduct = async (id) => {
  const response = await axios.delete(
    `${server}product/delete-shop-product/${id}`,
    { withCredentials: true }
  );
  if (response.data) {
    return response.data;
  }
};

export const productService = {
  createProduct,
  getAllProduct,
  deleteProduct,
  getAProduct,
};
