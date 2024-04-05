import React from "react";
import watch from "../../Assests/thumbs up.jpeg";

export const OrderSuccess = () => {
  return (
    <div className="w-full flex items-center justify-center  h-[60vh]">
      <div className="text-center">
        <img
          src={watch}
          className="flex items-center justify-center mx-11"
          alt=""
        />
        <h1 className="text-[30px]">Your Order Is Successful</h1>
      </div>
    </div>
  );
};
