"use client";
import Profile from "@components/Profile";
import { SuggestedPeopleSkelton } from "@components/Skeltons";
import useFindFriends from "@hooks/useFindFrinds";
import { useRouter } from "next/navigation";
import React from "react";

const Friends = () => {
  const router = useRouter();
  const {
    data: findFriends,
    mutate: mutateFindFriends,
    isLoading,
  } = useFindFriends();
  return (
    <div className="flex flex-col py-4 border-t-[1px] border-gray-300 hover:cursor-pointer">
      {isLoading ? (
        <SuggestedPeopleSkelton />
      ) : (
        <div className="">
          <p className="text-gray-700 font-semibold py-4">Suggested People</p>
          <div className="flex flex-col gap-3">
            {findFriends?.map((e: Record<string, any>) => (
              <div
                className="flex items-center gap-2 py-1"
                onClick={() => router.push(`/user/${e?._id}`)}
                key={e?._id}
              >
                <Profile id={e?._id} imgUrl={e?.profileImage} />
                <p className="text-sm lg:text-base font-semibold">{e?.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Friends;
