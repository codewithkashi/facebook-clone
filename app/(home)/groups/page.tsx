"use client";
import { GroupCard } from "@components";
import useAllGroups from "@hooks/useAllGroups";
import useCurrentUser from "@hooks/useCurrentUser";
import React from "react";

const Page = () => {
  const {
    data: authUser,
    isLoading: useLoading,
    mutate: mutateAuth,
  } = useCurrentUser();
  const { data: groups, isLoading, mutate } = useAllGroups();
  return (
    <div className="w-full lg:w-[50%] px-4 lg:px-16 py-4">
      {groups &&
        groups.map((e: Record<string, any>) => (
          <GroupCard key={e._id} data={e} authUser={authUser} />
        ))}
    </div>
  );
};

export default Page;
