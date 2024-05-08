"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const unfollowUser = async (prevState: any, formData: FormData) => {
  try {
    const followId = formData.get("followId");
    const followingId = formData.get("followingId");

    const unfollow = await prisma.follow.delete({
      where: {
        id: followId as string,
      },
    });
    if (unfollow) {
      await prisma.user.update({
        where: {
          id: followingId as string,
        },
        data: {
          followersCounter: {
            decrement: 1,
          },
        },
      });
      revalidatePath("/account/[name]", "page");
      return {
        message: "User unfollowed successfully",
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
