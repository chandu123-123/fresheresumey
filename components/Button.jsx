"use client"
import Link from 'next/link'
import React from 'react'
import {useFormStatus} from 'react-dom'
const Button = ({name}) => {
    const {pending}=useFormStatus()
   
  return (
    <div>
   {
    pending?<button className="btn btn-outline btn-success w-full ">
   <span className="loading loading-dots loading-md"></span> 
    </button>:  <button className="btn btn-outline btn-success w-full ">
    {name}
    </button>
   }     
  
   </div>
  )
}

export default Button
