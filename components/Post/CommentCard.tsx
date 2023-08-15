import React, { useMemo } from "react";
import { Profile, ReplyCard } from "@components";
import { formatDistanceToNowStrict } from "date-fns";
import useCurrentUser from "@hooks/useCurrentUser";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AiFillLike } from "react-icons/ai";
const CommentCard = ({
  data,
  mutateComments,
  setIsReply,
  setCommentId,
  setReplyTo,
}: {
  data: Record<string, any>;
  mutateComments: any;
  setIsReply: any;
  setCommentId: any;
  setReplyTo: any;
}) => {
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);
  const { data: user } = useCurrentUser();
  const likeComment = async () => {
    try {
      if (data?.likes.includes(user?._id)) {
        const response = await axios.delete("/api/post/likecomment", {
          data: { id: data?._id },
        });
        if (response.status == 200) toast.success(response.data);
      } else {
        const response = await axios.post("/api/post/likecomment", {
          id: data?._id,
        });
        if (response.status == 200) toast.success(response.data);
      }
      mutateComments();
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <Profile id={data.creator?._id} imgUrl={data.creator?.profileImage} />
        <div className="">
          <div className="flex flex-col  rounded-xl bg-zinc-300 px-4 py-1">
            <p className="text-black font-semibold text-sm lg:text-base">
              {data.creator?.name}
            </p>
            <p className="text-gray-900 text-sm lg:text-base">{data?.desc}</p>
          </div>
          <div className="flex gap-2 m-1">
            <p className="text-xs font-semibold lg:text-sm text-gray-700">{`${
              createdAt?.split(" ")[0]
            }${createdAt?.split(" ")[1][0].toLowerCase()}`}</p>
            <p
              className={`text-xs font-semibold hover:cursor-pointer lg:text-sm ${
                data?.likes.includes(user?._id)
                  ? "text-blue-700"
                  : "text-gray-700"
              }`}
              onClick={likeComment}
            >
              Like
            </p>
            <p
              className="text-xs font-semibold lg:text-sm text-gray-700 hover:cursor-pointer"
              onClick={() => {
                setIsReply(true);
                setCommentId(data?._id);
                setReplyTo(data.creator._id);
              }}
            >
              Reply
            </p>
            {data.likes.length > 0 && (
              <div className="flex items-center ml-2">
                <p className="text-gray-700 font-semibold text-xs lg:text-sm mr-1">
                  {data.likes.length}
                </p>
                <div className=" bg-blue-700 h-4 w-4 rounded-full flex justify-center items-center">
                  <AiFillLike size={10} className="text-white" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {data?.replies.map((e: any, index: number) => (
        <ReplyCard
          data={e}
          key={index}
          mutateComments={mutateComments}
          setCommentId={setCommentId}
          setIsReply={setIsReply}
          setReplyTo={setReplyTo}
        />
      ))}
    </div>
  );
};

export default CommentCard;
