"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();
export const deleteQuestion = async (formData: FormData) => {
  try {
    const questionId = formData.get("questionId")?.toString();
    await prisma.question.delete({
      where: {
        id: questionId,
      },
    });
    revalidatePath("/", "page");
    revalidatePath("/admin-panel", "page");
  } catch (error) {
    console.log(error);
  }
};
