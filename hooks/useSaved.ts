import useSWR from "swr";
import fetcher from "@utils/fetcher";

const useSaved = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/post/saved", fetcher);
  return { data, error, isLoading, mutate };
};

export default useSaved;
