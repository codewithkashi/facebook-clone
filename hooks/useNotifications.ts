import useSWR from "swr";
import fetcher from "@utils/fetcher";

const useNotifications = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/user/notification`,
    fetcher
  );
  return { data, error, isLoading, mutate };
};

export default useNotifications;
