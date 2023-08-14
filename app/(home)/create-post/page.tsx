"use client";
import { Profile, ImageUpload } from "@components";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import EmojiPicker from "emoji-picker-react";
import useCurrentUser from "@hooks/useCurrentUser";

const Page = () => {
  const router = useRouter();
  const [base64, setBase64] = useState<string | null>(null);
  const [desc, setDesc] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const { data: user } = useCurrentUser();
  const createPost = async () => {
    try {
      let picRes;
      if (!base64 && !desc) return toast.error("Post can't be empty");
      if (base64) {
        picRes = await axios.post("/api/upload", { path: base64 });
        if (!picRes.data.secure_url) {
          return toast.error("Too big picture");
        }
      }
      const response = await axios.post("/api/create-post", {
        desc,
        imgUrl: picRes?.data.secure_url,
        forGroup: false,
      });
      if (response.status == 201) {
        toast.success(response.data);
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };
  return (
    <div className="flex flex-col w-full lg:w-[50%] py-4 px-4 lg:px-16">
      <div className="flex gap-2 items-center pb-4 border-b-[1px] border-gray-300">
        <AiOutlineArrowLeft
          className="text-gray-700 hover:cursor-pointer"
          onClick={() => router.back()}
        />
        <p className="text-gray-700 text-lg font-semibold">Create Post</p>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2 ">
          <Profile id={user?._id} imgUrl={user?.profileImage} />
          <p className="text-gray-600 font-semibold">{user?.name}</p>
        </div>
        <div className="flex items-start">
          <textarea
            cols={10}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder={`What's on your mind ${user?.name}?`}
            className="bg-transparent my-4 w-full focus:outline-none placeholder:text-gray-600"
          />
          <p
            className="text-xl bg-zinc-300 rounded-md p-1 mt-2 hover:cursor-pointer"
            onClick={() => setShowEmoji(true)}
          >
            😀
          </p>
        </div>
        {showEmoji && (
          <div className="relative bg-zinc-200">
            <div className="py-6">
              <EmojiPicker
                onEmojiClick={(e) => setDesc((prev) => prev + e.emoji)}
              />
            </div>
            <AiOutlineClose
              onClick={() => setShowEmoji(false)}
              size={20}
              className="absolute top-0 left-0 bg-gray-600 rounded-full text-white hover:cursor-pointer"
            />
          </div>
        )}
        <div className="relative">
          {base64 && (
            <AiOutlineClose
              size={24}
              onClick={() => setBase64(null)}
              className="text-gray-100 bg-zinc-800 absolute z-20 top-4 right-4 rounded-full p-[2px] hover:cursor-pointer hover:bg-zinc-900 transition-all"
            />
          )}
          <ImageUpload
            label="Add photo"
            base64={base64 || ""}
            setBase64={setBase64}
          />
        </div>
      </div>
      <button
        onClick={createPost}
        className="mx-4 py-2 rounded-md lg:mx-16 my-4 text-white font-semibold bg-[#1a6ed8] hover:bg-[#1a6ed9] transition-all"
      >
        Post
      </button>
    </div>
  );
};

export default Page;
