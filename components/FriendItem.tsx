import React from "react";
import { Profile } from "./";
const FriendItem = () => {
  return (
    <div className="flex items-center gap-2 hover:cursor-pointer">
      <Profile />
      <p className="text-gray-700 font-semibold">Hamza Zulfiqar</p>
    </div>
  );
};

export default FriendItem;
