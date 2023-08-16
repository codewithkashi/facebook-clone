import useSWR from "swr";
import fetcher from "@utils/fetcher";

const useFindFriends = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/user/find-friends",
    fetcher
  );
  return { data, error, isLoading, mutate };
};

export default useFindFriends;
