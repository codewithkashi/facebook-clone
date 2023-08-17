"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "..";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { MdDoneOutline } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
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
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (title.current) title.current.value = data?.title;
    if (desc.current && data.desc) desc.current.value = data?.desc;
  }, [data]);
  const updateGroup = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
          <button onClick={updateGroup} className=" blue__button">
            {isLoading ? (
              <AiOutlineLoading className="text-white animate-spin" />
            ) : (
              <MdDoneOutline className="text-white" />
            )}
            {isLoading ? "Updating" : "Update"}
          </button>
          <button onClick={() => setEdit(false)} className="blue__button">
            <ImCancelCircle />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGroupModel;
