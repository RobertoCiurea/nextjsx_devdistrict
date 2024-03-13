"use client";
import Image from "next/image";
import Logo from "@/public/images/devdistrict_logo.png";
import HamburgerMenu from "./HamburgerMenu";
import Link from "next/link";
import SignOutButton from "./SIgnOutButton";
import HeaderUserSection from "./HeaderUserSection";
import { useSession } from "next-auth/react";
const Header = () => {
  const session = useSession();
  return (
    <div className="flex justify-between sm:justify-between items-center mx-3 sm:mx-20">
      <Link href="/">
        <Image
          src={Logo}
          alt="DevDistrict Logo"
          width={200}
          className="w-[150px] sm:w-[200px]"
        />
      </Link>

      {/*if no session render login button else render hamburger menu on mobile or the dekstop version */}
      {session.data?.user ? (
        <HeaderUserSection />
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

export default Header;
