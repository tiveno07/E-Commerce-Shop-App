import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProduct } from "../../redux/product/productSlice";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import {
  AiOutlineArrowRight,
  AiOutlineDelete,
  AiOutlineEye,
} from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import styles from "../../styles/styles";
import axios from "axios";
import { backend_url, server } from "../../server";
import { toast } from "react-toastify";

export const AllOrders = () => {
  const dispatch = useDispatch();
  const { shoporder } = useSelector((state) => state?.ordered);
  const { seller } = useSelector((state) => state?.seller);
  const [orders, setOrders] = useState(null);

  const order = shoporder?.orders;
  console.log(order);
  const sellers = seller?.seller?._id;

  useEffect(() => {
    try {
      axios
        .get(`${server}order/get-seller-all-orders/${sellers}`)
        .then((response) => {
          console.log(response.data.orders);
          setOrders(response.data.orders);
          toast.success("Order updated successfully");
          return null;
        });
    } catch (error) {
      console.log(error);
    }
  }, [sellers]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQTY",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  const row = [];

  orders &&
    orders?.forEach((item) => {
      row.push({
        id: item?._id,
        itemsQTY: item?.cart?.length,
        total: "US$" + item?.totalPrice,
        status: item?.status,
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
