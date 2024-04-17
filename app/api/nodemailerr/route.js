// pages/api/sendEmail.js

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import generateOTP from "generate-otp";
import { dbconnection } from "@/lib/database";

export async function POST(req, res) {
    console.log("hello")
  // Check if the request method is POST
  const data = await req.json();
  await dbconnection()
 
  const {email } = data.formData;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "contactfresheresume@gmail.com",
      pass: "gnlr cahn aigy hruv",
    },
  });
 console.log("fdsa")
  const mailOptions = {
    from: "contactfresheresume@gmail.com",
    to:email,
    subject:"otp verification",
    text: (Math.floor(Math.random() * 900000) + 100000).toString(),
  };

  try {
    await transporter.sendMail(mailOptions);
  
    return NextResponse.json({ msg: "success", otp: mailOptions.text });
  } catch (error) {
    return NextResponse.error("failed to send error", 500);
  }
}
