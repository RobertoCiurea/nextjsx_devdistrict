import React from "react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import BlogPostComments from "@/components/BlogPostComments";
import { getSession } from "@/app/utils/getSession";
import AddBlogPostToFavorite from "@/components/AddBlogPostToFavorite";
import { Metadata, ResolvingMetadata } from "next";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;
  const post = await prisma.blogPost.findUnique({
    where: {
      id: id[0],
    },
  });
  return {
    metadataBase: new URL(`${baseUrl}/blogPost/${id}`),
    title: `${post?.username}'s blog post`,
    description: post?.title,
    openGraph: {
      title: `${post?.username}'s blog post`,
      description: post?.title,
      url: `${baseUrl}/blogPost/${id}`,
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
      title: `${post?.username}'s blog post`,
      description: post?.title,
      images: [`${baseUrl}/public/icons/favicon.ico`],
    },
    alternates: {
      canonical: `${baseUrl}/blogPost/${id}`,
    },
  };
}

const page = async ({ params }: { params: { id: string | any } }) => {
  const blogPostId = params.id[0];
  const session = await getSession();
  //useformstate hook

  const blogPost = await prisma.blogPost.findUnique({
    where: {
      id: blogPostId,
    },
    include: {
      tags: true,
      comments: {
        include: {
          replies: true,
        },
      },
    },
  });
  const userId = session?.user ? session.user.id : "";
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      favoriteBlogPosts: true,
    },
  });
  const checkForFavorite = () => {
    return user?.favoriteBlogPosts.some((post) => post.id === blogPostId);
  };

  //create the blog-post page
  return (
    <>
      <div className="flex flex-col mx-5 justify-center items-center text-white">
        {/*top section */}
        <div className="flex flex-col justify-around w-full">
          {/*main informations */}
          <div className="flex justify-around">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold font-Montserrat">
                {blogPost?.title}
              </h1>
              <p className="text-primaryGray ">
                Created at: {blogPost?.createdAt.toLocaleDateString()}
              </p>
            </div>
            <h1 className="text-lg flex gap-2">
              <span>By:</span>
              <a
                href={`/account/${blogPost?.username}`}
                className="underline hover:text-primaryAccent transition-colors"
              >
                {blogPost?.username}
              </a>
            </h1>
          </div>
          {/*tags */}
          {(blogPost?.tags.length as number) > 0 && (
            <div className="flex flex-col sm:flex-row  justify-center gap-5 items-center">
              <h1 className="text-primaryGray">Tags:</h1>
              {/*show each tag */}
              <div className="flex flex-col sm:flex-row  justify-evenly gap-3">
                {blogPost?.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="bg-primaryAccentHover text-white py-2 px-3 flex items-center rounded-full shadow-xl "
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <p className="sm:mx-40 my-20">{blogPost?.content}</p>
        <AddBlogPostToFavorite
          userId={userId}
          blogPostId={blogPostId}
          addedToFavorites={checkForFavorite() as boolean}
        />
        <BlogPostComments
          blogPostId={blogPost?.id}
          comments={blogPost?.comments}
        />
      </div>
    </>
  );
};

export default page;
