"use client";
import React from "react";
import { AiFillLike } from "react-icons/ai";
const PostInteractions = ({
  post,
  user,
  mutateUser,
}: {
  post: Record<string, any>;
  user: Record<string, any>;
  mutateUser: any;
}) => {
  function countCommentsAndReplies(post: any) {
    let totalComments = 0;
    totalComments += post?.comments?.length || 0;
    post?.comments?.forEach((element: any) => {
      totalComments += element?.replies?.length || 0;
    });
    return totalComments;
  }
  return (
    <div className="mx-2 py-4 flex items-center justify-between border-b-[1px] border-gray-400">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-blue-700 p-1 flex justify-center items-center">
          <AiFillLike size={16} className="text-white" />
        </div>
        <p className="text-gray-700 text-sm lg:text-base">
          {post?.likes.length || ""}
        </p>
      </div>
      <p className="text-gray-700 text-sm lg:text-base">
        {`${countCommentsAndReplies(post) || ""} comments`}{" "}
      </p>
    </div>
  );
};

export default PostInteractions;
