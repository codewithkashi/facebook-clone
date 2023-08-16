"use client";
import React from "react";
import { AddFriendButton, Avatar } from "../";
import { toast } from "react-hot-toast";
import axios from "axios";

const FindFriends = ({
  authUser,
  userData,
  mutate,
  mutateAuth,
}: {
  authUser: Record<string, any>;
  userData: Record<string, any>;
  mutate: any;
  mutateAuth: any;
}) => {
  return (
    <div className="flex items-start gap-3">
      <Avatar imgUrl={userData?.profileImage} id={userData?._id} />
      <div className="flex flex-col justify-center">
        <p className="font-semibold text-sm lg:text-base">{userData?.name}</p>

        <AddFriendButton
          authUser={authUser}
          mutate={mutate}
          mutateAuth={mutateAuth}
          userData={userData}
        />
      </div>
    </div>
  );
};

export default FindFriends;
