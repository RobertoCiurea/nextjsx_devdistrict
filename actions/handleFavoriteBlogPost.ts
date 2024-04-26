"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();
export const handleFavoriteBlogPost = async (formData: FormData) => {
  try {
    const userId = formData.get("userId")?.toString();
    const blogPostId = formData.get("blogPostId")?.toString();
    if (userId === "") {
      return {
        message: "You must be authenticated to add a blog post to favorites",
        status: 401,
      };
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { favoriteBlogPosts: true },
    });
    if (!user) {
      return {
        message: "User not found",
        status: 404,
      };
    }

    const isFavorite = user.favoriteBlogPosts.some(
      (post) => post.id === blogPostId
    );
    if (isFavorite) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          favoriteBlogPosts: {
            disconnect: { id: blogPostId },
          },
        },
      });
      console.log("Removed from favorites");
      revalidatePath("/blog-posts/[id]", "page");

      return {
        message: "Blog post removed from favorites successfully",
        status: 200,
      };
    } else {
      await prisma.user.update({
        where: { id: userId },
        data: {
          favoriteBlogPosts: {
            connect: { id: blogPostId },
          },
        },
      });
      console.log("Added to favorites");
      revalidatePath("/blog-posts/[id]", "page");

      return {
        message: "Blog post added to favorites successfully",
        status: 200,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Oops... Something went wrong!",
      status: 500,
    };
  }
};
