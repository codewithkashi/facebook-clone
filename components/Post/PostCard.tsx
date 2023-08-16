"use client";
import React, { useMemo } from "react";
import { Profile, PostInteractions, UserInteraction } from "..";
import Image from "next/image";
import { formatDistanceToNowStrict } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";
const PostCard = ({
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
  const createdAt = useMemo(() => {
    if (!post?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(post.createdAt));
  }, [post.createdAt]);
  const savePost = async () => {
    try {
      const response = await axios.post("/api/post/save", { id: post?._id });
      if (response.status == 200) toast.success(response.data);
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };
  return (
    <div className=" my-4 mx-4 lg:mx-8  border-b-4 py-4 border-gray-400">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex gap-2">
          <Profile id={post?.creator._id} imgUrl={post?.creator.profileImage} />
          <div className="flex flex-col">
            <p className="font-semibold text-sm lg:text-base">
              {post.creator.name}
            </p>
            <p className="text-xs lg:text-sm">{createdAt}</p>
          </div>
        </div>
        <Image
          onClick={savePost}
          src={"/saved.png"}
          alt="save"
          width={24}
          height={24}
          className="bg-gray-300 rounded-full p-1 hover:cursor-pointer"
        />
      </div>
      <p className="my-4 mx-2 text-sm lg:text-base">{post?.desc}</p>
      {post?.imgUrl && (
        <Image
          src={post.imgUrl}
          alt="photo"
          width={700}
          height={700}
          className="w-full"
        />
      )}

      <PostInteractions post={post} user={user} mutateUser={mutateUser} />
      <UserInteraction
        post={post}
        mutatePosts={mutatePosts}
        user={user}
        mutateUser={mutateUser}
      />
    </div>
  );
};

export default PostCard;
