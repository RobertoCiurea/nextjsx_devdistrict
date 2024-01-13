"use client";
import React from "react";
import Image from "next/image";
import GoogleLogo from "@/public/images/google_logo.png";
import { signIn } from "next-auth/react";
const LoginwithGoogle = () => {
  return (
    <section
      className="w-full  bg-black text-white p-2 rounded-lg text-md md:text-xl flex items-center font-semibold cursor-pointer hover:bg-gray-950"
      onClick={() =>
        signIn("google", { callbackUrl: `${window.location.origin}` })
      }
    >
      Login With Google
      <Image src={GoogleLogo} alt="Github icon" width={75} />
    </section>
  );
};

export default LoginwithGoogle;
