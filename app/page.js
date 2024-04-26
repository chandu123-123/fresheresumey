import FAQ from "@/components/FAQ";
import Homecreate from "@/components/Homecreate";
import Typewrite from "@/components/Typewrite";

import Image from "next/image";
import React from "react";

const page = () => {
  const image="/images/resume.jpg"
  const resumereal="/images/resumereal.png"
  return (
    <div className="flex flex-col justify-center">
      <div className="mt-10 flex justify-center font-light text-[20px]">
       
        <Typewrite></Typewrite>
      </div>
      <div className="flex flex-col justify-center items-center ">
        <div className="mt-20">
          <span className="text-[2rem] sm:text-[3rem]">FRESHE</span>
          <span className="text-[4rem] sm:text-[5rem] font-poppins">RESUME</span>
        </div>
       <Homecreate></Homecreate>
      </div>
      <div className="mt-20 flex justify-evenly items-center  p-2 gap-8 flex-col md:flex-row">
        <Image src={image} className="rounded-lg" width={300} priority alt="resume img" height={200}></Image>
        <h1 className="text-[2rem] p-2 font-light font-poppins" >No more Confusion</h1>
      </div>
      <div className="flex flex-col items-center justify-center p-10">
        <h1 className="m-10 text-[2rem] uppercase font-poppins">Sample Generated</h1>
        <Image src={resumereal} width={400} height={400} alt="sample resume"></Image>
      </div>
      <FAQ></FAQ>
    </div>
  );
};

export default page;
