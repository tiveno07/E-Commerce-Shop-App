import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loadASeller } from "../../redux/seller/sellerSlice";
import { useParams } from "react-router";
import { getProduct } from "../../redux/product/productSlice";
import { Link } from "@material-ui/core";

export const ShopInfo = ({ isOwner }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { allProducts } = useSelector((state) => state?.product);
  const products = allProducts && allProducts?.allProducts;

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

  useEffect(() => {
    dispatch(getProduct(id));
    setIsLoading(true);
    axios
      .get(`${server}shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  // console.log(data);

  const logoutHandler = async () => {
    await axios.get(`${server}shop/logout`, {
      withCredentials: true,
    });
    window.location.reload();
  };
  console.log(data, "sdfg");
  return (
    <div>
      <div className="w-full py-5">
        <div className="w-full flex items-center justify-center">
          <img
            src={`${data?.avatar[0]?.url}`}
            alt=""
            className="w-[250px] h-[250px] object-cover rounded-full rounded-[red]"
          />
        </div>
        <h3 className="text-center py-2 text-[20px]">{data?.name}</h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
          {data?.description}
        </p>
      </div>

      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h4 className="text-[#000000a6]">{data?.address}</h4>
      </div>

      <div className="p-3">
        <h5 className="font-[600]">Phone Number</h5>
        <h4 className="text-[#000000a6]">{data?.phoneNumber}</h4>
      </div>

      <div className="p-3">
        <h5 className="font-[600]">Total Product</h5>
        <h4 className="text-[#000000a6]">{products && products?.length}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Shop Ratings</h5>
        <h4 className="text-[#000000a6]">{averageRating}/5</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Joined On</h5>
        <h4 className="text-[#000000a6]">{data?.createdAt?.slice(0, 10)}</h4>
      </div>

      {isOwner && (
        <div className="py-3 px-4">
          <Link to="/settings">
            <div
              className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
            >
              <span className="text-white">Edit Shop</span>
            </div>
          </Link>
          <div
            className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
            onClick={logoutHandler}
          >
            <span className="text-white">Log Out</span>
          </div>
        </div>
      )}
    </div>
  );
};
