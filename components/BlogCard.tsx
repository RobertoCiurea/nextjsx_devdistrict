"use client";
import React, { useState } from "react";
import Image from "next/image";
import UpvoteIcon from "@/public/icons/upvote_unfocused.svg";
import UpvoteIconGray from "@/public/icons/upvote_gray.svg";
import CommentIconGray from "@/public/icons/comments_gray.svg";
import UpvoteIconFocused from "@/public/icons/upvote_focused.svg";
import Link from "next/link";

type BlogTag = {
  id: string;
  name: string;
  blogPostId: string;
};

type BlogCardProps = {
  id: string;
  title: string;
  content: string;
  username: String;
  userid: String;
  likesCnt: number;
  commentsCnt: number;
  tags: BlogTag[];
  loading: Boolean;
};

const BlogCard = ({
  id,
  title,
  content,
  username,
  userid,
  likesCnt,
  commentsCnt,
  tags,
  loading,
}: BlogCardProps) => {
  const [clicked, setClicked] = useState(false);

  const handleUpvoteClick = () => {
    setClicked((prevClicked) => !prevClicked);
  };

  function limitText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + "...";
    }
  }
  const limitedContent = limitText(content, 150);
  if (!loading)
    return (
      //outer card
      <div className="flex flex-col justify-between w-full min-h-[350px]  sm:w-[500px] md:w-[400px] border-[2px] border-primaryAccentHover rounded-xl mx-10 my-10 py-1 px-2">
        {/*Top section */}
        <div className="flex justify-between mx-10 mt-2 mb-3">
          <h1 className="text-xl font-Raleway font-semibold text-white">
            {title}
          </h1>
          <Image
            src={clicked ? UpvoteIconFocused : UpvoteIcon}
            alt="Upvote"
            width={30}
            className="cursor-pointer"
            onClick={handleUpvoteClick}
          />
        </div>
        {/*Text content */}
        <div>
          <p className="text-white mx-10">{limitedContent}</p>
        </div>
        {/*Tags section */}

        <div className="flex flex-wrap flex-shrink justify-center  mx-10 sm:mx-2 pt-4 gap-5 sm:gap-2 flex-col  sm:flex-row ">
          {tags.length > 0 &&
            tags.map((tag, index) => (
              <span
                key={index}
                className="py-1 px-3 font-Raleway bg-primaryAccentHover text-sm  text-white  rounded-lg text-center"
              >
                {tag.name}
              </span>
            ))}
        </div>
        {/*Bottom section */}
        <div className="flex justify-between bg-primaryAccentHover mt-10 rounded-b-2xl rounded-t-lg px-3 py-1 mb-1 ">
          {/*Left part with username, likes and comments */}
          <div className="flex flex-col">
            {/*Top sction with username */}
            <p className="text-white text-sm font-Montserrat">
              By <span className="font-bold">{username}</span>
            </p>
            {/*Bottom Section with likes and comments */}
            <div className="flex justify-around gap-3">
              {/*Likes */}
              <div className="flex flex-center gap-1 cursor-pointer">
                <Image src={UpvoteIconGray} alt="Upvotes" />
                <h1 className="text-base font-semibold font-Montserrat text-primaryGray">
                  {likesCnt}
                </h1>
              </div>
              {/*Comments */}
              <div className="flex flex-center gap-1 cursor-pointer">
                <Image src={CommentIconGray} alt="Upvotes" width={20} />
                <h1 className="text-base font-semibold font-Montserrat text-primaryGray">
                  {commentsCnt}
                </h1>
              </div>
            </div>
          </div>
          <button className="bg-white text-primaryAccent font-Montserrat px-2 py-1 rounded-2xl font-bold hover:bg-gray-300 hover:text-primaryAccentHover transition-colors">
            <Link href={`/blog-posts/${id}`}>Details</Link>
          </button>
        </div>
      </div>
    );
  else
    return (
      //skeleton blog card
      <div className="flex flex-col w-full sm:w-[500px] md:w-[400px] border-[2px] border-primaryAccentHover rounded-xl mx-10 py-1 px-2">
        {/*Top section */}
        <div className="flex justify-between  mt-2 mb-3">
          <span className="w-[150px] sm:w-[200px] h-7 bg-gradient-to-r from-gray-400 to-primaryGray rounded-xl animate-pulse"></span>
          <span className="w-[45px] h-7 bg-gradient-to-r from-gray-400 to-primaryGray rounded-xl animate-pulse"></span>
        </div>
        {/*Text content */}
        <div className="flex flex-col gap-3">
          <span className="w-full h-7 bg-gradient-to-r from-gray-400 to-primaryGray rounded-xl animate-pulse"></span>
          <span className="w-xl h-7 bg-gradient-to-r from-gray-400 to-primaryGray rounded-xl animate-pulse"></span>
        </div>
        {/*Bottom section */}
        <div className="flex justify-between items-center bg-primaryAccentHover mt-10 rounded-b-2xl rounded-t-lg px-3 py-1 mb-1 ">
          {/*Left part with username, likes and comments */}
          <span className="w-[100px] h-5 bg-gradient-to-r from-gray-400 to-primaryGray rounded-xl animate-pulse"></span>
          <span className="w-[60px] h-7 bg-gradient-to-r from-gray-400 to-primaryGray rounded-xl animate-pulse"></span>
        </div>
      </div>
    );
};

export default BlogCard;
