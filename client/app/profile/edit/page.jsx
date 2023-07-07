"use client";

import { useState, useEffect } from "react";
import FormField from "@components/FormField";
import CustomButton from "@components/CustomButton";

const Profile = () => {
  const [user, setUser] = useState({ username: "", image: "" });
  const [postImage, setPostImage] = useState({ myFile: "" });
  const [getImage, setGetImage] = useState({ profile: "" });

  //TODO useEffect with address
  // useEffect(() => {
  //   getProfile;
  // },[])

  const getProfile = async (e) => {
    //console.log(user);
    console.log(getImage);
    try {
      const response = await fetch(`/api/profile/${user.username}`, {
        method: "GET",
      });

      if (response.ok) {
        console.log("Went ok");
        const data = await response.json();

        console.log(data.image);
        //const res = await response.json();
        //console.log(res);
        setGetImage({ ...getImage, profile: data.image });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormFieldChange = (fieldName, e) => {
    setUser({ ...user, [fieldName]: e.target.value });
    console.log(user);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    //console.log(base64);
    setUser({ ...user, image: base64 });
    console.log(user);
    //setPostImage({ ...postImage, myFile: base64 });
    //console.log(postImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("/api/profile/edit", {
        method: "POST",
        body: JSON.stringify({
          username: user.username,
          image: user.image,
        }),
      });

      if (response.ok) {
        console.log("Went ok");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <img width={100} height={100} src={getImage.profile} />
      <CustomButton
        btnType="button"
        title="profile"
        styles="bg-[#1dc071] text-white"
        handleClick={() => {
          getProfile(user.username);
        }}
      />
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Edit Profile
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Username *"
            placeholder="Gunna Type Beat"
            inputType="text"
            value={user.username}
            handleChange={(e) => handleFormFieldChange("username", e)}
          />
          <FormField
            labelName="Profile picture *"
            placeholder="Write a title"
            inputType="file"
            handleChange={(e) => handleFileUpload(e)}
          />
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="submit"
            styles="bg-[#1dc071] text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
