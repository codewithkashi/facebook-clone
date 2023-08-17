import React from "react";

const NotificationSkelton = () => {
  return (
    <div className="animate-pulse py-4 my-4 w-full">
      <div className="flex gap-3 items-center">
        <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
        <div className="w-[70%] bg-gray-500 rounded-full h-8 my-2"></div>
      </div>
      <div className="flex gap-3 items-center">
        <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
        <div className="w-[60%] bg-gray-500 rounded-full h-8 my-2"></div>
      </div>
      <div className="flex gap-3 items-center">
        <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
        <div className="w-[70%] bg-gray-500 rounded-full h-8 my-2"></div>
      </div>
      <div className="flex gap-3 items-center">
        <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
        <div className="w-[50%] bg-gray-500 rounded-full h-8 my-2"></div>
      </div>
      <div className="flex gap-3 items-center">
        <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
        <div className="w-[50%] bg-gray-500 rounded-full h-8 my-2"></div>
      </div>
    </div>
  );
};

export default NotificationSkelton;
