import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteAddresses,
  UpdateAUser,
  UpdateAUserInfo,
  UpdateAddresses,
  loadAUser,
} from "../../redux/user/userSlice";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { Country, State } from "country-state-city";

export const ProfileContent = ({ active }) => {
  const [password, setPassword] = useState("");
  const { user, IsError } = useSelector((state) => state?.user);
  const [name, setName] = useState(user && user?.user?.name);
  const [email, setEmail] = useState(user && user?.user?.email);
  const [phoneNumber, setPhoneNumber] = useState(
    user && user?.user?.phoneNumber
  );
  const [avatar, setAvatar] = useState(null);

  console.log(user);

  useEffect(() => {
    if (IsError) {
      toast.error(IsError);
    }
  }, [IsError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .put(
        `${server}user/update-user-info`,
        { name, password, phoneNumber, email },
        { withCredentials: true }
      )
      .then((response) => {
        toast.success(response.data.message);
      });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    await axios
      .put(`${server}user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multerpart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        // window.location.reload();
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
  };

  return (
    <div className="w-full">
      {/* Profile Page*/}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${user?.user?.avatar[0]?.url}`}
                className="w-[150px] h-[150px] bg-[red] rounded-full"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera size={27} />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <div className="w-full py-5 mr-3">
            <form onSubmit={handleSubmit}>
              <div className="w-full block pb-3">
                <div className="flex">
                  <div className="w-[100%] 800px:w-[50%]">
                    <label className="pb-2 block">Full Name</label>
                    <input
                      type="text"
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Phone Number </label>
                    <input
                      type="number"
                      className={`${styles.input} !w-[95%]  mb-4 800px:mb-0`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Phone Your Password </label>
                    <input
                      type="password"
                      className={`${styles.input} !w-[95%]  mb-4 800px:mb-0`}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Email </label>
                    <input
                      type="text"
                      className={`${styles.input} !w-[95%]  mb-4 800px:mb-0`}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <input
                  type="submit"
                  value="Update"
                  required
                  className="w-[250px] h-[40px] border border-[blue] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer"
                />
              </div>
            </form>
          </div>
        </>
      )}

      {/* Order Page*/}

      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Order Page*/}

      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}
      {/* Track Order Page*/}

      {active === 5 && (
        <div>
          <TrackOrders />
        </div>
      )}
      {/* ChangePassword Page*/}

      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/* My Address*/}

      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const [orders, setOrders] = useState(null);
  const { user } = useSelector((state) => state.user);
  const userId = user?.user?._id;

  useEffect(() => {
    try {
      axios.get(`${server}order/get-all-orders/${userId}`).then((response) => {
        setOrders(response.data.order);
        toast.success("Order updated successfully");
        return null;
      });
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

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
    <div className="pl-8 pt-1">
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
const AllRefundOrders = () => {
  const [orders, setOrders] = useState(null);
  const { user } = useSelector((state) => state.user);
  const userId = user?.user?._id;

  useEffect(() => {
    try {
      axios.get(`${server}order/get-all-orders/${userId}`).then((response) => {
        setOrders(response.data.order);
        toast.success("Order updated successfully");
        return null;
      });
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  const eligibleOrder =
    orders && orders?.filter((item) => item?.status === "Processing refund");

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

  eligibleOrder &&
    eligibleOrder?.forEach((item) => {
      row.push({
        id: item?._id,
        itemsQTY: item?.cart?.length,
        total: "US$" + item?.totalPrice,
        status: item?.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
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

const TrackOrders = () => {
  const [orders, setOrders] = useState(null);
  const { user } = useSelector((state) => state.user);
  const userId = user?.user?._id;

  useEffect(() => {
    try {
      axios.get(`${server}order/get-all-orders/${userId}`).then((response) => {
        setOrders(response.data.order);
        toast.success("Order updated successfully");
        return null;
      });
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

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
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
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
    <div className="pl-8 pt-1">
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

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${server}user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOldPassword("");
        setOldPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          action=""
          onSubmit={passwordChangeHandler}
          className="flex items-center flex-col"
        >
          <div className="w-[100%] 800px:w-[50%] mt-5">
            <label className="block  pb-2">Enter Your Old Password</label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
          </div>
          <div className="w-[100%] 800px:w-[50%] mt-2">
            <label className="block  pb-2">Enter Your New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
          </div>
          <div className="w-[100%] 800px:w-[50%] mt-2">
            <label className="block  pb-2">Confirm Your New Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
            <input
              type="submit"
              value="Update"
              required
              className="w-full h-[40px] border border-[blue] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user, updatedUser } = useSelector((state) => state?.user);
  console.log(user.user.addresses);
  const address = user?.user?.addresses;
  const dispatch = useDispatch();
  console.log(address);
  const addressTypeData = [
    { name: "Default" },
    { name: "Home" },
    { name: "Office" },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("please fill all the fields");
    } else {
      dispatch(
        UpdateAddresses({
          country,
          zipCode,
          city,
          address1,
          address2,
          addressType,
        })
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      window.location.reload();
    }
  };

  const handleDelete = (i) => {
    dispatch(DeleteAddresses(i._id));
    window.location.reload();
  };
  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative  overflow-y-scroll">
            <div
              onClick={() => setOpen(false)}
              className="w-full flex justify-end p-3"
            >
              <RxCross1 size={30} className="cursor-pointer" />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              ADD NEW ADDRESS
            </h1>
            <div className="w-full">
              <form action="" onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block pb-2">
                        Choose your country
                      </option>
                      {Country &&
                        Country?.getAllCountries()?.map((item) => (
                          <option
                            value={item?.isoCode}
                            className="block pb-2"
                            key={item?.isoCode}
                          >
                            {item?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  {/* State*/}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose Your City</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block pb-2">
                        Choose Your City
                      </option>

                      {State &&
                        State?.getStatesOfCountry(country)?.map((item) => (
                          <option
                            value={item?.isoCode}
                            className="block pb-2"
                            key={item?.isoCode}
                          >
                            {item?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  {/*Address 1*/}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  {/*Address 2*/}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                  {/*Aip Code*/}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-3">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData?.map((item) => (
                          <option
                            value={item?.name}
                            key={item?.name}
                            className="block pb-2"
                          >
                            {item?.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input}`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <br />
      {address &&
        address?.map((i, index) => (
          <div
            key={index}
            className="w-full bg-white h-min rounded-[4px] px-3 shadow mb-5 py-10"
          >
            <div className="flex items-center justify-between">
              <h5 className="pl-5 font-[600]">{i?.addressType}</h5>

              <div className="pl-8 flex items-center">
                <h6 className="text-[12px] 800px:text-[unset]">
                  {i?.address1} {i?.address2}
                </h6>
              </div>
              <div className="pl-8 flex items-center">
                <h5 className="pl-6">{i?.address2}</h5>
              </div>
              <div className="pl-8 flex items-center">
                <h5 className="pl-6">{address && address?.phoneNumber}</h5>
              </div>

              <div className="min-w-[10%] flex items-center justify-between pl-8">
                <AiOutlineDelete
                  size={25}
                  className="cursor-pointer"
                  onClick={() => handleDelete(i)}
                />
              </div>
            </div>
          </div>
        ))}
      {user && user?.user?.addresses?.length === 0 && (
        <h5 className="text-center pt-5 text-[19px]">
          You Do Not Have Any Saved Address!
        </h5>
      )}
    </div>
  );
};
