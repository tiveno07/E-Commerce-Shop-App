import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/reducer/cartSlice";
import {
  addToWishList,
  removeFromWishlist,
} from "../../../redux/wishList/wishListSlice";
import { backend_url } from "../../../server";

export const ProductDetailsCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(false);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state?.cart);
  const handleMessageSubmit = () => {};
  const { wishlist } = useSelector((state) => state?.wishlist);

  const addToCartHandler = (id) => {
    const itemExist = cart && cart?.find((i) => i?._id === id);
    if (itemExist) {
      return toast.error("Item already exist");
    } else {
      if (data?.stock < count) {
        return toast.error("Product stock limited");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart");
      }
    }
  };
  const decreaseCount = () => {
    if (count > 6) {
      setCount((count) => count - 1);
    }
  };

  const increaseCount = () => {
    setCount((count) => count + 1);
  };

  useEffect(() => {
    if (wishlist && wishlist?.find((i) => i._id === data?._id)) {
      return setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data?._id]);

  const removeFromWishListHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishListHandler = (data) => {
    setClick(!click);
    dispatch(addToWishList(data));
    toast.success("Wishlist added to cart");
  };

  console.log(data);
  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000003] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 z-50"
              onClick={() => setOpen(false)}
            />
            <div className="block w-full 800px:flex">
              <div className=" w-full 800px:w-[50%]">
                <img src={`${data && data?.images[0]?.url}`} alt="" />
                <div className="flex">
                  <img
                    src={`${backend_url}${data?.shop?.shop_avatar}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>
                      {data?.shop?.name}
                    </h3>
                    <h5 className="pb-3 text-[15px]">
                      ( {data?.shop?.rating}) Ratings
                    </h5>
                  </div>
                </div>
                <div
                  className={`${styles.button} bg-black mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5">
                  ({data?.total_sold}) Sold Out
                </h5>
              </div>
              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[3px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data?.name}
                </h1>
                <p>{data?.description}</p>

                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data?.discount_price}
                  </h4>
                  <h3 className={`${styles?.price}`}>
                    {data?.price ? data?.price + "$" : null}
                  </h3>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      onClick={decreaseCount}
                      className="bg-gradient-to-r from-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      onClick={increaseCount}
                      className="bg-gradient-to-r from-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    >
                      +
                    </button>
                  </div>

                  {click ? (
                    <AiFillHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => removeFromWishListHandler(data)}
                      color={click ? "red" : "#333"}
                      title="Remove From WishList"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => addToWishListHandler(data)}
                      color={click ? "red" : "#333"}
                      title="Add To WishList"
                    />
                  )}
                </div>
                <div
                  onClick={() => addToCartHandler(data)}
                  className={`${styles.button} mt-8 rounded h-11 flex items-center`}
                >
                  <span className="text-[#fff] flex items-center">
                    Add To Cart <AiOutlineShoppingCart className="mt-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
