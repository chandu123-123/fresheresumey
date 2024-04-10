import Homecreate from "@/components/Homecreate";
import Typewrite from "@/components/Typewrite";
import Image from "next/image";
import React from "react";

const page = () => {
  const image="/images/resume.jpg"
  return (
    <div className="flex flex-col justify-center">
      <div className="mt-10 flex justify-center font-light text-[20px]">
       
        <Typewrite></Typewrite>
      </div>
      <div className="flex flex-col justify-center items-center ">
        <div className="mt-20">
          <span className="text-[2rem] sm:text-[3rem]">FRESHE</span>
          <span className="text-[4rem] sm:text-[5rem]">RESUME</span>
        </div>
       <Homecreate></Homecreate>
      </div>
      <div className="mt-20 flex justify-evenly items-center gap-1 p-2">
        <Image src={image} width={300} alt="resume img" height={200}></Image>
        <h1 className="text-[2rem] p-2" >No more Confusion</h1>
      </div>
    </div>
  );
};

export default page;
