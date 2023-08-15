import useSWR from "swr";
import fetcher from "@utils/fetcher";

const userUserPosts = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/user/post/${id}`,
    fetcher
  );
  return { data, error, isLoading, mutate };
};

export default userUserPosts;
