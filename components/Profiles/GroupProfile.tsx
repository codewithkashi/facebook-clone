"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const GroupProfile = ({
  groupId,
  groupImgUrl,
  groupTitle,
  creatorId,
  profileImage,
  creatorName,
  createdAt,
}: {
  groupId: string;
  groupImgUrl: string;
  groupTitle: string;
  creatorId: string;
  profileImage?: string;
  creatorName: string;
  createdAt?: any;
}) => {
  const router = useRouter();
  return (
    <div className="flex gap-3">
      <div className="flex rounded-md w-16 h-16 relative overflow-hidden">
        <Image
          onClick={() => router.push(`/group/${groupId}`)}
          src={groupImgUrl}
          alt={groupTitle}
          width={70}
          height={70}
          className="w-full"
        />
        <div className="absolute bottom-1 right-1 rounded-full w-8 h-8 overflow-hidden bg-gray-500">
          <Image
            onClick={() => router.push(`/user/${creatorId}`)}
            src={profileImage || "/profile.png"}
            alt={creatorName}
            width={20}
            height={20}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-xs lg:text-sm">{createdAt && `${createdAt} ago`}</p>

        <Link
          href={`/group/${groupId}`}
          className="font-semibold text-xs lg:text-sm"
        >
          {groupTitle}
        </Link>
        <Link
          href={`/user/${creatorId}`}
          className="text-xs lg:text-sm text-gray-700"
        >
          {creatorName}
        </Link>
      </div>
    </div>
  );
};

export default GroupProfile;
