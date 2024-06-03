import FAQ from "@/components/FAQ";
import Homecreate from "@/components/Homecreate";
import Typewrite from "@/components/Typewrite";

import Image from "next/image";
import React from "react";

const page = () => {
  const image = "/images/resume.jpg";
  const animate = "/buildresume/animate.gif";
  const resumereal = "/images/sharan.jpg";
  return (
    <div className="flex flex-col justify-center">
      <div className="mt-10 flex justify-center font-light text-[20px]">
        <Typewrite></Typewrite>
      </div>
      <div className="flex flex-col justify-center items-center mb-5">
        <div className="mt-20">
          <span className="text-[1.5rem] sm:text-[3rem] font-poppins font-semibold italic">
            FRESHE
          </span>
          <span className="text-[3.5rem] sm:text-[5rem]  font-poppins font-semibold italic">
            RESUME
          </span>
        </div>
        <Homecreate></Homecreate>
      </div>

      <div className="mt-20 flex justify-evenly items-center  p-2 gap-8 flex-col md:flex-row">
        <Image
          src={image}
          className="rounded-lg"
          width={300}
          priority
          alt="resume img"
          height={200}
        ></Image>
        <h1 className="text-[2rem] p-2 font-light font-poppins font-normal italic">
          Create in Few Minutes
        </h1>
      </div>
      <div className="flex flex-col mt-5 items-center md:mt-20 md:flex-row md:gap-10 text-center md:text-center md:justify-center">
        <h1 className="text-[4rem] flex font-poppins font-semibold italic">
          ATS
        </h1>
        <h1 className="text-[4rem] flex font-poppins font-semibold italic">
          FRIENDLY
        </h1>
        {/* //<Image src={animate} width={60} height={60} ></Image> */}
      </div>
      <div className="flex flex-col items-center justify-center p-10 gap-2">
        <h1 className="m-10 text-[2rem] uppercase font-poppins italic font-normal text-center">
          Sample Generated
        </h1>
        <Image
          src={resumereal}
          width={400}
          height={400}
          className="drop-shadow-2xl"
          alt="sample resume"
        ></Image>
         <Image
          src={"/images/newtemp.png"}
          width={400}
          height={400}
          className="drop-shadow-2xl"
          alt="sample resume"
        ></Image>
      </div>

      <h1 className="text-[4rem] flex font-poppins font-semibold italic text-center items-center justify-center uppercase">
        Easy to generate
      </h1>
      <div>

<video src="/videos/final_1.mp4" className="px-10 sm:px-52 py-10" autoPlay  controls ></video>

<h1 className="text-[4rem] flex font-poppins font-semibold italic text-center items-center justify-center uppercase">
  How To Create Your Resume  
</h1>
</div>
      <FAQ></FAQ>
    
    </div>
  );
};

export default page;
