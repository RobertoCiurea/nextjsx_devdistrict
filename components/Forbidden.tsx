import React from "react";
import Link from "next/link";
const Forbidden = ({ placeholder }: any) => {
  const srcArray = [
    "https://giphy.com/embed/VphQlWcd8xUThBQ9R2/video",
    "https://giphy.com/embed/tSPd9mtiuicMwuovjN",
    "https://giphy.com/embed/cdqwNuGaUg3Qs",
    "https://giphy.com/embed/yqKLjY7itedDeO0Dyn/video",
    "https://giphy.com/embed/szEWryz4gtspG",
  ];
  const src = Math.floor(Math.random() * srcArray.length);
  return (
    <div className="flex flex-col items-center my-10">
      <iframe
        src={srcArray[src]}
        width="480"
        height="270"
        className="giphy-embed w-[300px] sm:w-[800px] px-5"
      ></iframe>

      <Link
        href="/auth/login"
        className=" text-center text-md mt-10  sm: text-lg md:tex-xl lg:text-2xl text-primaryAccent font-Montserrat hover:text-primaryAccentHover"
      >
        {placeholder}
      </Link>
    </div>
  );
};
export default Forbidden;
