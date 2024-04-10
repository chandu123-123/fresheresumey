"use client"
import React,{useState} from "react";

const Buy = ({ makePayment }) => {

  const [isLoading, setIsLoading] = useState(false);



  return (
    <div className="flex flex-col items-center justify-center mt-3">
<button
     onClick={() => {
          makePayment({ productId: "FresherResume" });
        }}
      disabled={isLoading}
      className={`btn btn-outline btn-primary ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? 'Processing...' : 'Buy Now'}
    </button>

   

    </div>
  );
};

export default Buy;