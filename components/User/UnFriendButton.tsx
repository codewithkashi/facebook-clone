"use client";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";

const UnFriendButton = ({
  userData,
  mutate,
  mutateAuth,
}: {
  userData: Record<string, any>;
  mutate: any;
  mutateAuth: any;
}) => {
  const unFriend = async () => {
    try {
      const response = await axios.post("/api/unfriend", {
        id: userData?._id,
      });
      if (response.status == 200) {
        toast.success(response.data);
        mutate();
        mutateAuth();
      }
    } catch (error: any) {
      toast.error(error.response.data);
      console.log(error);
    }
  };
  return (
    <button onClick={unFriend} className="blue__button">
      Friends
    </button>
  );
};

export default UnFriendButton;
