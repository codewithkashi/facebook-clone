"use client";
import { Profile } from "@components";
import useNotifications from "@hooks/useNotifications";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const { data: notifications } = useNotifications();
  return (
    <div className="w-full lg:w-[50%] px-4 lg:px-16 py-4">
      {notifications &&
        notifications.map((e: any) => (
          <div
            onClick={() => router.push(e.url)}
            key={e._id}
            className="flex items-center gap-2 py-4 border-b-[1px] border-gray-300 hover:cursor-pointer"
          >
            <Profile imgUrl={e?.imgUrl} />
            <p className="font-semibold text-sm lg:text-base">{e.desc}</p>
          </div>
        ))}
    </div>
  );
};

export default Page;
