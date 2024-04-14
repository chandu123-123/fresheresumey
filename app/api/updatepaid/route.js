import { dbconnection } from "@/lib/database";
import { userlogin } from "@/lib/model";
import { NextResponse } from "next/server";
export async function POST(req,res){
    const data=await req.json()

       
       await dbconnection()
       const email=data.useremail
       try{
       const user=await userlogin.find({email})
   
       await userlogin.updateOne({email},{paid:true})
     
       return NextResponse.json({msg:`success`,paid:user[0].paid})
       }
       catch(err){
        return NextResponse.json({msg:`${err}`})
       }
       
}