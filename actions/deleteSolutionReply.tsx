"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const deleteSolutionReply = async (formData: FormData) => {
  try {
    const replyId = formData.get("replyId")?.toString();
    await prisma.solutionReply.delete({
      where: {
        id: replyId as string,
      },
    });
    revalidatePath("/question/[id]", "page");
    revalidatePath("/admin-panel", "page");
  } catch (error) {
    console.log(error);
  }
};
