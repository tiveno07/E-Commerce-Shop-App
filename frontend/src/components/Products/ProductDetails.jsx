import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import {
  addToWishList,
  removeFromWishlist,
} from "../../redux/wishList/wishListSlice";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/reducer/cartSlice";
import axios from "axios";
import { Rating } from "../Product/Rating";

export const ProductDetails = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const { wishlist } = useSelector((state) => state?.wishlist);
  const { cart } = useSelector((state) => state?.cart);
  const { user, isSuccess } = useSelector((state) => state?.user);
  const { seller } = useSelector((state) => state?.seller);
  const { allProducts } = useSelector((state) => state?.product);
  const products = allProducts && allProducts?.allProducts;
  const users = user?.user;
  const sellers = seller?.seller;

  console.log(data);
  useEffect(() => {
    if (wishlist && wishlist?.find((i) => i._id === data?._id)) {
      return setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishListHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
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
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart");
      }
    }
  };

  const increaseCount = () => {
    setCount((count) => count + 1);
  };
  const decreaseCount = () => {
    setCount((count) => (count === 1 ? 1 : count - 1));
  };

  const totalReviewLength =
    products &&
    products?.reduce((acc, product) => acc + product?.reviews?.length, 0);

  const totalRatings =
    products &&
    products?.reduce(
      (acc, product) =>
        acc +
        product?.reviews?.reduce((sum, review) => sum + review?.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewLength || 0;

  const handleMessageSubmit = async () => {
    if (isSuccess) {
      const groupTitle = data?._id + users?._id;
      const userId = users?._id;
      const sellerId = sellers?._id;
      await axios
        .post(`${server}conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/conversation/${res?.data?.conversation?._id}`);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          toast.error(err.response.data.message);
        });
    } else {
      toast.error("Please Login To Create Conversation");
    }
  };
  console.log(data, "vdv");
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full gap-20 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <div className="w-full h-[400px]">
                  <img
                    src={`${data && data?.images[select]?.url}`}
                    alt=""
                    className="w-full h-[45vh]"
                  />
                </div>

                <div className="w-full">
                  <div
                    className={`${
                      select === 0 ? "null" : "null"
                    } cursor-pointer`}
                  >
                    <div className="flex">
                      {data &&
                        data?.images.map((i, index) => (
                          <div
                            className={`${
                              select === 0 ? "border" : "null"
                            } cursor-pointer`}
                          >
                            <img
                              src={`${i?.url}`}
                              alt=""
                              className="h-[200px]  w-[300px]  overflow-hidden"
                              onClick={() => setSelect(index)}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data?.name}</h1>
                <p>{data?.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data?.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data?.discountPrice ? data?.discountPrice + "$" : null}
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
                  onClick={() => addToCartHandler(data?._id)}
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                >
                  <span className="text-white flex items-center">
                    Add To Cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>

                <div className="flex items-center pt-8">
                  <Link to={`/shop/${data?.shop._id}`}>
                    <img
                      src={`${backend_url}${data && data?.shop?.avatar}`}
                      className="w-[50px] h-[50px] rounded-full mr-2"
                      alt=""
                    />
                  </Link>
                  <Link to={`/shop/${data?.shop._id}`}>
                    <div className="pr-8">
                      <h3 className={`${styles.shop_name}pb-1 pt-1`}>
                        {data?.shop?.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        ({averageRating}/5) Ratings
                      </h5>
                    </div>
                  </Link>
                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 rounded h-11`}
                    // onClick={}
                  >
                    <span
                      className="text-white flex items-center"
                      onClick={handleMessageSubmit}
                    >
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Information*/}
          <ProductDetailsInfo
            data={data}
            allProducts={allProducts}
            averageRating={averageRating}
            totalReviewLength={totalReviewLength}
          />
          <br />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  allProducts,
  averageRating,
  totalReviewLength,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={`text-[#000] text-[19px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]`}
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>

        <div className="relative">
          <h5
            className={`text-[#000] text-[19px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]`}
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={`text-[#000] text-[19px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]`}
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>

      {active === 1 ? (
        <>
          <p className="py-2 text-[19px] leading-8 pb-10 whitespace-pre-line"></p>
          <p className="py-2 text-[19px] leading-8 pb-10 whitespace-pre-line">
            {data?.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col mt-3 items-center">
          {data &&
            data?.reviews?.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={`${backend_url}${item?.user?.user?.avatar}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-2">
                  <div className="w-full flex items-center">
                    <div className="font-[500] mr-3">
                      {item?.user?.user?.name}
                    </div>
                    <Rating rating={data?.ratings} />
                  </div>
                  <p className="w-full">{item?.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data?.reviews?.length === 0 && (
              <h5>No Reviews have for this products!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 ? (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/${data?._id}`}>
              <div className="flex items-center">
                <img
                  src={`${backend_url}${data?.shop?.avatar}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data?.shop?.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({averageRating}/5 Ratings)
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">{data?.shop?.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <div className="font-[600]">
                Joined On:{" "}
                <span className="font-[500]">
                  {data?.createdAt?.slice(0, 10)}
                </span>
              </div>
              <div className="font-[600]">
                Total Product:{" "}
                <span className="font-[500]">
                  {allProducts.allProducts.length}
                </span>
              </div>
              <div className="font-[600]">
                Total Reviews:{" "}
                <span className="font-[500]">{totalReviewLength}</span>
              </div>
              <Link to="/">
                <div
                  className={`${styles.button} rounded-[4px] h-[39.5px] mt-3`}
                >
                  <h4 className="text-white"> Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
