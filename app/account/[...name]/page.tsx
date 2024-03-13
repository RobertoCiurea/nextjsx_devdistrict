import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getSession } from "@/app/utils/getSession";
import AccountHeader from "@/components/AccountHeader";
import AccountContentList from "@/components/AccountContentList";
import CreateIcon from "@/public/icons/create_icon.svg";
import Link from "next/link";
import Button from "@/components/Button";
const page = async ({ params }: { params: { name: string | any } }) => {
  const { name } = params;

  const userQuery = await prisma.user.findFirst({
    where: {
      name: name[0],
    },
  });
  const session = await getSession();

  if (userQuery) {
    return (
      <div className="flex flex-col gap-20">
        <AccountHeader
          user={userQuery}
          isMyAccount={session?.user.name === userQuery.name}
        />
        <AccountContentList
          isMyAccount={session?.user.name === userQuery.name}
          username={userQuery.name}
        />
        {session?.user.name === userQuery.name && (
          <div className="flex justify-center">
            <Link href="/">
              <Button
                title="New post"
                image={CreateIcon}
                buttonStyles="text-white font-Raleway"
                styles="hover:shadow-2xl hover:bg-primaryAccentHover bg-primaryAccent rounded-xl shadow-xl"
              />
            </Link>
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
