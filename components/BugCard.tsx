"use client";
import React, { useEffect, useState } from "react";
import CodeIcon from "@/public/icons/code_icon.svg";
import ViewsIcon from "@/public/icons/views_icon.svg";
import Image from "next/image";
import Link from "next/link";
//increase views
import { viewQuestion } from "@/actions/viewQuestion";

type BugCardProps = {
  id: string;
  author: string;
  title: string;
  language: string;
  description: string;
  answersCounter: number;
  viewsCounter: number;
};
const BugCard = ({
  id,
  author,
  title,
  description,
  answersCounter,
  viewsCounter,
  language,
}: BugCardProps) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [loading]);

  function limitText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + "...";
    }
  }
  const limitedContent = limitText(description, 100);
  if (!loading)
    return (
      <div className="flex flex-col justify-between bg-white rounded-xl w-full h-[250px] md:w-[400px] px-5 py-2 m-10 sm:w-[500px] ">
        {/*Top section */}
        <div className="flex justify-between">
          {/*left section (icon + language) */}
          <div className="flex items-center gap-2">
            <Image src={CodeIcon} alt="Code Icon" width={30} />
            <h1 className="tetx-sm text-primaryAccent font-Montserrat font-bold">
              {language}
            </h1>
          </div>
          <div className="flex flex-col justify-between text-primaryAccent font-Montserrat">
            <h1 className="text-sm md:text-base">By</h1>
            <p className="text-sm md:text-base font-bold">{author}</p>
          </div>
        </div>
        {/*Middle section */}
        <div className="flex flex-col flex-shrink mt-5">
          <h1 className="sm:text-xl text-primaryAccent font-bold border-b px-2 text-center border-gray-300">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-primaryAccent p-2 font-bold font-Montserrat">
            {limitedContent}
          </p>
        </div>
        {/*Bottom section */}
        <div className="flex justify-between">
          {/*Left section */}
          <div className="flex flex-col md:flex-row justify-center md:gap-5 items-start md:items-center font-bold font-Raleway">
            {/*answers */}
            <div className="flex justify-center gap-2 text-primaryGray cursor-pointer">
              <p>Answers</p>
              <p>{answersCounter}</p>
            </div>
            {/*Views */}
            <div className="flex justify-center gap-2 text-primaryGray items-center cursor-pointer">
              <Image src={ViewsIcon} alt="Views icon" />
              <p>{viewsCounter}</p>
            </div>
          </div>
          {/*right button */}

          <form action={viewQuestion}>
            <input type="hidden" name="questionId" defaultValue={id} />
            <button
              type="submit"
              className="outline-none font-Raleway border-none bg-primaryAccent rounded-xl text-lg text-white px-3 py-1 text-center hover:bg-primaryAccentHover transition-colors hover:text-gray-300"
            >
              Details
            </button>
          </form>
        </div>
      </div>
    );
  else
    return (
      <div className="flex flex-col bg-white rounded-xl w-full px-5 py-2 m-10 sm:w-[500px] md:w-[400px]">
        {/*Top section */}
        <div className="flex justify-between">
          <Image src={CodeIcon} alt="Code Icon" width={30} />
          <div className="w-[125px] h-[30px] bg-gradient-to-r from-gray-400 to-primaryGray rounded-full animate-pulse"></div>
        </div>
        {/*Middle section */}
        <div className="flex flex-col gap-3 my-5">
          <div className="w-full h-[30px] bg-gradient-to-r from-gray-400 to-primaryGray rounded-full animate-pulse"></div>
          <div className="w-full h-[30px] bg-gradient-to-r from-gray-400 to-primaryGray rounded-full animate-pulse"></div>
          <div className="w-full h-[30px] bg-gradient-to-r from-gray-400 to-primaryGray rounded-full animate-pulse"></div>
        </div>
        {/*Bottom section */}
        <div className="flex justify-between">
          {/*Left section */}
          <div className="w-[125px] h-[30px] bg-gradient-to-r from-gray-400 to-primaryGray rounded-full animate-pulse"></div>

          {/*right button */}
          <div className="w-[75px] h-[30px] bg-gradient-to-r from-gray-400 to-primaryGray rounded-full animate-pulse"></div>
        </div>
      </div>
    );
};

export default BugCard;
