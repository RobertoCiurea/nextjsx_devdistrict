import React from "react";
import Link from "next/link";
const Forbidden = ({ placeholder }: any) => {
  return (
    <div className="flex flex-col items-center my-10">
      <iframe
        src="https://giphy.com/embed/tSPd9mtiuicMwuovjN"
        width="480"
        height="270"
        className="giphy-embed w-[300px] sm:w-full px-5"
      ></iframe>

      <a
        href="https://giphy.com/gifs/cartoonnetwork-cartoon-network-adventure-time-fionna-and-cake-tSPd9mtiuicMwuovjN"
        className="text-white underline text-sm hidden sm:block mb-5"
      >
        via GIPHY
      </a>

      <Link
        href="/"
        className=" text-center text-md  sm: text-lg md:tex-xl lg:text-2xl text-primaryAccent font-Montserrat hover:text-primaryAccentHover"
      >
        {placeholder}
      </Link>
    </div>
  );
};

export default Forbidden;
