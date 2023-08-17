import React from "react";

const GroupPageSkelton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full h-40 lg:h-60 bg-gray-500"></div>
      <div className="w-40 lg:w-60 h-6 rounded-full bg-gray-500 my-4"></div>
      <div className="w-28 lg:w-40 h-4 rounded-full bg-gray-500 my-4"></div>

      <div className="flex flex-col gap-2 mt-4">
        <div className="w-full h-4 rounded-full bg-gray-500"></div>
        <div className="w-full h-4 rounded-full bg-gray-500"></div>
        <div className="w-full h-4 rounded-full bg-gray-500"></div>
        <div className="w-full h-4 rounded-full bg-gray-500"></div>
      </div>
      <div className="w-full h-10 rounded-md bg-gray-500 my-6"></div>
    </div>
  );
};

export default GroupPageSkelton;
