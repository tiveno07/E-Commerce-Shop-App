import React, { useEffect } from "react";
import styles from "../../../styles/styles";
import { CountDown } from "./CountDown.jsx";
import Iphone from "../../../Assests/iPhone_15_Pink_PDP_Image_Position-1__WWEN_ccc4bbdc-e666-47f3-82de-5e0866866f11_800x.webp";
import { backend_url } from "../../../server.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvent } from "../../../redux/event/eventSlice.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/reducer/cartSlice.js";

export const EventCard = ({ active }) => {
  const dispatch = useDispatch();
  const { allEvent, isLoading } = useSelector((state) => state?.events);
  const { cart } = useSelector((state) => state?.cart);

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart?.find((i) => i?._id === data?._id);
    if (isItemExists) {
      toast.error("Item already exists");
    } else {
      if (data?.stock < 1) {
        toast.error("Product stock limited");
      } else {
        const cartData = {
          ...data,
          qty: 1,
        };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart");
      }
    }
  };
  const event = allEvent?.events[0];
  return (
    <div>
      {!isLoading && (
        <div
          className={`w-full block bg-white rounded-lg ${
            active ? "unset" : "mb-12"
          } lg:flex p-2`}
        >
          <div className="w-full lg:w-[50%] m-auto">
            <img src={`${event && event?.images[0]?.url}`} alt="" />
          </div>
          <div className="w-full lg:[w-50%] flex flex-col justify-center">
            <h2 className={`${styles.productTitle}`}>{event?.name}</h2>
            <p>{event?.description}</p>
            <div className="flex py-2 justify-between">
              <div className="flex">
                <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                  {event?.originalPrice}$
                </h5>
                <h5 className="font-bold text-[22px] text-[#333] font-Roboto">
                  {event?.discountPrice}$
                </h5>
              </div>
              <span className="pr-3 font-[500] text-[17px] text-[green]">
                120 sold
              </span>
            </div>
            <CountDown data={event} />
            <br />
            <div className="flex items-center">
              <Link to={`/events/${event?._id}`}>
                <div className={`${styles.button} text-[#fff]`}>
                  See Details
                </div>
              </Link>
              <div
                className={`${styles.button} text-[#fff] ml-5`}
                onClick={() => addToCartHandler(event)}
              >
                Add To Cart
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
