"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import UpvoteIcon from "@/public/icons/upvote_unfocused.svg";
import UpvoteIconGray from "@/public/icons/upvote_gray.svg";
import CommentIconGray from "@/public/icons/comments_gray.svg";
import UpvoteIconFocused from "@/public/icons/upvote_focused.svg";
import { useFormState } from "react-dom";
import { likeBlogPost } from "@/actions/likeBlogPost";
import Link from "next/link";
//react toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  message: "",
  status: 0,
};
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
  userId: String;
  likesCnt: number;
  commentsCnt: number;
  tags: BlogTag[];
};

const BlogCard = ({
  id,
  title,
  content,
  username,
  userId,
  likesCnt,
  commentsCnt,
  tags,
}: BlogCardProps) => {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [state, formAction] = useFormState(likeBlogPost, initialState);
  console.log(state);
  const checkLikedPost = async () => {
    try {
      const blogPostId = id;
      const data = { userId, blogPostId };
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      if (response.status === 200) setClicked(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    checkLikedPost();
    switch (state.status) {
      case 200:
        toast.success(state.message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        break;
      case 401:
        toast.warn(state.message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        break;
      case 500:
        toast.error(state.message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
    }
  }, [state.message, state.status]);

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
  console.log(userId);
  if (!loading)
    return (
      //outer card

      <div className="flex flex-col justify-between w-full min-h-[350px]  sm:w-[500px] md:w-[400px] border-[2px] border-primaryAccentHover rounded-xl mx-10 my-10 py-1 px-2">
        {/*Top section */}
        <div className="flex justify-between mx-10 mt-2 mb-3">
          <h1 className="text-xl font-Raleway font-semibold text-white">
            {title}
          </h1>
          <form action={formAction}>
            <input
              type="hidden"
              name="userId"
              defaultValue={userId as string}
            />
            <input type="hidden" name="blogPostId" defaultValue={id} />
            <input
              type="hidden"
              name="like"
              defaultValue={clicked ? "0" : "1"}
            />
            <button type="submit">
              <Image
                src={clicked ? UpvoteIconFocused : UpvoteIcon}
                alt="Upvote"
                width={40}
                className="cursor-pointer"
                onClick={handleUpvoteClick}
              />
            </button>
          </form>
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
          <Link href={`/blog-posts/${id}`}>
            <button className="bg-white text-primaryAccent font-Montserrat p-2 rounded-2xl font-bold hover:bg-gray-300 hover:text-primaryAccentHover transition-colors">
              Details
            </button>
          </Link>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    );
  else
    return (
      //skeleton blog card
      <div className="flex flex-col my-5 w-full sm:w-[500px] md:w-[400px] border-[2px] border-primaryAccentHover rounded-xl mx-10 py-1 px-2">
        {/*Top section */}
        <div className="flex justify-between  mt-2 mb-3">
          <span className="w-[150px] sm:w-[200px] h-7 bg-gradient-to-r from-gray-400 to-primaryGray rounded-xl animate-pulse"></span>
          <span className="w-[45px] h-7 bg-gradient-to-r from-gray-400 to-primaryGray rounded-xl animate-pulse"></span>
        </div>
        {/*Text content */}
        <div className="flex flex-col gap-5">
          <span className="w-full h-7 bg-gradient-to-r from-gray-400 to-primaryGray rounded-xl animate-pulse"></span>
          <span className="w-xl h-7 bg-gradient-to-r from-gray-400 to-primaryGray rounded-xl animate-pulse"></span>
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
