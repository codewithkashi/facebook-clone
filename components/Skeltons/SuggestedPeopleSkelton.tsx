import React from "react";

const SuggestedPeopleSkelton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-40 rounded-full bg-gray-500 my-4"></div>
      <div className="flex items-center gap-2 my-2">
        <div className="h-12 w-12 bg-gray-500 rounded-full"></div>
        <div className="h-4 w-40 rounded-full bg-gray-500"></div>
      </div>
      <div className="flex items-center gap-2 my-2">
        <div className="h-12 w-12 bg-gray-500 rounded-full"></div>
        <div className="h-4 w-40 rounded-full bg-gray-500"></div>
      </div>
      <div className="flex items-center gap-2 my-2">
        <div className="h-12 w-12 bg-gray-500 rounded-full"></div>
        <div className="h-4 w-40 rounded-full bg-gray-500"></div>
      </div>
    </div>
  );
};

export default SuggestedPeopleSkelton;
