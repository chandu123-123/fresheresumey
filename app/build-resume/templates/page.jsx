"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
const Page = () => {
    const router=useRouter()
    const userloginstatus = useSelector((state) => state.counter.value);
    useEffect(() => {
    
      if (!userloginstatus) {
      setTimeout(async () => {
         
          router.push("/sign-in")
        }, 2000);
      
       
      }
    }, [userloginstatus]);
  return (
    <div className='flex gap-10 p-10'>
      <div>
      <button onClick={()=>{router.push(`/build-resume/templates/create-resume`)}}>Template 1</button>
      <Image></Image>
      </div>
      <div>
      <button onClick={()=>{router.push(`/build-resume/templates/create-resume2`)}}>Template 2</button>
      <Image></Image>
      </div>
    </div>
  )
}

export default Page
