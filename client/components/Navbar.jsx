"use client";

import Link from "next/link";
import Image from "next/image";
import { useConnect, useMetamask } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useStateContext } from "../context";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const { address, connect } = useStateContext();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const router = useRouter();

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
          <Link href="/profile">
            <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
              <img
                src="/assets/profile.jpg"
                alt="user"
                className="w-[100%] h-[100%] rounded-full object-fit"
              />
            </div>
          </Link>
        )}
      </div>
      <div className="sm:hidden">
        <img
          src="/assets/menu.svg"
          className="min-w-[60px] h-[60px] mt-4"
          alt="menu"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 
        ${
          !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-10"
        } transition-all duration-700`}
        >
          <ul className="mb-4">
            {address && (
              <Link href="/profile" className="flex gap-4 mx-4">
                <img
                  src="/assets/profile.svg"
                  alt="user"
                  className="w-[40px] h-[40px] rounded-full object-fit grayscale hover:grayscale-0"
                />
                <p className="text-white font-bold text-[20px] my-auto">
                  profile
                </p>
              </Link>
            )}
          </ul>
          <div className="flex mx-4 text-white">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
