"use client";
import { ImageUpload, Input } from "@components";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import useCurrentUser from "@hooks/useCurrentUser";

const Page = () => {
  const router = useRouter();
  const [base64, setBase64] = useState<string | null>(null);
  const title = useRef<HTMLInputElement | null>(null);
  const desc = useRef<HTMLTextAreaElement | null>(null);
  const createGroup = async () => {
    try {
      let picRes;
      if (!base64 || !desc || !title) return toast.error("Fill all data");
      if (base64) {
        picRes = await axios.post("/api/upload", { path: base64 });
        if (!picRes.data.secure_url) {
          return toast.error("Too big picture");
        }
      }
      const response = await axios.post("/api/group/create", {
        title: title.current?.value,
        desc: desc.current?.value,
        imgUrl: picRes?.data.secure_url,
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
        <p className="text-gray-700 text-lg font-semibold">Create Group</p>
      </div>
      <div className="mt-4">
        <Input id="title" label="Name of Group" refer={title} />
        <textarea
          className="rounded-lg px-6 pt-6 pb-1 w-full text-md text-black bg-white focus:outline-none focus:ring-0 my-3 placeholder:text-gray-600"
          placeholder="Enter Group Description"
          ref={desc}
        />
        <div className="relative">
          {base64 && (
            <AiOutlineClose
              size={24}
              onClick={() => setBase64(null)}
              className="text-gray-100 bg-zinc-800 absolute z-20 top-4 right-4 rounded-full p-[2px] hover:cursor-pointer hover:bg-zinc-900 transition-all"
            />
          )}
          <ImageUpload
            label="Add Group Cover Photo"
            base64={base64 || ""}
            setBase64={setBase64}
          />
        </div>
      </div>
      <button
        onClick={createGroup}
        className="mx-4 py-2 rounded-md lg:mx-16 my-4 text-white font-semibold bg-[#1a6ed8] hover:bg-[#1a6ed9] transition-all"
      >
        Create
      </button>
    </div>
  );
};

export default Page;
