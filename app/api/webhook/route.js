import { dbconnection } from '@/lib/database';
import { userlogin } from '@/lib/model';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    console.log("hello")
    const clonedReq = req.clone();
    const rawBody = await clonedReq.text();
    
    const razorpayEventType = req.headers.get('X-Razorpay-Event');
    const razorpaySignature = req.headers.get('X-Razorpay-Signature');

    const webhookSecret = process.env.NEXT_PUBLIC_SECRET;

    const hmac = crypto.createHmac('sha256', webhookSecret);
    hmac.update(rawBody);
    const generatedSignature = hmac.digest('hex');

    if (razorpaySignature !== generatedSignature) {
      throw new Error('Invalid Razorpay signature');
    }

    // Parse the webhook payload
    const body = JSON.parse(rawBody);
    const notes = body.payload.order.entity.notes; // Access the notes field
    const userEmail = notes.userEmail;

    console.log(`Webhook event received: ${razorpayEventType}`, body);

    // Event Handling
    if (razorpayEventType === 'order.paid') {
      const orderId = body.payload.order.entity.id;
      const status = body.payload.order.entity.status;
      
      // Ensure the order is marked as "paid"
      if (status === 'paid') {
        const email = userEmail; // Assuming custom notes contain the user's email
        console.log(`Processing payment for email: ${email}`);

        // Connect to the database and update the user record
        await dbconnection();
        const user = await userlogin.findOne({ email });

        if (user) {
          console.log(`User found: ${user}`);
          await userlogin.updateOne({ email }, { paid: true });
          console.log(`User payment status updated for email: ${email}`);
        } else {
          console.error(`User not found for email: ${email}`);
        }
      }
    }

    // Respond to Razorpay
    return NextResponse.json({ message: 'Webhook processed successfully' });

  } catch (err) {
    console.error('Error processing webhook:', err.message);
    return NextResponse.json({ message: 'Error processing webhook' }, { status: 500 });
  }
}
