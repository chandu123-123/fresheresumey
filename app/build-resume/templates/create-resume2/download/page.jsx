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
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles.module.css";

const MyComponent = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const router = useRouter();
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
  const pageStyle = `{ margins:10inch}`;
  const handlecheck = () => {
    if (useremail === "") {
      setLogin(true);
      setPrint(false);
      setTimeout(() => {
        setLogin(false);
        router.push("/sign-in");
      }, 1500);
    } else if (!pay) {
      setPrint(false);
      setPaying(true);
      setTimeout(() => {
        setPaying(false);
        router.push("/pricing");
      }, 1500);
    } else {
      handlePrint();
    }
  };
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    pageStyle: `@page {size: A4; margin: 4mm; }  @media print { body { -webkit-print-color-adjust: exact; }}`,
    // onBeforeGetContent: () => {
    //   if (useremail === "") {
    //     setLogin(true);
    //     setPrint(false);
    //     setTimeout(() => {
    //       setLogin(false);
    //     }, 2000);
    //   } else if (!pay) {
    //     setPrint(false);
    //     setPaying(true);
    //     setTimeout(() => {
    //       setPaying(false);
    //     }, 2000);
    //   } else {
    //     setPrint(true);
    //   }
    // }
  });

  useEffect(() => {
    setConfirm(true);
    if (ref) {
      ref.current = contentRef.current;
    }
  }, [ref]);

  return (
    <div>
      <button onClick={handlecheck} className="btn btn-outline btn-accent ml-6">
        Download
      </button>

      <div className="flex justify-center">
        {confirm && (
          <div className=" pl-2 border border-gray-300 rounded-lg w-[75%] max-h-[100rem] overflow-hidden">
            <div style={{ pageBreakInside: "avoid", pageBreakAfter: "always" }}  ref={contentRef}>
              <div className="flex ">
                {/* style={{ backgroundColor:'#12288D ',color:'white', width:'25%', height:'87rem'}} */}
                <div className="  max-w-72  mr-3">
                  <div className="mr-8 mt-8 flex justify-center h-28">
                    {formStatus.personal?.image && (
                      // <h1 className="font-bold text-[1.7rem] uppercase">
                      //   {`   ${formStatus.personal?.name}`}
                      // </h1>
                      <Image
                        src={formStatus.personal?.image}
                        width={100}
                        height={100}
                        className="flex ml-auto mr-auto mb-1 rounded-full"
                        alt="your photo"
                      ></Image>
                    )}
                  </div>

                  <div className="flex pb-5">
                    <div className="pt-5 flex flex-col gap-2 mr-2">
                      <div className="flex flex-col gap-2 mb-2">
                        {formStatus.personal?.mobile && (
                          <div className="flex gap-1 items-center">
                            <Image
                              className="object-contain"
                              src={"/social/telephone.png"}
                              width={20}
                              height={10}
                              alt="mail"
                            ></Image>
                            <a href={`tel:${formStatus.personal?.mobile}`}>
                              {formStatus.personal?.mobile}
                            </a>
                          </div>
                        )}
                        {formStatus.personal && (
                          <div className="flex gap-1 items-center">
                            <Image
                              className="object-contain"
                              src={"/social/mail.png"}
                              width={20}
                              height={10}
                              alt="mail"
                            ></Image>
                            <a href={`mailto:${formStatus.personal?.email}`}>
                              {formStatus.personal?.email}
                            </a>
                          </div>
                        )}
                        {formStatus.personal?.linkedin && (
                          <div className="flex gap-1 items-center">
                            <Image
                              className="object-contain"
                              src={"/social/linkedin.png"}
                              width={20}
                              height={10}
                              alt="mail"
                            ></Image>
                            <a
                              href={` ${
                                isValidLink(formStatus.personal?.linkedin)
                                  ? formStatus.personal.linkedin
                                  : "https://www.linkedin.com/"
                              }`}
                            >
                              Linkedin
                            </a>
                          </div>
                        )}
                        {formStatus.personal?.github && (
                          <div className="flex gap-1 items-center">
                            <Image
                              className="object-contain"
                              src={"/social/github.png"}
                              width={20}
                              height={10}
                              alt="mail"
                            ></Image>
                            <a
                              href={` ${
                                isValidLink(formStatus.personal?.github)
                                  ? formStatus.personal.github
                                  : "https://github.com/"
                              }`}
                            >
                              Github
                            </a>
                          </div>
                        )}
                        {formStatus.personal?.instagram && (
                          <div className="flex gap-1 items-center">
                            <Image
                              className="object-contain"
                              src={"/social/instagram.png"}
                              width={20}
                              height={10}
                              alt="mail"
                            ></Image>
                            <a
                              href={` ${
                                isValidLink(formStatus.personal?.instagram)
                                  ? formStatus.personal.instagram
                                  : "https://instagram.com/"
                              }`}
                            >
                              Instagram
                            </a>
                          </div>
                        )}
                        {formStatus.personal?.youtube && (
                          <div className="flex gap-1 items-center">
                            <Image
                              className="object-contain"
                              src={"/social/youtube.png"}
                              width={20}
                              height={10}
                              alt="mail"
                            ></Image>
                            <a
                              href={` ${
                                isValidLink(formStatus.personal?.youtube)
                                  ? formStatus.personal.youtube
                                  : "https://youtube.com/"
                              }`}
                            >
                              Youtube
                            </a>
                          </div>
                        )}
                      </div>
                      {formStatus.skills &&
                        formStatus.skills?.skills !== "" && (
                          <div>
                            <h1 className="font-bold text-[1.5rem] pb-2">
                              Skills
                            </h1>
                            <h1 className="flex "
                              dangerouslySetInnerHTML={{
                                __html: formStatus.skills?.skills
                                  ?.split(/(\s+)/)
                                  .map((part) => {
                                    if (/^https?:\/\/\S+$/.test(part)) {
                                      return `<a href="${part}" target="_blank" class="underline">Link</a>`;
                                    } else if (/\s+/.test(part)) {
                                      return part
                                        .replace(/ /g, "&nbsp;")
                                        .replace(/\n/g, "<br />");
                                    } else {
                                      return part;
                                    }
                                  })
                                  .join(""),
                              }}
                            />
                          </div>
                        )}
                      {formStatus.languages &&
                        formStatus.languages?.reason !== "" && (
                          <div>
                            <h1 className="font-bold text-[1.5rem] py-2">
                              Languages
                            </h1>
                            <h1
                              dangerouslySetInnerHTML={{
                                __html: formStatus.languages?.reason
                                  ?.split(/(\s+)/)
                                  .map((part) => {
                                    if (/^https?:\/\/\S+$/.test(part)) {
                                      return `<a href="${part}" target="_blank" class="underline">Link</a>`;
                                    } else if (/\s+/.test(part)) {
                                      return part
                                        .replace(/ /g, "&nbsp;")
                                        .replace(/\n/g, "<br />");
                                    } else {
                                      return part;
                                    }
                                  })
                                  .join(""),
                              }}
                            />
                          </div>
                        )}
                      {formStatus.interests &&
                        formStatus.interests?.reason !== "" && (
                          <div>
                            <h1 className="font-bold text-[1.5rem] py-2">
                              Interests
                            </h1>
                            <h1
                              dangerouslySetInnerHTML={{
                                __html: formStatus.interests?.reason
                                  ?.split(/(\s+)/)
                                  .map((part) => {
                                    if (/^https?:\/\/\S+$/.test(part)) {
                                      return `<a href="${part}" target="_blank" class="underline">Link</a>`;
                                    } else if (/\s+/.test(part)) {
                                      return part
                                        .replace(/ /g, "&nbsp;")
                                        .replace(/\n/g, "<br />");
                                    } else {
                                      return part;
                                    }
                                  })
                                  .join(""),
                              }}
                            />
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className={styles.line}></div>

                <div className="flex-2 pl-4">
                  <div className=" pt-14 pb-7">
                    {formStatus.personal?.name && (
                      <h1 className="font-bold text-[2.5rem] uppercase">
                        {`   ${formStatus.personal?.name}`}
                      </h1>
                    )}
                  </div>
                  {/* <hr /> */}
                  {formStatus.objective &&
                    formStatus.objective.reason !== "" && (
                      <div>
                        <h1 className="font-bold text-[1.5rem] py-2 ">
                          Objective
                        </h1>
                        <hr className="pb-2" />
                        <h1
                          dangerouslySetInnerHTML={{
                            __html: formStatus.objective?.reason
                              ?.replace(/ /g, "&nbsp;")
                              ?.replace(/\n/g, "<br />"),
                          }}
                        ></h1>
                      </div>
                    )}

                  {formStatus.education &&
                    formStatus.education.reason !== "" && (
                      <div>
                        <h1 className="font-bold text-[1.5rem] py-2">
                          Education
                        </h1>
                        <hr className="pb-2" />
                        <h1
                          dangerouslySetInnerHTML={{
                            __html: formStatus.education?.reason
                              ?.replace(/ /g, "&nbsp;")
                              ?.replace(/\n/g, "<br />"),
                          }}
                        ></h1>
                      </div>
                    )}
                  {formStatus.projects &&
                    formStatus.projects?.reason !== "" && (
                      <div>
                        <h1 className="font-bold text-[1.5rem] py-2">
                          Projects
                        </h1>
                        <hr className="pb-2" />
                        <h1
                          dangerouslySetInnerHTML={{
                            __html: formStatus.projects?.reason
                              ?.split(/(\s+)/)
                              .map((part) => {
                                if (/^https?:\/\/\S+$/.test(part)) {
                                  return `<a href="${part}" target="_blank" class="underline">Link</a>`;
                                } else if (/\s+/.test(part)) {
                                  return part
                                    .replace(/ /g, "&nbsp;")
                                    .replace(/\n/g, "<br />");
                                } else {
                                  return part;
                                }
                              })
                              .join(""),
                          }}
                        />
                      </div>
                    )}
                  {formStatus.internships &&
                    formStatus.internships?.reason !== "" && (
                      <div>
                        <h1 className="font-bold text-[1.5rem] py-2">
                          Internships
                        </h1>
                        <hr className="pb-2" />
                        <h1
                          dangerouslySetInnerHTML={{
                            __html: formStatus.internships?.reason
                              ?.split(/(\s+)/)
                              .map((part) => {
                                if (/^https?:\/\/\S+$/.test(part)) {
                                  return `<a href="${part}" target="_blank" class="underline">Link</a>`;
                                } else if (/\s+/.test(part)) {
                                  return part
                                    .replace(/ /g, "&nbsp;")
                                    .replace(/\n/g, "<br />");
                                } else {
                                  return part;
                                }
                              })
                              .join(""),
                          }}
                        />
                        {/* <h1
                      dangerouslySetInnerHTML={{
                        __html: formStatus.internships?.reason?.replace(
                          /\n/g,
                          "<br />"
                        ).replace(
                          /(https?:\/\/\S+)/g,
                          '<a href="$1" target="_blank" class="underline">Link</a>'
                        ),
                      }}
                    ></h1> */}
                      </div>
                    )}
                  {formStatus.achievements &&
                    formStatus.achievements?.one !== "" && (
                      <div>
                        <h1 className="font-bold text-[1.5rem] py-2">
                          Achievements
                        </h1>
                        <hr className="pb-2" />
                        <h1
                          dangerouslySetInnerHTML={{
                            __html: formStatus.achievements?.one
                              ?.split(/(\s+)/)
                              .map((part) => {
                                if (/^https?:\/\/\S+$/.test(part)) {
                                  return `<a href="${part}" target="_blank" class="underline">Link</a>`;
                                } else if (/\s+/.test(part)) {
                                  return part
                                    .replace(/ /g, "&nbsp;")
                                    .replace(/\n/g, "<br />");
                                } else {
                                  return part;
                                }
                              })
                              .join(""),
                          }}
                        />
                      </div>
                    )}
                </div>
              </div>

              <div className="mt-4">
                <br />
              </div>
            </div>
            {paying && (
              <div className="toast toast-top toast-center">
                <div className="alert alert-info">
                  <span>Payment is required for downloading</span>
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
MyComponent.displayName = "MyComponent";
export default MyComponent;
