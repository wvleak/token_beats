import React from "react";

const SkeletonLoadingInfo = () => {
  return (
    <>
      <div className="flex flex-col gap-5 w-[350px] h-[500px] p-7 bg-[#3a3a4368] rounded-[10px] ">
        <div className="h-[288px] w-full rounded-lg bg-neutral-600 animate-pulse"></div>
        <div className="space-y-1">
          <div className="h-4 w-full rounded-full bg-neutral-600 shadow animate-pulse"></div>
          <div className="h-4 w-7/12 rounded-full bg-neutral-600 shadow animate-pulse"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-full bg-neutral-600 animate-pulse"></div>
          <div className="h-5 w-12 rounded-full bg-neutral-600 animate-pulse"></div>
        </div>
      </div>
      <div className="flex-col w-[80%] self-start">
        <div className="h-[70px] max-w-[800px] rounded-full bg-neutral-600 animate-pulse"></div>
        <div className="flex flex-col gap-5 max-w-[800px] h-[300px] p-7 bg-[#3a3a4368] rounded-[10px] mt-6">
          <div className="h-[70px] max-w-[800px] rounded-lg bg-neutral-600 animate-pulse"></div>
          <div className="space-y-1">
            <div className="h-4 w-full rounded-full bg-neutral-600 shadow animate-pulse"></div>
            <div className="h-4 w-7/12 rounded-full bg-neutral-600 shadow animate-pulse"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-5 w-16 rounded-full bg-neutral-600 animate-pulse"></div>
            <div className="h-5 w-12 rounded-full bg-neutral-600 animate-pulse"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonLoadingInfo;
