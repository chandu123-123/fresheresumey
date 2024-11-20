import { dbconnection } from "@/lib/database";
import { userlogin } from "@/lib/model";
import { NextResponse } from "next/server";
import { isEmail } from 'validator';
export async function POST(req,res){
    const data=await req.json()

       
       await dbconnection()
       const email=data.useremail
       if (!isEmail(email)) {
        return NextResponse.json({ msg: "Invalid email format" }, { status: 400 });
      }
       try{
       const user=await userlogin.find({email})
   
       if (!user || user.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      const userdetails = user[0];
      console.log(userdetails)
      // Return the credits in the response
      return NextResponse.json({ userdetails });
       }
       catch(err){
        return NextResponse.json({msg:`${err}`})
       }
       
}