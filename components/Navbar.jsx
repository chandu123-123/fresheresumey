"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { increment, decrement ,setemail,setunPaid,setForm} from "@/store/createslice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
const Navbar = () => {
  const logo="/images/logo.png"
  const dispatch = useDispatch();
  const useremail = useSelector((state) => state.counter.email);
  const userpaid = useSelector((state) => state.counter.paid);
  const userloginstatus = useSelector((state) => state.counter.value);
  const formstatus = useSelector((state) => state.counter.form);
  const [logoutalert, setlogoutalert] = useState(false);
  const [signinalert, setsigninalert] = useState(false);
  useEffect(()=>{
    console.log(useremail)
  })
  console.log(userloginstatus);
  return (
    <div className="py-4 max-w-[90%] mx-auto flex justify-between items-center">
      <div>
        <Link href="/">
          <Image src={logo} width={50} height={50} className="rounded-lg" alt="logo"></Image>
        </Link>
      </div>
      <div className="hidden  md:block">
        <ul className="flex gap-5 items-center">
          <li>
            <Link href="/pricing" className="">
              {" "}
              pricing
            </Link>
          </li>
          <li>
            {userloginstatus ? (
              <button
                className="btn btn-outline btn-error"
                onClick={() => {
                  dispatch(decrement());
                  setlogoutalert(true);
                  setsigninalert(false);
                  dispatch(setunPaid());
                  dispatch(setemail(""))
                  dispatch(setForm({
                    personal: {
                      name: "",
                        email:"",
                        mobile:"",
                        github:"",
                        linkedin:""
                
                      
                    },
                    education: {
                      collegeName: "",
                    },
                    skills: {
                      skills: "",
                    },
                    achievements: {
                      achievements: "",
                    },
                    certificates: {
                      certificateName: "",
                    },
                  }))
                  setTimeout(() => {
                    setlogoutalert(false);
                   
                  }, 2000);
                }}
              >
                Logout
              </button>
            ) : (
              <Link href="/sign-in">
                <button className="btn btn-outline btn-success" onClick={()=>{setlogoutalert(false);
                setsigninalert(true)
                setTimeout(() => {
                  setsigninalert(false);
                 
                }, 2000);
                }}>Sign-In</button>
              </Link>
            )}
          </li>
          <li>
            <Link href="/build-resume">
              <button className="btn btn-outline btn-warning">
                Build Resume
              </button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="block  md:hidden">
        {/* <ul className="flex gap-5 items-center">
          <li>
            <Link href="/pricing" className=""> pricing</Link>
          </li>
          <li>
            <Link href="/sign-in">
            <button className="btn btn-outline btn-success">Sign-In</button>
            </Link>
          </li>
          <li>
            <Link href="/build-resume">
            <button className="btn btn-outline btn-warning">Build Resume</button>
                </Link>
          </li>
        </ul> */}
        <button
          className="btn "
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          menu
        </button>
        <dialog id="my_modal_1" className="modal ">
          <div className="modal-box text-white bg-slate-600">
            <div className="flex text-white">
              <ul className="flex flex-col justify-center mx-auto gap-5 items-center">
                <li>
                  <Link
                    onClick={() =>
                      document.getElementById("my_modal_1").close()
                    }
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    onClick={() =>
                      document.getElementById("my_modal_1").close()
                    }
                    className=""
                  >
                    pricing
                  </Link>
                </li>
                <li>
                  {userloginstatus ? (
                    <button
                      className="btn btn-outline btn-error"
                      onClick={() => {
                        dispatch(decrement());
                        setlogoutalert(true);
                        dispatch(setunPaid());
                        dispatch(setemail(""))
                        dispatch(setForm({}))
                        dispatch(setForm({}))
                        setTimeout(() => {
                          setlogoutalert(false);
                        }, 2000);
                      }}
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      onClick={() =>
                        document.getElementById("my_modal_1").close()
                      }
                      href="/sign-in"
                    >
                      <button className="btn btn-outline btn-success"  onClick={()=>{setlogoutalert(false);
                setsigninalert(true)
                setTimeout(() => {
                  setsigninalert(false);
                 
                }, 2000);
                }}>
                        Sign-In
                      </button>
                    </Link>
                  )}
                </li>
                <li>
                  <Link
                    onClick={() =>
                      document.getElementById("my_modal_1").close()
                    }
                    href="/build-resume"
                  >
                    <button className="btn btn-outline btn-warning">
                      Build Resume
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      {
        logoutalert&&
        <div className="toast toast-top toast-center">
        <div className="alert alert-info">
          <span>LoggedOut Successfully</span>
        </div>
       
      </div>
      }
     
    </div>
  );
};

export default Navbar;
