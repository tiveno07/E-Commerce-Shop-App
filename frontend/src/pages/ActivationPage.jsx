import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { server } from "../server";

export const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}user/activation`, {
            activation_token,
          });
          console.log(res);
        } catch (error) {
          console.log(error.response.data.message);
          setError(true);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>your token is expired!</p>
      ) : (
        <p>Your Account Has Been Created Successfully</p>
      )}
    </div>
  );
};
