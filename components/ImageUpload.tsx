"use client";
import React from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { ImageUploadProps } from "@types";
const ImageUpload = ({
  label,
  base64,
  setBase64,
  isProfile,
}: ImageUploadProps) => {
  const handleDrop = (files: any) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      setBase64(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    accept: {
      "image/*": [],
    },
  });
  return (
    <div
      {...getRootProps({})}
      className={` ${
        isProfile ? "h-96 p-0" : "w-full min-h-[30vh] p-3 "
      }   flex justify-center items-center text-gray-700 font-semibold text-center  rounded-md `}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div
          className={`flex items-center justify-center relative bg-gray-500 ${
            isProfile &&
            "lg:w-72 lg:h-72 w-44 h-44 overflow-hidden rounded-full"
          }`}
        >
          <Image
            src={base64}
            width={200}
            height={200}
            alt=""
            className={`${
              isProfile ? "bg-cover min-w-full min-h-full" : "w-full"
            }`}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Image src={"/photo.png"} alt="" width={28} height={32} />
          <p className="text-lg">{label}</p>
          <p className="text-sm font-normal">or drag and drop</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
