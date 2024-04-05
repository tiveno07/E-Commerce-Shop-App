import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrder } from "../redux/order/orderSlice";
import { backend_url, server } from "../server";
import styles from "../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

export const UserOrderDetails = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user);
  const users = user?.user?._id;
  console.log(user);
  console.log(users);
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const { ordered } = useSelector((state) => state?.ordered);
  const order = ordered?.order;
  console.log(order);
  useEffect(() => {
    dispatch(getUserOrder(users));
  }, [dispatch, users]);
  const data = order && order?.find((item) => item?._id === id);
  console.log(data);
  const orderUpdateHandler = (e) => {
    console.log("sdf");
  };
  console.log(data);
  console.log(order);

  const reviewHandler = async (e) => {
    await axios
      .put(
        `${server}product/create-new-reviews`,
        {
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Successfully");
        dispatch(getUserOrder(users));
        setComment("");
        setRating(null);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const refundHandler = async () => {
    await axios
      .put(`${server}order/order-refund/${id}`, {
        status: "Processing refund",
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <div className={`${styles.section} py-4 min-h-screen`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
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
            {item?.isReviewed || item?.status === "Delivered" ? null : (
              <div
                onClick={() => setOpen(true) || setSelectedItem(item)}
                className={`${styles.button} text-white`}
              >
                Write A Review
              </div>
            )}
          </div>
        ))}

      {/*Review PopUp*/}
      {open && (
        <div className="w-full fixed left-0 top-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
          <div className="w-[50%] h-min bg-white shadow rounded-md p-3">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h2 className="text-[32px] font-[500] font-Poppins text-center">
              Give A Review
            </h2>
            <br />
            <div className="w-full flex">
              <img
                src={`${backend_url}${selectedItem?.images[0]}`}
                className="w-[100px] h-[100px]"
                alt=""
              />
              <div className="pl-3 text-[25px]">{selectedItem?.name}</div>
            </div>
            <h4 className="pl-3 text-[20px]">
              US${selectedItem?.discountPrice} * {selectedItem?.qty}
            </h4>
            {/*Ratings*/}
            <h5 className="pl-3 text-[20px] font-[500]">
              Give A Ratings <span className="text-red-600">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5]?.map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={28}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={28}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3">
              <label htmlFor="" className="block text-[20px] font-[500]">
                Write A Comment
                <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
                  (optional)
                </span>
              </label>
              <textarea
                className="mt-2 w-[95%] border p-2 outline-none"
                name="comment"
                id=""
                cols="20"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="5"
                placeholder="How Was Your Product? Write Your Expression About It!"
              />
            </div>
            <div
              className={`${styles.button} text-white text-[20px] ml-3`}
              onClick={rating > 1 ? reviewHandler : null}
            >
              Submit
            </div>
          </div>
        </div>
      )}

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
              data?.shippingAddress?.addresses1}
          </h4>
          <h4 className="text-[20px]">{data?.shippingAddress?.country}</h4>
          <h4 className="text-[20px]">{data?.shippingAddress?.city}</h4>
          <h4 className="text-[20px]">{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          <h4>
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
          <br />
          {data && data?.status === "Delivered" && (
            <div
              onClick={refundHandler}
              className={`${styles.button} text-white`}
            >
              Give A Refund
            </div>
          )}
        </div>
      </div>
      <br />
      <Link to="/">
        <div className={`${styles.button} text-white`}>Send Message</div>
      </Link>
    </div>
  );
};
