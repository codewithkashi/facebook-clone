"use client";
import React, { useState } from "react";
import { Avatar } from "../";
import { toast } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { MdOutlinePersonRemoveAlt1 } from "react-icons/md";

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
  const manageRequst = async () => {
    try {
      setLoading(true);
      const response = await axios.delete("/api/user/friend", {
        data: { id: data?._id },
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
  return (
    <div className="flex items-start gap-3 py-2">
      <Avatar imgUrl={data?.profileImage} id={data?._id} />
      <div className="flex flex-col justify-center min-w-[180px]">
        <Link
          href={`/user/${data?._id}`}
          className="font-semibold text-sm lg:text-base"
        >
          {data?.name}
        </Link>
        <button
          onClick={manageRequst}
          className="blue__button"
          disabled={loading}
        >
          <MdOutlinePersonRemoveAlt1 />
          Requested
        </button>
      </div>
    </div>
  );
};

export default SentRequests;
