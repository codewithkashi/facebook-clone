"use client";
import React, { useEffect, useRef } from "react";
import { Input } from "..";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditGroupModel = ({
  data,
  mutate,
  setEdit,
}: {
  data: Record<string, any>;
  mutate: () => void;
  setEdit: any;
}) => {
  const title = useRef<HTMLInputElement>();
  const desc = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (title.current) title.current.value = data?.title;
    if (desc.current && data.desc) desc.current.value = data?.desc;
  }, [data]);
  const updateGroup = async () => {
    console.log(title.current?.value, desc.current?.value, data?._id);
    try {
      const response = await axios.post("/api/group/update-data", {
        title: title.current?.value,
        desc: desc.current?.value,
        id: data._id,
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
      <div>
        <Input id="name" label="Name" refer={title} />
        <textarea
          className="rounded-lg px-6 pt-6 pb-1 w-full text-md text-black bg-white focus:outline-none focus:ring-0 my-3 placeholder:text-gray-600"
          placeholder="Enter Group Description"
          ref={desc}
        />
        <div className="flex items-center gap-4 justify-center">
          <button
            onClick={updateGroup}
            className=" bg-blue-700 font-semibold w-[40%] text-white disabled:text-gray-300 hover:cursor-pointer hover:bg-blue-800 transition-colors py-2 rounded-lg"
          >
            Update
          </button>
          <button
            onClick={() => setEdit(false)}
            className=" bg-blue-700 font-semibold w-[40%] text-white disabled:text-gray-300 hover:cursor-pointer hover:bg-blue-800 transition-colors py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGroupModel;
