import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/wishList/wishListSlice";
import { addToCart } from "../../redux/reducer/cartSlice";
import { backend_url } from "../../server";

export const WishList = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state?.wishlist);
  const dispatch = useDispatch();

  const removeFromWishListHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addToCart(newData));
    setOpenWishlist(false);
  };
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 transition duration-0">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {wishlist && wishlist?.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h4>Wishlist Empty Is Empty!</h4>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={26}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              {/*Item Length*/}
              <div className={`${styles.normalFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist && wishlist?.length} Items
                </h5>
              </div>
              {/*Cart Single Items*/}
              <br />
              <div className="w-full border-t">
                {wishlist &&
                  wishlist?.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      addToCartHandler={addToCartHandler}
                      removeFromWishListHandler={removeFromWishListHandler}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, addToCartHandler, removeFromWishListHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data?.discountPrice * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex item-center">
        <RxCross1
          size={29}
          className="cursor-pointer"
          onClick={() => removeFromWishListHandler(data)}
        />
        <img
          src={`${backend_url}${data?.images[0]}`}
          alt=""
          className="w-[130px] h-min mr-2 rounded-[5px] ml-2"
        />
        <div className="pl-[5px]">
          <h1>{data?.name}</h1>

          <h4 className="font-[600] text-[17px] pt-[3px] text-[red] font-Roboto">
            US$ {totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add To Cart"
            onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};
