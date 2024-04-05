import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { categoriesData } from "../../static/data";
import { AiOutlinePlus, AiOutlinePlusCircle } from "react-icons/ai";
import { createAProduct } from "../../redux/product/productSlice";
import { toast } from "react-toastify";
export const CreatedProduct = () => {
  const { seller } = useSelector((state) => state?.seller);
  const { isSuccess, isError } = useSelector((state) => state?.product);
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
  const [qty, setQty] = useState();

  const handleImgChange = (e) => {
    e.preventDefault();

    let files = Array?.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

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
    newForm.append("qty", qty);
    newForm.append("shopId", sellers);
    console.log(newForm);
    dispatch(createAProduct(newForm));
    setNames("");
    setDescription("");
    setCategory("");
    setTags("");
    setOriginalPrice("");
    setDiscountPrice("");
    setStock("");
    setQty("");
    setImages([]);
    // window.location.reload();
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[5px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create product</h5>

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
            placeholder="Enter Your Product Name...."
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
            placeholder="Enter Your Description Name...."
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
            <option value="Choose A Category">Choose A Category </option>
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
            name="text"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            value={tags}
            placeholder="Enter Your Product Tags...."
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <br />
        <br />
        <div>
          <label htmlFor="qty" className="pb-2">
            Quantity
          </label>
          <input
            id="qty"
            type="number"
            name="qty"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            value={qty}
            placeholder="Enter Your Quantity...."
            onChange={(e) => setQty(e.target.value)}
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
            placeholder="Enter Your Product Price...."
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
            placeholder="Enter Your Product Price Name With Discount...."
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
            placeholder="Enter Your Product Stock Name...."
            onChange={(e) => setStock(e.target.value)}
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
            required
            accept="image/png, image/jpeg, image/jpg"
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
