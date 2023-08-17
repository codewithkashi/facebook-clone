"use client";
import React, { useEffect } from "react";
import { SentRequests, ReceivedRequests, FindFriends } from "@components";
import useFriendList from "@hooks/useFrindsList";
import useCurrentUser from "@hooks/useCurrentUser";
import useFindFriends from "@hooks/useFindFrinds";
import FriendCardSkelton from "@components/Skeltons/FriendCardSkelton";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Page = () => {
  const { data: authUser, mutate: mutateAuth } = useCurrentUser();
  const router = useRouter();
  const {
    data: requests,
    mutate: mutateFriends,
    isLoading: requestsLoading,
  } = useFriendList();
  const {
    data: findFriends,
    mutate: mutateFindFriends,
    isLoading: findFriendsLoading,
  } = useFindFriends();
  useEffect(() => {
    const user = async () => {
      const data = await getSession();
      if (!data?.user?.email) router.push("/login");
    };
    user();
  }, []);
  return (
    <div className="w-full lg:w-[50%] px-4 lg:px-16 py-4">
      {!requestsLoading ? (
        <>
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
        </>
      ) : (
        <FriendCardSkelton />
      )}
      {!requestsLoading ? (
        <>
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
        </>
      ) : (
        <FriendCardSkelton />
      )}

      {!findFriendsLoading ? (
        <>
          {findFriends && (
            <div className="flex flex-col gap-2 py-2">
              <p className="font-semibold  text-base lg:text-xl my-1">
                People you may know
              </p>
              {findFriends.map((e: any) => (
                <FindFriends
                  authUser={authUser}
                  mutate={mutateFindFriends}
                  mutateAuth={mutateAuth}
                  userData={e}
                  key={e._id}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <FriendCardSkelton />
      )}
    </div>
  );
};

export default Page;
