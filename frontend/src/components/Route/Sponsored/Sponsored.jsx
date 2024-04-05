import React from "react";
import styles from "../../../styles/styles";
import apple from "../../../Assests/apple.jpeg";
import microsoft from "../../../Assests/microsoft.jpeg";
import lg from "../../../Assests/lg.jpeg";
import sony from "../../../Assests/sony.jpeg";
import dell from "../../../Assests/dell.jpeg";
import balen from "../../../Assests/bale.jpeg";

export const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-start">
          <img
            src={apple}
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src={microsoft}
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src={dell}
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src={sony}
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src={lg}
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src={balen}
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};
