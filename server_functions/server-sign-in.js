"use server"

import axios from "axios"
import { redirect } from "next/dist/server/api-utils"

export const signin_submit=async (formdata)=>{
    "use server"
    const user=Object.fromEntries(formdata)
    const res= await fetch("http://localhost:3000/api/signin",{
      method:"POST",
      body:JSON.stringify({user})
     })
    
  }

  export const signup_submit=async (formdata)=>{
    "use server"
    const user=Object.fromEntries(formdata)
    const res= await fetch("http://localhost:3000/api/signup",{
      method:"POST",
      body:JSON.stringify({user})
     })
     const data=await res.json()
     console.log(data)
     if(data.msg==="success"){
      return "hello"
     }
//    const userdata=await res.json();
   
}