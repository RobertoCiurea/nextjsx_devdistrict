"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const handleReportProblemAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const condition = formData.get("level");
    const userid = formData.get("userid");
    if (title === "" || description === "" || condition === "") {
      console.log("Empty fields");
      return { status: 404, message: "You must complete all the fields" };
    } else {
      const reportProblem = await prisma.report.create({
        data: {
          title: title as string,
          description: description as string,
          condition: condition as string,
          userId: userid as string,
        },
      });
      if (reportProblem) {
        return {
          status: 200,
          message: "Thank you for your feedback!",
        };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Oops... Something gone wrong!",
    };
  }
};
