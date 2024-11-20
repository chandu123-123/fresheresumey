import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });
  console.log("hello")
export async function POST(req) {
    const body = await req.json(); // Parse the request body to get dynamic data
    const { email} = body;
    const payment_capture = 1;
    const amount = 1 * 2500 // amount in paisa. In our case it's INR 1
    const currency = "INR";
    const options = {
        amount: (amount).toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture,
        notes: {
            // These notes will be added to your transaction. So you can search it within their dashboard.
            // Also, it's included in webhooks as well. So you can automate it.
            paymentFor: "Fresheresume",
            userId: "100",
            productId: 'P100',
            userEmail: email,
        }
    };
   const order = await instance.orders.create(options);
  return NextResponse.json({ msg: "success",order });
}


