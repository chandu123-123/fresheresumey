import { dbconnection } from "@/lib/database";
import { userfeedback, userlogin } from "@/lib/model";

import { NextResponse } from "next/server";
export async function POST(req, res) {
  const data = await req.json();

  await dbconnection();
  const { email, message } = data;
  try {
    
    const usersfeed = new userfeedback({
      email,
      message,
    });
    usersfeed.save();
  } catch (err) {
    console.log(err);
    return NextResponse.json({ msg: `${err._message}` });
  }

  return NextResponse.json({ msg: "success" });
}
