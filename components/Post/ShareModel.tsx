"use client";
import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { BsShare } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

const ShareModel = ({
  setOpen,
  post,
  mutatePost,
}: {
  setOpen: (open: boolean) => void;
  post: Record<string, any>;
  mutatePost: any;
}) => {
  const shareDesc = useRef<HTMLTextAreaElement | null>(null);
  const [loading, setLoading] = useState(false);
  const sharePost = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post("/api/post/create-post", {
        desc: shareDesc.current?.value,
        imgUrl: post?.imgUrl,
        forGroup: post.forGroup,
        sharedCreator: post?.creator?._id,
        sharedDesc: post?.desc,
        sharedGroupId: post?.groupId?._id,
      });
      if (response.status == 201) {
        toast.success("Post Shared");
        setOpen(false);
        mutatePost();
      }
    } catch (error: any) {
      toast.error(error.response?.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed w-screen top-0 left-0 z-20 h-screen bg-gray-700 bg-opacity-90 flex justify-center items-center">
      <form
        className="bg-[#e9ebee] rounded-md px-4 lg:px-12 py-6"
        onSubmit={sharePost}
      >
        <textarea
          className="rounded-lg px-6 pt-6 pb-1 text-md text-black bg-white focus:outline-none focus:ring-0 my-3 placeholder:text-gray-600 w-[200px] md:w-[450px] min-h-[200px]"
          placeholder="What's on your mind?"
          ref={shareDesc}
        />
        <div className="flex items-center gap-4 justify-center">
          <button
            className=" bg-blue-700 font-semibold w-[40%] text-white disabled:text-gray-300 hover:cursor-pointer hover:bg-blue-800 transition-colors py-2 rounded-lg flex justify-center items-center gap-2"
            disabled={loading}
          >
            <BsShare />
            Share
          </button>
          <button
            onClick={() => setOpen(false)}
            className=" bg-blue-700 font-semibold w-[40%] text-white disabled:text-gray-300 hover:cursor-pointer hover:bg-blue-800 transition-colors py-2 rounded-lg flex justify-center items-center gap-2"
          >
            <MdOutlineCancel />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShareModel;
