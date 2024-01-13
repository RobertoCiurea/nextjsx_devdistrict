import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import { authOptions } from "./utils/auth";

export const metadata: Metadata = {
  title: "DevDistrict",
  description:
    "DevDistrict is an open-source devs comunity. Here you can post blog articles, resolve problems and bugs and share experiences and positive thoughts ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="bg-background">
        <SessionProvider session={session}>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
