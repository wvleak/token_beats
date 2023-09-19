"use client";

import { useStateContext } from "../../context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SmLayout from "./SmLayout";
import LgLayout from "./LgLayout";
import SearchBar from "./SearchBar";
import Logo from "./Logo";

const Navbar = () => {
  const { address, connect, getUserProfile, disconnect } = useStateContext();

  const [toggleDrawer, setToggleDrawer] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({ username: "", image: "" });

  useEffect(() => {
    const setUserProfile = async () => {
      const data = await getUserProfile(address);

      if (data) {
        setUser({ ...user, username: data.username, image: data.image });
      }
    };
    setUserProfile();
  }, [address]);

  return (
    <nav className="flex justify-between w-full mb-16 pt-3 gap-10">
      <Logo />
      <SearchBar />
      <LgLayout
        address={address}
        connect={connect}
        disconnect={disconnect}
        user={user}
        router={router}
      />
      <SmLayout
        toggleDrawer={toggleDrawer}
        toggle={setToggleDrawer}
        connect={connect}
        disconnect={disconnect}
        address={address}
      />
    </nav>
  );
};

export default Navbar;
