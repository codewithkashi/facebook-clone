import React from "react";
import { Friends, Groups } from "./";
const SidebarRight = () => {
  return (
    <div className="w-[25%] lg:block hidden sticky top-16 h-full">
      <Groups />
      <Friends />
    </div>
  );
};

export default SidebarRight;
