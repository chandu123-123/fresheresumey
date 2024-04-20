import React from 'react'

const FAQ = () => {
  return (
    <div >
      <h1 className='text-[2rem] p-6'>FAQ&apos;s</h1>
      <div>
      <div className="collapse collapse-arrow ">
  <input type="radio" name="my-accordion-2" defaultChecked /> 
  <div className="collapse collapse-arrow bg-white ">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl font-medium">
  What is a resume-building website, and why should I use it?
  </div>
  <div className="collapse-content"> 
    <p>A resume-building website is a platform that provides tools and templates to help individuals create professional resumes.It is for freshers especially, to add specific sections in resume, while many are confused about what to add. In this Using our website ensures your resume stands out from many students, increasing your chances of securing interviews and job opportunities.
</p>
  </div>
</div>
  <div className="collapse-title text-xl font-medium">
    Is there is refund ?
  </div>
  <div className="collapse-content"> 
    <p>There is no refund in this. You have unlimited access to make changes to make resume. Also you have access to future templates</p>
  </div>
</div>
<div className="collapse collapse-arrow ">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl font-medium">
  What types of templates do you offer, and can I customize them?
  </div>
  <div className="collapse-content"> 
    <p>We offer a single professionally designed resume template tailored to various job roles for students. Yes, you can customize the template by adjusting content.</p>
  </div>
</div>
<div className="collapse collapse-arrow ">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl font-medium">
    I have paid but, it&apos;s not allowing to print
  </div>
  <div className="collapse-content"> 
    <p>Please logout and login once again with your credentials</p>
  </div>
</div>
<div className="collapse collapse-arrow bg-white ">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl font-medium">
  Do you offer customer support, and how can I contact you for assistance?
  </div>
  <div className="collapse-content"> 
    <p>Yes, we provide dedicated customer support to assist you with any questions, technical issues, or feedback. You can reach out to our support team via email
</p>
  </div>
</div>
<div className="collapse collapse-arrow bg-white ">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl font-medium">
  What payment options do you accept, and how much does it cost?
  </div>
  <div className="collapse-content"> 
    <p>We accept various payment methods, including credit/debit cards, upi and other secure payment gateways. Please visit our pricing page for more information.
</p>
  </div>
</div>
      </div>
    </div>
  )
}

export default FAQ
