"use client";
import React from "react";
import Image from "next/image";
import GithubLogo from "@/public/images/github_logo.png";
import { signIn } from "next-auth/react";
const LoginWithGithub = () => {
  return (
    <section
      className="w-full  bg-white text-black p-2 rounded-lg text-md md:text-xl flex items-center font-semibold cursor-pointer hover:bg-gray-300"
      onClick={() =>
        signIn("github", { callbackUrl: `${window.location.origin}` })
      }
    >
      Login With Github
      <Image src={GithubLogo} alt="Github icon" width={75} />
    </section>
  );
};

export default LoginWithGithub;
