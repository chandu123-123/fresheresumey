"use client"
import Link from "next/link";
import crypto from "crypto";
import React, { useState } from "react";

import Button from "@/components/Button";

import { useRouter } from "next/navigation";

const Page = () => {
 const [err,seterr]=useState("")
 const [successnew,setsuccessnew]=useState(false)
 const [newpassword,setnewpassword]=useState("")
 const [otpgenerated,setotpgenerated]=useState(false);
 const [transfer,settransfer]=useState(false);
 const [otp,setotp]=useState("")
 const [load,setload]=useState(false)
 const [otpcheck,setotpcheck]=useState({
    value:""
  })
  const router=useRouter()
  const [formData, setFormData] = useState({
    email: "",
  });
const handlenewpass=(e)=>{
    setnewpassword(e.target.value)
    
}
const update=async (e)=>{

    e.preventDefault()
    console.log(otpcheck)
    console.log(otpgenerated)
    //  console.log(newpassword)
    const res= await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}api/updatepassword`,{
        method:"POST",
        mode:"no-cors",
      body:JSON.stringify({newpassword,email:formData.email,transfer,otpgenerated})
    })
    console.log("hello")
    if(!res.ok){
         throw new Error("something is wrong")
    }
    const data=await res.json()
    if(data.msg=="success"){
        seterr("updated successfully")
      //  console.log("check");
        setTimeout(()=>{
            seterr("")
            router.push("/sign-in")
        },2000)
    }
    else{
      seterr(data.msg||"something wrong")
    }
}
  const handleChange = (e) => {
    const { name, value } = e.target;
    seterr("")
    setsuccessnew(false)
    setotp(false)
    setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
   
  };
  const handleOtpChange =async (e) => {
    settransfer(e.target.value)
    const hashedotp =await  crypto.createHash("sha256",process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE).update(e.target.value).digest("hex");
    seterr("")
    setotpcheck(hashedotp);
    setsuccessnew(false)
  };
  const handleSubmit = async (e) => {
    setotp(false);
 e.preventDefault();
 setsuccessnew(false)
setload(true)
 console.log(formData)
     try {
       const res= await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}api/forgot`,{
           method:"POST",
           mode:"no-cors",
         body:JSON.stringify({formData})
       })
          const data=await res.json()
          setload(false)
        
          if(data.msg==="success"){
              setotp(true);
          }
          else{
            seterr(data.msg)

        }
        if(err==""){
              const nodeotp=await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}/api/nodemailerr`,{
                method:"POST", 
              body:JSON.stringify({formData})
              })
            const nodotp=await nodeotp.json();
            
            
            
            
            setotpgenerated(nodotp.secret)
            //console.log(nodotp)
            //console.log(nodotp)
                  //router.push("/sign-in")
                
               //console.log(nodotp.secret)
                // Get the message from the response
                
        }
     
        setload(false)
  }
  catch(err){
    setload(false)
   console.log(err)
  }


}
const verify=async (e)=>{
    e.preventDefault()
  //console.log(otpcheck)
 // console.log(otpcheck)
  //console.log(otpgenerated)
  if(otpcheck==otpgenerated){

   
     
       setsuccessnew(true)
      

  }
  else{
    seterr("Incorrect OTP")
  }
  }
  return (
    <div className="flex justify-center mt-[20px] ">
      <form onSubmit={handleSubmit} className=" flex flex-col w-[400px] justify-center p-6">
        <h1 className="text-center font-bold text-[2rem]">Forgot password</h1>

        <label htmlFor="" className="pb-2">
          Email
        </label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="bg-white border-2 p-1" />
       
        <div className="pt-4">
       <Button name={load?"loading":"submit"}></Button>
       {
           otp && 
           <div className=" flex flex-col  gap-2   items-center pt-2">
           
             <div>
             <lab
             el htmlFor="">Check Your Mail (Resubmit if not Received )</lab>
             </div>
             <div className=" justify-evenly">
              
             <input type="text " value={otpcheck.value} className=" bg-white border-2" placeholder="Enter Otp"  name="otp" onChange={handleOtpChange} />
             <button className="btn btn-success mt-2" type="button"  onClick={verify}>Verify</button>
             </div>
            
           </div>
       }
        </div>
        {
          successnew&&
          <div className="flex justify-evenly mt-6">
              
          <input type="text " value={newpassword} className=" bg-white border-2" placeholder="New Password"  name="otp" onChange={handlenewpass} />
          <div>
          <button type="button" className="btn btn-success mt-2"  onClick={update}>Update</button>
          </div>
          </div>
        }
        {
          err&&<h1 className="mt-6 text-red-600">{err}</h1>
        }
     

      </form>
    </div>
  );
};
export default Page