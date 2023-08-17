"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { PiShareFatDuotone } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { ShareModel } from "@components";
const UserInteraction = ({
  post,
  mutatePosts,
  user,
  mutateUser,
}: {
  post: Record<string, any>;
  mutatePosts: any;
  user: Record<string, any>;
  mutateUser: any;
}) => {
  const [open, setOpen] = useState(false);
  const audioElement = new Audio("/like.mp3");
  const router = useRouter();
  const likePost = async () => {
    try {
      if (post?.likes.includes(user?._id)) {
        const response = await axios.delete("/api/post/like", {
          data: { id: post?._id },
        });
        if (response.status == 200) toast.success(response.data);
      } else {
        const response = await axios.post("/api/post/like", { id: post?._id });
        if (response.status == 200) {
          toast.success(response.data);
          audioElement.play();
        }
      }
      mutatePosts();
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };
  return (
    <div className="relative flex justify-between items-center px-4 lg:px-8 py-4">
      <div
        className="flex items-center gap-2  hover:cursor-pointer"
        onClick={likePost}
      >
        {post?.likes.includes(user?._id) ? (
          <AiFillLike size={24} className="text-blue-700" />
        ) : (
          <AiOutlineLike size={24} className="text-gray-700" />
        )}
        <p className="text-gray-700 text-sm lg:text-base">Like</p>
      </div>
      <div
        className="flex items-center gap-2 hover:cursor-pointer"
        onClick={() => router.push(`/post/${post._id}`)}
      >
        <FaRegCommentAlt size={20} className="text-gray-700" />
        <p className="text-gray-700 text-sm lg:text-base">Comment</p>
      </div>

      <div
        className="flex items-center gap-2 hover:cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <PiShareFatDuotone size={24} className="text-gray-700" />
        <p className="text-gray-700 text-sm lg:text-base">Share</p>
      </div>
      {open && (
        <ShareModel setOpen={setOpen} post={post} mutatePost={mutatePosts} />
      )}
    </div>
  );
};

export default UserInteraction;
