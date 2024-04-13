"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Buy = ({ makePayment }) => {
  const useremail = useSelector((state) => state.counter.email);
  const userpaid = useSelector((state) => state.counter.paid);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setmessage] = useState("");

  const verifying = () => {
    console.log(useremail);
    if (useremail.length == 0) {
      setmessage("Please login in");
      setTimeout(async () => {
        setmessage("");
      }, 2000);
    } else {
      if (userpaid === true) {
        setmessage("Already payment completed");
        setTimeout(async () => {
          setmessage("");
        }, 2000);
      } else {
        setmessage("");
        makePayment({ productId: "FresherResume" });
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-3">
        <button
          onClick={() => {
            verifying();
          }}
          disabled={isLoading}
          className={`btn btn-outline btn-primary ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Processing..." : "Buy Now"}
        </button>
      </div>
      {message && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>{message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buy;
