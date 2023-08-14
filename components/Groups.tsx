import React from "react";
import { Profile, GroupItem } from "./";

const Groups = () => {
  return (
    <div className="flex flex-col py-4">
      <div className="">
        <p className="text-gray-700 font-semibold py-4">Group Conversations</p>
        <div className="flex items-center gap-2">
          <Profile />
          <p className="text-gray-700 font-semibold">Create Group</p>
        </div>
        <p className="text-gray-700 font-semibold py-4">Suggested Groups</p>
        <div className="flex flex-col gap-3">
          <GroupItem />
        </div>
      </div>
    </div>
  );
};

export default Groups;
