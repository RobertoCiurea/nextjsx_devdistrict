import React from "react";
import { getSession } from "@/app/utils/getSession";
import Forbidden from "@/components/Forbidden";
import BlogPostForm from "@/components/BlogPostForm";
const page = async () => {
  const session = await getSession();
  if (session?.user) {
    return (
      <div className="flex flex-col flex-shrink mx-5 sm:mx-10 text-white font-Montserrat items-center my-[33px] ">
        <h1 className="text-xl md:text-2xl font-bold">Create new blog post</h1>
        <BlogPostForm userId={session.user.id as string} />
      </div>
    );
  } else {
    return (
      <Forbidden placeholder="You must be logged in to create a new blog post" />
    );
  }
};

export default page;
