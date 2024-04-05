import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { ProductDetailsCard } from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishList,
  removeFromWishlist,
} from "../../../redux/wishList/wishListSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/reducer/cartSlice";
import { Rating } from "../../Product/Rating";
import { Loading } from "../../Loading/Loading";

export const ProductCard = ({ data, isEvent, key, isLoading }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state?.wishlist);
  const { cart } = useSelector((state) => state?.cart);

  useEffect(() => {
    if (wishlist && wishlist?.find((i) => i._id === data?._id)) {
      return setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data?._id]);

  const removeFromWishListHandler = (data) => {
    dispatch(removeFromWishlist(data));
    setClick(!click);
  };

  const addToWishListHandler = (data) => {
    setClick(!click);
    dispatch(addToWishList(data));
    toast.success("Wishlist added to cart");
  };

  const addToCartHandler = (id) => {
    const itemExist = cart && cart?.find((i) => i?._id === id);
    if (itemExist) {
      return toast.error("Item already exist");
    } else {
      if (data?.stock < 1) {
        return toast.error("Product stock limited");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart");
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <div
          key={key}
          className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer"
        >
          <div className="flex justify-end"></div>
          <Link to={`${`/products/${data?._id}`}`}>
            <div className="w-full">
              <img
                src={`${data && data?.images[0]?.url}`}
                alt=""
                className="w-full h-[190px] object-cover"
              />
            </div>
          </Link>
          <Link to={`/shop/${data?.shop._id}`}>
            <h5 className={`${styles.shop_name}`}>{data?.shop?.name}</h5>
          </Link>
          <Link
            to={`${
              isEvent === true
                ? `/products/${data?._id}?isEvent=true`
                : `/products/${data?._id}`
            }`}
          >
            <h4 className="pb-3 font-[500]">
              {data?.name?.length > 40
                ? data?.name.slice(0, 40) + "....."
                : data?.name}
            </h4>
            <div className="flex">
              <Rating rating={data?.ratings} />
            </div>
            <div className="py-2 flex items-center justify-between">
              <div className="flex">
                <h5 className={`${styles.productDiscountPrice}`}>
                  {data?.discountPrice === 0
                    ? data?.discountPrice
                    : data?.discountPrice}
                  $
                </h5>
                <h4 className={`${styles.price}`}>
                  {data?.discountPrice ? data?.discountPrice + "$" : null}
                </h4>
              </div>
              <span className="font-[400] text-[18px] text-[#68d284]">
                {data?.sold_out} Sold
              </span>
            </div>
          </Link>

          {/* Side Option*/}
          <div>
            {click ? (
              <AiFillHeart
                size={25}
                className="cursor-pointer absolute right-2 top-5"
                onClick={() => removeFromWishListHandler(data)}
                color={click ? "red" : "red"}
                title="Remove From WishList"
              />
            ) : (
              <AiOutlineHeart
                size={25}
                className="cursor-pointer absolute right-2 top-5"
                onClick={() => addToWishListHandler(data)}
                color={click ? "red" : "red"}
                title="Add To WishList"
              />
            )}
            <AiOutlineEye
              size={25}
              className="cursor-pointer absolute right-2 top-14"
              onClick={() => setOpen(!open)}
              color="red"
              title="Quick View"
            />
            <AiOutlineShoppingCart
              size={25}
              className="cursor-pointer absolute right-2 top-24"
              onClick={() => addToCartHandler(data?._id)}
              color="red"
              title="Add To Cart"
            />
            {open ? (
              <ProductDetailsCard open={open} setOpen={setOpen} data={data} />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};
