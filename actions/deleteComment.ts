"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const deleteComment = async (formData: FormData) => {
  const commentId = formData.get("commentId")?.toString();
  const blogPostId = formData.get("blogPostId")?.toString();
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
  await prisma.reply.deleteMany({
    where: {
      commentId: commentId,
    },
  });
  await prisma.blogPost.update({
    where: { id: blogPostId },
    data: {
      commentsCounter: {
        decrement: 1,
      },
    },
  });
  revalidatePath("blog-posts/[id]", "page");
};
