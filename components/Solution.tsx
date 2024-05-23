import React from "react";
import EditorComponent from "@/components/EditorComponent";
import Link from "next/link";
import VoteForm from "./VoteForm";
import SolutionReply from "./SolutionReply";
type ReplyType = {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
  solutionId: string;
};
const Solution = async ({
  votes,
  id,
  language,
  code,
  content,
  createdAt,
  author,
  userId,
  replies,
}: {
  votes: number;
  id: string;
  language: string;
  code: string;
  content: string;
  createdAt: Date;
  author: string;
  userId: string;
  replies: ReplyType[];
}) => {
  const solutionVoted = await prisma?.vote.findFirst({
    where: {
      userId: userId,
      solutionId: id,
    },
  });
  return (
    <>
      <div className="flex justify-center mt-10 gap-10">
        {/*Left section */}
        <VoteForm
          userId={userId}
          solutionId={id}
          voteId={solutionVoted?.id as string}
          votes={votes}
          voteValue={solutionVoted?.value as number}
        />
        {/*Right Section */}
        <div className="flex flex-col gap-5 min-w-[400px] sm:w-[800px]">
          {/*Content */}
          <div>
            <p className="font-Raleway">{content}</p>
            <EditorComponent language={language} code={code} />
          </div>
          {/*Bottom Section */}
          <div className="flex flex-col gap-3 font-Raleway text-primaryGray">
            <div className="flex justify-between">
              <span>Created at: {createdAt.toLocaleDateString()}</span>
              <span className="text-sm">
                By:{" "}
                <Link href={`/account/${author}`} className="underline">
                  {author}
                </Link>
              </span>
            </div>
            {/* <SolutionReply solutionId={id} replies={replies} author={author} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Solution;
