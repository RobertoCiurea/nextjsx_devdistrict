"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();
let view: any;
let questionId: string | undefined;
export const viewQuestion = async (formData: FormData) => {
  try {
    questionId = formData.get("questionId")?.toString();
    view = await prisma.question.update({
      where: {
        id: questionId,
      },
      data: {
        viewsCounter: {
          increment: 1,
        },
      },
    });

    revalidatePath("/", "page");
    revalidatePath("/admin-panel", "page");
    revalidatePath("/account/[name]", "page");
  } catch (error) {
    console.log(error);
  } finally {
    if (view) {
      redirect(`/questions/${questionId}`);
    }
  }
};
