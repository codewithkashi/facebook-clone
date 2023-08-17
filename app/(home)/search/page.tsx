"use client";
import { Avatar } from "@components";
import axios from "axios";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";
interface ISearch {
  _id: string;
  name: string;
  profileImage?: string;
}
const Page = () => {
  const searchText = useRef<HTMLInputElement | null>(null);
  const [data, setData] = useState<ISearch[] | null>(null);
  const router = useRouter();
  const handlerSearch = async () => {
    if (!searchText) return toast.error("Type something to search");
    try {
      const response = await axios.get(
        `/api/user/search?text=${searchText.current?.value}`
      );
      if (response.status == 200) setData(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    const user = async () => {
      const data = await getSession();
      if (!data?.user?.email) router.push("/login");
    };
    user();
  }, []);
  return (
    <div className="w-full lg:w-[50%] px-4 lg:px-16 py-4">
      <div className="bg-white rounded-full py-2 px-4 mx-8 lg:mx-16 flex items-center gap-2">
        <input
          ref={searchText}
          type="text"
          placeholder="Search Facebook"
          className="focus:outline-none w-full"
        />
        <AiOutlineSearch
          onClick={handlerSearch}
          size={24}
          className="text-gray-600 hover:cursor-pointer"
        />
      </div>

      <div className="px-4 lg:px-16 py-8">
        {data &&
          data.map((e) => (
            <div
              className="flex items-start gap-2 py-4 border-b-[2px] border-gray-300"
              key={e._id}
            >
              <Avatar id={e._id} imgUrl={e?.profileImage} />
              <Link
                href={`/user/${e._id}`}
                className="text-sm lg:text-base font-semibold"
              >
                {e?.name}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
