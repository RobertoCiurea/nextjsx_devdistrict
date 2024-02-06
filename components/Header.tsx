"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/public/images/devdistrict_logo.png";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReportProblem from "./ReportProblem";

const Header = () => {
  const session = useSession();
  const router = useRouter();

  const imgSrc = session.data?.user?.image;
  return (
    <div className="flex justify-between sm:justify-between items-center mx-3 sm:mx-20">
      <Link href="/">
        <Image
          src={Logo}
          alt="DevDistrict Logo"
          width={200}
          className="w-[150px] sm:w-[200px]"
          onClick={() => router.push("/")}
        />
      </Link>

      {/*if no session render login button else render hamburger menu on mobile or the dekstop version */}
      {session.data?.user ? (
        <>
          <div className="block md:hidden">
            <HamburgerMenu imgSrc={imgSrc as string} />
          </div>
          <div className="hidden md:flex items-center gap-5 flex-shrink">
            <div className="flex flex-col">
              <Image
                className="hidden md:block rounded-full"
                src={imgSrc as string}
                alt="Avatar Image"
                width={70}
                height={70}
              />
            </div>
            <button
              className="font-Raleway text-lg p-3 text-center  text-primaryAccent rounded-full font-bold bg-white shadow-lg shadow-white/35 hover:bg-slate-200 hover:shadow-white/30"
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
            >
              Sign out
            </button>
          </div>
        </>
      ) : (
        <Link href="/auth/login">
          <button className="font-Raleway text-md sm:text-lg font-semibold md:text-xl p-2 sm:p-4 text-center  text-white rounded-full bg-gradient-to-b from-primaryAccent to-primaryAccentHover shadow-xl shadow-purple-700/50 transition hover:bg-gradient-to-b hover:from-primaryAccentHover hover:to-primaryAccentHover hover:text-gray-300 hover:shadow-purple-800/70">
            Sign in
          </button>
        </Link>
      )}
    </div>
  );
};
type ImageSource = {
  imgSrc: string;
};
const HamburgerMenu = ({ imgSrc }: ImageSource) => {
  const [hamburgerActive, setHamburgerActive] = useState(false);

  const modifyHamburgerState = (currentState: boolean) => {
    setHamburgerActive(!currentState);
  };
  return (
    <>
      {/*open and close hamburger menu */}
      {hamburgerActive ? (
        <>
          <div
            className="flex flex-col gap-2 items-center mx-2 group hover:cursor-pointer transition relative"
            onClick={() => modifyHamburgerState(hamburgerActive)}
          >
            <span className="bg-primaryAccent group-hover:bg-primaryAccentHover w-12 h-2 rounded-full rotate-45  -translate-y-1  transition-all "></span>
            <span className="bg-primaryAccent group-hover:bg-primaryAccentHover w-12 h-2 rounded-full -rotate-45 -translate-y-5 transition-all"></span>
          </div>
          <div className="text-white  absolute top-30 right-5 mt-2 p-3 rounded-lg  pr-5 bg-background flex z-10 flex-col items-end">
            <div className="flex items-center justify-center gap-3">
              <Image
                src={imgSrc as string}
                alt="User avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <h1 className="text-center">Acount</h1>
            </div>
            {/*Do sign out with this button bro */}
            <button className="flex justify-center font-bold bg-white text-md sm:text-lg text-primaryAccent font-Ralewa rounded-full p-2 mt-3 shadow-lg shadow-slate-100/70  hover:bg-slate-300 hover:text-primaryAccentHover hover:shadow-slate-200/50">
              Sign out
            </button>
            {/*report a problem component */}
            <ReportProblem />
          </div>
        </>
      ) : (
        <>
          <div
            className="flex flex-col gap-2 items-center mx-2 group hover:cursor-pointer transition relative"
            onClick={() => modifyHamburgerState(hamburgerActive)}
          >
            <span className="bg-primaryAccent group-hover:bg-primaryAccentHover w-12 h-2 rounded-full transition-all"></span>
            <span className="bg-primaryAccent group-hover:bg-primaryAccentHover w-12 h-2 rounded-full transition-all"></span>
            <span className="bg-primaryAccent group-hover:bg-primaryAccentHover w-12 h-2 rounded-full transition-all"></span>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
