"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
const Forbidden = ({ placeholder }: { placeholder?: string }) => {
  const srcArray = [
    "https://giphy.com/embed/VphQlWcd8xUThBQ9R2/video",
    "https://giphy.com/embed/tSPd9mtiuicMwuovjN",
    "https://giphy.com/embed/cdqwNuGaUg3Qs",
    "https://giphy.com/embed/yqKLjY7itedDeO0Dyn/video",
    "https://giphy.com/embed/szEWryz4gtspG",
  ];
  const src = Math.floor(Math.random() * srcArray.length);
  const session = useSession();
  return (
    <div className="flex flex-col gap-2 items-center my-10">
      <h1 className="text-xl sm:text-2xl text-white font-bold">
        {placeholder ? placeholder : "You don't have access to this page"}
      </h1>

      <iframe
        src={srcArray[src]}
        width="480"
        height="270"
        className="giphy-embed w-[300px] sm:w-[800px] px-5"
      ></iframe>
      {session.data?.user === null && (
        <Link
          href={"/auth/login"}
          className="text-primaryAccent underline sm:text-lg hover:text-primaryAccentHover transition-colors"
        >
          Log in
        </Link>
      )}
    </div>
  );
};
export default Forbidden;
