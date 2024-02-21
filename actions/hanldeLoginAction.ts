import { signIn } from "next-auth/react";

export const handleLoginAction = async (prevState: any, formData: FormData) => {
  try {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const res = await signIn("credentials", {
      ...data,
      callbackUrl: "/",
      redirect: false,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
