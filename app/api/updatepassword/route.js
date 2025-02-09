
import { dbconnection } from "@/lib/database";
import { userlogin } from "@/lib/model";
import crypto from "crypto";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";
export async function POST(req,res){
    const data=await req.json()
      await dbconnection()
      //console.log(data)
      const pass=data.newpassword
      const {transfer,otpgenerated}=data
      const hashedot =await  crypto.createHash("sha256",process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE).update(transfer).digest("hex");
      if(hashedot!=otpgenerated){
        return NextResponse.json({msg:"something is wrong try again"})
      }
      if(hashedot==otpgenerated){
        console.log("succ")
      }
      const email=data.email
    //  console.log(email)
       try{
       
        if (pass=="") {
            return NextResponse.json({msg:"Enter password correctly"})
        }
        const passw=await bcrypt.hash(pass,10);
       const user=await userlogin.find({email})
       if (user) {
       await userlogin.findOneAndUpdate({email},{password:passw})
        console.log("success")
        // Additional logic here
        return NextResponse.json({msg:"success"})
      } else{
        return NextResponse.json({msg:"something is wrong try again"})
      }
    
    }
      
       
       catch(err){
        return NextResponse.json({msg:`${err}`})
       }
       
    }