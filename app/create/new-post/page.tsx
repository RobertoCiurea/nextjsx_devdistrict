import React from "react";
import { getSession } from "@/app/utils/getSession";
import Forbidden from "@/components/Forbidden";
import BlogPostForm from "@/components/BlogPostForm";
import { Metadata } from "next";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const metadata: Metadata = {
  title: "Create new blog post",
  description: "Let's create a new blog post and share it with the comunity! ",
  openGraph: {
    title: "Create new blog post",
    description:
      "Let's create a new blog post and share it with the comunity! ",
    url: `${baseUrl}/create/new-post`,
    images: [
      {
        url: `${baseUrl}/public/icons/favicon.ico`,
        width: 800,
        height: 600,
        alt: "DevDistrict Icon",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create new blog post",
    description:
      "Let's create a new blog post and share it with the comunity! ",
    images: [`${baseUrl}/public/icons/favicon.ico`],
  },
  alternates: {
    canonical: `${baseUrl}/create/new-post`,
  },
};

const page = async () => {
  const session = await getSession();
  if (session?.user) {
    return (
      <div className="flex flex-col flex-shrink mx-5 sm:mx-10 text-white font-Montserrat items-center my-[33px] ">
        <h1 className="text-xl md:text-2xl font-bold">Create new blog post</h1>
        <BlogPostForm
          userId={session.user.id as string}
          username={session.user.name as string}
        />
      </div>
    );
  } else {
    return (
      <Forbidden placeholder="You must be logged in to create a new blog post" />
    );
  }
};

export default page;
