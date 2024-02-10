"use client";
import { handleLoginAction } from "@/actions/hanldeLoginAction";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  error: "",
  ok: true,
  status: 0,
  url: null,
};
const LoginWithEmail = () => {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(handleLoginAction, initialState);

  if (state?.status === 200) {
    redirect("/");
  } else if (state?.status === 500) {
    toast.error(state?.error, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return (
    <>
      <form className="flex flex-col items-center gap-3" action={formAction}>
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default LoginWithEmail;
