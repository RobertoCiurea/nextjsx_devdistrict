import { getSession } from "@/app/utils/getSession";
import Image from "next/image";
import Banner from "@/public/images/devdistrict_banner.png";
import { signOut } from "next-auth/react";
export default async function Home() {
  const session = await getSession();
  console.log(session);
  // console.log(session?.user?.image);
  return (
    <>
      <h1>Home page</h1>
      <h1>Hellog {session?.user?.name}</h1>
    </>
  );
}
