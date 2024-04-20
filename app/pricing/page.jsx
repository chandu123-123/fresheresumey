import Pricing from "@/components/Pricing";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center mt-[4rem] drop-shadow-lg ">
      <div className="card w-96 glass ">
        <div className="text-center p-3 bg-gray-300">
          <div className="font-bold uppercase text-[2rem]">Student Offer</div>
          <h1>Best Templates for freshers</h1>
        </div>
        <div className="card-body flex justify-center flex-col items-center">
          <h2 className="card-title">
            <span className="font-bold text-[2rem] p-3">Rs:25</span>/ life time
          </h2>
         
          <Pricing></Pricing>
        </div>
      </div>
    </div>
  );
};

export default page;
