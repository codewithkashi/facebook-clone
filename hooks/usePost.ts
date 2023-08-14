import useSWR from "swr";
import fetcher from "@utils/fetcher";

const usePost = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/post/id/${id}`,
    fetcher
  );
  return { data, error, isLoading, mutate };
};

export default usePost;
