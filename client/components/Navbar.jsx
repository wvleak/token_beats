"use client";

import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex justify-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/logo.png"
          alt="logo"
          width={120}
          height={100}
          className="object-contain ml-10"
        />
      </Link>
      <div className="flex justify-end">
        <input type="text" placeholder="Search for campaigns" className="" />
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img
            src="/assets/logo.png"
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>
      <div className="text-white mr-[100px]">Button</div>
    </nav>
  );
};

export default Navbar;
