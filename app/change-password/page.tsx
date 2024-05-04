import React from "react";
import UpdateUserPasswordForm from "@/components/UpdateUserPasswordForm";
import { getSession } from "../utils/getSession";
import Forbidden from "@/components/Forbidden";
const page = async () => {
  const session = await getSession();
  if (session?.user) {
    return <UpdateUserPasswordForm userId={session.user.id as string} />;
  } else {
    return <Forbidden />;
  }
};

export default page;
