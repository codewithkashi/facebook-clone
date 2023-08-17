"use client";
import { GroupCard } from "@components";
import { GroupsCardSkelton } from "@components/Skeltons";
import useAllGroups from "@hooks/useAllGroups";
import useCurrentUser from "@hooks/useCurrentUser";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const {
    data: authUser,
    isLoading: useLoading,
    mutate: mutateAuth,
  } = useCurrentUser();
  const { data: groups, isLoading, mutate } = useAllGroups();
  const router = useRouter();
  useEffect(() => {
    const user = async () => {
      const data = await getSession();
      if (!data?.user?.email) router.push("/login");
    };
    user();
  }, []);
  return (
    <div className="w-full lg:w-[50%] px-4 lg:px-16 py-4">
      {!isLoading ? (
        <>
          {groups &&
            groups.map((e: Record<string, any>) => (
              <GroupCard key={e._id} data={e} authUser={authUser} />
            ))}
        </>
      ) : (
        <>
          <GroupsCardSkelton />
          <GroupsCardSkelton />
          <GroupsCardSkelton />
        </>
      )}
    </div>
  );
};

export default Page;
