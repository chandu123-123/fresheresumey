import { dbconnection } from '@/lib/database';
import { userlogin } from '@/lib/model';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Catch the event type
    const clonedReq = req.clone();
    const eventType = req.headers.get('X-Event-Name');  // assuming 'X-Name' is the header for event type
    const body = await req.json();  // parsing JSON body

    // Check signature
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE;
    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(await clonedReq.text()).digest('hex'), 'utf8');
    const signature = Buffer.from(req.headers.get('X-Signature') || '', 'utf8');

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error('Invalid signature.');
    }

    console.log(body);

    // Logic according to event type
    if (eventType === 'order_created') {
        console.log("hello")
      const userId = body.meta.custom_data.user_id;
      const isSuccessful = body.data.attributes.status === 'paid';
      console.log(isSuccessful)
      // Add your logic here for handling the order created event
      // e.g., updating the database, sending a confirmation email, etc.
    if(isSuccessful){
      await dbconnection()
        console.log(body.meta.custom_data.user_email)
        let email=body.meta.custom_data.user_email
        const user=await userlogin.find({email})
        console.log(user);
        await userlogin.updateOne({email},{paid:true})
  
    }}

    // Respond with success
    return NextResponse.json({ message: 'webhooks processed successfully' })

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' })
  }
}
