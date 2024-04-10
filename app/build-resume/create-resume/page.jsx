"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link"
import { increment,decrement,setForm } from "@/store/createslice";

import { useDispatch, useSelector } from "react-redux";
const Page = () => {
  const router=useRouter();
  const dispatch = useDispatch();
  const formstatus = useSelector((state) => state.counter.form);
  console.log(formstatus)
  const [formData, setFormData] = useState({
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
  });

  const handleChange = (section, fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [fieldName]: value,
      },
    }));
  };
 useEffect(()=>{
  console.log(formstatus)
 // setFormData(formstatus)
 },[formstatus])
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Access formData object containing all sections
    console.log(formData);
    dispatch(setForm(formData))
    // Add logic to handle form submission
    console.log(formstatus)
    router.push(`/build-resume/create-resume/download`)
      // query: { formData: JSON.stringify(formData) },

  };

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit}>
        <div className="join join-vertical w-full">
        <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">Personal</div>
            <div className="collapse-content">
              <div className="flex gap-2 items-center">
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.personal.name}
                onChange={(e) =>
                  handleChange("personal", "name", e.target.value)
                }
                className="bg-white border-2 p-1"
              />
              </div>
              <div>
              <label htmlFor="">Links</label>
              <div>
              <input
                type="text"
                placeholder="Mobile"
                value={formData.personal.mobile}
                onChange={(e) =>
                  handleChange("personal", "mobile", e.target.value)
                }
                className="bg-white border-2 p-1"
              />
               <input
                type="text"
                placeholder="Email"
                value={formData.personal.email}
                onChange={(e) =>
                  handleChange("personal", "email", e.target.value)
                }
                className="bg-white border-2 p-1"
              />
               <input
                type="text"
                placeholder="LinkedIn"
                value={formData.personal.linkedin}
                onChange={(e) =>
                  handleChange("personal", "linkedin", e.target.value)
                }
                className="bg-white border-2 p-1"
              />
               <input
                type="text"
                placeholder="github"
                value={formData.personal.github}
                onChange={(e) =>
                  handleChange("personal", "github", e.target.value)
                }
                className="bg-white border-2 p-1"
              />
              </div>
              </div>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">Education</div>
            <div className="collapse-content">
              <input
                type="text"
                placeholder="College Name"
                value={formData.education.collegeName}
                onChange={(e) =>
                  handleChange("education", "collegeName", e.target.value)
                }
                className="bg-white border-2 p-1"
              />
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">Skills</div>
            <div className="collapse-content">
              <input
                type="text"
                placeholder="skills"
                value={formData.skills.skills}
                onChange={(e) =>
                  handleChange("skills", "skills", e.target.value)
                }
                className="bg-white border-2 p-1"
              />
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">Education</div>
            <div className="collapse-content">
              <input
                type="text"
                placeholder="College Name"
                value={formData.education.collegeName}
                onChange={(e) =>
                  handleChange("education", "collegeName", e.target.value)
                }
                className="bg-white border-2 p-1"
              />
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">Education</div>
            <div className="collapse-content">
              <input
                type="text"
                placeholder="College Name"
                value={formData.education.collegeName}
                onChange={(e) =>
                  handleChange("education", "collegeName", e.target.value)
                }
                className="bg-white border-2 p-1"
              />
            </div>
          </div>
          {/* Similar structure for other sections */}
        </div>
      
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
     
      </form>
    </div>
  );
};

export default Page;
