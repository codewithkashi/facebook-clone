import React from "react";
import { Profile } from "./";
const GroupItem = () => {
  return (
    <div className="flex items-center gap-2 hover:cursor-pointer">
      <Profile />
      <p className="text-gray-700 font-semibold">Self Taught Programmers</p>
    </div>
  );
};

export default GroupItem;
