"use client";
import {
  AcceptRequestButton,
  AddFriendButton,
  DeleteRequestButton,
  EditButton,
  EditModel,
  ImageUpload,
  PostCard,
  UnFriendButton,
} from "@components";
import { PostCardSkelton, UserProfileSkelton } from "@components/Skeltons";
import useCurrentUser from "@hooks/useCurrentUser";
import useProfileUser from "@hooks/useProfileUser";
import userUserPosts from "@hooks/useUserPosts";
import axios from "axios";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiSolidCamera } from "react-icons/bi";
const Page = ({ params }: { params: { id: string } }) => {
  const { data: userData, isLoading, mutate } = useProfileUser(params.id);
  const { data: authUser, mutate: mutateAuth } = useCurrentUser();
  const { data: userPosts, mutate: mutatePosts } = userUserPosts(params.id);
  const [base64, setBase64] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [myProfile, setMyProfile] = useState(false);
  const router = useRouter();
  const [isProfile, setIsProfile] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateProfilePic = async () => {
    try {
      setLoading(true);
      let picRes;
      if (!base64) return toast.error("No image selected");
      if (base64) {
        picRes = await axios.post("/api/upload", { path: base64 });
        if (!picRes.data.secure_url) {
          return toast.error("Too big picture");
        }
      }
      if (isProfile) {
        const response = await axios.post("/api/update-pp", {
          profileImage: picRes?.data.secure_url,
        });
        if (response.status == 200) {
          toast.success(response.data);
          setOpen(false);
        }
      } else {
        const response = await axios.post("/api/update-cp", {
          coverImage: picRes?.data.secure_url,
        });
        if (response.status == 200) {
          toast.success(response.data);
          setOpen(false);
        }
      }
      mutate();
      setBase64("");
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = async () => {
      const data = await getSession();
      if (!data?.user?.email) return router.push("/login");
      if (data?.user?.email === userData?.email) setMyProfile(true);
    };
    user();
  }, [userData]);
  return (
    <div className="w-full lg:w-[50%] py-4 px-4 lg:px-16">
      {isLoading ? (
        <>
          <UserProfileSkelton />
          <PostCardSkelton />
        </>
      ) : (
        <>
          <div className="relative">
            {myProfile && (
              <BiSolidCamera
                onClick={() => {
                  setOpen(true);
                  setIsProfile(false);
                }}
                size={32}
                className="text-black bg-gray-400 rounded-full p-1 absolute top-12 right-8 lg:right-20 hover:cursor-pointer"
              />
            )}
            <div className="w-full h-[160px] sm:h-[200px] md:h-[240px] lg:h-[280px] bg-gray-300 overflow-hidden">
              {userData?.coverImage && (
                <Image
                  width={800}
                  height={300}
                  src={userData?.coverImage}
                  alt="profile"
                  className="w-full min-h-full"
                />
              )}
              <div className="absolute w-24 flex justify-center items-center rounded-full -bottom-4 lg:-bottom-8 overflow-hidden h-24 lg:w-36 lg:h-36 bg-gray-500 lg:left-12 left-6">
                <Image
                  width={200}
                  height={200}
                  src={userData?.profileImage || "/profile.png"}
                  alt="profile"
                  className="min-w-full min-h-full"
                />

                {myProfile && (
                  <BiSolidCamera
                    onClick={() => {
                      setOpen(true);
                      setIsProfile(true);
                    }}
                    size={32}
                    className="text-black bg-gray-400 rounded-full p-1 absolute bottom-0  right-[30%] z-20 hover:cursor-pointer"
                  />
                )}
              </div>
            </div>

            {open && (
              <div className="absolute top-4 left-0 w-[95%] bg-gray-300 z-40 scale-up-ver-bottom py-8">
                <ImageUpload
                  label="Add photo"
                  base64={base64 || ""}
                  setBase64={setBase64}
                  isProfile={isProfile}
                />
                <div className="flex items-center gap-4 mx-4 lg:mx-16 pb-4">
                  <button
                    onClick={updateProfilePic}
                    disabled={loading}
                    className="bg-blue-700 text-white disabled:text-gray-300 hover:cursor-pointer transition-all font-semibold w-full rounded-xl mt-4 py-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      setBase64("");
                    }}
                    className="bg-blue-700 text-white font-semibold w-full rounded-xl mt-4 py-2 hover:cursor-pointer transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-12 pb-8 px-2 lg:px-8 flex flex-col gap-1">
            <p className="text-black text-lg lg:text-2xl font-semibold ">
              {userData?.name}
            </p>
            <p className="flex items-center gap-2 text-gray-700 text-sm lg:text-base">
              <span className="text-black font-semibold">
                {userData?.friends?.length || 0}
              </span>
              Friends
            </p>
            <p className="text-sm lg:text-base font-[400]">{userData?.bio}</p>
            {myProfile ? (
              <EditButton setEdit={setEdit} />
            ) : (
              <>
                {authUser?.friends.includes(userData?._id) ? (
                  <UnFriendButton
                    mutate={mutate}
                    mutateAuth={mutateAuth}
                    userData={userData}
                  />
                ) : (
                  <>
                    {authUser?.receivedRequests.includes(userData?._id) ? (
                      <div className="felx items-center w-full">
                        <AcceptRequestButton
                          mutate={mutate}
                          mutateAuth={mutateAuth}
                          userData={userData}
                        />
                        <DeleteRequestButton
                          mutate={mutate}
                          mutateAuth={mutateAuth}
                          userData={userData}
                        />
                      </div>
                    ) : (
                      <AddFriendButton
                        authUser={authUser}
                        mutate={mutate}
                        mutateAuth={mutateAuth}
                        userData={userData}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
          {edit && (
            <div className="fixed top-0 left-0 flex justify-center items-center w-screen bg-opacity-80 h-screen scale-up-ver-bottom z-20 bg-gray-900 py-8">
              <EditModel data={userData} mutate={mutate} setEdit={setEdit} />
            </div>
          )}

          {userPosts?.map((e: any) => (
            <PostCard
              key={e._id}
              post={e}
              user={authUser}
              mutatePosts={mutatePosts}
              mutateUser={myProfile ? mutateAuth : mutate}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Page;
