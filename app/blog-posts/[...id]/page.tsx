import React from "react";
import Button from "@/components/Button";
import FavoriteIcon from "@/public/icons/favorite_icon.svg";
import FavoriteIconFocused from "@/public/icons/favorite_icon_focus.svg";
import BlogPostCommentForm from "@/components/BlogPostComments";
import BlogPostComments from "@/components/BlogPostComments";
const page = async ({ params }: { params: { id: string | any } }) => {
  const blogPostId = params.id[0];

  const blogPost = await prisma?.blogPost.findUnique({
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
  const addedToFavorites = false;
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
        <Button
          image={addedToFavorites ? FavoriteIconFocused : FavoriteIcon}
          title={
            addedToFavorites
              ? "Post saved to favorites"
              : "Save post to favorites"
          }
          buttonStyles="text-white font-Raleway"
          styles={`${
            addedToFavorites ? "bg-primaryAccentHover" : "bg-primaryAccent"
          }  px-2 py-1 rounded-xl transition-colors hover:bg-primaryAccentHover shadow-xl`}
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
