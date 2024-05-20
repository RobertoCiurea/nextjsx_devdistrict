"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const voteSolution = async (prevState: any, formData: FormData) => {
  try {
    const userId = formData.get("userId")?.toString();
    const solutionId = formData.get("solutionId")?.toString();
    const voteId = formData.get("voteId")?.toString();
    const voteType = formData.get("voteType")?.toString();
    if (userId === "")
      return {
        message: "You must be authenticated in order to vote",
        status: 401,
      };
    const isVoteExisting = await prisma.vote.findUnique({
      where: {
        id: voteId,
      },
    });
    //undo the vote (delete the vote) if there it's one
    if (isVoteExisting) {
      //delete the vote
      await prisma.vote.delete({
        where: {
          id: voteId,
        },
      });
      //adjust the votesCounter of the solution
      await prisma.solution.update({
        where: {
          id: solutionId,
        },
        data: {
          votesCounter: {
            decrement: isVoteExisting.value, //if there is a down vote the votesCounter will increase, if there is a up vote the votesCounter will decrease
          },
        },
      });
    } else {
      //create a vote
      const voteValue = voteType === "upVote" ? 1 : -1;
      await prisma.vote.create({
        data: {
          userId: userId as string,
          solutionId: solutionId as string,
          value: voteValue,
        },
      });
      //update the votesCounter
      await prisma.solution.update({
        where: {
          id: solutionId,
        },
        data: {
          votesCounter: {
            increment: voteValue,
          },
        },
      });
    }
    revalidatePath("/question/[id]", "page");
    revalidatePath("/admin-panel", "page");
  } catch (error) {
    console.log(error);
    return {
      message: "Oops... Something went wrong!",
      status: 500,
    };
  }
};
