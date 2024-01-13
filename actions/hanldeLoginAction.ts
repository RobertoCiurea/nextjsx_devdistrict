import { signIn } from "next-auth/react";

export const handleLoginAction = async (formData: FormData) => {
  try {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(data);
    signIn("credentials", {
      ...data,
      callbackUrl: "/",
    });
  } catch (error) {
    console.log(error);
  }
};
