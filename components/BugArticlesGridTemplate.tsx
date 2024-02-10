"use client";
import React, { useState } from "react";
import BugCard from "./BugCard";
import Image from "next/image";
import DownArrow from "@/public/icons/down_arrow.svg";
const BlogArticlesGridTemplate = () => {
  const [limit, setLimit] = useState(4);

  const buttonShowStyles = limit === 4 ? "" : "rotate-180";

  const handleShowingBlogArticlesState = () => {
    if (limit === 4) setLimit(bugsArticles.length);
    else setLimit(4);
  };
  const bugsArticles = [
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      answersCnt: 2,
      viewsCnt: 198,
      userdId: "1a",
      loading: true,
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      answersCnt: 2,
      viewsCnt: 198,
      userdId: "1a",
      loading: false,
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      answersCnt: 2,
      viewsCnt: 198,
      userdId: "1a",
      loading: false,
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      answersCnt: 2,
      viewsCnt: 198,
      userdId: "1a",
      loading: false,
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      answersCnt: 2,
      viewsCnt: 198,
      userdId: "1a",
      loading: false,
    },
  ];
  return (
    <>
      <h1 className="text-2xl sm:text-3xl  font-semibold font-Raleway text-white ml-10 lg:ml-7 mb-10">
        Bugs and <br className="block md:hidden" />
        problems
      </h1>
      <div className="flex flex-col items-center">
        <section className="mx-4 gap-10   grid place-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {bugsArticles.slice(0, limit).map((article, index) => (
            <BugCard
              content={article.content}
              username={article.username}
              userid={article.userdId}
              answersCnt={article.answersCnt}
              viewsCnt={article.viewsCnt}
              loading={article.loading}
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
    </>
  );
};

export default BlogArticlesGridTemplate;
