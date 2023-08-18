"use client";
import React, { useMemo } from "react";
import {
  Profile,
  PostInteractions,
  UserInteraction,
  CreatorProfile,
  GroupProfile,
} from "..";
import Image from "next/image";
import { formatDistanceToNowStrict } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
      <div className="flex items-start gap-2 justify-between">
        <div className="flex gap-2 w-full">
          {post.forGroup ? (
            <>
              {post?.groupId ? (
                <GroupProfile
                  creatorId={post?.creator?._id}
                  creatorName={post?.creator?.name}
                  profileImage={post?.creator?.profileImage}
                  groupId={post?.groupId?._id}
                  groupImgUrl={post?.groupId?.imgUrl}
                  groupTitle={post?.groupId?.title}
                  createdAt={createdAt}
                />
              ) : (
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-4">
                      <CreatorProfile
                        id={post?.creator?._id}
                        name={post?.creator?.name}
                        profileImage={post?.creator?.profileImage}
                        createdAt={createdAt}
                      />
                      <p className="text-sm lg:text-base ">
                        shared {post?.sharedGroupId?.title} 's post
                      </p>
                    </div>
                    <p className="my-4 mx-2 text-sm lg:text-base">
                      {post?.desc}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 ml-4 lg:ml-8 border-t-[1px] border-gray-500 pt-2 w-full">
                    <GroupProfile
                      creatorId={post?.sharedCreator?._id}
                      creatorName={post?.sharedCreator?.name}
                      profileImage={post?.sharedCreator?.profileImage}
                      groupId={post?.sharedGroupId?._id}
                      groupImgUrl={post?.sharedGroupId?.imgUrl}
                      groupTitle={post?.sharedGroupId?.title}
                    />
                    <p className="my-4 mx-2 text-sm lg:text-base">
                      {post?.sharedDesc}
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {post?.sharedCreator ? (
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-3">
                      <CreatorProfile
                        id={post?.creator?._id}
                        name={post?.creator?.name}
                        profileImage={post?.creator?.profileImage}
                        createdAt={createdAt}
                      />

                      <p className="text-sm lg:text-base">
                        shared {post?.sharedCreator?.name} post
                      </p>
                    </div>
                    <p className="my-4 mx-2 text-sm lg:text-base">
                      {post?.desc}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 ml-4 lg:ml-8 border-t-[1px] border-gray-500 pt-2 w-full">
                    <CreatorProfile
                      id={post?.sharedCreator?._id}
                      name={post?.sharedCreator?.name}
                      profileImage={post?.sharedCreator?.profileImage}
                    />
                    <p className="my-4 mx-2 text-sm lg:text-base">
                      {post?.sharedDesc}
                    </p>
                  </div>
                </div>
              ) : (
                <CreatorProfile
                  id={post?.creator?._id}
                  name={post?.creator?.name}
                  profileImage={post?.creator?.profileImage}
                  createdAt={createdAt}
                />
              )}
            </>
          )}
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

      {!post?.sharedCreator && (
        <p className="my-4 mx-2 text-sm lg:text-base">{post?.desc}</p>
      )}

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
