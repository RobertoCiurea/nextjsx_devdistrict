import { getSession } from "@/app/utils/getSession";
import Banner from "@/components/Banner";
import BlogArticlesGridTemplate from "@/components/BlogArticlesGridTemplate";
import BugArticlesGridTemplate from "@/components/BugArticlesGridTemplate";
export default async function Home() {
  const session = await getSession();
  // console.log(session);
  // console.log(session?.user?.image);
  return (
    <div>
      <Banner />
      <h1 className="text-2xl sm:text-3xl  font-semibold font-Raleway text-white ml-10 lg:ml-7 mb-10">
        Popular posts
      </h1>
      <BlogArticlesGridTemplate />
      <h1 className="text-2xl sm:text-3xl  font-semibold font-Raleway text-white ml-10 lg:ml-7 mb-10">
        Bugs and <br className="block md:hidden" />
        problems
      </h1>
      <BugArticlesGridTemplate />
    </div>
  );
}
