"use client";
import useCurrentUser from "@hooks/useCurrentUser";
import { Profile } from "..";
import Image from "next/image";
import { useRouter } from "next/navigation";
const CreatePost = ({
  forGroup,
  groupId,
}: {
  forGroup: boolean;
  groupId?: string;
}) => {
  const { data: user } = useCurrentUser();
  const router = useRouter();
  return (
    <div className="flex items-center my-4 mx-4 lg:mx-8 bg-white shadow-md rounded-md px-8 py-4 gap-2">
      <Profile id={user?._id} imgUrl={user?.profileImage} />
      <div
        className=" flex items-center gap-2 w-full"
        onClick={() =>
          router.push(
            `/create-post?forGroup=${forGroup}&groupId=${groupId || ""}`
          )
        }
      >
        <div className="w-full bg-gray-100 rounded-full text-gray-600 py-2 px-4 text-sm lg:text-base">
          {`Whats on your mind ${user?.name || ""}?`}
        </div>
        <Image src={"/photo.png"} alt="photo" width={30} height={36} />
      </div>
    </div>
  );
};

export default CreatePost;
