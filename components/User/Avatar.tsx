"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { RiAccountCircleFill } from "react-icons/ri";
const Avatar = ({ id, imgUrl }: { id: string; imgUrl?: string }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/user/${id}`)}
      className="hover:cursor-pointer"
    >
      {imgUrl ? (
        <div className="h-20 w-20 rounded-full overflow-hidden">
          <Image
            src={imgUrl}
            height={150}
            width={150}
            alt="profile picture"
            className="bg-cover"
          />
        </div>
      ) : (
        <RiAccountCircleFill
          size={80}
          className="text-gray-500 hover:cursor-pointer"
        />
      )}
    </div>
  );
};

export default Avatar;
