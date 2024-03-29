"use client";
import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
import React from "react";

type Props = {
  children: React.ReactNode | any;
  session?: Session | null;
};

const SessionProvider = ({ children, session }: Props) => {
  return <Provider session={session}>{children}</Provider>;
};

export default SessionProvider;
