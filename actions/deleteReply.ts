"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { revalidatePath } from "next/cache";
export const deleteReply = async (formData: FormData) => {
  try {
    const replyId = formData.get("replyId")?.toString();
    await prisma.reply.delete({
      where: {
        id: replyId,
      },
    });
    revalidatePath("/admin-panel", "page");
    revalidatePath("/blog-posts/[id]", "page");
  } catch (error) {
    console.log(error);
  }
};
