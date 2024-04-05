import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { categoriesData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import {
  IoIosArrowDown,
  IoIosArrowDropright,
  IoIosArrowForward,
} from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { DropDown } from "./DropDown";
import { NavBar } from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import { loadAUser } from "../../redux/user/userSlice";
import { backend_url } from "../../server";
import { Cart } from "../Cart/Cart";
import { WishList } from "../WishList/WishList.jsx";
import { RxCross1 } from "react-icons/rx";
import lion from "../../Assests/lion.jpeg";

export const Header = ({ activeHeading }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state?.cart);
  const { allProducts } = useSelector((state) => state?.product);
  const { wishlist } = useSelector((state) => state?.wishlist);
  const { isSuccess } = useSelector((state) => state?.seller);

  const { isAuthenticated, user } = useSelector((state) => state?.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [open, setOpen] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts?.allProducts &&
      allProducts?.allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src={lion}
                className="w-[50px] h-[50px]"
                alt="homepageheader"
              />
            </Link>
          </div>
          {/*Search Box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData?.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData?.map((i, index) => {
                    return (
                      <Link to={`/products/${i?.id}`}>
                        <div className="w-full flex items-start-py-4">
                          <img
                            src={`${i && i?.images[0]?.url}`}
                            alt="productName"
                            className="w-[40px] h-[40px] mr-[10px]"
                          />

                          <h1>{i?.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          <div className={`${styles.button}`}>
            <Link to={isSuccess ? "/dashboard" : "shop-create"}>
              <h1 className="text-[#fff] flex items-center">
                {isSuccess ? "Go Dashboard" : "Become Seller"}
                <IoIosArrowDropright className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div className={`${styles.section}`}>
          <div
            className={`${styles.section} relative ${styles.normalFlex} justify-between`}
          >
            {/* Categories*/}
            <div onClick={() => setDropDown(!dropdown)}>
              <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
                <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
                <button className="h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                  All Categories
                </button>
                <IoIosArrowDown
                  size={30}
                  className="absolute right-2 top-4 cursor-pointer"
                  onClick={() => setDropDown(!dropdown)}
                />
                {dropdown ? (
                  <DropDown
                    categoriesData={categoriesData}
                    setDropDown={setDropDown}
                  />
                ) : null}
              </div>
            </div>
            {/* NavItems*/}
            <div className={`${styles.normalFlex}`}>
              <NavBar active={activeHeading} />
            </div>

            <div className="flex">
              <div className={`${styles.normalFlex}`}>
                <div className="relative cursor-pointer mr-[15px]">
                  <AiOutlineHeart
                    size={30}
                    color="rgb(255 255 255 /83%)"
                    onClick={() => setOpenWishlist(true)}
                  />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 b-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    {wishlist && wishlist?.length}
                  </span>
                </div>
              </div>
              <div
                className={`${styles.normalFlex}`}
                onClick={() => setOpenCart(true)}
              >
                <div className="relative cursor-pointer mr-[15px]">
                  <AiOutlineShoppingCart
                    size={30}
                    color="rgb(255 255 255 /83%)"
                  />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 b-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    {cart && cart?.length}
                  </span>
                </div>
              </div>
              <div className={`${styles.normalFlex}`}>
                <div className="relative cursor-pointer mr-[15px]">
                  {isAuthenticated ? (
                    <Link to="/profile">
                      <img
                        src={`${user?.user?.avatar[0]?.url}`}
                        className="w-[40px] h-[40px] rounded-full"
                        alt=""
                      />
                    </Link>
                  ) : (
                    <Link to="/login">
                      <CgProfile size={30} color="rgb(255 255 255 /83%)" />
                    </Link>
                  )}
                </div>
              </div>

              {/*Cart Popup*/}
              {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

              {/*WishList Popup*/}
              {openWishlist ? (
                <WishList setOpenWishlist={setOpenWishlist} />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/*Mobile Header*/}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
          w-full h-[60px] fixed bg-white z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-2"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img src="" alt="dsfgbfgd" className="mt-3 cursor-pointer" />
            </Link>
          </div>
          <div>
            <div className="relative mr-[20px]">
              <AiOutlineShoppingCart size={35} />
              <span className="absolute right-0 rounded-full bg-[#3bc177] w-4 h-4 top-0">
                {cart && cart?.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/*Header Sidebar*/}
      {open && (
        <div className="fixed w-full bg-[#0000005f] z-50 h-full top-0 left-0">
          <div className="fixed w-[60%] bg-white h-screen top-0 left-0 z-10 overflow-y-scroll">
            <div className="w-full justify-between flex pr-3">
              <div>
                <div className="relative mr-[15px]">
                  <AiOutlineHeart size={30} className="mt-5 ml-3" />
                  <span className="absolute right-0 top rounded-full bg-[#3bc177] w-4 h-4 top-0">
                    1
                  </span>
                </div>
              </div>
              <RxCross1
                size={30}
                className="ml-4 mt-5"
                onClick={() => setOpen(false)}
              />
            </div>

            <div className="my-8 w-[92%] m-auto h-[40px]">
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search Product...."
                className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
              />
            </div>

            {searchData && searchData?.length !== 0 ? (
              <div className="absolute z-10 bg-white shadow w-full p-3">
                {searchData &&
                  searchData?.map((i, index) => {
                    const d = i.name;
                    const Product_name = d?.replace(/\s+/g, "-");
                    return (
                      <Link to={`/products/${Product_name}`} key={index}>
                        <div className="flex items-center">
                          <img
                            src={i.image_Url[0]?.url}
                            alt="productName"
                            className="w-[40px] h-[40px] mr-[10px]"
                          />

                          <h1>{i?.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}

            <NavBar active={activeHeading} />
            <div className={`${styles.button} ml-4 !rounded-[4px]`}>
              <Link to={`${isSuccess ? "/dashboard" : "/shop-created"}`}>
                <h1 className="text-white flex items-center">
                  {isSuccess ? "Go Dashboard" : "Become Seller"}{" "}
                  <IoIosArrowForward className="ml-2" />
                </h1>
              </Link>
            </div>

            <br />
            <br />
            <br />

            <div className="flex w-full justify-center">
              {isAuthenticated ? (
                <div>
                  <Link to="/profile">
                    <img
                      src={`${backend_url}${user?.avatar}`}
                      className="w-[60px] h-[60px] rounded-full border-[4px] border-[green]"
                      alt=""
                    />
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[19px] pr-[10px] text-[#000000b7]"
                  >
                    Login /
                  </Link>
                  <Link
                    to="/sign-up"
                    className="text-[19px] pr-[10px] text-[#000000b7]"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
