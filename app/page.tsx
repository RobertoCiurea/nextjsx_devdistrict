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
      <Banner />z
      <BlogArticlesGridTemplate />
      <BugArticlesGridTemplate />
    </div>
  );
}
