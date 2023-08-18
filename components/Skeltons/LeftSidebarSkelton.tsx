import React from "react";

const LeftSidebarSkelton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full bg-gray-500 mr-2"></div>
        <div className="h-6 w-[50%] rounded-full bg-gray-500 my-4"></div>
      </div>
      <div className="h-12 w-[70%] rounded-full bg-gray-500 my-4"></div>
      <div className="h-12 w-[70%] rounded-full bg-gray-500 my-4"></div>
      <div className="h-12 w-[70%] rounded-full bg-gray-500 my-4"></div>
      <div className="h-12 w-[70%] rounded-full bg-gray-500 my-4"></div>
    </div>
  );
};

export default LeftSidebarSkelton;
