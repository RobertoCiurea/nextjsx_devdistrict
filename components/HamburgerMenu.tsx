"use client";
import { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const HamburgerMenu = () => {
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const session = useSession();
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
            <Link
              href="/account/[name]"
              as={`/account/${session.data?.user?.name}`}
              onClick={() => setHamburgerActive(false)}
            >
              <div className="flex items-center justify-center gap-5">
                <Image
                  src={session.data?.user?.image as string}
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <h1 className="text-center">Acount</h1>
              </div>
            </Link>
            <button
              className="font-Raleway text-lg text-center  text-primaryAccent rounded-full font-bold bg-white shadow-lg shadow-white/35 hover:bg-slate-200 hover:shadow-white/30 md:p-3"
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
            >
              Sign out
            </button>

            {/*report a problem component */}
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

export default HamburgerMenu;
