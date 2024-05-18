"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const deleteBlogPost = async (formData: FormData) => {
  try {
    const blogPostId = formData.get("blogPostId")?.toString();
    await prisma.blogPost.delete({
      where: {
        id: blogPostId,
      },
    });
    revalidatePath("/admin-panel", "page");
  } catch (error) {
    console.log(error);
  }
};
