"use client"
import React, { useEffect } from 'react'
import Image from "next/image";
import Link from "next/link";
import { increment,decrement } from "@/store/createslice";
import { redirect, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
const Page = () => {
  const router =useRouter()
  const dispatch = useDispatch();
  const userloginstatus = useSelector((state) => state.counter.value);
  
  const write="/buildresume/write.png"
  const select="/buildresume/select.png"
  const download="/buildresume/download.png"
  useEffect(() => {
    
    if (!userloginstatus) {
    setTimeout(async () => {
       
        router.push("/sign-in")
      }, 2000);
    
     
    }
  }, [userloginstatus]);
 
  return (
    <div >
     <div className='flex justify-center '>
      {
        !userloginstatus &&
        <div className="flex flex-col gap-4 w-52 mt-24 opacity-40">
  <div className="skeleton h-32 w-full"></div>
  <div className="skeleton h-4 w-28"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
</div>
      }
     </div>
    

      {
          !userloginstatus &&  

          <div className="toast">
          <div className="alert alert-info">
            <span>Please Log In !</span>
          </div>
        </div>
          
      }
      {
        userloginstatus &&
        <div>
       <div className='flex justify-center flex-col  items-center gap-5 md:flex-row md:gap-20 md:pt-32 mt-10 '>
        {/* <div className='flex flex-col gap-5 justify-center items-center'>
          <Image src={select} width={100} height={100} alt='template select'></Image>
          <h1>Select Template</h1>
        </div> */}
        
        <div className='flex flex-col gap-5 justify-center items-center'>
          <Image src={write} width={100} height={100} alt='write info'></Image>
          <h1>Complete Information</h1>
        </div>
        
        <div className='flex flex-col gap-5 justify-center items-center'>
          <Image src={download} width={100} height={100} alt='download'></Image>
          <h1>Download Resume</h1>
        </div>
        </div>
        <div className='flex justify-center pt-10'>
        <Link href="/build-resume/templates"><button className="btn btn-warning">Create Now</button></Link>
        </div>
       </div>

      }
      
    </div>
  )
}

export default Page
