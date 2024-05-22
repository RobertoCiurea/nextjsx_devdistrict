import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getSession } from "@/app/utils/getSession";
import AccountHeader from "@/components/AccountHeader";
import AccountContentList from "@/components/AccountContentList";
import SelectPostType from "@/components/SelectPostType";

import { Metadata, ResolvingMetadata } from "next";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
type Props = {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const name = params.name;
  const user = await prisma.user.findUnique({
    where: {
      name: name[0],
    },
  });
  return {
    metadataBase: new URL(`${baseUrl}/user/${name}`),
    title: `${user?.name}'s account`,
    description: `Check ${user?.name}'s account`,
    openGraph: {
      title: `${user?.name}'s blog user`,
      description: `Check ${user?.name}'s account`,
      url: `${baseUrl}/user/${name}`,
      images: [
        {
          url: user?.image!,
          width: 800,
          height: 600,
          alt: "DevDistrict Icon",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${user?.name}'s blog user`,
      description: `Check ${user?.name}'s account`,
      images: [user?.image!],
    },
    alternates: {
      canonical: `${baseUrl}/user/${name}`,
    },
  };
}

const page = async ({ params }: { params: { name: string | any } }) => {
  const { name } = params;

  const userQuery = await prisma.user.findUnique({
    where: {
      name: name[0],
    },
    include: {
      favoriteBlogPosts: {
        include: {
          tags: true,
        },
      },
    },
  });
  const blogPosts = await prisma.blogPost.findMany({
    where: {
      username: name[0],
    },
    include: {
      tags: true,
    },
  });
  const questions = await prisma.question.findMany({
    where: {
      author: name[0],
    },
  });

  const session = await getSession();
  //check if it's the user's account
  const reports = await prisma.report.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  //check if the user is already followed
  const followerId = session?.user.id;
  const followingId = userQuery?.id;
  const follow = await prisma.follow.findFirst({
    where: {
      followerId,
      followingId,
    },
  });
  const followers = await prisma.follow.findMany({
    where: {
      followingId: userQuery?.id,
    },
    include: {
      follower: true,
    },
  });

  if (userQuery) {
    return (
      <div className="flex flex-col gap-20">
        <AccountHeader
          user={userQuery}
          follow={follow}
          currentUserId={session?.user.id as string}
          isMyAccount={session?.user.name === userQuery.name}
        />
        <AccountContentList
          isMyAccount={session?.user.name === userQuery.name}
          userId={session?.user.id as string}
          username={userQuery.name as string}
          blogPosts={blogPosts}
          questions={questions}
          reports={reports}
          followers={followers.map((follow) => follow.follower)} //map through each follower and get the actual user data
          favoriteBlogPosts={userQuery.favoriteBlogPosts}
        />
        {session?.user.name === userQuery.name && (
          <div className="flex justify-center">
            <SelectPostType />
          </div>
        )}
      </div>
    );
  } else {
    return (
      <h1 className="text-primaryGray text-center text-2xl my-24 mb-64">
        User not found
      </h1>
    );
  }
};

export default page;
