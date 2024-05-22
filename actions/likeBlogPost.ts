"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const likeBlogPost = async (prevState: any, formData: FormData) => {
  try {
    const userId = formData.get("userId")?.toString();
    const blogPostId = formData.get("blogPostId")?.toString();
    const like = formData.get("like")?.toString();
    console.log(like);
    if (userId !== "") {
      //if the like value it's 1 then delete the like data
      if (like === "1") {
        await prisma.like.delete({
          where: {
            userId_blogPostId: {
              userId: userId as string,
              blogPostId: blogPostId as string,
            },
          },
        });
        //update the likes counter of the blogpost
        await prisma.blogPost.update({
          where: {
            id: blogPostId,
          },
          data: {
            likesCounter: {
              decrement: 1,
            },
          },
        });
        revalidatePath("/", "page");
        revalidatePath("/account/[name]", "page");
        revalidatePath("/admin-panel", "page");
        return {
          message: "Blog post unliked",
          status: 200,
        };
      } else {
        //else create new like that
        await prisma.like.create({
          data: {
            userId: userId as string,
            blogPostId: blogPostId as string,
          },
        });
        //update the likes counter of the blogpost
        await prisma.blogPost.update({
          where: {
            id: blogPostId,
          },
          data: {
            likesCounter: {
              increment: 1,
            },
          },
        });

        revalidatePath("/", "page");
        revalidatePath("/account/[name]", "page");
        revalidatePath("/admin-panel", "page");
        return {
          message: "Blog post liked",
          status: 200,
        };
      }
    }
    return {
      message: "You must be authenticated in order to like a post",
      status: 401,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Oops... Something went wrong!",
      status: 500,
    };
  }
};
