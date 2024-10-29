import React from 'react';

const Page = () => {
  return (
    <div className='p-5 min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-[2rem] font-bold mb-4'>Contact Us</h1>
      <p>If you have any queries, please contact us through:</p>
      <a href="mailto:contactfresheresume@gmail.com" className="text-blue-500 underline mb-4">
        contactfresheresume@gmail.com
      </a>
      <div className='mt-4'>
        <p><strong>Operational Address:</strong></p>
        <p>Vanasthalipuram, Hyderabad, Telangana, India</p>
      </div>
    </div>
  );
}

export default Page;
