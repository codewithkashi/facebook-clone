"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { RiAccountCircleFill } from "react-icons/ri";
const Profile = ({ id, imgUrl }: { id?: string; imgUrl?: string }) => {
  const router = useRouter();
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden hover:cursor-pointer">
      <Image
        width={40}
        height={40}
        src={imgUrl || "/profile.png"}
        alt="avtar"
        onClick={() => router.push(`/user/${id}`)}
        className="bg-cover"
      />
    </div>
  );
};

export default Profile;
