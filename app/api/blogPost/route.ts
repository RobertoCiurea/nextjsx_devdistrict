import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type TagType = {
  id: string;
  name: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, userId, tagsList } = await body.data;
    if (!title || !content) {
      return new Response("You must complete all the fields", {
        status: 400,
      });
    } else {
      const blogPost = await prisma.blogPost.create({
        data: {
          title: title as string,
          content: content as string,
          userId: userId,
          tags: {
            create: tagsList.map((tag: TagType) => ({
              name: tag.name,
            })),
          },
        },
      });
      console.log(blogPost);
      return new Response("Blog post created successfully", {
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}
