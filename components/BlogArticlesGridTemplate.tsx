"use client";
import React, { useState } from "react";
import BlogCard from "./BlogCard";
import Image from "next/image";
import DownArrow from "@/public/icons/down_arrow.svg";
const BlogArticlesGridTemplate = () => {
  const [limit, setLimit] = useState(4);

  const buttonShowStyles = limit === 4 ? "" : "rotate-180";

  const handleShowingBlogArticlesState = () => {
    if (limit === 4) setLimit(blogs.length);
    else setLimit(4);
  };
  const blogs = [
    {
      tittle: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userdId: "1a",
      loading: true,
    },
    {
      tittle: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userdId: "1a",
      loading: false,
    },
    {
      tittle: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userdId: "1a",
      loading: false,
    },
    {
      tittle: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userdId: "1a",
      loading: false,
    },
    {
      tittle: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userdId: "1a",
      loading: false,
    },
    {
      tittle: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userdId: "1a",
      loading: false,
    },
    {
      tittle: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userdId: "1a",
      loading: false,
    },
    {
      tittle: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userdId: "1a",
      loading: false,
    },
    {
      tittle: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userdId: "1a",
      loading: false,
    },
  ];
  return (
    <div className="flex flex-col items-center">
      <section className="mx-4 gap-10   grid place-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {blogs.slice(0, limit).map((blog, index) => (
          <BlogCard
            title={blog.tittle}
            content={blog.content}
            username={blog.username}
            userid={blog.userdId}
            likesCnt={blog.likesCnt}
            commentsCnt={blog.commentsCnt}
            loading={blog.loading}
            key={index}
          />
        ))}
      </section>
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
    </div>
  );
};

export default BlogArticlesGridTemplate;
