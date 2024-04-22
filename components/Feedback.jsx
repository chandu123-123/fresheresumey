"use client"
import React, { useState } from 'react'

import { FaCheckCircle } from "react-icons/fa";
import { BiChatQuote } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';
const Keedbackuser = () => {
    const [pop,setpop]=useState(false)
    const [formdata,setformdata]=useState({
        email:"",
        message:"",
    })
    const handlechange=(e)=>{
        const {name,value}=e.target;
     setformdata({
        ...formdata,[name]:value,
     })
    }
    const handlesubmit=async (e)=>{
        e.preventDefault();
    
        const res=await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}api/feedbackuser`,{
            method:"POST",
            body:JSON.stringify(formdata),
        })
        const response=await res.json()
        if(response.msg=="success"){
           setpop(true)
           setTimeout(()=>{
               setpop(false)
               document.getElementById('my_modal').close();
           },2000)
        }
       
    }
  return (
    <div className='fixed right-2 bottom-2 '>
        
        <div>
         {/* <AiOutlineFeedback size={20}/> */}
        
       <button className="btn opacity-50" onClick={()=>document.getElementById('my_modal').showModal()}>Feedback</button>
        </div>
<dialog id="my_modal" className="modal">
  <div className="modal-box text-black bg-white text-center ">
    <div className='flex justify-center gap-3 items-center'>
    <h3 className="font-bold text-[1.5rem]">Thanks for sending Feedback</h3>
   <FaTimes className='hover:cursor-pointer ' size={20} onClick={()=>document.getElementById('my_modal').close()}></FaTimes>
    </div>
    <div className="modal-action">
      <form method="dialog" onSubmit={handlesubmit} className='flex flex-col gap-1 justify-center text-center mx-auto'>
        {/* if there is a button in form, it will close the modal */}
        <input type="email" required onChange={handlechange} value={formdata.email} placeholder='Enter your mail' className='p-2 bg-gray-300' name="email" id="" />
        <textarea required  onChange={handlechange} placeholder='Message' value={formdata.message} id="" cols="30" className='p-2 bg-gray-300' name="message" rows="10"></textarea>
        <button className="btn">Submit</button>
      </form>
    </div>
  </div>
</dialog>
{
    pop && 
    <div className="toast toast-top toast-center">
    <div className="alert alert-info">
      <span>Feedback sent</span>
    </div>
   
  </div>
}
    </div>
  )
}

export default Keedbackuser
