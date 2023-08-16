import useSWR from "swr";
import fetcher from "@utils/fetcher";

const useGroup = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/group/id/${id}`,
    fetcher
  );
  return { data, error, isLoading, mutate };
};

export default useGroup;
