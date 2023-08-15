"use client";
import React from "react";
import { SentRequests, ReceivedRequests } from "@components";
import useFriendList from "@hooks/useFrindsList";
import useCurrentUser from "@hooks/useCurrentUser";
const Page = () => {
  const { data: authUser, mutate: mutateAuth } = useCurrentUser();
  const { data: requests, mutate: mutateFriends } = useFriendList();
  return (
    <div className="w-full lg:w-[50%] px-4 lg:px-16 py-4">
      <p className="font-semibold  text-xl lg:text-3xl my-2">Friends</p>
      {requests?.receivedRequests.length > 0 && (
        <div className="flex flex-col gap-2 border-b-[1px] border-gray-300">
          <p className="font-semibold  text-base lg:text-xl my-1">
            Received Requests
          </p>
          {requests?.receivedRequests.map((e: any) => (
            <ReceivedRequests
              key={e._id}
              userId={authUser?._id}
              data={e}
              mutateFriends={mutateFriends}
            />
          ))}
        </div>
      )}
      {requests?.sentRequests.length > 0 && (
        <div className="flex flex-col gap-2 border-b-[1px] border-gray-300">
          <p className="font-semibold  text-base lg:text-xl my-1">
            Sent Requests
          </p>
          {requests?.sentRequests.map((e: any) => (
            <SentRequests
              userId={authUser?._id}
              data={e}
              key={e._id}
              mutateFriends={mutateFriends}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
