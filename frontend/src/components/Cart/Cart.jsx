import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import { addToCart, removeFromCart } from "../../redux/reducer/cartSlice";
import { toast } from "react-toastify";

export const Cart = ({ setOpenCart }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state?.cart);

  const handleRemoveFromCart = (data) => {
    dispatch(removeFromCart(data));
  };

  const quantityChangerHandler = (data) => {
    dispatch(addToCart(data));
  };

  const totalPrice = cart?.reduce((acc, item) => {
    return acc + item?.qty * item?.discountPrice;
  }, 0);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 transition duration-0">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {cart && cart?.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h4>Cart Empty Is Empty!</h4>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/*Item Length*/}
              <div className={`${styles.normalFlex} p-4`}>
                <IoBagHandleOutline size={30} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart && cart?.length} Items
                </h5>
              </div>
              {/*Cart Single Items*/}
              <br />
              <div className="w-full border-t">
                {cart &&
                  cart?.map((i, index) => (
                    <CartSingle
                      quantityChangerHandler={quantityChangerHandler}
                      handleRemoveFromCart={() => handleRemoveFromCart(i)}
                      key={index}
                      data={i}
                    />
                  ))}
              </div>
            </div>

            <div className="px-5 mb-3">
              {/*Checkbox Buttons*/}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[19px] font-[600]">
                    Checkout Now (USSD {totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangerHandler, handleRemoveFromCart }) => {
  const [value, setValue] = useState(data?.qty);
  const totalPrice = data?.discountPrice * value;
  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue((value) => value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangerHandler(updateCartData);
    }
  };
  const decrement = (data) => {
    setValue((value) => (value === 1 ? 1 : value - 1));
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangerHandler(updateCartData);
  };

  return (
    <div className="border-b p-4">
      <div className="w-full items-center flex justify-between">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={19} color="#fff" />
          </div>
          <span className="pl-[10px]">{data.qty}</span>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={19} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${data && data?.images[0]?.url}`}
          alt=""
          className="w-[80px] h-[80px] ml-2"
        />
        <div className="pl-[5px]">
          <h1>{data?.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            $ {data?.discountPrice} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[red] font-Roboto">
            US$ {totalPrice}
          </h4>
        </div>
        <RxCross1
          size={34}
          onClick={() => handleRemoveFromCart(data?.id)}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
