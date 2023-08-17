import Profile from "@components/Profile";
import React from "react";

const CreatorProfile = ({
  id,
  profileImage,
  name,
  createdAt,
}: {
  id: string;
  profileImage?: string;
  name: string;
  createdAt?: any;
}) => {
  return (
    <div className="flex gap-2">
      <Profile id={id} imgUrl={profileImage} />
      <div className="flex flex-col">
        <p className="font-semibold text-sm lg:text-base">{name}</p>
        <p className="text-xs lg:text-sm">{createdAt && `${createdAt} ago`}</p>
      </div>
    </div>
  );
};

export default CreatorProfile;
