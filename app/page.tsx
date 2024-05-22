import { getSession } from "@/app/utils/getSession";
import Banner from "@/components/Banner";
import BlogArticlesGridTemplate from "@/components/BlogArticlesGridTemplate";
import BugArticlesGridTemplate from "@/components/BugArticlesGridTemplate";
import ReportProblem from "@/components/ReportProblem";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function Home() {
  const session = await getSession();
  // console.log(session);
  // console.log(session?.user?.image);
  const userId = await session?.user.id;

  const blogs = await prisma.blogPost.findMany({
    include: {
      tags: true,
    },
  });
  const questions = await prisma.question.findMany();

  // console.log(blogs);

  return (
    <div className="relative">
      <Banner />
      <div className="w-full flex justify-end absolute  top-[6%] sm:top-[16%] px-2 sm:px-10">
        <ReportProblem userId={userId} />
      </div>

      <BlogArticlesGridTemplate
        arr={blogs}
        label={" Popular posts"}
        userId={session?.user.id as string}
      />
      <BugArticlesGridTemplate
        questions={questions}
        label="Bugs and questions"
      />
    </div>
  );
}
