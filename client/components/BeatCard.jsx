"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const BeatCard = ({
  beatId,
  name,
  producer,
  maxSupply,
  usdPrice,
  sales,
  uri,
  handleClick,
}) => {
  const [image, setImage] = useState("");
  const supplyLeft = maxSupply - sales;
  useEffect(() => {
    console.log(uri);
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    const response = await axios.get(uri);
    const data = response.data;
    console.log(response.data.image);
    setImage(data.image);
  };

  return (
    <div
      className="w-[288px]  bg-[#1c1c24] cursor-pointer"
      onClick={handleClick}
    >
      <img src={image} />
      <img
        src="https://www.billboard.com/wp-content/uploads/media/kanye-west-the-life-of-pablo-album-2016-billboard-1024.jpg?w=1024"
        alt="beatImage"
        className="w-full h-[288px] object-cover "
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
            #Tag (ex: Hip-Hop)
          </p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {name}
          </h3>
          <p className="mt-[5px] font-epilogue text-sm text-[#808191] text-left leading-[18px] truncate">
            <span className="text-[#898a9a]">by </span>
            {producer}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Supply left {supplyLeft.toString()}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              {usdPrice.toString()}$
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeatCard;
