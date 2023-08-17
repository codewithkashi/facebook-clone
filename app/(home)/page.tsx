"use client";
import React, { useEffect } from "react";
import { CreatePost, PostCard } from "@components";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useAllPosts from "@hooks/useAllPosts";
import useCurrentUser from "@hooks/useCurrentUser";
import { CreatePostSkelton, PostCardSkelton } from "@components/Skeltons";

const Home = () => {
  const {
    data: posts,
    isLoading: postLoading,
    mutate: mutatePosts,
  } = useAllPosts();
  const { data: user, isLoading, mutate: mutateUser } = useCurrentUser();
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
      {!isLoading ? <CreatePost forGroup={false} /> : <CreatePostSkelton />}

      {!postLoading ? (
        <>
          {posts &&
            posts.map((e: Record<string, any>) => (
              <PostCard
                post={e}
                key={e._id}
                mutatePosts={mutatePosts}
                user={user}
                mutateUser={mutateUser}
              />
            ))}
        </>
      ) : (
        <>
          <PostCardSkelton />
          <PostCardSkelton />
        </>
      )}
    </div>
  );
};

export default Home;
