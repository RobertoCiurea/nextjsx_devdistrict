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

  const blogs = [
    {
      title: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userId: "1a",
      loading: true,
    },
    {
      title: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userId: "1a",
      loading: false,
    },
    {
      title: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userId: "1a",
      loading: false,
    },
    {
      title: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userId: "1a",
      loading: false,
    },
    {
      title: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userId: "1a",
      loading: false,
    },
    {
      title: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userId: "1a",
      loading: false,
    },
    {
      title: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userId: "1a",
      loading: false,
    },
    {
      title: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userId: "1a",
      loading: false,
    },
    {
      title: "title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada posuere magna....",
      username: "User3251",
      likesCnt: 2,
      commentsCnt: 1,
      userId: "1a",
      loading: false,
    },
  ];
  return (
    <div className="relative">
      <Banner />
      <div className="w-full flex justify-end absolute  top-[6%] sm:top-[16%] px-2 sm:px-10">
        <ReportProblem userId={userId} />
      </div>

      <BlogArticlesGridTemplate arr={blogs} label={" Popular posts"} />
      <BugArticlesGridTemplate />
    </div>
  );
}
