import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

const GroupCard = ({
  data,
  authUser,
}: {
  data: Record<string, any>;
  authUser: Record<string, any>;
}) => {
  const router = useRouter();
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);
  return (
    <div
      className="flex items-center py-3 border-b-2 border-gray-300 hover:cursor-pointer"
      onClick={() => router.push(`/group/${data?._id}`)}
    >
      <div className="w-20 h-20 lg:h-32 lg:w-32 rounded-md overflow-hidden">
        <Image
          src={data.imgUrl}
          alt="cover image"
          height={150}
          width={150}
          className="w-full min-h-full"
        />
      </div>
      <div className="px-3 flex flex-col justify-between py-2">
        <p className="text-gray-700 font-semibold text-xs lg:text-sm">
          {createdAt}
        </p>

        <p className="font-semibold lg:text-xl">{data?.title}</p>
        {authUser?._id === data?.creator ? (
          <button className="blue__button">Edit</button>
        ) : (
          <>
            {data?.members.includes(authUser?._id) ? (
              <button className="blue__button">Joined</button>
            ) : (
              <button className="blue__button">Join</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GroupCard;
