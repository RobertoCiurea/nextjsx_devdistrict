"use client";
import React from "react";
import Image from "next/image";
import GoogleLogo from "@/public/images/google_logo.png";
import { signIn } from "next-auth/react";
const handleLoginAction = async () => {
  const response = await signIn("google", {
    redirect: false,
  });
  console.log(response);
};
type PropsTypes = {
  styles: string;
  imgWidth: number;
};
const LoginwithGoogle = ({ styles, imgWidth }: PropsTypes) => {
  return (
    <section
      className={`w-full  bg-black text-white rounded-lg  flex items-center font-semibold cursor-pointer hover:bg-gray-950 ${styles}`}
      onClick={handleLoginAction}
    >
      Login With Google
      <Image src={GoogleLogo} alt="Github icon" width={imgWidth} />
    </section>
  );
};

export default LoginwithGoogle;
