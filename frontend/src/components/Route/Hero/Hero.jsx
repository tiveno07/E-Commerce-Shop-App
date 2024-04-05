import React from "react";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";
import drink from "../../../Assests/unsplash_js8AQlw71HA.jpg";
export const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
    >
      <img
        src={drink}
        className="absolute top-0 left-0 -z-50 w-[100%] h-[90vh]"
        alt=""
      />
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[43px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Best Collection for <br /> Home Appliances And Electronics
        </h1>
        <p className="pt-5 text-[19px] font-[Poppins] font-[400] text-[#000000ba]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus
          asperiores assumenda cupiditate unde corrupti molestias, veniam
          facilis aspernatur non, velit ipsam illo eveniet debitis mollitia
          maxime ut. Veniam, odio aperiam!
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button}`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
