import useSWR from "swr";
import fetcher from "@utils/fetcher";

const useAllPosts = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/post/all", fetcher);
  return { data, error, isLoading, mutate };
};

export default useAllPosts;
