"use client";
import React, { useEffect, useState } from "react";
import { CreatePost, PostCard } from "@components";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useAllPosts from "@hooks/useAllPosts";
import useCurrentUser from "@hooks/useCurrentUser";

const Home = () => {
  const {
    data: posts,
    error: postError,
    isLoading: postLoading,
    mutate: mutatePosts,
  } = useAllPosts();
  const { data: user, error, isLoading, mutate: mutateUser } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    const user = async () => {
      const data = await getSession();
      if (!data?.user?.email) router.push("/login");
    };
    user();
  }, []);
  return (
    <div className="relative w-full lg:w-[50%]">
      <CreatePost />

      {posts &&
        posts.map((e: Record<string, any>) => (
          <PostCard
            post={e}
            key={e.id}
            mutatePosts={mutatePosts}
            user={user}
            mutateUser={mutateUser}
          />
        ))}
    </div>
  );
};

export default Home;
