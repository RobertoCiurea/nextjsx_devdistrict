import React from "react";
import { getSession } from "../utils/getSession";
import { PrismaClient } from "@prisma/client";
import UsersLayout from "@/components/admin/UsersLayout";
import CommentsLayout from "@/components/admin/CommentsLayout";
import ReportsLayout from "@/components/admin/ReportsLayout";
import Navigation from "@/components/admin/Navigation";

const prisma = new PrismaClient();
const page = async () => {
  const session = await getSession();
  let userDetails;
  if (session?.user) {
    userDetails = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
    });
  }

  if (userDetails?.userType === "ADMIN") {
    //get user's posts andf posts
    const users = await prisma.user.findMany({
      include: {
        blogPosts: {
          include: {
            tags: true,
          },
        },
      },
    });
    const comments = await prisma.comment.findMany({
      include: {
        replies: true,
      },
    });
    const reports = await prisma.report.findMany();
    console.log(reports);
    return (
      <section className="flex flex-col items-center gap-40 justify-center w-full">
        <div className="flex gap-5 flex-col items-center justify-center g">
          <h1 className="text-3xl font-bold text-white">Admin panel</h1>
          <Navigation />
        </div>
        {/*show users */}
        <UsersLayout users={users} />
        {/*show comments */}
        <CommentsLayout comments={comments} />
        {/*show reports */}
        <ReportsLayout reports={reports} />
      </section>
    );
  } else {
    return (
      <div className="flex justify-center flex-col items-center h-screen">
        <h1 className="text-2xl text-white">Access forbidden</h1>
        <h1 className="text-3xl text-white">403</h1>
      </div>
    );
  }
};

export default page;
