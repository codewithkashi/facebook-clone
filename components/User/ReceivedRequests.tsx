import React from "react";
import { Avatar } from "../";
import { toast } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";

const SentRequests = ({
  data,
  userId,
  mutateFriends,
}: {
  data: Record<string, any>;
  userId: string;
  mutateFriends: any;
}) => {
  const acceptRequest = async () => {
    try {
      const response = await axios.post("/api/accept-request", {
        id: data?._id,
      });
      if (response.status == 200) {
        toast.success(response.data);
        mutateFriends();
      }
    } catch (error: any) {
      toast.error(error.response.data);
      console.log(error);
    }
  };

  const deleteRequest = async () => {
    try {
      const response = await axios.post("/api/delete-request", {
        id: data?._id,
      });
      if (response.status == 200) {
        toast.success(response.data);
        mutateFriends();
      }
    } catch (error: any) {
      toast.error(error.response.data);
      console.log(error);
    }
  };
  return (
    <div className="flex items-start gap-3">
      <Avatar imgUrl={data?.profileImage} id={data?._id} />
      <div className="flex flex-col justify-center">
        <Link
          href={`/user/${data?._id}`}
          className="font-semibold text-sm lg:text-base"
        >
          {data?.name}
        </Link>
        <div className="flex gap-2 items-center">
          <button
            onClick={acceptRequest}
            className="px-4 bg-blue-700 my-4 text-white disabled:text-gray-300 hover:cursor-pointer hover:bg-blue-800 transition-colors py-1 rounded-lg font-semibold"
          >
            Accept
          </button>
          <button
            onClick={deleteRequest}
            className="px-4 bg-gray-300 my-4 text-black disabled:text-gray-900 hover:cursor-pointer hover:bg-gay-400 transition-colors py-1 rounded-lg font-semibold"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default SentRequests;
