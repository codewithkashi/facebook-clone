import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import React, { useMemo } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
const SavedCard = ({
  data,
  mutate,
}: {
  data: Record<string, any>;
  mutate: any;
}) => {
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  const unSave = async () => {
    try {
      const response = await axios.delete("/api/post/save", {
        data: { id: data?._id },
      });
      if (response.status == 200) {
        toast.success(response.data);
        mutate();
      }
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };
  return (
    <div className="realtive flex py-3 border-b-[2px] border-gray-300 gap-2 flex-col sm:flex-row">
      {data.referId?.imgUrl && (
        <div className="w-[200px] h-[150x]">
          <Image
            src={data.referId?.imgUrl}
            alt="img"
            width={300}
            height={300}
            className="w-full min-h-full bg-cover rounded-md"
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <p className="text-xs lg:text-sm text-gray-700 font-semibold">
          {createdAt} ago
        </p>
        <p className="text-sm lg:text-base">{data.referId?.desc}</p>
      </div>
      <AiOutlineClose
        onClick={unSave}
        size={24}
        className="absolute right-4 lg:right-[30%] bg-gray-400 rounded-full p-1 hover:cursor-pointer"
      />
    </div>
  );
};

export default SavedCard;
