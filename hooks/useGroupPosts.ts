import useSWR from "swr";
import fetcher from "@utils/fetcher";

const useGroupPosts = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/group/posts/${id}`,
    fetcher
  );
  return { data, error, isLoading, mutate };
};

export default useGroupPosts;
