import React from "react";

const PostModelSkelton = () => {
  return (
    <div>
      <div className="animate-pulse flex items-center relative w-full px-4 lg:px-12 py-4 gap-3">
        <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gray-500 rounded-full"></div>
        <div className="w-full h-8 lg:h-12 rounded-full bg-gray-500"></div>
      </div>
      <div className="w-[70%] h-6 rounded-full my-6 bg-gray-500"></div>
      <div className="w-full h-40 lg:h-80 bg-gray-500"></div>
    </div>
  );
};

export default PostModelSkelton;
