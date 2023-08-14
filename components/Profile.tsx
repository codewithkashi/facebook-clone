"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { RiAccountCircleFill } from "react-icons/ri";
const Profile = ({ id, imgUrl }: { id: string; imgUrl?: string }) => {
  const router = useRouter();
  const goToProfile = () => {};
  return (
    <div>
      <RiAccountCircleFill
        size={40}
        onClick={() => router.push(`/user/${id}`)}
        className="text-gray-500 hover:cursor-pointer"
      />
    </div>
  );
};

export default Profile;
