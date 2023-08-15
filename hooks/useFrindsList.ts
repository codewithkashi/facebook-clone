import useSWR from "swr";
import fetcher from "@utils/fetcher";

const useFriendList = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/friends-list",
    fetcher
  );
  return { data, error, isLoading, mutate };
};

export default useFriendList;
