"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { RiAccountCircleFill } from "react-icons/ri";
const GroupAvatar = ({ id, imgUrl }: { id?: string; imgUrl?: string }) => {
  const router = useRouter();
  return (
    <div className="w-12 h-12 rounded-md overflow-hidden hover:cursor-pointer">
      <Image
        width={100}
        height={100}
        src={imgUrl || "/profile.png"}
        alt="avtar"
        onClick={() => router.push(`/group/${id}`)}
        className="bg-cover w-full min-h-full"
      />
    </div>
  );
};

export default GroupAvatar;
