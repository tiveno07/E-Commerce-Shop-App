import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProduct } from "../../redux/product/productSlice";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import styles from "../../styles/styles";

export const AllProducts = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state?.product);
  const { seller } = useSelector((state) => state?.seller);

  const product = allProducts?._id;
  console.log(product);
  const sellers = seller?.seller?._id;

  useEffect(() => {
    dispatch(getProduct(sellers));
  }, [dispatch, sellers]);

  const handleDelete = (id) => {
    dispatch(deleteAProduct(id));
    window.location.reload();
  };
  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 158, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 100, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 80, flex: 0.6 },
    { field: "Stock", headerName: "Stock", minWidth: 137, flex: 0.5 },
    { field: "sold", headerName: "Sold Out", minWidth: 150, flex: 0.6 },
    {
      field: "Preview",
      flex: 0.6,
      minWidth: 120,
      type: "number",
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.name;
        const product_name = d?.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${product_name}`}>
              <AiOutlineEye size={29} />
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.6,
      minWidth: 120,
      type: "number",
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link>
              <Button onClick={() => handleDelete(params?.id)}>
                <AiOutlineDelete size={29} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  allProducts?.allProducts &&
    allProducts?.allProducts.forEach((item) => {
      row.push({
        id: item?._id,
        name: item?.name,
        price: "US$" + item?.discountPrice,
        Stock: item?.stock,
        sold: item?.sold_out,
      });
    });

  return (
    <div className="w-full mx-6 pt-1 mt-10 bg-white">
      <div className="w-full flex justify-end">
        <div
          className={`${styles.button} px-2 mr-3 !w-max !h-[45px] !rounded-[5px] mb-3`}
        >
          <span className="text-white">Create Coupon Code</span>
        </div>
      </div>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};
