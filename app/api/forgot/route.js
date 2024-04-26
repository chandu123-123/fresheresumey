
import { dbconnection } from "@/lib/database";
import { userlogin } from "@/lib/model";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";
export async function POST(req,res){
    const data=await req.json()

     
       await dbconnection()
       const {email}=(data.formData)
       try{
       
        if (!email) {
            return NextResponse.json({msg:"Please Enter Email Correctly"})
        }
       const user=await userlogin.find({email})
    
       if(user.length!=0){
        return NextResponse.json({msg:"success"})
    }
       else{
        return NextResponse.json({msg:"Please Create Your Account"})
       }   
    
    }
      
       
       catch(err){
        return NextResponse.json({msg:`${err}`})
       }
       
    }