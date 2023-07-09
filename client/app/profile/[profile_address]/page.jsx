"use client";

import { useState, useEffect } from "react";
import { useStateContext } from "@context";
import DisplayBeats from "@components/DisplayBeats";

const SeeProfile = ({ params }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ username: "", image: "" });
  const [beats, setBeats] = useState([]);

  const { getProducerBeats, contract } = useStateContext();
  //todo get beats from profile
  const fetchBeats = async () => {
    setIsLoading(true);
    const data = await getProducerBeats(params.profile_address);
    setBeats(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (contract) fetchBeats();
  }, [contract]);
  useEffect(() => {
    const setUserProfile = async () => {
      const data = await getUserProfile(params.profile_address);

      if (data) {
        setUser({ ...user, username: data.username, image: data.image });
      }
    };
    setUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(`/api/profile/${user}`, {
        method: "GET",
      });

      if (response.ok) {
        console.log("Went ok");
        console.log(await response.json());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="bg-black/[.65]  flex gap-4 rounded-md w-full mb-11 p-4 relative ">
        <div
          className="absolute -z-10 -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75
           "
        ></div>
        <div className="">
          {user.image === "" ? (
            <img
              src="/assets/profile.jpg"
              alt="user"
              className="w-[200px] h-[200px] rounded-full object-fit border-white border-4"
            />
          ) : (
            <img
              src={user.image}
              alt="user"
              className="w-[200px] h-[200px] rounded-full object-fit border-white border-4"
            />
          )}
          {/* <img src="/assets/profile.jpg" className="rounded-full" /> */}
        </div>
        <div className="mt-6 flex flex-col gap-3">
          {user.username === "" ? (
            <h1 className="text-white text-4xl">Anonyme</h1>
          ) : (
            <h1 className="text-white text-4xl">{user.username}</h1>
          )}
          <p className="text-gray-400">{params.profile_address}</p>
        </div>
        <div className="grow"></div>

        {/* <CustomButton
          btnType="button"
          title="Edit"
          styles="bg-[#1dc071] text-white "
          handleClick={() => {
            router.push("/profile/edit");
          }}
        /> */}
      </div>
      <DisplayBeats
        title="Producer Beats"
        isLoading={isLoading}
        beats={beats}
      />
    </div>
  );
};

export default SeeProfile;
