"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const deleteReport = async (formData: FormData) => {
  try {
    const reportId = await formData.get("reportId")?.toString();
    await prisma.report.delete({
      where: {
        id: reportId,
      },
    });
    revalidatePath("/admin-page", "page");
    revalidatePath("/account/name", "page");
  } catch (error) {
    console.log(error);
  }
};
