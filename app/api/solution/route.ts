import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { content, code, language, author, userId, questionId } = body.data;
    if (content === "")
      return new Response("You must complete the required fields", {
        status: 400,
      });
    if (author === "" || userId === "")
      return new Response(
        "You must be authenticated in order to post a solution",
        {
          status: 403,
        }
      );
    const solution = await prisma.solution.create({
      data: {
        content,
        code,
        language,
        author,
        userId,
        questionId,
      },
    });
    await prisma.question.update({
      where: {
        id: questionId,
      },
      data: {
        answersCounter: {
          increment: 1,
        },
      },
    });
    if (solution) {
      revalidatePath("/question/[id]");
      return new Response("Solution added successfully", {
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response("Oops... Something went wrong!", {
      status: 500,
    });
  }
};
