"use client"
import React, { useState } from 'react';
import { FaCheckCircle, FaCrown } from 'react-icons/fa';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import BuyProduct from "./razorpay/BuyProduct";

const Pricing = () => {
  const useremail = useSelector((state) => state.counter.email);
  const paid = useSelector((state) => state.counter.paid);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    'Unlimited Access',
    'Job Ready Resume',
    'Safe Transactions',
    'Unlock All Templates With Just One Payment!'
  ];

  const handleSubmit = async () => {
    if (!useremail) {
      toast.error('Please login to continue', {
        position: 'top-center',
        autoClose: 2000,
      });
      router.push('/sign-in');
      return;
    }

    if (paid) {
      toast.info('You already have a premium account', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}api/purchaseproduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_VARIANT,
          email: useremail,
        }),
      });

      const res = await response.json();
      if (res.checkoutUrl) {
        window.open(res.checkoutUrl, '_blank');
        router.push("/");
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Error processing payment. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ToastContainer />
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex justify-center">
            <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-indigo-100 text-indigo-600">
              Most Popular
            </span>
          </div>
          <div className="mt-4 flex justify-center">
            <span className="text-5xl font-extrabold text-gray-900">₹50</span>
            <span className="ml-1 text-xl font-semibold text-gray-500 self-end">/only once</span>
          </div>
        </div>

        <div className="px-6 pb-8">
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" size={20} />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
          <div className="mt-4">
        <BuyProduct />
      </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            Secure payment processed by Lemon Squeezy
          </div>
        </div>
      </div>
      
     
    </div>
  );
};

export default Pricing;