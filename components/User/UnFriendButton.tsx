"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlinePersonRemoveAlt1 } from "react-icons/md";

const UnFriendButton = ({
  userData,
  mutate,
  mutateAuth,
}: {
  userData: Record<string, any>;
  mutate: any;
  mutateAuth: any;
}) => {
  const [loading, setLoading] = useState(false);
  const unFriend = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/unfriend", {
        id: userData?._id,
      });
      if (response.status == 200) {
        toast.success(response.data);
        mutate();
        mutateAuth();
      }
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button onClick={unFriend} className="blue__button" disabled={loading}>
      <MdOutlinePersonRemoveAlt1 />
      Friends
    </button>
  );
};

export default UnFriendButton;
