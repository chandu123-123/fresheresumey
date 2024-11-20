"use client";
import React, { Suspense, useEffect } from "react";
import Buy from "./Buy";
import { useRouter  } from 'next/navigation';
import Loading from "@/app/loading";
import { useDispatch, useSelector } from "react-redux";
import {setPaid,setunPaid} from "@/store/createslice";

const BuyProduct = () => {

  const router = useRouter()
  const dispatch = useDispatch();
  const useremail = useSelector((state) => state.counter.email);
  //console.log(useremail)
  const userpaid = useSelector((state) => state.counter.paid);
  useEffect(()=>{
   // console.log(userpaid)
  })
  const makePayment = async ({ productId = null }) => {
    // "use server"
    const key = process.env.RAZORPAY_API_KEY;
    //console.log(key);
    // Make API call to the serverless API
    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}/api/razorpay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          useremail, // Include the email in the request body
        }),
      });
      const { order } = await response.json();

if (!order) {
  console.error("Order creation failed");
  return;
}
 //   console.log(order.id);
    const options = {
      key: key,
      name: "FresheResume",
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      description: "Payment for Downloading Resume",
      // image: logoBase64,
      handler: async function (response) {
        // if (response.length==0) return <Loading/>;
      //  console.log(response);
        if(response.razorpay_payment_id){
        // console.log(response.razorpay_payment_id)
          dispatch(setPaid())
        }
        const data = await  fetch(`${process.env.NEXT_PUBLIC_LOCALURL}/api/paymentverify`, {
          method: "POST",
          // headers: {
          //   // Authorization: 'YOUR_AUTH_HERE'
          // },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });



        const res = await data.json();

       // console.log("response verify==",res)

        if(res?.message=="success")
        {
          
        //  const res= await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}/api/updatepaid`,{
        //   method:"POST",
        //   mode:'no-cors',
        //       body:JSON.stringify({useremail})}
        //  );
        //  const data=await res.json()
        //  if(data.paid==true){
        //   dispatch(setPaid())
        //  }
        //  else{
        //   dispatch(setunPaid())
        //  }
        //  console.log("redirected.......")

          router.push(`${process.env.NEXT_PUBLIC_LOCALURL}/paymentsuccess?paymentid=`+response.razorpay_payment_id)

        }

        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: "FresherResume",
        email: useremail,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      alert("Payment failed. Please try again");
    });
  };

  return (
    <>
    <Suspense fallback={<Loading/>}>
      <Buy makePayment={makePayment} />
      </Suspense>
    </>
  );
};

export default BuyProduct;