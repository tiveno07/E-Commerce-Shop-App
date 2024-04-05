import React from "react";
import {
  AiOutlineCreditCard,
  AiOutlineLogin,
  AiOutlineMessage,
} from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingCart } from "react-icons/hi";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

export const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios
      .get(`${server}user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload();
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-0">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={22} color={active === 1 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Profile
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingCart size={22} color={active === 2 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 2 ? "text-[red]" : ""
          }  800px:block hidden`}
        >
          Order
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={22} color={active === 3 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 3 ? "text-[red]" : ""
          }  800px:block hidden`}
        >
          Refunds
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={22} color={active === 4 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 4 ? "text-[red]" : ""
          }  800px:block hidden`}
        >
          Inbox
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={22} color={active === 5 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 5 ? "text-[red]" : ""
          }  800px:block hidden`}
        >
          Track Order
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <AiOutlineCreditCard size={22} color={active === 6 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 6 ? "text-[red]" : ""
          }  800px:block hidden`}
        >
          Payment Methods
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={22} color={active === 7 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 7 ? "text-[red]" : ""
          }  800px:block hidden`}
        >
          Address
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(8) || logoutHandler()}
      >
        <AiOutlineLogin size={22} color={active === 8 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 8 ? "text-[red]" : ""
          }  800px:block hidden`}
        >
          Log Out
        </span>
      </div>
    </div>
  );
};
