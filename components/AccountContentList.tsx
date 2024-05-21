"use client";
import React, { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import BlogArticlesGridTemplate from "./BlogArticlesGridTemplate";
import BugArticlesGridTemplate from "./BugArticlesGridTemplate";
import ReportCard from "./ReportCard";
import Solution from "./Solution";

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
  loading?: boolean;
};

type QuestionType = {
  id: string;
  title: string;
  language: string;
  createdAt: Date;
  author: string;
  description: string;
  answersCounter: number;
  viewsCounter: number;
};

type ReportType = {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: Date | string | any;
  status: string;
  condition: string;
};
type UserType = {
  id: string;
  name: string | null;
  image: string | null;
};
const AccountContentList = ({
  isMyAccount,
  username,
  blogPosts,
  questions,
  reports,
  followers,

  favoriteBlogPosts,
  userId,
}: {
  isMyAccount: boolean;
  username: string;
  userId: string;
  blogPosts: BlogType[];
  questions: QuestionType[];
  reports: ReportType[];
  followers: UserType[];
  favoriteBlogPosts: BlogType[];
}) => {
  const [output, setOutput] = useState(0);
  const labels = [
    {
      id: 0,
      label: "Posts",
    },
    {
      id: 1,
      label: "Favorites",
    },
    {
      id: 2,
      label: "Followers",
    },
    {
      id: 3,
      label: "Reports",
    },
  ];
  return (
    <section className="flex flex-col">
      <Tab.Group>
        <Tab.List
          className={
            "flex justify-evenly text-sm md:text-xl text-white font-Montserrat"
          }
        >
          {labels.map((obj, index) => (
            <Tab as={Fragment} key={index}>
              {({ selected }) => (
                <div className="relative group rounded-2xl">
                  <button
                    className={
                      selected
                        ? "text-primaryAccent bg-white px-2 py-1 rounded-2xl "
                        : "text-white bg-transparent px-2 py-1 rounded-2xl"
                    }
                    onClick={() => setOutput(obj.id)}
                  >
                    {!isMyAccount ? index % 2 === 0 && obj.label : obj.label}
                  </button>
                  <span
                    className={
                      selected
                        ? "none"
                        : "absolute left-0 bg-primaryAccentHover top-7 h-1 w-0 group-hover:w-full transition-all"
                    }
                  ></span>
                </div>
              )}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
      {/*Post, favorites, followers or reports grid template */}
      <div className="flex justify-center flex-col">
        <ShowPosts
          posts={blogPosts}
          questions={questions}
          favorites={favoriteBlogPosts}
          followers={followers}
          reports={reports}
          output={output}
          isMyAccount={isMyAccount}
          username={username}
        />
      </div>
    </section>
  );
};

export default AccountContentList;

const ShowPosts = ({
  posts,
  questions,
  favorites,
  followers,
  reports,
  output,
  isMyAccount,
  username,
}: {
  posts: BlogType[];
  questions: QuestionType[];
  favorites: BlogType[];
  followers: UserType[];
  reports: ReportType[];
  output: number;
  isMyAccount: boolean;
  username: string;
}) => {
  console.log(questions);
  switch (output) {
    case 0:
      return (
        <>
          <BlogArticlesGridTemplate
            arr={posts}
            label={isMyAccount ? "My blog posts" : `${username}'s blog posts`}
          />
          <BugArticlesGridTemplate
            questions={questions}
            label={isMyAccount ? "My questions" : `${username}'s questions`}
          />
        </>
      );
    case 1:
      return (
        <BlogArticlesGridTemplate arr={favorites} label="My favorite posts" />
      );
    case 2:
      return <Followers followers={followers} />;
    case 3:
      return <Reports reports={reports} />;
  }
};

const Followers = ({ followers }: { followers: UserType[] }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10  text-white place-items-center mx-10 my-20">
      {followers.length > 0 ? (
        followers.map((follower: UserType) => (
          <div key={follower.id} className="flex items-center">
            <Image
              src={follower.image as string}
              alt={follower.image as string}
              width={50}
              height={50}
              className="rounded-full "
            />
            <div className="flex flex-col mx-2">
              <h1>{follower.name}</h1>
              <Link
                className="text-sm und text-primaryAccent transition-colors hover:text-primaryAccentHover"
                href={`/account/${follower.name}`}
              >
                View Profile
              </Link>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-xl text-primaryGray font-Montserrat">
          No followers yet
        </h1>
      )}
    </section>
  );
};

const Reports = ({ reports }: any) => {
  type ReportType = {
    id: string;
    userId: string;
    title: string;
    description: string;
    condition: string;
    status: string;
    createdAt: Date | string;
  };
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 m-10 gap-10 text-white">
      {reports.length > 0 ? (
        reports.map((report: ReportType) => (
          <ReportCard
            key={report.id}
            id={report.id}
            userId={report.userId}
            title={report.title}
            description={report.description}
            condition={report.condition}
            status={report.status}
            createdAt={report.createdAt}
          />
        ))
      ) : (
        <h1 className="text-xl text-primaryGray font-Montserrat">
          No reports yet
        </h1>
      )}
    </section>
  );
};
