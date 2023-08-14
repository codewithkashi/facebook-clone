"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Input } from "@components";
import { BsMeta } from "react-icons/bs";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Login = () => {
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await signIn("credentials", {
        email: email.current?.value,
        password: password.current?.value,
        redirect: false,
        callbackUrl: "/",
      });
      if (data?.ok) {
        toast.success("Logged in");
        return router.push("/");
      }
      toast.error(data?.error || "");
    } catch (error: any) {
      toast.error(error.message);
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
          <Input id="email" type="email" label="Email" refer={email} />
          <Input
            id="password"
            type="password"
            label="Password"
            refer={password}
          />
          <button
            className="w-full py-2 bg-[#1B74E4] text-white rounded-full"
            disabled={loading}
          >
            Log in
          </button>
          <Link href={"/register"}>
            <button className="w-full py-2 bg-transparent text-blue border-[1px] border-[#1B74E4] rounded-full justify-self-end text-[#1B74E4] mt-16">
              Create an account
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
export default Login;
