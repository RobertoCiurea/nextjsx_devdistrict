import React from "react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Link from "next/link";
import { getSession } from "@/app/utils/getSession";
import EditorComponent from "@/components/EditorComponent";
import SolutionForm from "@/components/SolutionForm";
import Solution from "@/components/Solution";

import { Metadata, ResolvingMetadata } from "next";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
/*
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id[0];
  const post = await prisma.question.findUnique({
    where: {
      id: id,
    },
  });
  return {
    metadataBase: new URL(`${baseUrl}/question/${id}`),
    title: `${post?.author}'s blog post`,
    description: post?.title,
    openGraph: {
      title: `${post?.author}'s blog post`,
      description: post?.title,
      url: `${baseUrl}/question/${id}`,
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
      title: `${post?.author}'s blog post`,
      description: post?.title,
      images: [`${baseUrl}/public/icons/favicon.ico`],
    },
    alternates: {
      canonical: `${baseUrl}/question/${id}`,
    },
  };
}
*/
const page = async ({ params }: { params: { id: string | any } }) => {
  const questionId = params.id[0];
  const session = await getSession();
  //query the question by its id from database and include also the solutions and the replies for solutions
  const question = await prisma.question.findUnique({
    where: {
      id: questionId,
    },
    include: {
      solutions: {
        include: {
          replies: true,
          votes: true,
        },
      },
    },
  });

  return (
    <section className="flex justify-center gap-10 items-center flex-col mx-2 text-white font-Montserrat">
      {/*Top section */}
      <div className="flex flex-col gap-3 sm:flex-row w-full justify-evenly">
        {/*Left section */}
        <div className="flex flex-col gap-1">
          <h1 className="tetx-xl sm:text-2xl">{question?.title}</h1>
          {/*Statistic data */}
          <div className="flex justify-around font-Raleway text-primaryGray">
            <span>Created at: {question?.createdAt.toLocaleDateString()}</span>
            <span className="text-sm">Views: {question?.viewsCounter}</span>
          </div>
        </div>
        <h1 className="sm:text-lg">
          By:{" "}
          <Link
            href={`/account/${question?.author}`}
            className="underline font-Raleway hover:text-primaryAccentHover transition-colors"
          >
            {question?.author}
          </Link>
        </h1>
      </div>
      {/*Content - middle section */}
      <div className="flex flex-col mx-5">
        <p className="font-Raleway">{question?.description}</p>
        {/*Editor */}
        {question?.code !== "" && (
          <EditorComponent
            language={question?.language as string}
            code={question?.code as string}
          />
        )}
      </div>
      {/*Answers */}
      <div className="flex flex-col">
        <h1 className="text-xl text-white">
          {question?.answersCounter} Answers
        </h1>
        {(question?.solutions?.length as number) > 0 &&
          question?.solutions?.map((solution, index) => (
            <Solution
              key={solution.id}
              votes={solution.votesCounter}
              id={solution.id}
              author={solution.author}
              language={solution.language}
              code={solution.code}
              content={solution.content}
              createdAt={solution.createdAt}
              userId={session?.user.id as string}
              replies={solution.replies}
            />
          ))}
      </div>
      {/*Soltuion area */}
      {session?.user && (
        <SolutionForm
          questionId={question?.id as string}
          userId={session?.user.id as string}
          author={session?.user.name as string}
          language={question?.language as string}
        />
      )}
    </section>
  );
};

export default page;
