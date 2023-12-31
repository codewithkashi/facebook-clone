"use client";
import React, { useState } from "react";
import { Avatar } from "../";
import { toast } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { BsPersonAdd } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

const SentRequests = ({
  data,
  userId,
  mutateFriends,
}: {
  data: Record<string, any>;
  userId: string;
  mutateFriends: any;
}) => {
  const [loading, setLoading] = useState(false);
  const acceptRequest = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/accept-request", {
        id: data?._id,
      });
      if (response.status == 200) {
        toast.success(response.data);
        mutateFriends();
      }
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/delete-request", {
        id: data?._id,
      });
      if (response.status == 200) {
        toast.success(response.data);
        mutateFriends();
      }
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-start gap-3">
      <Avatar imgUrl={data?.profileImage} id={data?._id} />
      <div className="flex flex-col justify-center min-w-[180px]">
        <Link
          href={`/user/${data?._id}`}
          className="font-semibold text-sm lg:text-base"
        >
          {data?.name}
        </Link>
        <div className="flex gap-2 items-center">
          <button
            onClick={acceptRequest}
            disabled={loading}
            className="px-4 bg-blue-700 my-4 text-white disabled:text-gray-300 hover:cursor-pointer hover:bg-blue-800 transition-colors py-1 rounded-lg font-semibold flex justify-center items-center gap-2"
          >
            <BsPersonAdd />
            Accept
          </button>
          <button
            onClick={deleteRequest}
            disabled={loading}
            className="px-4 bg-gray-300 my-4 text-black disabled:text-gray-900 hover:cursor-pointer hover:bg-gay-400 transition-colors py-1 rounded-lg font-semibold flex justify-center items-center gap-2"
          >
            <MdOutlineCancel />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default SentRequests;
