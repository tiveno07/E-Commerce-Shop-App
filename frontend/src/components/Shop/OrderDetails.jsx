import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserShop } from "../../redux/order/orderSlice";
import { backend_url, server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

export const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { seller } = useSelector((state) => state?.seller);
  const sellers = seller?.seller?._id;
  const [status, setStatus] = useState("");
  const [orders, setOrders] = useState("");

  const { id } = useParams();
  const { shoporder } = useSelector((state) => state?.ordered);
  const shopId = shoporder?.orders;
  useEffect(() => {
    dispatch(getUserShop(sellers));
  }, [dispatch, sellers]);
  const data = shopId && shopId?.find((item) => item?._id === id);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}order/update-order-status/${id}`,
        { status },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data.orders);
        navigate("/dashboard-orders");
        toast.success("Order Updated!");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const refundOrderHandler = async (e) => {
    await axios
      .put(
        `${server}order/order-refund-success/${id}`,
        { status },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data.orders);
        navigate("/dashboard-orders");
        toast.success("Order Updated!");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className={`${styles.section} py-4 min-h-screen`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !bg-white !rounded-[4px] text-[#e94568] font-[600] !h-[45px] text-[18px]`}
          >
            Order List
          </div>
        </Link>
      </div>
      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000085]">
          Order Id: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000085]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>
      {/*Order Item */}
      <br />
      <br />
      {data &&
        data?.cart?.map((item, index) => (
          <div className="w-full flex items-start mb-5">
            <img
              src={`${backend_url}${item?.images[0]}`}
              className="w-[80px] h-[80px]"
              alt=""
            />

            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item?.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                US${item?.discountPrice} * {item?.qty}
              </h5>
            </div>
          </div>
        ))}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[19px]">
          Total Price <strong>US$ {data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress?.addresses1 +
              " " +
              data?.shippingAddress?.addresses2}
          </h4>
          <h4 className="text-[20px]">{data?.shippingAddress?.country}</h4>
          <h4 className="text-[20px]">{data?.shippingAddress?.city}</h4>
          <h4 className="text-[20px]">{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
        </div>
      </div>
      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Order status:</h4>
      {data?.status !== "Processing refund" &&
        data?.status !== "Refund Success" && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {[
              "Processing",
              "Transferred to delivery partner",
              "Shipping",
              "Received",
              "On the way",
              "Delivered",
            ]
              .slice(
                [
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                ].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        )}

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
      >
        {["Processing refund", "Refund Success"]
          .slice(["Processing refund", "Refund Success"].indexOf(data?.status))
          .map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
      </select>
      <div
        onClick={
          orders?.status !== "Processing refund"
            ? orderUpdateHandler
            : refundOrderHandler
        }
        className={`${styles.button} mt-5 !bg-white !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[17px]`}
      >
        Update Status
      </div>
    </div>
  );
};
