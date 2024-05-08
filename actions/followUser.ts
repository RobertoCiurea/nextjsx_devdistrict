"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const followUser = async (prevState: any, formData: FormData) => {
  try {
    const followerId = formData.get("followerId");
    const followingId = formData.get("followingId");
    if (followerId === null || followerId === "") {
      return {
        message: "You must be logged in to follow someone",
        status: 401,
      };
    }
    const follow = await prisma.follow.create({
      data: {
        followerId: followerId as string,
        followingId: followingId as string,
      },
    });
    if (follow) {
      await prisma.user.update({
        where: {
          id: followingId as string,
        },
        data: {
          followersCounter: {
            increment: 1,
          },
        },
      });
      revalidatePath("/account/[name]", "page");
      return {
        message: "User followed successfully",
        status: 200,
      };
    } else {
      return {
        message: "Oops... Something went wrong!",
        status: 500,
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
