"use client";
import React from "react";
import { GroupAvatar } from "..";
import { AiOutlinePlus } from "react-icons/ai";
import useAllGroups from "@hooks/useAllGroups";
import Link from "next/link";
import { SidebarRightGroupSkelton } from "@components/Skeltons";
const Groups = () => {
  const { data: allGroups, mutate, isLoading } = useAllGroups();
  return (
    <div className="flex flex-col py-4">
      {isLoading ? (
        <SidebarRightGroupSkelton />
      ) : (
        <div className="">
          <p className="text-gray-700 font-semibold py-4">
            Group Conversations
          </p>
          <div className="flex items-center gap-2">
            <Link
              href={"/create-group"}
              className="text-gray-700 font-semibold flex items-center gap-2 hover:cursor-pointer"
            >
              <AiOutlinePlus
                size={20}
                className="bg-gray-300 p-[2px] text-gray-800 rounded-full"
              />
              Create Group
            </Link>
          </div>
          <p className="text-gray-700 font-semibold py-4">Groups</p>
          {allGroups &&
            allGroups.map((e: Record<string, any>) => (
              <div className="flex items-start gap-2 py-1" key={e._id}>
                <GroupAvatar id={e._id} imgUrl={e?.imgUrl} />
                <p className="text-sm lg:text-base font-semibold">{e?.title}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Groups;
