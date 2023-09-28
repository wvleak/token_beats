import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="relative w-[288px] space-y-3 overflow-hidden rounded-md bg-neutral-800 p-3 shadow">
      <div className="h-[288px] w-full rounded-lg bg-neutral-600 animate-pulse"></div>
      <div className="space-y-3">
        <div className="h-5 w-8/12 rounded-full bg-neutral-600 animate-pulse"></div>
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
  );
};

const SkeletonLoaderContainer = ({ count }) => {
  const skeletonLoaders = Array.from({ length: count }, (_, index) => (
    <SkeletonLoader key={index} />
  ));

  return <div className="flex gap-5 flex-wrap">{skeletonLoaders}</div>;
};

export default SkeletonLoaderContainer;
