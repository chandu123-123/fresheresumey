import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";
import crypto from "crypto";
// import Payment from "@/lib/model"

// import { dbconnection } from "@/lib/database";
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

export async function POST(req,res) {
    console.log("paymentntntntn")
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
  await req.json();
   const body = razorpay_order_id + "|" + razorpay_payment_id;
//console.log("id==",body)

 const expectedSignature = crypto
   .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
   .update(body.toString())
   .digest("hex");
//console.log(expectedSignature,"dsfsdfasdf",razorpay_signature)
const isAuthentic = expectedSignature === razorpay_signature;


 if (isAuthentic) {

//   console.log(Payment)

//   await dbconnection()

//    await Payment.create({
//      razorpay_order_id,
//      razorpay_payment_id,
//      razorpay_signature,
//    });

  //  return NextResponse.redirect(new URL('/paymentsuccess', req.url));

} else {
    return NextResponse.json({
        message: "fail"
      }, {
        status: 400,
      })

}


return NextResponse.json({
    message: "success"
  }, {
    status: 200,
  })

}