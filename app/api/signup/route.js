import { dbconnection } from "@/lib/database";
import { NextResponse } from "next/server";
import {userlogin} from "@/lib/model"
import bcrypt from "bcrypt" 
import crypto from "crypto";
export async function POST(req, res) {
  
  const data = await req.json();
  const {formData,otpgenerated,targetotp}=data
  console.log(otpgenerated,targetotp)
  const hashedotp =await  crypto.createHash("sha256",process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE).update(targetotp).digest("hex");
 if(otpgenerated!=hashedotp){
  console.log("hello")
  return NextResponse.json({ msg: "Something is Wrong" });
 }
  const {username,email,password}=formData
  await dbconnection();
  try{
  const user=await userlogin.find({email})
  if(user.length!=0){
    throw new Error("Already Have an Account")
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
