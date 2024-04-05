import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProduct } from "../../redux/product/productSlice";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

export const AllCoupons = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [category, setCategory] = useState(null);
  const [coupon, setCoupon] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(null);
  const { allProducts } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state?.seller);

  // const products = product;
  const products = allProducts?.allProducts;
  const sellers = seller?.seller?._id;

  useEffect(() => {
    dispatch(getProduct(sellers));
  }, [dispatch, sellers]);

  const handleDelete = (id) => {
    dispatch(deleteAProduct(id));
    // console.log(id);
    // window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shop: seller,
          shopId: seller.toString(),
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("coupon success");
        console.log(res.data);
        setOpen(false);
        setCoupon(res.data);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.message);
        console.log(error.response.message);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}coupon/get-coupon/${seller}`, { withCredentials: true })
      .then((res) => {
        setCoupon(res.data.couponCodes);
        setIsLoading(false);
        console.log(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.response.data.message);
      });
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 158, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 100, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 80, flex: 0.6 },
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
  coupon &&
    coupon?.forEach((item) => {
      row.push({
        id: item?._id,
        name: item?.name,
        price: item?.value + "%",
      });
    });

  return (
    <div className="w-full mx-6 pt-1 mt-10 bg-white">
      <div className="w-full flex justify-end">
        <div
          onClick={() => setOpen(true)}
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
      {open && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
          <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4">
            <div className="w-full flex justify-end">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-[30px] font-Poppins text-center">
              Create Coupon Code
            </h1>
            {/*Create Coupon Code*/}
            <form action="" onSubmit={handleSubmit}>
              <br />
              <div>
                <label htmlFor="name" className="pb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  required
                  type="text"
                  name="name"
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  value={name}
                  placeholder="Enter Your Coupon Name...."
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label htmlFor="value" className="pb-2">
                  Discount Percentage <span className="text-red-500">*</span>
                </label>
                <input
                  id="value"
                  type="number"
                  required
                  name="value"
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  value={value}
                  placeholder="Enter Your Coupon Code Value...."
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label htmlFor="min" className="pb-2">
                  Min Amount
                </label>
                <input
                  id="min"
                  type="number"
                  name="value"
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  value={minAmount}
                  placeholder="Enter Your Coupon Code Min Amount...."
                  onChange={(e) => setMinAmount(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label htmlFor="min" className="pb-2">
                  Max Amount
                </label>
                <input
                  id="min"
                  type="number"
                  name="value"
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  value={maxAmount}
                  placeholder="Enter Your Coupon Code Max Amount...."
                  onChange={(e) => setMaxAmount(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label htmlFor="category" className="pb-2">
                  Selected Products
                </label>

                <select
                  className="w-full mt-2 border h-[35px] rounded-[5px]"
                  id="category"
                  value={selectedProducts}
                  onChange={(e) => setSelectedProducts(e.target.value)}
                >
                  <option value="Choose A Category">
                    Choose A Selected Product
                  </option>
                  {products &&
                    products?.map((i) => (
                      <option value={i.name} key={i?.name}>
                        {i?.name}
                      </option>
                    ))}
                </select>
              </div>
              <br />
              <input
                type="submit"
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
