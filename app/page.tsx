import { getSession } from "@/app/utils/getSession";
import Banner from "@/components/Banner";
import BlogArticlesGridTemplate from "@/components/BlogArticlesGridTemplate";
import BugArticlesGridTemplate from "@/components/BugArticlesGridTemplate";
import ReportProblem from "@/components/ReportProblem";
export default async function Home() {
  const session = await getSession();
  // console.log(session);
  // console.log(session?.user?.image);
  const userId = await session?.user.id;
  console.log(userId);
  return (
    <div className="relative">
      <Banner />
      <div className="w-full flex justify-end absolute  top-[6%] sm:top-[16%] px-2 sm:px-10">
        <ReportProblem userId={userId} />
      </div>

      <BlogArticlesGridTemplate />
      <BugArticlesGridTemplate />
    </div>
  );
}
