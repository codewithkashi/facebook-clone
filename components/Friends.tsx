import React from "react";
import { FriendItem } from "./";

const Friends = () => {
  return (
    <div className="flex flex-col py-4 border-t-[1px] border-gray-300">
      <div className="">
        <p className="text-gray-700 font-semibold py-4">Suggested People</p>
        <div className="flex flex-col gap-3">
          <FriendItem />
        </div>
      </div>
    </div>
  );
};

export default Friends;
