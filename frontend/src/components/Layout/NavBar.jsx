import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

export const NavBar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.normalFlex}`}>
      {navItems &&
        navItems?.map((i, index) => {
          return (
            <div className="flex">
              <Link
                to={i?.url}
                key={index}
                className={`${
                  active === index + 1
                    ? "text-[#17dd1f]"
                    : "text-[#080707] pb-[30px] 800px:pb-0 800px:text-white font-[500] px-6 cursor-pointer"
                } font-[500] px-6 cursor-pointer`}
              >
                {i?.title}
              </Link>
            </div>
          );
        })}
    </div>
  );
};
