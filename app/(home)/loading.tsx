import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center w-full lg:w-[50%]">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full flex justify-center animate-spin items-center">
        <div className="w-14 h-14 bg-[#e9ebee] rounded-full"></div>
      </div>
    </div>
  );
};

export default Loading;
