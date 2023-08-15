"use client";
import useCurrentUser from "@hooks/useCurrentUser";
import usePost from "@hooks/usePost";
import axios from "axios";
import React, { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import { CommentCard, Profile } from "@components";
import { useRouter } from "next/navigation";
import EmojiPicker from "emoji-picker-react";
import Image from "next/image";
import { formatDistanceToNowStrict } from "date-fns";
const CommentModel = ({ params }: { params: { id: string } }) => {
  const {
    data: post,
    error,
    isLoading,
    mutate: mutateComments,
  } = usePost(params?.id);
  const { data: user } = useCurrentUser();
  const [commentText, setCommentText] = useState("");
  const [isReply, setIsReply] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const postComment = async () => {
    setLoading(true);
    if (!commentText) return toast.error("Text can't be empty");
    try {
      if (isReply) {
        const response = await axios.post("/api/post/replycomment", {
          postId: post?._id,
          commentId,
          replyTo,
          desc: commentText,
        });
        if (response.status == 201) {
          toast.success(response.data);
          mutateComments();
          setCommentText("");
          setIsReply(false);
        }
      } else {
        const response = await axios.post("/api/post/comment", {
          postId: post?._id,
          desc: commentText,
        });
        if (response.status == 201) {
          toast.success(response.data);
          mutateComments();
          setCommentText("");
        }
      }
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const createdAt = useMemo(() => {
    if (!post?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(post.createdAt));
  }, [post?.createdAt]);
  return (
    <div className="relative flex flex-col justify-between px-4 lg:w-[50%] w-[100%] pb-20 pt-4">
      <div className="flex items-start gap-3 py-4">
        <Profile id={post?.creator._id} imgUrl={post?.creator?.profileImage} />
        <div className="">
          <p className="text-black font-semibold text-sm lg:text-base">
            {post?.creator?.name}
          </p>
          <p className="text-xs font-semibold lg:text-sm text-gray-700">
            {createdAt}
          </p>
        </div>
      </div>

      <p className="py-2 text-sm lg:text-base">{post?.desc}</p>
      <div className="py-1">
        {post?.imgUrl && (
          <Image
            src={post.imgUrl}
            alt="photo"
            width={800}
            height={800}
            className="w-full"
          />
        )}
      </div>
      <div
        className="fixed top-28 lg:top-16 right-4 lg:right-[30%] hover:cursor-pointer"
        onClick={() => router.back()}
      >
        <AiFillCloseCircle className="text-gray-500" size={24} />
      </div>
      {post?.comments.length > 0 ? (
        <div className="flex flex-col gap-5 pt-4">
          {post?.comments.map((e: Record<string, any>, index: number) => (
            <CommentCard
              data={e}
              key={index}
              mutateComments={mutateComments}
              setIsReply={setIsReply}
              setCommentId={setCommentId}
              setReplyTo={setReplyTo}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col gap-4">
          <FaComments className="text-gray-300" size={200} />
          <p className="text-gray-700 font-semibold text-sm: lg:text-base">
            No comments yet
          </p>
          <p className="text-gray-800 text-xs: lg:text-sm">
            Be the first to comment
          </p>
        </div>
      )}
      <div className="w-full left-0 lg:w-[50%] fixed bottom-0 lg:left-[25%] px-4 lg:px-16  flex items-center gap-3 bg-[#e9ebee] py-4">
        {isReply && (
          <div className="flex items-center gap-1 rounded-md px-3 py-1 lg:py-2  bg-gray-300">
            <p className="text-gray-700 text-xs lg:text-sm font-semibold">
              {isReply ? "Replying" : "Commenting"}
            </p>
            <AiFillCloseCircle
              size={16}
              className="text-gray-700 hover:cursor-pointer"
              onClick={() => setIsReply(false)}
            />
          </div>
        )}
        <input
          type="text"
          className="bg-gray-300 rounded-full w-full  py-1 lg:py-2 px-4 placeholder:text-gray-600 text-sm lg:text-base focus:outline-none"
          placeholder={`Comment as ${user?.name}`}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        {showEmoji && (
          <div className="absolute bottom-20 right-4 lg:right-16">
            <div>
              <EmojiPicker
                onEmojiClick={(e) => setCommentText((prev) => prev + e.emoji)}
              />
            </div>
            <AiOutlineClose
              onClick={() => setShowEmoji(false)}
              size={20}
              className="absolute top-0 left-0 bg-gray-600 rounded-full text-white hover:cursor-pointer"
            />
          </div>
        )}
        <button onClick={postComment} disabled={loading}>
          <VscSend size={24} className="text-gray-600" />
        </button>
        <p
          className="text-xl bg-zinc-300 rounded-md p-1 hover:cursor-pointer"
          onClick={() => setShowEmoji(true)}
        >
          😀
        </p>
      </div>
    </div>
  );
};

export default CommentModel;
