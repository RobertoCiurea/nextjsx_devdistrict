import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, blogPostId } = body.data;
    if (userId !== "") {
      const likedBlogPost = await prisma.like.findUnique({
        where: {
          userId_blogPostId: {
            userId: userId,
            blogPostId: blogPostId,
          },
        },
      });
      if (likedBlogPost) return new Response("", { status: 200 });
      else return new Response("", { status: 201 });
    }
  } catch (error) {
    console.log(error);
  }
}
