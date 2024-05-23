"use client";
import React from "react";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const HeaderUserSection = () => {
  const session = useSession();
  return (
    <>
      <div className="block md:hidden">
        <HamburgerMenu />
      </div>

      <div className="hidden md:flex items-center gap-5 flex-shrink">
        <Link
          href="/account/[name]"
          as={`/account/${session?.data?.user?.name}`}
        >
          <Image
            className="hidden md:block rounded-full"
            src={session?.data?.user?.image as string}
            alt="Avatar Image"
            width={70}
            height={70}
          />
        </Link>
        <button
          className="font-Raleway text-lg text-center  text-primaryAccent rounded-full font-bold bg-white shadow-lg shadow-white/35 hover:bg-slate-200 hover:shadow-white/30 md:p-3"
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
        >
          Sign out
        </button>
      </div>
    </>
  );
};
export default HeaderUserSection;
