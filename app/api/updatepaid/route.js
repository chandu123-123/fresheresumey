import { dbconnection } from "@/lib/database";
import { userlogin } from "@/lib/model";
import { NextResponse } from "next/server";
export async function POST(req,res){
    const data=await req.json()

       console.log("hello");
       await dbconnection()
       const email=data.email
       console.log(email)
       try{
       const user=await userlogin.find({email})
       console.log(user);
       await userlogin.updateOne({email},{paid:true})
       const user1=await userlogin.find({email})
       console.log(user1)
       return NextResponse.json({msg:`success`,paid:user1[0].paid})
       }
       catch(err){
        return NextResponse.json({msg:`${err}`})
       }
       
}