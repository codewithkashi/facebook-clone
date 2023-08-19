"use client";
import Image from "next/image";
import React, { useState } from "react";
import { MdLogout } from "react-icons/md";
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlinePlus,
  AiOutlineCloseSquare,
} from "react-icons/ai";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgMenuRightAlt } from "react-icons/cg";
import Link from "next/link";
import { Profile } from "./";
import { usePathname, useRouter } from "next/navigation";
import useCurrentUser from "@hooks/useCurrentUser";
import { leftSidebarItems } from "@utils/constants";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const navLinks = [
    { icon: AiOutlineHome, path: "/" },
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
      <div className="flex flex-row items-center justify-between w-full lg:w-auto px-2">
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

          <div
            className="justify-between items-center py-2 px-4 w-[230px] rounded-full bg-gray-50 focus:outline-none hidden lg:flex"
            onClick={() => router.push("/search")}
          >
            <div className="w-48 text-gray-500">Search Facebook</div>

            <AiOutlineSearch size={24} className="text-gray-600" />
          </div>
        </div>
        <AiOutlineSearch
          size={32}
          className="text-gray-600 hover:cursor-pointer p-1 rounded-full bg-gray-300 block lg:hidden"
          onClick={() => router.push("/search")}
        />
      </div>
      <div className="w-full flex items-start justify-between lg:justify-center">
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
              <div className="w-4 h-4 text-xs text-white font-semibold flex justify-center items-center bg-red-600 rounded-full absolute top-12 lg:top-3 z-40 hover:cursor-pointer">
                {e.notifications.length}
              </div>
            )}
          </div>
        ))}

        <div
          className="pb-2 px-4 lg:px-8 mx-1 block lg:hidden"
          onClick={() => setToggle(true)}
        >
          <CgMenuRightAlt className="text-gray-700 " size={28} />
        </div>
      </div>
      <div className=" items-center gap-4 hidden lg:flex">
        <Link
          href={"/friends"}
          className="flex justify-center items-center px-3 py-2 bg-gray-300 rounded-full text-black font-semibold w-[130px]"
        >
          Find Friends
        </Link>
        <div className="flex gap-2 items-center">
          <Profile
            imgUrl={user?.profileImage || "/profile.png"}
            id={user?._id}
          />
          <MdLogout
            size={24}
            className="text-gray-600 hover:text-gray-700 hover:cursor-pointer"
            onClick={() => signOut()}
          />
        </div>
      </div>

      {toggle && (
        <div className="absolute top-4 right-4 bg-[#e9ebee] z-40 rounded-md bg-opacity-90 shadow-md backdrop-blur-md px-8 py-4 scale-up-right block lg:hidden">
          <div className="pb-4">
            <Profile imgUrl={user?.profileImage} id={user?._id} />
          </div>

          {leftSidebarItems.map((e, index) => (
            <div
              key={index}
              className="flex flex-col gap-6 justify-center items-start py-3"
              onClick={() => setToggle(false)}
            >
              <Link
                href={e.url}
                className="flex flex-row items-center gap-2 hover:cursor-pointer"
              >
                <Image
                  src={e.icon}
                  alt={e.label}
                  width={e.label === "Saved" ? 20 : 30}
                  height={30}
                />
                <p className="text-gray-700 font-semibold">{e.label}</p>
              </Link>
            </div>
          ))}
          <Link
            onClick={() => setToggle(false)}
            href={"/create-group"}
            className="text-gray-700 font-semibold flex items-center gap-2 hover:cursor-pointer py-2"
          >
            <AiOutlinePlus
              size={20}
              className="bg-gray-300 p-[2px] text-gray-800 rounded-full"
            />
            Create Group
          </Link>
          <button
            className="blue__button"
            onClick={() => {
              signOut();
              setToggle(false);
            }}
          >
            <BiLogOut />
            Logout
          </button>
          <div
            className="absolute top-4 right-3 hover: cursor-pointer"
            onClick={() => setToggle(false)}
          >
            <AiOutlineCloseSquare className="text-gray-700 " size={24} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
