"use client";
import { Input } from "@components";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { BsMeta } from "react-icons/bs";
const Register = () => {
  const date = useRef<HTMLInputElement | null>(null);
  const name = useRef<HTMLInputElement>();
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/register", {
        name: name.current?.value,
        email: email.current?.value,
        password: password.current?.value,
        dob: date.current?.value,
        gender,
      });
      if (response.status == 201) {
        toast.success(response.data);
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#e9ebee]">
      <div className="flex flex-col items-center space-y-10">
        <Image src={"/logo.png"} alt="logo" width={48} height={48} />
        <form
          className=" min-w-[220px] w-[250px] lg:w-[400px]"
          onSubmit={handleSubmit}
        >
          <Input id="name" type="name" label="Full Name" refer={name} />
          <Input id="email" type="email" label="Email" refer={email} />
          <Input
            id="password"
            type="password"
            label="Password"
            refer={password}
          />
          <div className="flex items-center gap-2 justify-start my-3">
            <input
              required
              type="date"
              ref={date}
              className="rounded-md border-[1px]  py-2 px-4"
            />
            <p className="text-gray-700 font-semibold">DOB </p>
          </div>
          <div className="flex justify-start items-center gap-3 my-3">
            <input
              type="radio"
              name="radio"
              id="male"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="male" className="text-gray-700 font-semibold">
              Male
            </label>
            <input
              type="radio"
              name="radio"
              id="female"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="female" className="text-gray-700 font-semibold">
              Female
            </label>
            <input
              type="radio"
              name="radio"
              id="custom"
              value="custom"
              checked={gender === "custom"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="custom" className="text-gray-700 font-semibold">
              Custom
            </label>
          </div>
          <button
            type="submit"
            className="w-full hover:cursor-pointer py-2 bg-[#1B74E4] disabled:text-gray-400  text-white rounded-full"
            disabled={loading}
          >
            Create Account
          </button>
          <Link href={"/login"}>
            <button className="w-full py-2 bg-transparent text-blue border-[1px] border-[#1B74E4] rounded-full justify-self-end text-[#1B74E4] mt-16">
              Login
            </button>
          </Link>
        </form>
        <div className="flex items-center gap-1">
          <BsMeta className="text-gray-600" />
          <p className=" text-gray-600">Meta</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
