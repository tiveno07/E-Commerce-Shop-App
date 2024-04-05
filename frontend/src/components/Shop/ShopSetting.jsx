import React, { useState } from "react";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import axios from "axios";
import { loadASeller } from "../../redux/seller/sellerSlice";
import { toast } from "react-toastify";

export const ShopSetting = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state?.seller);
  const sellers = seller?.seller;
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(sellers && sellers?.name);
  const [description, setDescription] = useState(
    sellers && sellers?.description
  );
  const [zipCode, setZipcode] = useState(sellers && sellers?.zipCode);
  const [phoneNumber, setPhoneNumber] = useState(
    sellers && sellers?.phoneNumber
  );
  const [address, setAddress] = useState(sellers && sellers?.address);

  const handleImage = async (e) => {
    e.preventDefault();
    const files = e.target.files[0];
    setAvatar(files);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    await axios
      .put(`${server}shop/update-shop-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(loadASeller());
        toast.success("Image was successfully");
      })
      .catch((err) => {
        console.log(err.response.message);
      });
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${server}shop/update-seller-info`,
        {
          name,
          description,
          zipCode,
          phoneNumber,
          address,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Shop updated successfully");
        dispatch(loadASeller());
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : `${backend_url}${sellers?.avatar}`
              }
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
              alt=""
            />
            <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[10px]">
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
        {/*Shop Info*/}
        <form
          action=""
          onSubmit={updateHandler}
          className="flex flex-col items-center"
        >
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label htmlFor="" className="block pb-2">
                Shop Name
              </label>
              <input
                type="name"
                placeholder={`${sellers?.name}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
              />
            </div>
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label htmlFor="" className="block pb-2">
                Shop Description
              </label>
              <input
                type="name"
                placeholder={`${
                  sellers?.description
                    ? sellers?.description
                    : "Enter Your Shop Description"
                }`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              />
            </div>
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label htmlFor="" className="block pb-2">
                Shop Address
              </label>
              <input
                type="name"
                placeholder={sellers?.address}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
              />
            </div>
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label htmlFor="" className="block pb-2">
                Shop Phone Number
              </label>
              <input
                type="number"
                placeholder={sellers?.phoneNumber}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
              />
            </div>
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label htmlFor="" className="block pb-2">
                Shop Zip Code
              </label>
              <input
                type="number"
                placeholder={sellers?.zipCode}
                value={zipCode}
                onChange={(e) => setZipcode(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
              />
            </div>
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <input
              type="submit"
              value="Update Shop"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};
