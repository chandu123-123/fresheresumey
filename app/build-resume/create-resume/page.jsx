"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { increment, decrement, setForm } from "@/store/createslice";

import { storage } from "@/lib/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { useDispatch, useSelector } from "react-redux";
import { set } from "mongoose";
import Image from "next/image";
const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userpaid = useSelector((state) => state.counter.paid);
  const formstatus = useSelector((state) => state.counter.form);
  const [status, setstatus] = useState("Submit");
 
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [formData, setFormData] = useState({
    personal: {
      name: "",
      image: "",
      email: "",
      mobile: "",
      github: "",
      linkedin: "",
    },
    internships: {
      reason: "",
    },
    projects: {
      reason: "",
    },
    education: {
      reason: "",
    },
    objective: {
      reason: "",
    },
    skills: {
      skills: "",
    },
    languages: {
      reason: "",
    },
    achievements: {
      one: "",
      two: "",
    },
    interests: {
      reason: "",
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
  useEffect(() => {
    handleChange("personal", "image", imgUrl);
   
    setFormData(formstatus);
  }, [imgUrl]);

  useEffect(() => {
    setFormData(formstatus);
    
  }, [formstatus]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setstatus("loading");
    // Access formData object containing all sections

    dispatch(setForm(formData));
    setFormData(formstatus);
    // Add logic to handle form submission

    setstatus("Submit");
    router.push(`/build-resume/create-resume/download`);
    // query: { formData: JSON.stringify(formData) },
  };

  const handleimage = (e) => {
    e.preventDefault();
    setImgUrl(null);
   
    const file = e.target?.files[0];
    
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
 try{
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      async (error) => {
        await setcheck("123")
        alert("Your file restricting the conditions");
      },
      () => {
        try{ 
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await handleChange("personal", "image", downloadURL);
        });}
        catch(err){
          console.log(err)
        }
      }
    );}
    catch(err){
      console.log(err)
    }
  };
  return (
    <div className="p-2 ">
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
              {formData.personal.image ?<><button className="py-5" type="button" onClick={()=>{handleChange("personal", "image", "")}} >Change / Remove Image</button></>:
              <div className="py-5">
               <h1 className="py-2">Image is an Optional (if only compulsory)</h1>
                <div className="flex gap-5">
                <input type="file" onChange={handleimage} />
                <h1>(Allowed less than 2MB)</h1>
                </div>

                {!imgUrl && (
                  <div className="outerbar">
                    <div
                      className="innerbar"
                      style={{ width: `${progresspercent}%` }}
                    >
                      {progresspercent}%
                    </div>
                  </div>
                )}
              
                {/* {
        imgUrl &&
        <Image src={imgUrl} width={100} height={100}></Image>
       // <img src={imgUrl} alt='uploaded file' height={50} />
      } */}
              </div>
}
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
                    placeholder="Github"
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
            <div className="collapse-title text-xl font-medium">Objective</div>
            <div className="collapse-content flex flex-col">
              <textarea
                type="text"
                placeholder="Enter if you are applying for a specific role in a Company. Else leave it"
                rows={6}
                value={formData.objective?.reason}
                onChange={(e) =>
                  handleChange("objective", "reason", e.target.value)
                }
                className="bg-white border-2 p-1 whitespace-pre-wrap"
              />
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">Education</div>
            <div className="collapse-content flex flex-col">
              <textarea
                type="text"
                placeholder="college - cgpa, intermediate - percentage , school - percent"
                rows={6}
                value={formData.education?.reason}
                onChange={(e) =>
                  handleChange("education", "reason", e.target.value)
                }
                className="bg-white border-2 p-1 whitespace-pre-wrap"
              />
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">Skills</div>
            <div className="collapse-content flex flex-col">
              {/* <input
                type="text"
                placeholder="skills"
                value={formData.skills?.skills}
                onChange={(e) =>
                  handleChange("skills", "skills", e.target.value)
                }
                className="bg-white border-2 p-1"
              /> */}
              <textarea
                type="text"
                placeholder="Example : Html, Css, React, Mongodb, Editing etc"
                rows={6}
                value={formData.skills?.skills}
                onChange={(e) =>
                  handleChange("skills", "skills", e.target.value)
                }
                className="bg-white border-2 p-1 whitespace-pre-wrap"
              />
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">Languages</div>
            <div className="collapse-content flex flex-col">
              {/* <input
                type="text"
                placeholder="skills"
                value={formData.skills?.skills}
                onChange={(e) =>
                  handleChange("skills", "skills", e.target.value)
                }
                className="bg-white border-2 p-1"
              /> */}
              <textarea
                type="text"
                placeholder="Example : Java, python etc"
                rows={6}
                value={formData.languages?.reason}
                onChange={(e) =>
                  handleChange("languages", "reason", e.target.value)
                }
                className="bg-white border-2 p-1 whitespace-pre-wrap"
              />
            </div>
          </div>
          {/* <div className="collapse collapse-arrow join-item border border-base-300">
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
          </div> */}
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              Internships
            </div>
            <div className="collapse-content flex flex-col">
              <textarea
                type="text"
                placeholder="Internship details"
                rows={6}
                value={formData.internships?.reason}
                onChange={(e) =>
                  handleChange("internships", "reason", e.target.value)
                }
                className="bg-white border-2 p-1 whitespace-pre-wrap"
              />
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">Projects</div>
            <div className="collapse-content flex flex-col">
              <textarea
                type="text"
                placeholder="Projects you have done"
                rows={6}
                value={formData.projects?.reason}
                onChange={(e) =>
                  handleChange("projects", "reason", e.target.value)
                }
                className="bg-white border-2 p-1 whitespace-pre-wrap"
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
                placeholder="Any achievements till now"
                rows={6}
                value={formData.achievements?.one}
                onChange={(e) =>
                  handleChange("achievements", "one", e.target.value)
                }
                className="bg-white border-2 p-1 whitespace-pre-wrap"
              />
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">Interests</div>
            <div className="collapse-content flex flex-col">
              <textarea
                type="text"
                placeholder="what are your interests"
                rows={6}
                value={formData.interests?.reason}
                onChange={(e) =>
                  handleChange("interests", "reason", e.target.value)
                }
                className="bg-white border-2 p-1 whitespace-pre-wrap"
              />
            </div>
          </div>
          {/* Similar structure for other sections */}
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          {status}
        </button>
      </form>
    </div>
  );
};

export default Page;
