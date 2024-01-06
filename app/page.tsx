import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";
import Image from "next/image";
export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session?.user?.image);
  return (
    <>
      <h1>Home page</h1>
    </>
  );
}
