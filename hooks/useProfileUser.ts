import useSWR from "swr";
import fetcher from "@utils/fetcher";

const useProfileUser = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/user/id/${id}`,
    fetcher
  );
  return { data, error, isLoading, mutate };
};

export default useProfileUser;
