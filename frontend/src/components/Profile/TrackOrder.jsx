import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

export const TrackOrder = () => {
  const [orders, setOrders] = useState(null);
  const { user } = useSelector((state) => state.user);
  const userId = user?.user?._id;
  const { id } = useParams();

  useEffect(() => {
    try {
      axios.get(`${server}order/get-all-orders/${userId}`).then((response) => {
        setOrders(response.data.order);
        toast.success("Order updated successfully");
        return null;
      });
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  const data = orders && orders?.find((item) => item?._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      {data && data?.status === "Processing" ? (
        <h1 className="text-[22px]">Your Order Is Processing In Shop</h1>
      ) : data?.status === "Transferred to delivery partner" ? (
        <h1 className="text-[22px]">
          Your Order Is On The Way For Delivery Partner
        </h1>
      ) : data?.status === "Shipping" ? (
        <h1 className="text-[22px]">
          Your Order Is Coming With Our Delivery Partner
        </h1>
      ) : data?.status === "Received" ? (
        <h1 className="text-[22px]">
          Your Order Is In Your City. Our Delivery Man Will Deliver It.
        </h1>
      ) : data?.status === "Delivered" ? (
        <h1 className="text-[22px]">Your Order Is Delivered</h1>
      ) : data?.status === "Processing refund" ? (
        <h1 className="text-[22px]">Your Refund Is Processing</h1>
      ) : data?.status === "Refund Success" ? (
        <h1 className="text-[22px]">Your Refund Is Successfully</h1>
      ) : null}
    </div>
  );
};
