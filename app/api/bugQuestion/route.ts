import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, userId, code, language, author } =
      await body.data;
    if (title === "" || description === "") {
      return new Response("You must complete the required fields", {
        status: 400,
      });
    }
    const question = await prisma.question.create({
      data: {
        title,
        description,
        code,
        language,
        author,
        userId,
      },
    });
    if (question) {
      revalidatePath("/", "page");
      return new Response("Question created successfully", {
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response("Oops... Something went wrong!", {
      status: 500,
    });
  }
}
