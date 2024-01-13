"use client";
import { handleLoginAction } from "@/actions/hanldeLoginAction";
import { useFormStatus } from "react-dom";
//modify auth methood to sign up and login with username email and password
const LoginWithEmail = () => {
  const { pending } = useFormStatus();
  return (
    <form
      className="flex flex-col items-center gap-3"
      action={handleLoginAction}
    >
      <input
        type="email"
        className="w-full p-1 md:p-2 pl-2 focus:outline-none focus:border-none focus:outline-2 focus:outline-primaryAccent text-md md:text-xl rounded-lg text-centers"
        placeholder="email@example.com"
        name="email"
        required
      />
      <input
        type="password"
        className="w-full p-1 md:p-2 pl-2 focus:outline-none focus:border-none focus:outline-2 focus:outline-primaryAccent text-md md:text-xl rounded-lg text-centers"
        placeholder="password"
        name="password"
        required
      />
      <button
        type="submit"
        className="m-2 w-full bg-primaryAccent p-2 text-white font-semibold text-lg md:text-xl rounded-lg mx-auto hover:bg-primaryAccentHover hover:text-gray-300"
        aria-disabled={pending}
      >
        Login with Email
      </button>
    </form>
  );
};

export default LoginWithEmail;
