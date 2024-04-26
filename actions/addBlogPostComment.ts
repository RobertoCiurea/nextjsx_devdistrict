"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const addBlogPostComment = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const author = formData.get("author");
    const content = formData.get("comment");
    const blogPostId = formData.get("blogPostId");
    if (!author) {
      return {
        message: "You must be authenticated to add a comment",
        status: 401,
      };
    }
    if (!content) {
      return {
        message: "You must write something in order to add a comment",
        status: 400,
      };
    }
    //assure that content of comment is a string
    const contentString = content as string;
    if (contentString.length < 3) {
      return {
        message: "You need at least 3 characters in order to add a comment",
        status: 400,
      };
    }
    const comment = await prisma.comment.create({
      data: {
        author: author as string,
        content: content as string,
        createdAt: new Date(),
        blogPostId: blogPostId as string,
      },
    });
    const updatedPost = await prisma.blogPost.update({
      where: { id: blogPostId as string },
      data: {
        commentsCounter: {
          increment: 1,
        },
      },
    });
    revalidatePath("blog-posts/[id]");
    if (comment) {
      return {
        message: "Comment added successfully",
        status: 200,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Something went wrong",
      status: 500,
    };
  }
};
