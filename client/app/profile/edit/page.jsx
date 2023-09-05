"use client";

import { useState, useEffect, useRef } from "react";
import FormField from "@components/atoms/FormField";
import CustomButton from "@components/atoms/CustomButton";
import { useStateContext } from "@context";

const Profile = () => {
  const [profile, setProfile] = useState({ username: "", image: "" });
  const { address, getUserProfile } = useStateContext();
  const inputRef = useRef(null);

  useEffect(() => {
    const setUserProfile = async () => {
      const data = await getUserProfile(address);
      console.log("UseEffect:", data);
      if (data) {
        setProfile({ ...profile, username: data.username, image: data.image });
      }
    };
    setUserProfile();
  }, [address]);

  const handleFormFieldChange = (fieldName, e) => {
    setProfile({ ...profile, [fieldName]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setProfile({ ...profile, image: base64 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(profile);
    try {
      const response = await fetch("/api/profile/edit", {
        method: "POST",
        body: JSON.stringify({
          address: address,
          username: profile.username,
          image: profile.image,
        }),
      });

      if (response.ok) {
        console.log("Went ok");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Edit Profile
        </h1>
      </div>
      <div className="flex justify-center mt-9 relative group hover:cursor-pointer">
        <img
          src="/assets/pen.svg"
          className="h-8 w-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 z-10 transition duration-300 ease-out"
          onClick={handleImageClick}
        />
        {profile.image ? (
          <img
            src={profile.image}
            alt="profile_picture"
            className="w-[190px] h-[190px] rounded-full group-hover:brightness-50 z-0 transition duration-300 ease-out"
            onClick={handleImageClick}
          />
        ) : (
          <img
            src="/assets/profile.jpg"
            alt="profile_picture"
            className="w-[190px] h-[190px] rounded-full group-hover:brightness-50 z-0 transition duration-300 ease-out"
            onClick={handleImageClick}
          />
        )}

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => handleFileUpload(e)}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex justify-center ">
          <FormField
            labelName="Username *"
            placeholder="Your username..."
            inputType="text"
            value={profile.username}
            handleChange={(e) => handleFormFieldChange("username", e)}
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
