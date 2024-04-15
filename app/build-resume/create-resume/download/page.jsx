// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useReactToPrint } from "react-to-print";
// import html2pdf from "html2pdf.js";
// import { setPaid, setunPaid } from "@/store/createslice";
// const PrintPage = () => {
//   const dispatch = useDispatch();
//   const useremail = useSelector((state) => state.counter.email);
//   const userpaid = useSelector((state) => state.counter.paid);
//   const formstatus = useSelector((state) => state.counter.form);
//   const [login, setlogin] = useState(false);
//   const [paying, setpaying] = useState(false);
//   const pay = useSelector((state) => state.counter.paid);
//   // dispatch(setPaid());
//   console.log(pay);
//   const [confirm, setconfirm] = useState(false);
//   const componentRef = useRef();
//   console.log(useremail);
//   console.log(pay);
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });
//   useEffect(() => {
//     setconfirm(true);
//   }, []);
//   //     const handleDownloadPDF = () => {
//   //       // Your handleDownloadPDF function implementation
//   //       console.log(pay);
//   // if (useremail === "") {
//   //   setlogin(true);
//   //   setTimeout(() => {
//   //     setlogin(false);
//   //   }, 2000);
//   // } else if (!pay) {
//   //   setpaying(true);
//   //   setTimeout(() => {
//   //     setpaying(false); // <-- Corrected this line
//   //   }, 2000);
//   // } else {
//   //   const opt = {
//   //     margin: 0.5,
//   //     filename: "resume.pdf",
//   //     image: { type: "jpeg", quality: 0.98 },
//   //     html2canvas: { scale: 2 },
//   //     jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
//   //   };

//   //   html2pdf().from(componentRef.current).set(opt).save();
//   // }
//   //     };

//   // Your remaining code using html2pdf.js

//   const isValidLink = (link) => {
//     return (
//       link.startsWith("https://www.linkedin.com/") ||
//       link.startsWith("https://github.com/")
//     );
//   };

//   return (
//     <div>
//       {confirm && (
//         <div className="pt-5 pl-3 border border-gray-300 rounded-lg">
//           <div ref={componentRef}>
//             <div className="pb-2 flex flex-col gap-2">
//               <h1 className="font-bold text-[1.7rem] uppercase">
//                 {formstatus.personal?.name}
//               </h1>
//               <div className="flex gap-2">
//                 <a href={`tel:${formstatus.personal?.mobile}`}>
//                   {formstatus.personal.mobile}
//                 </a>

//                 <a href={`mailto:${formstatus.personal?.email}`}>email</a>
//                 <a
//                   href={` ${
//                     isValidLink(formstatus.personal?.linkedin)
//                       ? formstatus.personal.linkedin
//                       : "https://www.linkedin.com/"
//                   }`}
//                 >
//                   linkedin
//                 </a>
//                 <a
//                   href={` ${
//                     isValidLink(formstatus.personal?.github)
//                       ? formstatus.personal.github
//                       : "https://github.com/"
//                   }`}
//                 >
//                   github
//                 </a>
//               </div>
//             </div>
//             <hr className="pt-1" />
//             <div>
//               <h1 className="font-bold text-[1.5rem]">Education</h1>

//               <p className="">{formstatus.education?.collegeName}</p>
//               <p className="">{formstatus.education?.intername}</p>
//               <p className="">{formstatus.education?.schoolname}</p>
//             </div>
//             <div>
//               <h1 className="font-bold text-[1.5rem]">Skills</h1>
//               <h1 className="">{formstatus.skills.skills}</h1>
//             </div>
//             <div>
//               <h1 className="font-bold text-[1.5rem]">Achievements</h1>
//               <h1 className="">{formstatus.achievements?.one}</h1>
//               <h1 className="">{formstatus.achievements?.two}</h1>
//             </div>
//             <div className="mt-4">
//               <br />
//             </div>

