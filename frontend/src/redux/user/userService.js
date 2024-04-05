import axios from "axios";
import { server } from "../../server";

//load user
const loadUser = async () => {
  const response = await axios.get(`${server}user/getuser`, {
    withCredentials: true,
  });
  if (response.data) {
    return response.data;
  }
};

//Update User Address
const UpdateUserAddress = async ({
  country,
  zipCode,
  city,
  address1,
  address2,
  addressType,
}) => {
  const response = await axios.put(
    `${server}user/update-user-addresses`,
    { country, zipCode, city, address1, address2, addressType },
    {
      withCredentials: true,
    }
  );
  if (response.data) {
    return response.data;
  }
};

//Delete User Address
const deleteUserAddress = async (id) => {
  const response = await axios.delete(
    `${server}user/delete-user-addresses/${id}`,
    {
      withCredentials: true,
    }
  );
  if (response.data) {
    return response.data;
  }
};

export const userService = {
  loadUser,
  UpdateUserAddress,
  deleteUserAddress,
};
