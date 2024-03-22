"use client";
import React from "react";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import SignOutButton from "./SIgnOutButton";
import Image from "next/image";
import { useSession } from "next-auth/react";

const HeaderUserSection = () => {
  const session = useSession();
  return (
    <>
      <div className="block md:hidden">
        <HamburgerMenu />
      </div>
      {session?.data?.user && (
        <div className="hidden md:flex items-center gap-5 flex-shrink">
          <Link
            href="/account/[name]"
            as={`/account/${session.data.user?.name}`}
          >
            <Image
              className="hidden md:block rounded-full"
              src={session.data.user.image as string}
              alt="Avatar Image"
              width={70}
              height={70}
            />
          </Link>
          <SignOutButton styles="md:p-3" />
        </div>
      )}
    </>
  );
};
export default HeaderUserSection;
