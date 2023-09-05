"use client";

import { convertToBase64 } from "@utils/file_management";

import { useState, useEffect, useRef } from "react";
import { useStateContext } from "@context";
import EditForm from "@pages/Profile/Edit/EditForm";
import EditImage from "@pages/Profile/Edit/EditImage";
import Title from "@components/atoms/Title";

const Profile = () => {
  const { address, getUserProfile } = useStateContext();

  const [profile, setProfile] = useState({ username: "", image: "" });
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

  const inputRef = useRef(null);
  const handleImageClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <Title
          title="Edit Profile"
          styles="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white"
        />
      </div>

      <EditImage image={profile.image} onClick={handleImageClick} />
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => handleFileUpload(e)}
      />

      <EditForm
        onSubmit={handleSubmit}
        onFormFieldChange={handleFormFieldChange}
        username={profile.username}
      />
    </div>
  );
};

export default Profile;
