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
      <div className="relative flex items-center">
        <img src="/assets/search.svg" className="absolute ml-2" />
        <input
          type="text"
          placeholder="Search for campaigns"
          className="h-[50px]  pl-10 bg-dark-charcoal"
        />
      </div>
      <div className="text-white mr-[100px] ">
        <button className="bg-gradient-to-r from-purple-800 to-pink-500 mt-4 h-[50px] w-[130px] rounded-md">
          Button
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
