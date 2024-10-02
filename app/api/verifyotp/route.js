import { dbconnection } from "@/lib/database";
import { NextResponse } from "next/server";
import { isEmail } from 'validator';

import {userlogin} from "@/lib/model"
export async function POST(req, res) {
  
  const data = await req.json();
  const {formData}=data
  const {username,email,password}=formData
  if (!isEmail(email)) {
    return NextResponse.json({ msg: "Invalid email format" }, { status: 400 });
  }
 await dbconnection()
  try{
  const user=await userlogin.find({email})
  if(username===""||email===""||password===""){
    throw new Error("Enter all Details correctly")
  }


  return NextResponse.json({ msg: "success" });
}
  catch(err){
    return NextResponse.json({ msg: `${err}` });
  }
  
  
}
