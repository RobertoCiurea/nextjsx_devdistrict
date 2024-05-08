"use client";
import React, { useState, useEffect, Fragment, use } from "react";
import Image from "next/image";
import Link from "next/link";
import EditIcon from "@/public/icons/edit_icon.svg";
import FollowIcon from "@/public/icons/follow_icon.svg";
//action
import { updateUser } from "@/actions/updateUser";
import { useFormState, useFormStatus } from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//custom components
import Button from "./Button";
import Follow from "./Follow";

//headlessui
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import { signOut } from "next-auth/react";
type UserType = {
  id: string | null | undefined;
  name: string | null;
  email: string | null;
  image: string | null;
  followersCounter: number | null;
};

type FollowType = {
  id: string;
  followerId: string;
  followingId: string;
};
const initialState = {
  message: "",
  status: 0,
};

const AccountHeader = ({
  user,
  isMyAccount,
  currentUserId,
  follow,
}: {
  user: UserType;
  currentUserId: string;
  isMyAccount: boolean;
  follow?: FollowType | null;
}) => {
  //get the params and check if the params match to the id received from props

  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useFormState(updateUser, initialState);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
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
        autoClose: 2500,
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
      case 200:
        sendNotification("success", state.message);
        setTimeout(() => {
          signOut({ callbackUrl: "/auth/login" });
        }, 5000);
        break;
    }
  }, [state?.status, state?.message]);
  return (
    <div className="flex flex-col gap-4 sm:gap-48 sm:flex-row items-center justify-center ">
      {/*User profile */}
      <div className="flex gap-2 items-end ">
        <Image
          src={user.image as string}
          alt={user.name as string}
          width={65}
          height={65}
          className="rounded-full"
        />
        {/*User data */}
        <div className="flex flex-col flex-start text-white">
          <h1 className="text-xl font-Montserrat">{user.name}</h1>
          <p className="text-sm font-Raleway ">
            {user.followersCounter} folowers
          </p>
        </div>
      </div>
      {/*Edit profile button */}
      {isMyAccount ? (
        <>
          <Button
            title="Edit Profile"
            image={EditIcon}
            buttonStyles="text-white font-Raleway"
            styles="hover:shadow-2xl hover:bg-primaryAccentHover bg-primaryAccent rounded-xl shadow-xl "
            handler={openModal}
          />
          {/*Modal by headless ui */}
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-background text-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="span"
                        className="text-lg font-medium leading-6 mb-6"
                      >
                        <h1>Update your profile</h1>
                        <p className="text-xs font-normal">
                          Complete only the section you want to change
                        </p>
                      </Dialog.Title>
                      {/*Disclosure by headless ui */}
                      <div>
                        <form
                          action={formAction}
                          className="flex flex-col gap-5 mt-4 items-center"
                        >
                          <input
                            type="text"
                            name="username"
                            placeholder="username"
                            className="w-full bg-backgroundAccent px-2 py-1 rounded-lg shadow-2xl"
                          />
                          <input
                            type="email"
                            name="email"
                            placeholder="email"
                            className="w-full bg-backgroundAccent px-2 py-1 rounded-lg shadow-2xl"
                          />

                          <input
                            type="text"
                            hidden
                            defaultValue={user.id as string}
                            name="userId"
                          />
                          <input
                            type="text"
                            hidden
                            defaultValue={user.name as string}
                            name="currentUsername"
                          />
                          <Button
                            title="Update"
                            buttonType="submit"
                            buttonStyles="px-3 py-1 font-Montserrat bg-primaryAccent text-white hover:bg-primaryAccentHover transition-colors shadow-xl mt-2 rounded-lg"
                            styles=""
                          />
                        </form>
                        <Link
                          href={"/change-password"}
                          className="text-primaryAccent font-Montserrat underline hover:text-primaryAccentHover transition-colors text-sm"
                        >
                          Change password
                        </Link>
                      </div>

                      <div className="mt-4">
                        <Button
                          title="Cancel"
                          buttonStyles="px-3 py-1 text-sm bg-red-700 font-Raleway rounded-lg shadow-xl hover:bg-red-900 transition-colors"
                          styles=""
                          handler={closeModal}
                        />
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      ) : (
        <Follow
          followerId={currentUserId}
          followingId={user.id!}
          follow={follow}
        />
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default AccountHeader;
