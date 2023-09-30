"use client";

import { convertToBase64 } from "@utils/file_management";

import { useState, useEffect, useRef } from "react";
import { useStateContext } from "@context";
import EditForm from "@components/SpecificPage/Profile/Edit/EditForm";
import EditImage from "@components/SpecificPage/Profile/Edit/EditImage";
import Title from "@components/atoms/Title";
import LoadingScreen from "@components/Displays/LoadingScreen";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  // Access required functions and data from the context
  const { address, getUserProfile } = useStateContext();

  // Initialize profile state
  const [profile, setProfile] = useState({ username: "", image: "" });

  // Fetch user profile information when the address changes
  useEffect(() => {
    const setUserProfile = async () => {
      const data = await getUserProfile(address);

      if (data) {
        setProfile({ ...profile, username: data.username, image: data.image });
      }
    };

    setUserProfile();
  }, [address]);

  // Handle form field changes
  const handleFormFieldChange = (fieldName, e) => {
    setProfile({ ...profile, [fieldName]: e.target.value });
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setProfile({ ...profile, image: base64 });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios({
        method: "POST",
        url: "/api/profile/edit",
        data: JSON.stringify({
          address: address,
          username: profile.username,
          image: profile.image,
        }),
      });

      if (response.ok) {
        console.log("Request successful");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const inputRef = useRef(null);

  // Handle image click to trigger file input
  const handleImageClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <LoadingScreen text="Changing profile informations" />}
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
