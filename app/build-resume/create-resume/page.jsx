"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { increment, decrement, setForm } from "@/store/createslice";

import { useDispatch, useSelector } from "react-redux";
import { set } from "mongoose";
const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userpaid = useSelector((state) => state.counter.paid);
  const formstatus = useSelector((state) => state.counter.form);
  console.log(formstatus);
  const [formData, setFormData] = useState({
    personal: {
      name: "",
      email: "",
      mobile: "",
      github: "",
      linkedin: "",
    },
    education: {
      collegeName: "",
      intername:"",
      schoolname:"",
    },
    skills: {
      skills: "",
    },
    achievements: {
      one:"",
      two:"",
    },
    certificates: {
      certificateName: "",
    },
  });
  const handleAddAchievement = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      achievements: [...prevFormData.achievements, { name: "", link: "" }],
    }));
  };

  const handleAchievementChange = (index, field, value) => {
    const updatedAchievements = formData.achievements.map((achievement, i) =>
      i === index ? { ...achievement, [field]: value } : achievement
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      achievements: updatedAchievements,
    }));
  };

  const handleChange = (section, fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [fieldName]: value,
      },
    }));
  };
  useEffect(() => {
    console.log(formstatus);
    if (userpaid) {
      setFormData(formstatus);
    }
  }, [formstatus]);
  const handleSubmit = (e) => {
    e.preventDefault();

    // Access formData object containing all sections
    console.log(formData);
    dispatch(setForm(formData));
    setFormData(formstatus);
    // Add logic to handle form submission
    console.log(formstatus);
    router.push(`/build-resume/create-resume/download`);
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
                  value={formData.personal?.name}
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
                    value={formData.personal?.mobile}
                    onChange={(e) =>
                      handleChange("personal", "mobile", e.target.value)
                    }
                    className="bg-white border-2 p-1"
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    value={formData.personal?.email}
                    onChange={(e) =>
                      handleChange("personal", "email", e.target.value)
                    }
                    className="bg-white border-2 p-1"
                  />
                  <input
                    type="text"
                    placeholder="LinkedIn"
                    value={formData.personal?.linkedin}
                    onChange={(e) =>
                      handleChange("personal", "linkedin", e.target.value)
                    }
                    className="bg-white border-2 p-1"
                  />
                  <input
                    type="text"
                    placeholder="github"
                    value={formData.personal?.github}
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
                placeholder="Btech/degree"
                value={formData.education?.collegeName}
                onChange={(e) =>
                  handleChange("education", "collegeName", e.target.value)
                }
                className="bg-white border-2 p-1"
              />
               <input
                type="text"
                placeholder="Intername"
                value={formData.education?.intername}
                onChange={(e) =>
                  handleChange("education", "intername", e.target.value)
                }
                className="bg-white border-2 p-1"
              />
               <input
                type="text"
                placeholder="schoolname"
                value={formData.education?.schoolname}
                onChange={(e) =>
                  handleChange("education", "schoolname", e.target.value)
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
                value={formData.skills?.skills}
                onChange={(e) =>
                  handleChange("skills", "skills", e.target.value)
                }
                className="bg-white border-2 p-1"
              />
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              Certificates
            </div>
            <div className="collapse-content">
              <input
                type="text"
                placeholder="College Name"
                value={formData.education?.collegeName}
                onChange={(e) =>
                  handleChange("education", "collegeName", e.target.value)
                }
                className="bg-white border-2 p-1"
              />
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              Achievements
            </div>
            <div className="collapse-content flex flex-col">
              <textarea
                type="text"
                placeholder="one"
                value={formData.achievements?.one}
                onChange={(e) =>
                  handleChange("achievements", "one", e.target.value)
                }
                className="bg-white border-2 p-1"
              />
                <textarea
                type="text"
                placeholder="two"
                value={formData.achievements?.two}
                onChange={(e) =>
                  handleChange("achievements", "two", e.target.value)
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
