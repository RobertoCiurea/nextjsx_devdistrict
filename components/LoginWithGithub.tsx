"use client";
import React from "react";
import Image from "next/image";
import GithubLogo from "@/public/images/github_logo.png";
import { signIn } from "next-auth/react";
type PropsTypes = {
  styles: string;
  imgWidth: number;
};
const LoginWithGithub = ({ styles, imgWidth }: PropsTypes) => {
  return (
    <section
      className={`w-full  bg-white text-black  rounded-lg flex items-center font-semibold cursor-pointer hover:bg-gray-300 ${styles}`}
      onClick={() =>
        signIn("github", { callbackUrl: `${window.location.origin}` })
      }
    >
      Login With Github
      <Image src={GithubLogo} alt="Github icon" width={imgWidth} />
    </section>
  );
};

export default LoginWithGithub;
