"use client";
import {
  AcceptRequestButton,
  AddFriendButton,
  DeleteRequestButton,
  EditButton,
  EditGroupModel,
  EditModel,
  ImageUpload,
  PostCard,
  UnFriendButton,
} from "@components";
import useCurrentUser from "@hooks/useCurrentUser";
import useGroup from "@hooks/useGroup";
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
  const { data: authUser, mutate: mutateAuth } = useCurrentUser();
  // const { data: userPosts, mutate: mutatePosts } = userUserPosts(params.id);
  const { data: groupData, mutate } = useGroup(params.id);
  const [base64, setBase64] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const router = useRouter();
  const [isProfile, setIsProfile] = useState(false);
  const [loading, setLoading] = useState(false);

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
      console.log(error);
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
    }
  };
  return (
    <div className="w-full lg:w-[50%] py-4 px-4 lg:px-16">
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
              isProfile={isProfile}
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
          <EditGroupModel data={groupData} mutate={mutate} setEdit={setEdit} />
        </div>
      )}
      {authUser?._id === groupData?.creator ? (
        <button onClick={() => setEdit(true)} className="blue__button">
          Edit
        </button>
      ) : (
        <>
          {groupData?.members?.includes(authUser?._id) ? (
            <button onClick={leaveGroup} className="blue__button">
              Joined
            </button>
          ) : (
            <button onClick={joinGroup} className="blue__button">
              Join
            </button>
          )}
        </>
      )}
      {/* {userPosts?.map((e: any) => (
        <PostCard
          post={e}
          user={authUser}
          mutatePosts={mutatePosts}
          mutateUser={myProfile ? mutateAuth : mutate}
        />
      ))} */}
    </div>
  );
};

export default Page;
