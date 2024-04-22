"use client";
import React, { useState } from "react";
import BlogCard from "./BlogCard";
import Image from "next/image";
import DownArrow from "@/public/icons/down_arrow.svg";
const BlogArticlesGridTemplate = ({ arr, label }: any) => {
  const [limit, setLimit] = useState(4);

  const buttonShowStyles = limit === 4 ? "" : "rotate-180";

  const handleShowingBlogArticlesState = () => {
    if (limit === 4) setLimit(arr.length);
    else setLimit(4);
  };

  type BlogTag = {
    id: string;
    name: string;
    blogPostId: string;
  };
  type BlogType = {
    id: string;
    title: string;
    content: string;
    username: string;
    likesCounter: number | any;
    commentsCounter: number | any;
    userId: string;
    tags: BlogTag[];
    loading: boolean;
  };

  return (
    <>
      <h1
        id="targetSection"
        className="text-2xl sm:text-3xl py-5 font-semibold font-Raleway text-white ml-10 lg:ml-7 mb-10"
      >
        {label}
      </h1>
      <div className="flex flex-col items-center gap-10">
        <section className="mx-4 gap-10  grid place-items-center items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {arr.length > 0 ? (
            arr
              .slice(0, limit)
              .map((blog: BlogType, index: number) => (
                <BlogCard
                  id={blog.id}
                  title={blog.title}
                  content={blog.content}
                  username={blog.username}
                  userid={blog.userId}
                  likesCnt={blog.likesCounter}
                  commentsCnt={blog.commentsCounter}
                  tags={blog.tags}
                  loading={blog.loading}
                  key={index}
                />
              ))
          ) : (
            <h1 className="text-primaryGray text-xl">No posts found</h1>
          )}
        </section>
        {arr.length > 4 && (
          <div
            className="flex justify-center items-center cursor-pointer my-5"
            onClick={handleShowingBlogArticlesState}
          >
            <p className="text-xl mx-3 text-white font-Montserrat font-semibold">
              Show {limit === 4 ? "more" : "less"}
            </p>
            <Image
              src={DownArrow}
              alt="Arrow"
              width={22}
              className={`${buttonShowStyles}`}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default BlogArticlesGridTemplate;
