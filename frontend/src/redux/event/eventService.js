import axios from "axios";
import { server } from "../../server";

//Create Product
const eventProduct = async (newForm) => {
  const config = { headers: { "Content-Type": "multerpart/form-data" } };

  const response = await axios.post(
    `${server}event/create-event`,
    newForm,
    config
  );
  if (response.data) {
    return response.data;
  }
};

//Get A Product
const getAllEvents = async (id) => {
  const response = await axios.get(`${server}event/get-all-events/${id}`);
  if (response.data) {
    return response.data;
  }
};

//Get All Product
const getAllTheEvents = async () => {
  const response = await axios.get(`${server}event/get-all-event`);
  if (response.data) {
    return response.data;
  }
};
//Delete Product
const deleteEvent = async (id) => {
  const response = await axios.delete(
    `${server}event/delete-shop-event/${id}`,
    { withCredentials: true }
  );
  if (response.data) {
    return response.data;
  }
};

export const eventService = {
  eventProduct,
  getAllEvents,
  deleteEvent,
  getAllTheEvents,
};
