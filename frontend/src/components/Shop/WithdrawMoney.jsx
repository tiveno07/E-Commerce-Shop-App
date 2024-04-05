import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const WithdrawMoney = () => {
  const [orderSeller, setOrderSeller] = useState(null);
  const { user } = useSelector((state) => state.user);
  const userId = user?.user?._id;
  const { seller } = useSelector((state) => state.seller);
  const sellers = seller?.seller?._id;

  console.log(sellers, userId, "vcb");

  useEffect(() => {
    try {
      axios.get(`${server}order/get-all-orders/${sellers}`).then((response) => {
        setOrderSeller(response.data.order);
        toast.success("Order updated successfully");
        return null;
      });
    } catch (error) {
      console.log(error);
    }
  }, [userId, sellers]);

  console.log(orderSeller);

  const orderData =
    orderSeller && orderSeller?.filter((item) => item.status === "Delivered");

  const amountMadeMinusTax =
    orderData && orderData?.reduce((acc, item) => acc + item?.totalPrice, 0);
  console.log(amountMadeMinusTax);

  const serviceCharge = amountMadeMinusTax * 0.1;
  const availableBalance = amountMadeMinusTax - serviceCharge;

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] pb-4">
          Available Balance: $ {availableBalance}
        </h5>
        <div className={`${styles.button} text-white !h-[42px] !rounded`}>
          Withdraw
        </div>
      </div>
    </div>
  );
};
