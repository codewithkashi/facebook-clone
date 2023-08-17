import React from "react";

const PostCardSkelton = () => {
  return (
    <div className="w-full animate-pulse px-4 lg:px-12 py-4 border-b-4 border-gray-500">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="h-8 w-8 lg:h-12 lg:w-12 rounded-full bg-gray-500"></div>
          <div className="flex flex-col gap-2">
            <div className="h-3 w-32 rounded-full bg-gray-500"></div>
            <div className="h-2 w-12 rounded-full bg-gray-500"></div>
          </div>
        </div>

        <div className="h-8 w-5 rounded-md bg-gray-500"></div>
      </div>

      <div className="w-[60%] h-4 rounded-full bg-gray-500 mt-6"></div>
      <div className="w-[40%] h-4 rounded-full bg-gray-500 mt-2"></div>

      <div className="w-full h-[300px] lg:h-[500px] my-4 rounded-md bg-gray-500"></div>

      <div className="flex justify-between items-center my-4 py-2 border-b-[1px] border-gray-500">
        <div className="flex gap-2 h-6 w-16 rounded-full bg-gray-500"></div>
        <div className="flex gap-2 h-6 w-24 rounded-full bg-gray-500"></div>
      </div>

      <div className="flex justify-between items-center my-4 py-2 border-b-[1px] border-gray-500">
        <div className="flex gap-2 h-6 w-16 rounded-full bg-gray-500"></div>
        <div className="flex gap-2 h-6 w-24 rounded-full bg-gray-500"></div>
        <div className="flex gap-2 h-6 w-20 rounded-full bg-gray-500"></div>
      </div>
    </div>
  );
};

export default PostCardSkelton;
