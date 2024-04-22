"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const handleCommentReply = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const author = formData.get("author")?.toString();
    const content = formData.get("content")?.toString();
    const commentId = formData.get("commentId")?.toString();
    if (author === "") {
      return {
        message: "You must be logged in to reply to a comment",
        status: 401,
      };
    }
    if (content?.length! < 3) {
      return {
        message: "You must type at least 3 characters to post a reply",
        status: 400,
      };
    }
    const reply = await prisma.reply.create({
      data: {
        author: author as string,
        content: content as string,
        commentId: commentId as string,
      },
    });
    revalidatePath("blog-posts/[id]", "page");
    console.log(reply);
    return {
      message: "Reply added successfully",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Oops... Something went wrong!",
      status: 500,
    };
  }
};
