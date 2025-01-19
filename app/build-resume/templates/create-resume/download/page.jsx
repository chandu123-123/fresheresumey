"use client";
import React, { useEffect, useRef, useState, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    pageStyle: `@page { margin: 8mm; } `,
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

      <div className="p-6 overflow-x-auto flex justify-center">
        {confirm && (
          <div className="pt-5 pl-3 border border-gray-300 rounded-lg w-[75%]">
            <div ref={contentRef}>
              <div className="flex pb-5">
                <div className="pt-2 flex flex-col gap-2 mr-2 ">
                  <div>
                    {formStatus.personal?.name && (
                      <h1 className="font-bold text-[1.9rem] uppercase">
                        {`   ${formStatus.personal?.name}`}
                      </h1>
                    )}
                  </div>
                  <div className="flex gap-3 flex-wrap">
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
                          src={"/social/linkedin.png"}
                          className="object-contain"
                          width={20}
                          height={10}
                          alt="mail"
                        ></Image>
                        <a
                          href={formStatus.personal.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn
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
                          href={formStatus.personal.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
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
                          href={formStatus.personal.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
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
                          href={formStatus.personal.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          YouTube
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-auto ">
                  {formStatus.personal?.image && (
                    <Image
                      src={formStatus.personal?.image}
                      width={85}
                      height={85}
                      className="flex mr-4 rounded-full"
                      alt="your photo"
                    ></Image>
                  )}
                </div>
              </div>

              {formStatus.objective && formStatus.objective.reason !== "" && (
                <div>
                  <h1 className="font-bold text-[1.5rem] py-2">Objective</h1>
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
              {formStatus.education && formStatus.education.reason !== "" && (
                <div>
                  <h1 className="font-bold text-[1.5rem] py-2">Education</h1>
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
              {formStatus.skills && formStatus.skills?.skills !== "" && (
                <div>
                  <h1 className="font-bold text-[1.5rem] py-2">Skills</h1>
                  <hr className="pb-2" />
                  <h1
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
              {formStatus.languages && formStatus.languages?.reason !== "" && (
                <div>
                  <h1 className="font-bold text-[1.5rem] py-2">Languages</h1>
                  <hr className="pb-2" />
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
                  </div>
                )}
              {formStatus.projects && formStatus.projects?.reason !== "" && (
                <div>
                  <h1 className="font-bold text-[1.5rem] py-2">Projects</h1>
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
              {formStatus.interests && formStatus.interests?.reason !== "" && (
                <div>
                  <h1 className="font-bold text-[1.5rem] py-2">Interests</h1>
                  <hr className="pb-2" />
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
