import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col items-center my-20 gap-20 bg-primaryAccentHover mx-3 lg:mx-[350px] px-5 md:px-10 py-20 text-white rounded-xl ">
      <div>
        <h1 className=" font-bold text-2xl text-white ">
          Oops! something went wrong
        </h1>
        <p className="text-sm md:text-base">
          The log in process failed! Don't worry, verify your credentials and
          try again!
        </p>
      </div>
      <Link href="/auth/login">
        <button className="bg-white rounded-full px-4 text-center py-2 text-primaryAccent font-semibold text-lg shadow-xl hover:bg-slate-200 hover:text-primaryAccentHover transition-colors md:text-xl ">
          Log in{" "}
        </button>
      </Link>
    </div>
  );
};

export default page;
