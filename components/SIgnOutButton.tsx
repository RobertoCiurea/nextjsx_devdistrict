"use client";
import { signOut } from "next-auth/react";
import React from "react";
type StylesType = {
  styles: string;
};
const SignOutButton = ({ styles }: StylesType) => {
  return (
    <button
      className={`font-Raleway text-lg text-center  text-primaryAccent rounded-full font-bold bg-white shadow-lg shadow-white/35 hover:bg-slate-200 hover:shadow-white/30 ${styles}`}
      onClick={() => signOut({ callbackUrl: "/auth/login" })}
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
