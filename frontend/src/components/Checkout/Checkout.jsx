import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

export const Checkout = () => {
  const { cart } = useSelector((state) => state?.cart);
  const { user } = useSelector((state) => state?.user);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [addresses1, setAddresses1] = useState("");
  const [addresses2, setAddresses2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();

  const userAddress = user?.user?.addresses;

  const userInfo1 = user?.user;

  const address = user?.user?.addresses[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subTotalPrice = cart?.reduce(
    (acc, item) => acc + item?.qty * item?.discountPrice,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios.get(`${server}coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res?.data?.couponCode?.shopId;
      const couponCodeValue = res?.data?.couponCode?.value;
      if (res?.data?.couponCode !== null) {
        const isCouponValid =
          cart && cart?.filter((item) => item?.shopId === shopId);

        if (isCouponValid?.length === 0) {
          toast.error("Coupon Code Is Not Valid For This Shop");
          setCouponCode("");
        } else {
          const eligibleProduct = isCouponValid?.reduce(
            (acc, item) => acc + item?.qty + item?.discountPrice,
            0
          );
          const discountPrice = (eligibleProduct * couponCodeValue) / 100;

          setDiscountPrice(discountPrice);
          setCouponCode(res.data.couponCode);
          setCouponCode("");
        }
      }

      if (res.data.couponCode === null) {
        toast.error("Coupon code doesn't exists!");
        setCouponCode("");
      }
    });
  };

  const discountPercentage = couponCodeData ? discountPrice : "";

  const shipping = subTotalPrice * 0.1;

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentage).toFixed(2)
    : (subTotalPrice + shipping)?.toFixed(2);

  const paymentSubmit = () => {
    if (
      addresses1 === "" ||
      addresses2 === "" ||
      zipCode === null ||
      country === "" ||
      city === ""
    ) {
      toast.error("Please Choose Your Delivery Address!");
    } else {
      const shippingAddress = {
        addresses1,
        addresses2,
        zipCode,
        country,
        city,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };

      // Update Local Storage With Updated Orders Array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            country={country}
            userInfo1={userInfo1}
            setCountry={setCountry}
            city={city}
            userAddress={userAddress}
            setCity={setCity}
            zipCode={zipCode}
            setZipCode={setZipCode}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            addresses1={addresses1}
            setAddresses1={setAddresses1}
            addresses2={addresses2}
            setAddresses2={setAddresses2}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            address={address}
            couponCodeData={couponCodeData}
            setCouponCodeData={setCouponCodeData}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentage={discountPercentage}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[200px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go To Payment</h5>
      </div>
    </div>
  );
};

//Shipping Info
const ShippingInfo = ({
  address,
  country,
  city,
  setCountry,
  setCity,
  userInfo,
  userAddress,
  setUserInfo,
  userInfo1,
  addresses1,
  setAddresses1,
  addresses2,
  setAddresses2,
  zipCode,
  setZipCode,
}) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[600]">Shipping Address</h5>
      <br />
      <form action="">
        <div className="w-[50%]">
          <label className="block pb-2">Full Name</label>
          <input
            type="text"
            value={userInfo1 && userInfo1?.name}
            required
            readOnly
            className={`${styles.input} !w-[95%]`}
          />
        </div>
        <div className="w-[50%]">
          <label className="block pb-2">Email Address</label>
          <input
            type="email"
            value={userInfo1 && userInfo1?.email}
            required
            readOnly
            className={`${styles.input}`}
          />
        </div>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input
              value={userInfo1 && userInfo1?.phoneNumber}
              type="number"
              required
              readOnly
              className={`${styles.input} !w-[95%]`}
            />
          </div>
        </div>
        <div className="w-[50%]">
          <label className="block pb-2">Zip Code</label>
          <input
            type="number"
            required
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className={`${styles.input} !w-[95%]`}
          />
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select
              name=""
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              id=""
            >
              <option value="" className="block pb-2">
                Choose Your Country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option value={item.isoCode} key={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="w-[50%]">
            <label className="block pb-2">City</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              name=""
              value={city}
              onChange={(e) => setCity(e.target.value)}
              id=""
            >
              <option value="" className="block pb-2">
                Choose Your City
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option value={item.isoCode} key={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Address 1</label>
            <input
              type="address"
              value={addresses1}
              onChange={(e) => setAddresses1(e.target.value)}
              required
              className={`${styles.input} !w-[95%]`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Address 1</label>
            <input
              type="address"
              required
              value={addresses2}
              onChange={(e) => setAddresses2(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
        </div>
        <div></div>
      </form>
      <h5
        onClick={() => setUserInfo(!userInfo)}
        className="text-[18px] cursor-pointer inline-block"
      >
        Choose From Saved Address
      </h5>
      {userInfo && (
        <div>
          {userAddress &&
            userAddress?.map((item, index) => (
              <div className="w-full flex mt-1">
                <input
                  type="checkbox"
                  className="mr-3"
                  onClick={() =>
                    setAddresses1(address?.address1) ||
                    setAddresses2(address?.address2) ||
                    setZipCode(address?.zipCode) ||
                    setCountry(address?.country) ||
                    setCity(address?.city)
                  }
                  value={item?.addressType}
                />
                <h2>{item?.addressType}</h2>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

//CartData
const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentage,
}) => {
  return (
    <div className="w-full bg-white rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[17px] font-[600] text-[#000000a4]">SubTotal:</h3>
        <h5 className="text-[17px] font-[600]">$ {subTotalPrice}</h5>
      </div>
      <div className="flex justify-between">
        <h3 className="text-[17px] font-[600] text-[#000000a4]">Shipping:</h3>
        <h5 className="text-[17px] font-[600]">$ {shipping}</h5>
      </div>
      <div className="flex justify-between">
        <h3 className="text-[17px] font-[600] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[17px] font-[600]">
          - {discountPercentage ? "$" + discountPercentage?.toString() : null}
        </h5>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-[17px] font-[600] text-[#000000a4]">
          Total Price:
        </h3>
        <h5 className="text-[18px] font-[600] text-end pt-3">$ {totalPrice}</h5>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Coupon Code"
          className={`${styles.input} h-[40px] pt-2`}
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          type="submit"
        />
      </form>
    </div>
  );
};
