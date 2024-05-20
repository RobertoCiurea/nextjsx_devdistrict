import React from "react";
import EditorComponent from "@/components/EditorComponent";
import ReplyIcon from "@/public/icons/reply_icon.svg";
import Image from "next/image";
import Link from "next/link";
import VoteForm from "./VoteForm";

const Solution = async ({
  votes,
  id,
  language,
  code,
  content,
  createdAt,
  author,
  userId,
}: {
  votes: number;
  id: string;
  language: string;
  code: string;
  content: string;
  createdAt: Date;
  author: string;
  userId: string;
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
            <span className="flex items-center cursor-pointer gap-1 justify-end">
              <Image src={ReplyIcon} alt="Reply" width={25} />
              <h1 className="underline">Reply</h1>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Solution;
