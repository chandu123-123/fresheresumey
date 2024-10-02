
import { dbconnection } from "@/lib/database";
import { userlogin } from "@/lib/model";
import bcrypt from "bcrypt"
import { isEmail } from 'validator';
import { NextResponse } from "next/server";
export async function POST(req,res){
    const data=await req.json()

     
       await dbconnection()
       const {email,password}=(data.formData)
       if (!isEmail(email)) {
        return NextResponse.json({ msg: "Invalid email format" }, { status: 400 });
      }
       try{
        
        if (!password) {
            return NextResponse.json({msg:"Please Enter the Details Correctly"})
        }
       const user=await userlogin.find({email})
    
       if(user.length!=0){
       const check=await bcrypt.compare(password,user[0].password);
       if(check){
       return NextResponse.json({msg:"success",email,paid:user[0].paid})
       }
       else{
        return NextResponse.json({msg:"Incorrect Password"})
       }   
    
    }
       else{
        return NextResponse.json({msg:"User doesn't exist"})
       }
       }
       catch(err){
        return NextResponse.json({msg:`${err}`})
       }
}