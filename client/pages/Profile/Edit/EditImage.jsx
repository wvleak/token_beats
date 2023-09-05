import React from "react";

const EditImage = ({ image, onClick }) => {
  return (
    <>
      <div className="flex justify-center mt-9 relative group hover:cursor-pointer">
        <img
          src="/assets/pen.svg"
          className="h-8 w-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 z-10 transition duration-300 ease-out"
          onClick={onClick}
        />
        {image ? (
          <img
            src={image}
            alt="profile_picture"
            className="w-[190px] h-[190px] rounded-full group-hover:brightness-50 z-0 transition duration-300 ease-out"
            onClick={onClick}
          />
        ) : (
          <img
            src="/assets/profile.jpg"
            alt="profile_picture"
            className="w-[190px] h-[190px] rounded-full group-hover:brightness-50 z-0 transition duration-300 ease-out"
            onClick={onClick}
          />
        )}
      </div>
    </>
  );
};

export default EditImage;
