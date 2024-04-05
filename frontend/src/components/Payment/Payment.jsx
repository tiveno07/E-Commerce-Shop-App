import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "../../styles/styles";
import {
  CardCvcElement,
  CardNumberElement,
  useStripe,
  useElements,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state?.user);
  const userData = user?.user;
  console.log(userData);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency: "usd",
              value: orderData?.totalPrice,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer sk_test_51OsWm5P9nOTdPUUUzcph8vSRq2A4qtWMig1gXn9OazqLaXUsWQqPQ0SeI7ZhJNVMxCCdxrFWe15uDl8NXMPCzIua007rAosKuM`,
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    await axios
      .post(`${server}order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        // navigate("/order/success");
        toast.success("order Successfully!");
        localStorage.setItem("latestOrder", JSON.stringify({}));
      });
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData && orderData?.shippingAddress,
    user: userData && userData,
    totalPrice: orderData?.totalPrice,
  };

  const paymentData = () => {
    Math.round(orderData?.totalPrice * 100);
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer sk_test_51OsWm5P9nOTdPUUUzcph8vSRq2A4qtWMig1gXn9OazqLaXUsWQqPQ0SeI7ZhJNVMxCCdxrFWe15uDl8NXMPCzIua007rAosKuM`,
        },
      };

      const { data } = await axios.post(
        `${server}payment/process`,
        paymentData,
        config
      );
      console.log(data);

      const client_secret = data?.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe?.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements?.getElement(CardNumberElement),
        },
      });
      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result?.paymentIntent?.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };

          await axios
            .post(`${server}order/create-order`, order, config)
            .then((res) => {
              setOpen(false);
              // navigate("/order/success");
              toast.success("order Successfully!");
              localStorage.setItem("latestOrder", JSON.stringify({}));
            });
        }
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
    //
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;
      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo, details);
      }
    });
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    await axios
      .post(`${server}order/create-order`, order, config)
      .then((res) => {
        console.log(res.data.orders);
        setOpen(false);
        navigate("/order/success");
        toast.success("order Successfully!");
        localStorage.setItem("latestOrder", JSON.stringify({}));
      });
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            userData={userData}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  userData,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(1);
  const navigate = useNavigate();

  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      {/*select buttons*/}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            onClick={() => setSelect(1)}
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
          >
            {select === 1 ? (
              <div className="w-[13px] h-[14px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay With Debit/Credit Card
          </h4>
        </div>

        {/*Pay With Card*/}
        {select === 1 ? (
          <div className="w-full flex border-b">
            <div className="w-full" onSubmit={paymentHandler}>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block">Name On Card</label>
                  <input
                    className={`${styles.input} !w-[95%] text-[#444]`}
                    value={userData && userData?.name}
                    placeholder={userData && userData?.name}
                    required
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block">Exp Date</label>
                  <CardExpiryElement
                    className={`${styles.input}`}
                    options={{
                      styles: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Card Number</label>
                  <CardNumberElement
                    className={`${styles.input} !h-[35px] !w-[95%]`}
                    options={{
                      styles: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">CVV</label>
                  <CardCvcElement
                    className={`${styles.input}`}
                    options={{
                      styles: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
                {/* <div className="w-[50%]">
                  <label className="block pb-2">Paypal Email</label>
                  <input required className={`${styles.input}`} />
                </div> */}
              </div>
              <input
                type="submit"
                value="submit"
                onClick={paymentHandler}
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </div>
          </div>
        ) : null}

        <br />

        {/*Paypal Payment */}
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            onClick={() => setSelect(2)}
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
          >
            {select === 2 ? (
              <div className="w-[13px] h-[14px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay With Paypal
          </h4>
        </div>
        {/*Pay With Card */}
        {select === 2 ? (
          <div className="w-full flex border-b">
            <form className="w-full" onSubmit={paymentHandler}>
              <div
                className={`${styles.button} !bg-[#f63b60] text-white h-[45px]
             rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                onClick={() => setOpen(true)}
              >
                Pay Now
              </div>
              {open && (
                <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                  <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 overflow-y-scroll relative">
                    <div className="w-full flex justify-end ">
                      <RxCross1
                        size={30}
                        className="cursor-pointer absolute right-3 top-3"
                        onClick={() => setOpen(false)}
                      />
                    </div>
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "AVvnGwSwy60-vv4BWDiJL9q0X88sqxYx7eFuH8o7KTB36Pi3ljbPjFDNinhonvuRig9nDjJWuB-CVk0l",
                      }}
                    >
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        onApprove={onApprove}
                        createOrder={createOrder}
                      />
                    </PayPalScriptProvider>
                  </div>
                </div>
              )}
            </form>
          </div>
        ) : null}
        <br />

        {/* Cash On Delivery*/}
        <div>
          <div className="flex w-full pb-5 border-b mb-2">
            <div
              className="relative flex items-center justify-center bg-transparent w-[25px] h-[25px] rounded-full border-[3px]"
              onClick={() => setSelect(3)}
            >
              {select === 3 ? (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
              ) : null}
            </div>
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
              Cash On Delivery
            </h4>
          </div>

          {/* Cash On Delivery*/}
          {select === 3 ? (
            <div className="w-full flex">
              <form
                action=""
                className="w-full"
                onSubmit={cashOnDeliveryHandler}
              >
                <input
                  type="submit"
                  value="Confirm"
                  className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                />
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  return (
    <div className="w-full bg-white rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
        <h3 className="text-[18px] font-[600]">$ {orderData?.subTotalPrice}</h3>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
        <h3 className="text-[18px] font-[600]">
          $ {orderData?.shipping ? orderData?.shipping : "-"}
        </h3>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h3 className="text-[18px] font-[600]">
          $ {orderData?.discountPrice ? orderData?.discountPrice : "-"}
        </h3>
      </div>
      <div className="flex justify-between items-center mt-5">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">
          Total Price:
        </h3>
        <h5 className="text-[18px] font-[600]">$ {orderData?.totalPrice}</h5>
      </div>
      <br />
    </div>
  );
};
