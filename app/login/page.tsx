import React from "react";
import LoginWithEmail from "@/components/LoginWithEmail";
import LoginWithGithub from "@/components/LoginWithGithub";
import LoginWithGoogle from "@/components/LoginWithGoogle";
import { getSession } from "../utils/getSession";
import Forbidden from "@/components/Forbidden";
import Link from "next/link";
const page = async () => {
  const session = await getSession();
  if (session?.user)
    return (
      <Forbidden
        placeholder={"You are already logged in! You don't have access here."}
      />
    );
  return (
    <div className="flex justify-center items-center flex-col gap-10 my-10  px-5 py-12 rounded-2xl sm:border-2 sm:border-primaryAccentHover  sm:mx-[7rem] md:mx-[10rem] lg:mx-[20rem] 2xl:mx-[38rem]">
      {/*Top section */}
      <div className="flex flex-col items-center">
        <h1 className="text-xl text-white font-Montserrat md:text-2xl lg:text-3xl">
          Login to <span className="text-primaryAccent">Dev</span>District
        </h1>
        <p className="text-white">
          To use this page you have to be authenticated
        </p>
      </div>
      {/*Login with email section */}
      <div>
        <h1 className="text-white py-2 text-lg md:text-xl">Login with email</h1>
        <LoginWithEmail />
      </div>
      {/*Login with github */}
      <div>
        <h1
          className=" font-Raleway text-primaryAccent text-lg md:text-xl relative font-bold text-center before:w-24 before:h-1 before:rounded-full before:bg-primaryAccent before:absolute before:left-0 md:before:left-4 before:top-3
        after:w-24 after:h-1 after:rounded-full after:bg-primaryAccent after:absolute after:right-0 md:after:right-4 after:top-3"
        >
          Or
        </h1>
        <div className="flex flex-col gap-5 mt-3">
          <LoginWithGithub />
          <LoginWithGoogle />
        </div>
      </div>
      {/*link to the register page */}
      <div className="text-white text-sm lg:text-md text-center">
        <h1>You don't have an account?</h1>
        <Link
          href="/register"
          className="text-primaryAccent underline hover:text-primaryAccentHover"
        >
          {" "}
          Register now
        </Link>
      </div>
    </div>
  );
};

export default page;
