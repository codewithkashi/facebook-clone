import useSWR from "swr";
import fetcher from "@utils/fetcher";

const useAllGroups = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/group/all", fetcher);
  return { data, error, isLoading, mutate };
};

export default useAllGroups;
