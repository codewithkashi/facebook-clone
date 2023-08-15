"use client";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineSearch, AiFillHome } from "react-icons/ai";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import { Profile } from "./";
import { usePathname } from "next/navigation";
import useNotifications from "@hooks/useNotifications";
import useCurrentUser from "@hooks/useCurrentUser";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const handleSearch = () => {};
  const pathname = usePathname();
  const { data: user } = useCurrentUser();

  const navLinks = [
    { icon: AiFillHome, path: "/" },
    { icon: LiaUserFriendsSolid, path: "/friends" },
    { icon: HiOutlineUserGroup, path: "/groups" },
    {
      icon: IoMdNotificationsOutline,
      path: "/notifications",
      notifications: user?.notifications,
    },
  ];
  return (
    <div className="bg-[#e9ebee] flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 lg:px-16 py-2 shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Image
          src={"/fb.svg"}
          alt="logo"
          width={120}
          height={30}
          className="lg:hidden"
        />
        <Image
          src={"/logo.png"}
          alt="logo"
          width={40}
          height={40}
          className="hidden lg:block"
        />
        <div className="justify-between items-center py-2 px-4 w-[230px] rounded-full bg-gray-50 focus:outline-none hidden lg:flex">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search Facebook"
            className="focus:outline-none placeholder:text-gray-600"
          />

          <AiOutlineSearch
            size={24}
            className="text-gray-600"
            onClick={handleSearch}
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-between lg:justify-center space-y-3 lg:space-y-0">
        {navLinks.map((e, index) => (
          <div
            key={index}
            className={`realtive border-b-2 pb-2 ${
              pathname === e.path ? "border-[#1B74E4]" : "border-transparent"
            } transition-all px-4 lg:px-8 mx-1`}
          >
            <Link href={e.path}>
              <e.icon className="text-gray-700 " size={28} />
            </Link>
            {e?.notifications?.length > 0 && (
              <div className="w-4 h-4 text-xs text-white font-semibold flex justify-center items-center bg-red-600 rounded-full absolute top-16 lg:top-3 z-50">
                {e.notifications.length}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className=" items-center gap-4 hidden lg:flex">
        <button className="px-3 py-2 bg-gray-300 rounded-full text-black font-semibold w-[130px]">
          Find Friends
        </button>
        <Profile imgUrl={user?.profileImage} id={user?._id} />
      </div>
    </div>
  );
};

export default Navbar;
