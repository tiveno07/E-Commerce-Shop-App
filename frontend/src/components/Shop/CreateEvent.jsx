import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { categoriesData } from "../../static/data";
import { AiOutlinePlus, AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { createAEvent } from "../../redux/event/eventSlice";

export const CreateEvent = () => {
  const { seller } = useSelector((state) => state?.seller);
  const { isSuccess, isError } = useSelector((state) => state?.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sellers = seller?.seller?._id;

  const [images, setImages] = useState([]);
  const [name, setNames] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleImgChange = (e) => {
    e.preventDefault();

    let files = Array?.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate?.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate
      .toISOString()
      .slice(0, 10);
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000) // the 3 means it will end on the 3 day
        .toISOString()
        .slice(0, 10)
    : today;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", sellers);
    newForm.append("start_Date", startDate?.toISOString());
    newForm.append("Finish_Date", endDate?.toISOString());
    dispatch(createAEvent(newForm));
    // navigate("/dashboard-event");
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[5px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Event</h5>

      <form action="" onSubmit={handleSubmit}>
        <br />
        <div>
          <label htmlFor="name" className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            value={name}
            placeholder="Enter Your Event Product Name...."
            onChange={(e) => setNames(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="description" className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            rows="9"
            required
            id="description"
            type="text"
            name="description"
            className="mt-2 appearance-none block w-full pt-2 px-3 h-[95px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            value={description}
            placeholder="Enter Your Event Description Name...."
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <br />
        <div>
          <label htmlFor="category" className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>

          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose A Event Category">Choose A Category </option>
            {categoriesData &&
              categoriesData?.map((i, index) => (
                <option value={i.title} key={index}>
                  {i?.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="tags" className="pb-2">
            Tags
          </label>
          <input
            id="tags"
            type="tags"
            name="tags"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            value={tags}
            placeholder="Enter Your Event Product Tags...."
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="originalPrice" className="pb-2">
            Original Price
          </label>
          <input
            id="originalPrice"
            type="number"
            name="price"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            value={originalPrice}
            placeholder="Enter Your Event Product Price...."
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="discountPrice" className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            id="discountPrice"
            type="number"
            name="price"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            value={discountPrice}
            placeholder="Enter Your Event Product Price Name With Discount...."
            onChange={(e) => setDiscountPrice(e.target.value)}
          />
        </div>
        <br />

        <br />
        <div>
          <label htmlFor="stock" className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            id="stock"
            type="number"
            name="price"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            value={stock}
            placeholder="Enter Your Event Product Stock Name...."
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <br />

        <br />
        <div>
          <label htmlFor="start-date" className="pb-2">
            Event Start Date <span className="text-red-500">*</span>
          </label>
          <input
            id="start-date"
            type="date"
            name="price"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            value={startDate ? startDate?.toISOString().slice(0, 10) : ""}
            placeholder="Enter Your Event Start Date...."
            min={today}
            onChange={handleStartDateChange}
          />
        </div>
        <br />

        <br />
        <div>
          <label htmlFor="start-date" className="pb-2">
            Event End Date <span className="text-red-500">*</span>
          </label>
          <input
            id="start-date"
            type="date"
            name="price"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            value={endDate ? endDate?.toISOString().slice(0, 10) : ""}
            placeholder="Enter Your Event End Date...."
            min={minEndDate}
            onChange={handleEndDateChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="upload" className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImgChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={34} className="mt-3" color="#555" />
            </label>

            {images &&
              images?.map((i) => (
                <img
                  src={URL?.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
          <input
            type="submit"
            value="Create"
            className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 sm:text-sm"
          />
        </div>
      </form>
    </div>
  );
};
