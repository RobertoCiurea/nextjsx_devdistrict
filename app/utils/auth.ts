import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { prismaOptions } from "./db";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prismaOptions),

  providers: [
    //credentials
    CredentialsProvider({
      name: "credentials",
      credentials: {
        name: { label: "Username", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        //chechk for user's email and password
        if (!credentials?.email || !credentials.password) return null;
        //check if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        // console.log(user);
        if (!user) throw new Error("User not found");

        //check if password is valid
        if (user.password) {
          const checkPassword = await bcrypt.compare(
            credentials?.password,
            user.password as string
          );
          if (!checkPassword) {
            throw new Error("Password is incorrect");
          }
        } else
          throw new Error(
            "User with this email is registred to another account type "
          );

        return user;
      },
    }),
    //github session provider
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    //google session provider
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthOptions;
