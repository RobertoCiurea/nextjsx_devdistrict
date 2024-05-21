"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const addSolutionReply = async (prevState: any, formData: FormData) => {
  try {
    const content = formData.get("content")?.toString();
    const solutionId = formData.get("solutionId")?.toString();
    const author = formData.get("author")?.toString();
    if (author === "")
      return {
        message: "You must be authenticated in order to post a reply",
        status: 401,
      };
    if (content === "")
      return {
        message: "You must write something in order to post a reply",
        status: 400,
      };
    await prisma.solutionReply.create({
      data: {
        content: content as string,
        solutionId: solutionId as string,
        author: author as string,
      },
    });
    revalidatePath("/question/[id]", "page");
    return {
      message: "Replied added successfully",
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
