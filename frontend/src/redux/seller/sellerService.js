import axios from "axios";
import { server } from "../../server";

//load Seller
const loadSeller = async () => {
  const response = await axios.get(`${server}shop/getSeller`, {
    withCredentials: true,
  });
  if (response.data) {
    return response.data;
  }
};

export const sellerService = {
  loadSeller,
};
