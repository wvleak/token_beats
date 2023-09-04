"use client";

import Link from "next/link";
import Image from "next/image";
import { useConnect, useMetamask } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useStateContext } from "../context";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import NavbarHidden from "./atoms/NavbarHidden";

const Navbar = () => {
  const { address, connect, getUserProfile, disconnect } = useStateContext();

  const [toggleDrawer, setToggleDrawer] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({ username: "", image: "" });

  useEffect(() => {
    const setUserProfile = async () => {
      const data = await getUserProfile(address);
      console.log("UseEffect:", data);
      if (data) {
        setUser({ ...user, username: data.username, image: data.image });
      }
    };
    setUserProfile();
  }, [address]);

  return (
    <nav className="flex justify-between w-full mb-16 pt-3 gap-10">
      <Link href="/" className="flex gap-2 flex-center">
        <img
          src="/assets/logo-svg.svg"
          alt="logo"
          className="object-contain ml-10 max-w-[120px] h-auto"
        />
      </Link>
      <div className="relative flex items-center w-[50%] max-w-[500px] sm:min-w-[200px] h-[45px] rounded-lg bg-dark-charcoal mt-5 ml-5 md: lg:mr-[30%]">
        <img src="/assets/search.svg" className="absolute ml-2" />
        <input
          type="text"
          placeholder="Search for beats"
          className="h-[50px]  pl-10 bg-transparent w-full outline-none text-white"
        />
      </div>
      <div className="text-white mr-[100px] sm:flex hidden flex-row justify-end gap-4 mt-4">
        <CustomButton
          btnType="button"
          title={address ? "Sell beats" : "Connect"}
          styles={
            address
              ? "bg-gradient-to-r from-red-500 to-orange-600"
              : "bg-gradient-to-r from-pink-500 to-purple-600"
          }
          handleClick={() => {
            if (address) router.push("/sell");
            else connect();
          }}
        />
        {address && (
          <div className="flex gap-5">
            <Link href="/profile">
              <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
                {user.image === "" ? (
                  <img
                    src="/assets/profile.jpg"
                    alt="user"
                    className="w-[100%] h-[100%] rounded-full object-fit"
                  />
                ) : (
                  <img
                    src={user.image}
                    alt="user"
                    className="w-[100%] h-[100%] rounded-full object-fit"
                  />
                )}
              </div>
            </Link>
            <img
              src="assets/logout.svg"
              onClick={disconnect}
              className="items-center cursor-pointer"
            />
          </div>
        )}
      </div>
      <NavbarHidden
        toggleDrawer={toggleDrawer}
        toggle={setToggleDrawer}
        connect={connect}
        address={address}
      />
    </nav>
  );
};

export default Navbar;
