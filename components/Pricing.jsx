"use client"
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle, FaCrown } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { setPaid } from '@/store/createslice';
import { useRouter } from 'next/navigation';
import io from 'socket.io-client';

const Pricing = () => {
  const useremail = useSelector((state) => state.counter.email);
  const paid = useSelector((state) => state.counter.paid);
  const router = useRouter();
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    console.log(paid)
    if (!useremail) {
      toast.error('Please login to continue', {
        position: 'top-center',
        autoClose: 2000,
      });
      router.push('/sign-in');
    } else if (paid) {
      toast.info('You already have a premium account', {
        position: 'top-center',
        autoClose: 2000,
      });
    } else {
      console.log(paid)
      if(paid){
        return
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
        console.log(useremail,process.env.NEXT_PUBLIC_LEMON_SQUEEZY_VARIANT)
        const res = await response.json();
        console.log(res)
        if (res.checkoutUrl) {
          window.open(res.checkoutUrl, '_blank');
          router.push("/")
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
    }
  };
  const features = [
    'Unlimited Access to All Templates',
    'Job-Ready Resume Builder',
  ];
  return (
    <div >
      <ToastContainer />
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
        </div>
        <div className="mt-12 bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10 sm:pb-6">
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
          <div className="px-6 pt-6 pb-8 sm:px-10 sm:pt-6">
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <FaCheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">{feature}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <button
                onClick={handleSubmit}
                disabled={isLoading || paid}
                className={`w-full flex justify-center py-3 px-5 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  (isLoading || paid) && 'opacity-50 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  'Processing...'
                ) : paid ? (
                  <span className="flex items-center">
                    <FaCrown className="mr-2" /> Premium Member
                  </span>
                ) : (
                  'Upgrade Now'
                )}
              </button>
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              Secure payment processed by Lemon Squeezy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;