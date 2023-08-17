"use client";
import { CreatePost, EditGroupModel, ImageUpload, PostCard } from "@components";
import {
  CreatePostSkelton,
  GroupPageSkelton,
  PostCardSkelton,
} from "@components/Skeltons";
import useCurrentUser from "@hooks/useCurrentUser";
import useGroup from "@hooks/useGroup";
import useGroupPosts from "@hooks/useGroupPosts";
import axios from "axios";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { BiEdit, BiSolidCamera } from "react-icons/bi";
import { BsPersonAdd } from "react-icons/bs";
import { MdOutlinePersonRemoveAlt1 } from "react-icons/md";
const Page = ({ params }: { params: { id: string } }) => {
  const {
    data: authUser,
    mutate: mutateAuth,
    isLoading: authUserLoading,
  } = useCurrentUser();
  const { data: groupData, mutate, isLoading } = useGroup(params.id);
  const {
    data: groupPosts,
    isLoading: groupPostsLoading,
    mutate: mutateGroupPosts,
  } = useGroupPosts(params?.id);
  const [base64, setBase64] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const user = async () => {
      const data = await getSession();
      if (!data?.user?.email) router.push("/login");
    };
    user();
  }, []);
  const updateCoverPhoto = async () => {
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
      const response = await axios.post("/api/group/update-cp", {
        id: groupData._id,
        coverImage: picRes?.data.secure_url,
      });
      if (response.status == 200) {
        toast.success(response.data);
        setOpen(false);
      }

      mutate();
      setBase64("");
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  const joinGroup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/group/join", {
        id: groupData?._id,
      });
      if (response.status == 200) {
        toast.success(response.data);
        mutate();
      }
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const leaveGroup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/group/leave", {
        id: groupData?._id,
      });
      if (response.status == 200) {
        toast.success(response.data);
        mutate();
      }
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full lg:w-[50%] py-4 px-4 lg:px-16">
      {!isLoading ? (
        <>
          {" "}
          <div className="relative">
            {groupData?.creator === authUser?._id && (
              <BiSolidCamera
                onClick={() => {
                  setOpen(true);
                }}
                size={32}
                className="text-black bg-gray-400 rounded-full p-1 absolute top-12 right-8 lg:right-20 hover:cursor-pointer"
              />
            )}

            <div className="w-full h-[160px] sm:h-[200px] md:h-[240px] lg:h-[280px] bg-gray-300 overflow-hidden">
              <Image
                width={800}
                height={300}
                src={groupData?.imgUrl}
                alt="profile"
                className="w-full min-h-full"
              />
            </div>

            {open && (
              <div className="absolute top-4 left-0 w-[95%] bg-gray-300 z-40 scale-up-ver-bottom py-8">
                <ImageUpload
                  label="Add photo"
                  base64={base64 || ""}
                  setBase64={setBase64}
                />
                <div className="flex items-center gap-4 mx-4 lg:mx-16 pb-4">
                  <button
                    onClick={updateCoverPhoto}
                    disabled={loading}
                    className="blue__button"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      setBase64("");
                    }}
                    className="blue__button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="pt-12 pb-8 px-2 lg:px-8 flex flex-col gap-1">
            <p className="text-black text-lg lg:text-2xl font-semibold ">
              {groupData?.title}
            </p>
            <p className="flex items-center gap-2 text-gray-700 text-sm lg:text-base">
              <span className="text-black font-semibold">
                {groupData?.members?.length || 0}
              </span>
              Members
            </p>
            <p className="text-sm lg:text-base font-[400]">{groupData?.desc}</p>
          </div>
          {edit && (
            <div className="fixed top-0 left-0 flex justify-center items-center w-screen bg-opacity-80 h-screen scale-up-ver-bottom z-20 bg-gray-900 py-8">
              <EditGroupModel
                data={groupData}
                mutate={mutate}
                setEdit={setEdit}
              />
            </div>
          )}
          {authUser?._id === groupData?.creator ? (
            <button onClick={() => setEdit(true)} className="blue__button">
              <BiEdit /> Edit
            </button>
          ) : (
            <>
              {groupData?.members?.includes(authUser?._id) ? (
                <button
                  onClick={leaveGroup}
                  className="blue__button"
                  disabled={loading}
                >
                  {loading ? (
                    <AiOutlineLoading className="animate-spin" />
                  ) : (
                    <MdOutlinePersonRemoveAlt1 />
                  )}
                  {!loading && "Joined"}
                </button>
              ) : (
                <button onClick={joinGroup} className="blue__button">
                  {loading ? (
                    <AiOutlineLoading className="animate-spin" />
                  ) : (
                    <BsPersonAdd />
                  )}
                  {!loading && "Join"}
                </button>
              )}
            </>
          )}
        </>
      ) : (
        <GroupPageSkelton />
      )}

      {authUserLoading ? (
        <CreatePostSkelton />
      ) : (
        <>
          {groupData?.members?.includes(authUser?._id) ||
          groupData?.creator === authUser?._id ? (
            <>
              <>
                {authUserLoading ? (
                  <CreatePostSkelton />
                ) : (
                  <CreatePost forGroup={true} groupId={groupData?._id} />
                )}
              </>
              {groupPostsLoading ? (
                <PostCardSkelton />
              ) : (
                <>
                  {groupPosts &&
                    groupPosts.map((e: Record<string, any>) => (
                      <PostCard
                        post={e}
                        key={e?._id}
                        mutatePosts={mutateGroupPosts}
                        user={authUser}
                        mutateUser={mutateAuth}
                      />
                    ))}
                </>
              )}
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Page;