//           </div>
//           {/* <button
//         onClick={handlePrint}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Print
//       </button>
//       <button
//         onClick={handleDownloadPDF}
//         className="mt-4 ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Download PDF
//       </button> */}
//           {paying && (
//             <div className="toast toast-top toast-center">
//               <div className="alert alert-info">
//                 <span>You were not paid</span>
//               </div>
//             </div>
//           )}
//           {login && (
//             <div className="toast toast-top toast-center">
//               <div className="alert alert-info">
//                 <span>please Login</span>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PrintPage;
"use client";
import React, { useEffect, useRef, useState, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useSelector, useDispatch } from "react-redux";

const MyComponent = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const useremail = useSelector((state) => state.counter.email);
  const [login, setLogin] = useState(false);
  const [paying, setPaying] = useState(false);
  const pay = useSelector((state) => state.counter.paid);
  const [print, setPrint] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const formStatus = useSelector((state) => state.counter.form);
  const contentRef = useRef(null);
  const isValidLink = (link) => {
    return (
      link?.startsWith("https://www.linkedin.com/") ||
      link?.startsWith("https://github.com/")
    );
  };
  const pageStyle = `{ margins:20inch}`;

  const handlePrint = useReactToPrint({
    content: () => (print && contentRef.current),
    pageStyle: `@page { margin: 20mm; }`,
    onBeforeGetContent: () => {
      if (useremail === "") {
        setLogin(true);
        setPrint(false);
        setTimeout(() => {
          setLogin(false);
        }, 2000);
      } else if (!pay) {
        setPrint(false);
        setPaying(true);
        setTimeout(() => {
          setPaying(false);
        }, 2000);
      } else {
        setPrint(true);
      }
    }
  });

  useEffect(() => {
    setConfirm(true);
    if (ref) {
      ref.current = contentRef.current;
    }
  }, [ref]);

  return (
    <div>
      <button onClick={handlePrint}>Print</button>
      <div className="p-6">
        {confirm && (
          <div className="pt-5 pl-3 border border-gray-300 rounded-lg">
            <div ref={contentRef}>
              <div className="pb-2 flex flex-col gap-2">
                <h1 className="font-bold text-[1.7rem] uppercase">
                  {`   ${formStatus.personal?.name}`}
                </h1>
                <div className="flex gap-2">
                  <a href={`tel:${formStatus.personal?.mobile}`}>
                    {formStatus.personal.mobile}
                  </a>

                  <a href={`mailto:${formStatus.personal?.email}`}>email</a>
                  <a
                    href={` ${
                      isValidLink(formStatus.personal?.linkedin)
                        ? formStatus.personal.linkedin
                        : "https://www.linkedin.com/"
                    }`}
                  >
                    linkedin
                  </a>
                  <a
                    href={` ${
                      isValidLink(formStatus.personal?.github)
                        ? formStatus.personal.github
                        : "https://github.com/"
                    }`}
                  >
                    github
                  </a>
                </div>
              </div>
              <hr className="pt-1" />
              <div>
                <h1 className="font-bold text-[1.5rem]">Education</h1>

                <p className="">{formStatus.education?.collegeName}</p>
                <p className="">{formStatus.education?.intername}</p>
                <p className="">{formStatus.education?.schoolname}</p>
              </div>
              <div>
                <h1 className="font-bold text-[1.5rem]">Skills</h1>
                <h1 className="">{formStatus.skills?.skills}</h1>
              </div>
              <div>
                <h1 className="font-bold text-[1.5rem]">Achievements</h1>
                <h1 className="">{formStatus.achievements?.one}</h1>
                <h1 className="">{formStatus.achievements?.two}</h1>
              </div>
              <div className="mt-4">
                <br />
              </div>
            </div>
            {paying && (
              <div className="toast toast-top toast-center">
                <div className="alert alert-info">
                  <span>You were not paid</span>
                </div>
              </div>
            )}
            {login && (
              <div className="toast toast-top toast-center">
                <div className="alert alert-info">
                  <span>Please login</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});
MyComponent.displayName = 'MyComponent';
export default MyComponent;