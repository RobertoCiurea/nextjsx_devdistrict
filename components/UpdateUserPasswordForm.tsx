"use client";
import React, { useEffect } from "react";
import Button from "./Button";
import { updateUserPassword } from "@/actions/updateUserPassoword";
import { useFormState, useFormStatus } from "react-dom";
//react toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialState = {
  message: "",
  status: 0,
};
const UpdateUserPasswordForm = ({ userId }: { userId: string }) => {
  const [state, formAction] = useFormState(updateUserPassword, initialState);

  const sendNotification = (type: string, message: string) => {
    if (type === "error") {
      toast.error(message, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (type === "warning") {
      toast.warn(message, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.success(message, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  useEffect(() => {
    switch (state?.status) {
      case 500:
        sendNotification("error", state.message);
        break;
      case 406:
        sendNotification("warning", state.message);
        break;
      case 400:
        sendNotification("warning", state.message);
        break;
      case 200:
        sendNotification("success", state.message);
        break;
    }
  }, [state?.status, state?.message]);
  return (
    <div className="mx-5 my-10 sm:mx-20 flex flex-col items-center gap-20">
      <h1 className="text-xl sm:text-3xl font-bold text-white font-Montserrat">
        Change password
      </h1>
      <div className="flex justify-center items-center flex-col">
        <form action={formAction} className="flex flex-col gap-5 text-white">
          <input type="hidden" defaultValue={userId} name="userId" />
          <div className="flex flex-col gap-1">
            <label htmlFor="oldPassowrd" className=" font-Raleway text-lg">
              Type your old passowrd:
            </label>
            <input
              type="password"
              name="oldPassword"
              placeholder="old passowrd"
              className="bg-backgroundAccent px-2 py-1 font-Raleway text-lg shadow-2xl  rounded-xl focus:outline-none focus:border-2 focus:border-primaryAccentHover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="newPassowrd" className=" font-Raleway text-lg">
              Type your new passowrd:
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="new passowrd"
              className="bg-backgroundAccent px-2 py-1 font-Raleway text-lg shadow-2xl  rounded-xl focus:outline-none focus:border-2 focus:border-primaryAccentHover"
            />
          </div>
          <FormButton />
        </form>
      </div>
    </div>
  );
};

export default UpdateUserPasswordForm;

const FormButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      title={pending ? "Loading..." : "Change"}
      styles=""
      buttonType="submit"
      buttonStyles="bg-primaryAccent hover:bg-primaryAccentHover tranistion-colors rounded-xl shadow-xl py-1"
    />
  );
};
