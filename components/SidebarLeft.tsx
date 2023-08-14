"use client";
import React from "react";
import { Profile } from "./";
import Image from "next/image";
import useCurrentUser from "@hooks/useCurrentUser";
const leftSidebarItems = [
  {
    label: "Find Friends",
    icon: "/friends.png",
  },
  {
    label: "Groups",
    icon: "/groups.png",
  },
  {
    label: "Saved",
    icon: "/saved.png",
  },
];

const SidebarLeft = () => {
  const { data: user } = useCurrentUser();
  return (
    <div className="w-[25%] lg:flex hidden  flex-col gap-4 py-4 px-16 sticky top-16 h-full">
      <div className="flex flex-row items-center gap-2">
        <Profile id={user?._id} imgUrl={user?.profileImage} />
        <p className="text-gray-700 font-semibold hover:cursor-pointer">
          {user?.name}
        </p>
      </div>
      <div className="flex flex-col gap-6">
        {leftSidebarItems.map((e, index) => (
          <div
            key={index}
            className="flex flex-row items-center gap-2 hover:cursor-pointer"
          >
            <Image
              src={e.icon}
              alt={e.label}
              width={e.label === "Saved" ? 20 : 30}
              height={30}
            />
            <p className="text-gray-700 font-semibold">{e.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;
