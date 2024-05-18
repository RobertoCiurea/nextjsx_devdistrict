"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const deleteUser = async (formData: FormData) => {
  try {
    const userId = formData.get("userId")?.toString();

    const followingUsers = await prisma.follow.findMany({
      where: {
        followerId: userId,
      },
    });
    //update follower counter for each user followed
    const removeFollower = async (followingId: string) => {
      await prisma.user.update({
        where: {
          id: followingId,
        },
        data: {
          followersCounter: {
            decrement: 1,
          },
        },
      });
    };
    //map through each follow relation between users
    followingUsers.map((follow: any) => {
      const followingId = follow.followingId;
      removeFollower(followingId);
    });
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    revalidatePath("/admin-panel", "page");
  } catch (error) {
    console.log(error);
  }
};
