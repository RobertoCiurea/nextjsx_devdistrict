"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import SendIcon from "@/public/icons/send_icon.svg";
import Spinner from "@/public/icons/loading_icon.svg";
import { addNewsletterEmail } from "@/actions/addNewsletterEmail";
import { useFormStatus, useFormState } from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//apply useformstate
const intialState = {
  status: 0,
  message: "",
};

const NewsletterForm = () => {
  const [state, formAction] = useFormState(addNewsletterEmail, intialState);

  // console.log(state);
  //use useffect to notify only once the user
  useEffect(() => {
    if (state.status === 200) {
      toast.success(state.message, {
        position: "bottom-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (state.status === 500) {
      toast.error(state.message, {
        position: "bottom-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [state.status, state.message]);
  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-Raleway text-white font-bold">
          Subscribe to our newsletter
        </h1>
        <form
          action={formAction}
          className="flex justify-between border-b-2 border-primaryGray p-2"
        >
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            className="outline-none border-none bg-transparent  rounded-lg text-white text-lg forced-colors:bg-transparent autofill:bg-transparent "
          />
          <NewsletterButton />
        </form>
      </div>
      <ToastContainer
        position="bottom-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={1}
      />
    </>
  );
};
export default NewsletterForm;
const NewsletterButton = () => {
  const { pending } = useFormStatus();
  if (pending) {
    return (
      <button className="outline-none border-non bg-none min-w-[35px] ">
        <Image
          src={Spinner}
          alt="Loading..."
          className="animate-spin"
          width={40}
        />
      </button>
    );
  } else
    return (
      <button className="outline-none border-non bg-none min-w-[35px]">
        <Image src={SendIcon} alt="Send" />
      </button>
    );
};
