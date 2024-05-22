import { getSession } from "@/app/utils/getSession";
import Banner from "@/components/Banner";
import BlogArticlesGridTemplate from "@/components/BlogArticlesGridTemplate";
import BugArticlesGridTemplate from "@/components/BugArticlesGridTemplate";
import ReportProblem from "@/components/ReportProblem";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const metadata: Metadata = {
  title: "DevDistrict",
  description:
    "DevDistrict is an open-source devs comunity. Here you can post blog articles, resolve problems and bugs and share experiences and positive thoughts ",
  openGraph: {
    title: "DevDistrict",
    description:
      "DevDistrict is an open-source devs comunity. Here you can post blog articles, resolve problems and bugs and share experiences and positive thoughts ",
    url: baseUrl,
    images: [
      {
        url: `${baseUrl}/public/icons/favicon.ico`,
        width: 800,
        height: 600,
        alt: "DevDistrict Icon",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevDistrict",
    description:
      "DevDistrict is an open-source devs comunity. Here you can post blog articles, resolve problems and bugs and share experiences and positive thoughts ",
    images: [`${baseUrl}/public/icons/favicon.ico`],
  },
  alternates: {
    canonical: baseUrl,
  },
};

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
