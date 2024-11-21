"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import crypto from "crypto";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { dbconnection } from "@/lib/database";

const Page = () => {
  
  const router=useRouter()
  const [err,seterr]=useState("")
 const [otp,setotp]=useState(false);
 const [status,setstatus]=useState("Submit");
 const [otpgenerated,setotpgenerated]=useState(false);
 const [targetotp,settargetotp]=useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
//console.log(otp)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setotp(false)
    seterr("")
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
    //console.log(formData)
  };
  const [otpcheck,setotpcheck]=useState({
    value:""
  })

 

  const handleSubmit = async (e) => {

    e.preventDefault();
    setstatus("loading")
    try {
        
        //console.log(formData)
         
        const res= await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}/api/verifyotp`,{
          method:"POST",
          body:JSON.stringify({formData})
         })
         const data=await res.json()
        // console.log(data)
         setstatus("Submit")
         if(data.msg==="success"){
        //  console.log("success")
          seterr("")
      setotp(true)
      const nodeotp=await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}/api/nodemailerr`,{
        method:"POST", 
      body:JSON.stringify({formData})
      })
const nodotp=await nodeotp.json();


  

setotpgenerated(nodotp.secret)
//console.log(nodotp)
//console.log(nodotp)
          //router.push("/sign-in")
         }
         else{
          seterr(data.msg)
            //console.log(data.msg)
         }
        // Get the message from the response
    } catch (error) {
      
      // Handle signup failure
    }
  };
  const handleOtpChange =async (e) => {
   settargetotp(e.target.value)
    const hashedotp =await  crypto.createHash("sha256",process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE).update(e.target.value).digest("hex");
    setotpcheck(hashedotp);
  };
const verify=async (e)=>{
  e.preventDefault()
//console.log(otpcheck)

if(otpcheck===otpgenerated){
  try {
        
    //console.log(formData)
     
    const res= await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}/api/signup`,{
      method:"POST",
      body:JSON.stringify({formData,otpgenerated,targetotp})
     })
   
     const data=await res.json()
    // console.log(data)
     if(data.msg==="success"){
     // console.log("success")
      seterr("")
      router.push("sign-in")
      //router.push("/sign-in")
     }
     else{
      seterr(data.msg)
        //console.log(data.msg)
     }
    // Get the message from the response
} catch (error) {
  seterr(data.msg)
  // Handle signup failure
}
}
else{
  seterr("Incorrect OTP")
}
}
  return (
    <div className="flex justify-center mt-[20px]">
      <form onSubmit={handleSubmit} className=" flex flex-col w-[400px] justify-center p-6">
        <h1 className="text-center font-bold text-[3rem]">Sign-Up</h1>
        <label htmlFor="" className="pb-2">
          Username
        </label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} className="p-1 bg-white border-2" />
        <label htmlFor="" className="pb-2">
          Email
        </label>
        <input type="email" name="email"  value={formData.email} onChange={handleChange} className="p-1 bg-white border-2" />
        <label htmlFor="" className="pb-2">
          Password
        </label>
        <input type="password" name="password"  value={formData.password} onChange={handleChange} className="p-1 bg-white border-2" />
        <div className="pt-4">
        <Button name={status}></Button>
        </div>
      {
        otp && 
        <div className=" flex flex-col  gap-2   items-center pt-2">
        
          <div>
          <lab
          el htmlFor="">Check Your Mail (Resubmit if not Received )</lab>
          </div>
          <div className=" justify-evenly">
           
          <input type="text " value={otpcheck.value} className=" bg-white border-2" placeholder="Enter Otp"  name="otp" onChange={handleOtpChange} />
          <button className="btn btn-success mt-2"  onClick={verify}>Verify</button>
          </div>
         
        </div>
      }
        {
          err&&<h1 className="mt-6 text-red-600">{err}</h1>
        }
       
        <div className="flex justify-between items-center pt-4">
          <h1>Already created Account ? </h1>
          {/* <button className="btn btn-success" onClick={()=>{route.push("/sign-up")}}>Sign-Up</button> */}
          <Link href="/sign-in"><button className="btn btn-success" >Sign-In</button></Link>
        </div>
      </form>
    </div>
  );
};

export default Page;
