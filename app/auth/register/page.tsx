import React from "react";
import RegisterWithEmail from "@/components/RegisterWithEmail";
import { getSession } from "../../utils/getSession";
import Forbidden from "@/components/Forbidden";
import Link from "next/link";

import { Metadata } from "next";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const metadata: Metadata = {
  title: "Register to DevDistrict",
  description: "Create a new account and start sharing experiences! ",
  openGraph: {
    title: "Register to DevDistrict",
    description: "Create a new account and start sharing experiences! ",
    url: `${baseUrl}/auth/register`,
    images: [
      {
        url: `${baseUrl}/public/icons/favicon.ico`,
        width: 800,
        height: 600,
        alt: "DevDistrict Icon",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Register to DevDistrict",
    description: "Create a new account and start sharing experiences! ",
    images: [`${baseUrl}/public/icons/favicon.ico`],
  },
  alternates: {
    canonical: `${baseUrl}/auth/register`,
  },
};

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
          Register to <span className="text-primaryAccent">Dev</span>District
        </h1>
        <p className="text-white">To create an account you must register</p>
      </div>
      {/*Login with email section */}
      <div>
        <h1 className="text-white py-2 text-lg md:text-xl">
          Register with email
        </h1>
        <RegisterWithEmail />
      </div>
      {/*link to the login page */}
      <div className="text-white text-sm lg:text-md text-center">
        <h1>You have an account already?</h1>
        <Link
          href="/auth/login"
          className="text-primaryAccent underline hover:text-primaryAccentHover"
        >
          {" "}
          Login now
        </Link>
      </div>
    </div>
  );
};

export default page;
