"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const modifyReportStatus = async (formData: FormData) => {
  try {
    const reportId = formData.get("reportId")?.toString();
    await prisma.report.update({
      where: {
        id: reportId,
      },
      data: {
        status: "RESOLVED",
      },
    });
    revalidatePath("/admin-panel", "page");
    revalidatePath("/account/[name]", "page");
  } catch (error) {
    console.log(error);
  }
};
