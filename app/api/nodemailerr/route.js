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
      user: "chandancheripallyssr@gmail.com",
      pass: "geal qzlf kfby sfth",
    },
  });
 
  const mailOptions = {
    from: "chandancheripallyssr@gmail.com",
    to:email,
    subject:"otp check",
    text: (Math.floor(Math.random() * 900000) + 100000).toString(),
  };

  try {
    await transporter.sendMail(mailOptions);
  
    return NextResponse.json({ msg: "success", otp: mailOptions.text });
  } catch (error) {
    return NextResponse.error("failed to send error", 500);
  }
}
