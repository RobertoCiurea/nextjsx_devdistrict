"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/public/images/devdistrict_logo.png";
import ReportIcon from "@/public/icons/report_icon.svg";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const session = useSession();
  const router = useRouter();

  const isLoggedIn = true;
  const imgSrc = session.data?.user?.image;
  console.log(typeof imgSrc);
  return (
    <div className="flex justify-between sm:justify-between items-center sm:mx-20">
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
            <HamburgerMenu />
          </div>
          <div className="hidden md:flex justify-center gap-10 flex-shrink">
            <Image
              className="hidden md:block rounded-full"
              src={imgSrc as string}
              alt="Avatar Image"
              width={70}
              height={70}
            />
            <button
              className="font-Raleway text-lg p-2 text-center  text-primaryAccent rounded-full font-bold bg-white shadow-lg shadow-white/35 hover:bg-slate-200 hover:shadow-white/30"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Sign out
            </button>
          </div>
        </>
      ) : (
        <Link href="/login">
          <button className="font-Raleway text-sm sm:text-lg font-semibold md:text-xl p-2 sm:p-4 text-center  text-white rounded-full bg-gradient-to-b from-primaryAccent to-primaryAccentHover shadow-xl shadow-purple-700/50 transition hover:bg-gradient-to-b hover:from-primaryAccentHover hover:to-primaryAccentHover hover:shadow-purple-800/70">
            Sign in
          </button>
        </Link>
      )}
    </div>
  );
};

const HamburgerMenu = () => {
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
          <div className="text-white  absolute top-36 right-5 pr-5 bg-background flex flex-col items-end">
            <h1 className="text-center">Acount</h1>
            <button className="flex justify-center font-bold bg-white text-md sm:text-lg text-primaryAccent font-Ralewa rounded-full p-2 mt-3 shadow-lg shadow-slate-100/70  hover:bg-slate-300 hover:text-primaryAccentHover hover:shadow-slate-200/50">
              Sign out
            </button>
            {/*report a problem link */}
            <div className="flex mt-5 items-center gap-2">
              <Image src={ReportIcon} alt="Report Icon" />
              <Link
                href="#"
                className="font-Raleway text-gray-400 text-sm underline "
              >
                Report a problem
              </Link>
            </div>
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
