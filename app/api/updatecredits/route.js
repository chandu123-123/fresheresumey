import { dbconnection } from "@/lib/database";
import { userlogin } from "@/lib/model";
import { isEmail } from 'validator';

import { NextResponse } from "next/server";
export async function POST(req,res){
    const data=await req.json()

       
       await dbconnection()
       const email=data.useremail
       console.log(email)
       if (!isEmail(email)) {
        return NextResponse.json({ msg: "Invalid email format" }, { status: 400 });
      }
       try{
       const user=await userlogin.find({email})
   console.log("paid")
     console.log(user)
       return NextResponse.json(user)
       }
       catch(err){
        return NextResponse.json({msg:`${err}`})
       }
       
}