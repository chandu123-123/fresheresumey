"use client"
import Link from "next/link";

import React, { useState } from "react";
import { signin_submit } from "@/server_functions/server-sign-in";
import Button from "@/components/Button";
import { increment,decrement ,setemail,setPaid,setunPaid} from "@/store/createslice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
const Page = () => {
 
  const dispatch = useDispatch();
  const userloginstatus = useSelector((state) => state.counter.value);
  const useremail = useSelector((state) => state.counter.email);
  const userpaid = useSelector((state) => state.counter.paid);

  const router=useRouter()
  const [signinalert, setsigninalert] = useState(false);
  const [err,seterr]=useState("")
  const [status,setstatus]=useState("Submit");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    seterr("")
    setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
   
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setstatus("loading")
    try {
       
        const res= await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}api/signin`,{
          method:"POST",
          mode:"no-cors",
          body:JSON.stringify({formData})
         })
         const data=await res.json()
         setstatus("Submit")
        
         if(data.msg==="success"){
          console.log("success")
      
            seterr("")
            //console.log(useremail)
            dispatch(setemail(data.email));
           // console.log(useremail)
             dispatch(increment())
           setsigninalert(true)
           if(data.paid==true){
          dispatch(setPaid())
           }
           else{
            dispatch(setunPaid())
           }
          setTimeout(async () => {
            setsigninalert(false);
            router.push("/")
          }, 2000);
         // console.log(userloginstatus)
         
         }
         else{
          seterr(data.msg)
           // console.log(data.msg)
         }
        // Get the message from the response
    
    } catch (error) {
      
      // Handle signup failure
    }
  };


  return (
    <div className="flex justify-center mt-[20px]">
      <form onSubmit={handleSubmit} className=" flex flex-col w-[400px] justify-center p-6">
        <h1 className="text-center font-bold text-[3rem]">Sign-In</h1>

        <label htmlFor="" className="pb-2">
          Email
        </label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="bg-white border-2 p-1" />
        <label htmlFor=""  className="pb-2">
          Password
        </label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} className="bg-white border-2 p-1" />
        <div className="pt-4">
       <Button name={status}></Button>
        </div>
        {
          err&&<h1 className="mt-6 text-red-600">{err}</h1>
        }
        <div className="flex justify-between items-center pt-4">
          <h1>Account Not There ? </h1>
          {/* <button className="btn btn-success" onClick={()=>{route.push("/sign-up")}}>Sign-Up</button> */}
          <Link href="/sign-up"><button className="btn btn-success" >Sign-Up</button></Link>
        </div>
      </form>
      {
        signinalert&&
          <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Successfully Logged In</span>
          </div>
         
        </div>
        
      }
    </div>
  );
};

export default Page;
