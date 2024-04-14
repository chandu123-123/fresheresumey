import { dbconnection } from "@/lib/database";
import { NextResponse } from "next/server";
import {userlogin} from "@/lib/model"
import bcrypt from "bcrypt" 
export async function POST(req, res) {
  
  const data = await req.json();
  const {formData}=data
  const {username,email,password}=formData
  
  await dbconnection();
  try{
  const user=await userlogin.find({email})
  if(user.length!=0){
    throw new Error("Already Account Created")
  }
  const pass=await bcrypt.hash(password,10);

  const newuser=new userlogin({
    username,
    email,
    password:pass,
  })
  await newuser.save();
  return NextResponse.json({ msg: "success" });
}
  catch(err){
    return NextResponse.json({ msg: `${err}` });
  }
  
  
}
