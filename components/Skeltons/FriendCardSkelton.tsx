import React from "react";

const FriendCardSkelton = () => {
  return (
    <div className="animate-pulse py-4 border-b-[1px] border-gray-400">
      <div className="w-48 h-6 my-4 bg-gray-500 rounded-full"></div>
      <div className="w-full flex gap-3">
        <div className="flex w-20 h-20 rounded-full bg-gray-500"></div>
        <div className="flex flex-col gap-2">
          <div className="h-5 w-44 bg-gray-500 rounded-full"></div>
          <div className="h-10 w-44 bg-gray-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default FriendCardSkelton;
