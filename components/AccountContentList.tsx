"use client";
import React, { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import BlogArticlesGridTemplate from "./BlogArticlesGridTemplate";
import ReportCard from "./ReportCard";

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

const AccountContentList = ({
  isMyAccount,
  username,
  blogPosts,
  favoriteBlogPosts,
}: {
  isMyAccount: boolean;
  username: string;
  blogPosts: BlogType[];
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
  //user content
  // const posts = [
  //   {
  //     title: "title",
  //     content:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
  //     username: "User3251",
  //     likesCnt: 2,
  //     commentsCnt: 1,
  //     userId: "1a",
  //     loading: false,
  //   },
  //   {
  //     title: "title",
  //     content:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
  //     username: "User3251",
  //     likesCnt: 2,
  //     commentsCnt: 1,
  //     userId: "1a",
  //     loading: false,
  //   },
  //   {
  //     title: "title",
  //     content:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
  //     username: "User3251",
  //     likesCnt: 2,
  //     commentsCnt: 1,
  //     userId: "1a",
  //     loading: false,
  //   },
  // ];
  const favorites = [
    {
      title: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userId: "1a",
      loading: false,
    },
    {
      title: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userId: "1a",
      loading: false,
    },
    {
      title: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userId: "1a",
      loading: false,
    },
    {
      title: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userId: "1a",
      loading: false,
    },
    {
      title: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userId: "1a",
      loading: false,
    },
    {
      title: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userId: "1a",
      loading: false,
    },
  ];
  const followers = [
    {
      userId: "1",
      userName: "User32561",
      image: "https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Lilly",
    },
    {
      userId: "2",
      userName: "User32561",
      image: "https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Lilly",
    },
    {
      userId: "3",
      userName: "User32561",
      image: "https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Lilly",
    },
    {
      userId: "4",
      userName: "User32561",
      image: "https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Lilly",
    },
    {
      userId: "5",
      userName: "User32561",
      image: "https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Lilly",
    },
    {
      userId: "6",
      userName: "User32561",
      image: "https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Lilly",
    },
    {
      userId: "7",
      userName: "User32561",
      image: "https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Lilly",
    },
    {
      userId: "8",
      userName: "User32561",
      image: "https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Lilly",
    },
    {
      userId: "9",
      userName: "User32561",
      image: "https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Lilly",
    },
    {
      userId: "10",
      userName: "User32561",
      image: "https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Lilly",
    },
    {
      userId: "11",
      userName: "User32561",
      image: "https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Lilly",
    },
  ];
  const reports = [
    {
      id: "1",
      userId: "1",
      title: "Report title",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
      condition: "Annoying",
      status: "PENDING",
      createdAt: "2024-03-03 17:48:02.551",
    },
    {
      id: "2",
      userId: "1",
      title: "Report title",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
      condition: "Annoying",
      status: "PENDING",
      createdAt: "2024-03-03 17:48:02.551",
    },
    {
      id: "3",
      userId: "1",
      title: "Report title",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
      condition: "Annoying",
      status: "PENDING",
      createdAt: "2024-03-03 17:48:02.551",
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
  favorites,
  followers,
  reports,
  output,
  isMyAccount,
  username,
}: any) => {
  switch (output) {
    case 0:
      return (
        <BlogArticlesGridTemplate
          arr={posts}
          label={isMyAccount ? "My posts" : `${username}'s posts`}
        />
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

const Followers = ({ followers }: any) => {
  type FollowerType = {
    userId: string;
    userName: string;
    image: string;
  };
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10  text-white place-items-center mx-10 my-20">
      {followers.map((follower: FollowerType) => (
        <div key={follower.userId} className="flex items-center">
          <Image
            src={follower.image}
            alt={follower.image}
            width={50}
            height={50}
            className="rounded-full "
          />
          <div className="flex flex-col mx-2">
            <h1>{follower.userName}</h1>
            <Link
              className="text-sm und text-primaryAccent transition-colors hover:text-primaryAccentHover"
              href={`/account/${follower.userId}`}
            >
              View Profile
            </Link>
          </div>
        </div>
      ))}
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
      {reports.map((report: ReportType) => (
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
      ))}
    </section>
  );
};
