"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Link from 'next/link'
import BuyProduct from "./razorpay/BuyProduct";
const Pricing = () => {
  return (
    <div>
      <ul className="flex flex-col gap-2">
        <li className="flex items-center gap-2">
          <FaCheckCircle fill="green" size={20}></FaCheckCircle>
          unlimited access
        </li>
        <li className="flex items-center gap-2">
          <FaCheckCircle fill="green" size={20}></FaCheckCircle>Job Ready Resume
        </li>
        <li className="flex items-center gap-2">
          <FaCheckCircle fill="green" size={20}></FaCheckCircle>safe
          Transactions
        </li>
        <li className="flex items-center gap-2">
          <FaCheckCircle fill="green" size={20}></FaCheckCircle> More Templates
          Soon
        </li>
      </ul>
      <div className="pt-4 text-center flex justify-center">
       <Link href=""></Link> 
      </div>
      <BuyProduct></BuyProduct>
    </div>
  );
};

export default Pricing;
