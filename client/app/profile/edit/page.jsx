"use client";

import { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({ username: "", image: "" });

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        type="text"
        onChange={(e) => setUser({ ...user, image: e.target.value })}
      />
      {/* <input
        type="file"
        onChange={(e) => setUser({ ...user, image: e.target.files[0] })}
      /> */}
      <button className="bg-white" type="submit">
        submit
      </button>
    </form>
  );
};

export default Profile;
