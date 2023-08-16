"use client";
import React, { useEffect, useRef } from "react";
import { Input } from "..";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditModel = ({
  data,
  mutate,
  setEdit,
}: {
  data: Record<string, any>;
  mutate: () => void;
  setEdit: any;
}) => {
  const name = useRef<HTMLInputElement>();
  const bio = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (name.current) name.current.value = data?.name;
    if (bio.current && data.bio) bio.current.value = data?.bio;
  }, [data]);

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/update-profile", {
        name: name.current?.value,
        bio: bio.current?.value,
      });
      if (response.status == 200) {
        toast.success(response.data);
        mutate();
        setEdit(false);
      }
    } catch (error: any) {
      toast.error(error.response.data);
      console.log(error);
    }
  };
  return (
    <div className="w-[90%] lg:w-[40%] bg-[#e9ebee] p-4 rounded-lg">
      <form onSubmit={updateProfile}>
        <Input id="name" label="Name" refer={name} />
        <textarea
          className="rounded-lg px-6 pt-6 pb-1 w-full text-md text-black bg-white focus:outline-none focus:ring-0 my-3 placeholder:text-gray-600"
          placeholder="Enter your bio"
          ref={bio}
        />
        <div className="flex items-center gap-4 justify-center">
          <button className=" bg-blue-700 font-semibold w-[40%] text-white disabled:text-gray-300 hover:cursor-pointer hover:bg-blue-800 transition-colors py-2 rounded-lg">
            Save
          </button>
          <button
            onClick={() => setEdit(false)}
            className=" bg-blue-700 font-semibold w-[40%] text-white disabled:text-gray-300 hover:cursor-pointer hover:bg-blue-800 transition-colors py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModel;
