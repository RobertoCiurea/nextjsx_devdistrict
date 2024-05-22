import React from "react";
import UpdateUserPasswordForm from "@/components/UpdateUserPasswordForm";
import { getSession } from "../utils/getSession";
import Forbidden from "@/components/Forbidden";
import { Metadata } from "next";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const metadata: Metadata = {
  title: "Change your account password",
  description: "Create a new password for your account and login ",
  openGraph: {
    title: "Change your account password",
    description: "Create a new password for your account and login ",
    url: `${baseUrl}/change-password`,
    images: [
      {
        url: `${baseUrl}/public/icons/favicon.ico`,
        width: 800,
        height: 600,
        alt: "DevDistrict Icon",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Change your account password",
    description: "Create a new password for your account and login ",
    images: [`${baseUrl}/public/icons/favicon.ico`],
  },
  alternates: {
    canonical: `${baseUrl}/change-password`,
  },
};
const page = async () => {
  const session = await getSession();
  if (session?.user) {
    return <UpdateUserPasswordForm userId={session.user.id as string} />;
  } else {
    return <Forbidden />;
  }
};

export default page;
