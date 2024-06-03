"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const Page = () => {
  const router = useRouter();
  const userloginstatus = useSelector((state) => state.counter.value);
  useEffect(() => {
    if (!userloginstatus) {
      setTimeout(async () => {
        router.push("/sign-in");
      }, 2000);
    }
  }, [userloginstatus]);
  return (
    <div className="flex flex-col items-center sm:flex-row gap-10 p-10 justify-center cursor-pointer">
      <div className="flex flex-col justify-center gap-5 font-poppins" onClick={() => {
            router.push(`/build-resume/templates/create-resume`);
          }}>
        <button
          
        >
          Template 1
        </button>
        <Image
          className="object-contain"
          src={"/images/sharan.jpg"}
          width={200}
          height={10}
          alt="template1"
        ></Image>
      </div>
      <div className="flex flex-col justify-center gap-5 font-poppins cursor-pointer"  onClick={() => {
            router.push(`/build-resume/templates/create-resume2`);
          }}>
        <button
         
        >
          Template 2
        </button>
        <Image
          className="object-contain"
          src={"/images/newtemp.png"}
          width={200}
          height={10}
          alt="template2"
        ></Image>
      </div>
    </div>
  );
};

export default Page;
