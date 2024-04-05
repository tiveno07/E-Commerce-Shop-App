import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

export const DashboardHero = () => {
  const { allProducts } = useSelector((state) => state.product);
  const [deleiveredOrder, setDeleiveredOrder] = useState(null);
  const [orderSeller, setOrderSeller] = useState(null);
  const [orderUser, setOrderUser] = useState(null);
  const { user } = useSelector((state) => state.user);
  const userId = user?.user?._id;
  const { seller } = useSelector((state) => state.seller);
  const sellers = seller?.seller?._id;
  const allProduct = allProducts?.allProducts;

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
            <Link to={`/user/order/${params.id}`}>
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

  orderSeller &&
    orderSeller?.forEach((item) => {
      row.push({
        id: item?._id,
        itemsQTY: item?.cart?.length,
        total: "US$" + item?.totalPrice,
        status: item?.status,
      });
    });

  return (
    <div className="w-full p-8">
      <h3 className="text-[24px] text-[600] font-Poppins pb-2">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={32}
              className="mr-2"
              fill="#000000085"
            />
            <h3
              className={`${styles.productTitle} !item-[18px] leading-5 !font-[500] text-[#00000085]`}
            >
              Account Balance{" "}
              <span className="text-[17px]">(With 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            N {availableBalance}
          </h5>
          <Link to="/dashboard-withdraw">
            <h5 className="pt-4 pl-2  text-[#077f9c]">Withdraw Money</h5>
          </Link>
        </div>
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={32}
              className="mr-2"
              fill="#000000085"
            />
            <h3
              className={`${styles.productTitle} !item-[18px] leading-5 !font-[500] text-[#00000085]`}
            >
              All Orders <span className="text-[17px]"></span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {orderSeller && orderSeller?.length}
          </h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2  text-[#077f9c]">View Orders</h5>
          </Link>
        </div>
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={32} className="mr-2" fill="#000000085" />
            <h3
              className={`${styles.productTitle} !item-[18px] leading-5 !font-[500] text-[#00000085]`}
            >
              All Product <span className="text-[17px]"></span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {allProduct && allProduct?.length}
          </h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
      </div>

      <br />
      <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
      <div className="w-full min-h-[45vh] bg-white rounded">
        <div className="pl-8 pt-1">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    </div>
  );
};
