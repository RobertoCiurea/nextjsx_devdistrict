import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getSession } from "@/app/utils/getSession";
import AccountHeader from "@/components/AccountHeader";
import AccountContentList from "@/components/AccountContentList";
import SelectPostType from "@/components/SelectPostType";
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
  const session = await getSession();
  console.log(userQuery?.favoriteBlogPosts);
  if (userQuery) {
    return (
      <div className="flex flex-col gap-20">
        <AccountHeader
          user={userQuery}
          isMyAccount={session?.user.name === userQuery.name}
        />
        <AccountContentList
          isMyAccount={session?.user.name === userQuery.name}
          username={userQuery.name as string}
          blogPosts={blogPosts}
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
