import React from "react";
import CodeIcon from "@/public/icons/code_icon.svg";
import ViewsIcon from "@/public/icons/views_icon.svg";
import Image from "next/image";

type BugCardProps = {
  username: string;
  userid: string;
  content: string;
  answersCnt: number;
  viewsCnt: number;
  loading: boolean;
};
const BugCard = ({
  username,
  userid,
  content,
  answersCnt,
  viewsCnt,
  loading,
}: BugCardProps) => {
  if (!loading)
    return (
      <div className="flex flex-col bg-white rounded-xl w-full md:w-[400px] px-5 py-2 m-10 sm:w-[500px] md:w-[400px]">
        {/*Top section */}
        <div className="flex justify-between">
          <Image src={CodeIcon} alt="Code Icon" width={30} />
          <div className="flex flex-col text-primaryAccent font-Montserrat">
            <h1 className="text-sm md:text-base">By</h1>
            <p className="text-sm md:text-base font-bold">{username}</p>
          </div>
        </div>
        {/*Middle section */}
        <p className="text-primaryAccent p-2 font-bold font-Montserrat">
          {content}
        </p>
        {/*Bottom section */}
        <div className="flex justify-between">
          {/*Left section */}
          <div className="flex justify-center gap-5 items-center font-bold font-Raleway">
            {/*answers */}
            <div className="flex justify-center gap-2 text-primaryGray cursor-pointer">
              <p>Answers</p>
              <p>{answersCnt}</p>
            </div>
            {/*Views */}
            <div className="flex justify-center gap-2 text-primaryGray items-center cursor-pointer">
              <Image src={ViewsIcon} alt="Views icon" />
              <p>{viewsCnt}</p>
            </div>
          </div>
          {/*right button */}
          <button className="outline-none font-Raleway border-none bg-primaryAccent rounded-xl text-lg text-white px-3 py-1 text-center hover:bg-primaryAccentHover transition-colors hover:text-gray-300">
            Details
          </button>
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
