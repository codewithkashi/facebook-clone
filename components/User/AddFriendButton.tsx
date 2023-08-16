"use client";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";

const AddFriendButton = ({
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
  const addFriend = async () => {
    try {
      if (authUser?.sentRequests?.includes(userData?._id)) {
        const response = await axios.delete("/api/friend", {
          data: { id: userData?._id },
        });
        if (response.status == 200) {
          toast.success(response.data);
          mutate();
          mutateAuth();
        }
      } else {
        const response = await axios.post("/api/friend", { id: userData?._id });
        if (response.status == 200) {
          toast.success(response.data);
          mutate();
          mutateAuth();
        }
      }
    } catch (error: any) {
      toast.error(error.response.data);
      console.log(error);
    }
  };
  return (
    <button onClick={addFriend} className="blue__button">
      {authUser?.sentRequests?.includes(userData?._id)
        ? "Requested"
        : "Add Friend"}
    </button>
  );
};

export default AddFriendButton;
