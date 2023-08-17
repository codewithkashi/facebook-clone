"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonAdd } from "react-icons/bs";
import { MdOutlinePersonRemoveAlt1 } from "react-icons/md";

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
  const [loading, setLoading] = useState(false);
  const addFriend = async () => {
    try {
      setLoading(true);
      if (authUser?.sentRequests?.includes(userData?._id)) {
        const response = await axios.delete("/api/user/friend", {
          data: { id: userData?._id },
        });
        if (response.status == 200) {
          toast.success(response.data);
          mutate();
          mutateAuth();
        }
      } else {
        const response = await axios.post("/api/user/friend", {
          id: userData?._id,
        });
        if (response.status == 200) {
          toast.success(response.data);
          mutate();
          mutateAuth();
        }
      }
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button onClick={addFriend} className="blue__button" disabled={loading}>
      {authUser?.sentRequests?.includes(userData?._id) ? (
        <MdOutlinePersonRemoveAlt1 />
      ) : (
        <BsPersonAdd />
      )}
      {authUser?.sentRequests?.includes(userData?._id)
        ? "Requested"
        : "Add Friend"}
    </button>
  );
};

export default AddFriendButton;
