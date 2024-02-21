"use client";
import React, { Fragment, useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import ReportIcon from "@/public/icons/report_icon.svg";
import LoginWithEmail from "./LoginWithEmail";
import LoginWithGithub from "./LoginWithGithub";
import LoginwithGoogle from "./LoginWithGoogle";
//headlessui
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
//toastiy
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//action
import { handleReportProblemAction } from "@/actions/handleReportProblemAction";
//emojies
import {
  AnrgyEmoji,
  AnrgyEmojiFcoused,
  DeadEmoji,
  DeadEmojiFocused,
  DisturbedEmoji,
  DisturbedEmojiFocused,
  DissapointedEmoji,
  DissapointedEmojiFocused,
} from "@/public/icons/emojies/index";

const initialState = {
  status: 0,
  message: "",
};
const ReportProblem = ({ userId }: String | any) => {
  const annoyingLevels = [
    {
      name: "Not so annoying",
      src: DissapointedEmoji,
      srcFocused: DissapointedEmojiFocused,
    },
    {
      name: "Annoying",
      src: DisturbedEmoji,
      srcFocused: DisturbedEmojiFocused,
    },
    {
      name: "Very Annoying",
      src: AnrgyEmoji,
      srcFocused: AnrgyEmojiFcoused,
    },
    {
      name: "I can't live with it",
      src: DeadEmoji,
      srcFocused: DeadEmojiFocused,
    },
  ];
  const session = useSession();
  const [state, formAction] = useFormState(
    handleReportProblemAction,
    initialState
  );
  console.log(userId);
  const [isOpen, setIsOpen] = useState(false);
  const [level, setLevel] = useState(null);
  const closeModal = () => {
    //close the modal after 1 sec to submit the formdata to the server action
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };
  useEffect(() => {
    if (state?.status === 200) {
      toast.success(`${state.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (state?.status! > 200) {
      toast.error(`${state?.message}`, {
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
  }, [state?.status, state?.message]);

  return (
    <>
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
      <div
        className="flex mt-5 items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <Image src={ReportIcon} alt="Report Icon" />
        <span className="font-Raleway text-gray-400 transition-colors hover:text-gray-500 text-sm underline cursor-pointer">
          Report a problem
        </span>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
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
                <Dialog.Panel className="w-full px-2 sm:px-10 max-w-md transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all">
                  {session?.status === "authenticated" ? (
                    <>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-white "
                      >
                        Report a problem as{" "}
                        <span className="text-primaryAccent">
                          {session.data.user?.name}
                        </span>
                      </Dialog.Title>
                      <form
                        action={formAction}
                        className="flex flex-col justify-center gap-10 pt-10 pb-3"
                      >
                        <input
                          type="text"
                          placeholder="What's the problem about?"
                          name="title"
                          className="bg-backgroundAccent py-2 px-3 rounded-lg text-white shadow-2xl focus:border-none focus:outline-none focus:outline-2 focus:outline-primaryGray"
                        />
                        <textarea
                          name="description"
                          id=""
                          cols={30}
                          rows={10}
                          placeholder="Describe your problem with all the details"
                          className="bg-backgroundAccent py-2 px-2 rounded-lg text-white shadow-2xl focus:border-none focus:outline-none focus:outline-2 focus:outline-primaryGray"
                        ></textarea>
                        <input
                          type="text"
                          defaultValue={userId}
                          name="userid"
                          hidden
                        />
                        <div className="flex flex-col my-10 text-white">
                          {/*Text area */}
                          <div>
                            <h1 className="text-xl">
                              How annoying is the probelm
                            </h1>
                            <p className="text-sm">
                              Select from{" "}
                              <span className="text-primaryGray">
                                not so annoying
                              </span>{" "}
                              to{" "}
                              <span className="text-primaryAccent">
                                very annoying
                              </span>
                            </p>
                          </div>

                          {/*Emojies */}
                          {/*add headless ui radio group */}

                          <RadioGroup
                            value={level}
                            onChange={setLevel}
                            className="flex justify-evenly mt-7"
                            name="level"
                          >
                            {annoyingLevels.map((level, index) => (
                              <RadioGroup.Option
                                key={index}
                                value={level.name}
                                as={Fragment}
                              >
                                {({ checked }) => (
                                  <Image
                                    src={checked ? level.srcFocused : level.src}
                                    alt={level.name}
                                    className="rounded-full cursor-pointer hover:shadow-primaryAccentHover hover:shadow-2xl"
                                  />
                                )}
                              </RadioGroup.Option>
                            ))}
                          </RadioGroup>
                        </div>

                        <ReportButton handleClick={closeModal} />
                      </form>
                    </>
                  ) : (
                    <>
                      <Dialog.Title
                        as="h1"
                        className="text-white font-Montserrat text-lg md:text-2xl my-8"
                      >
                        You must be logged in to report a problem
                      </Dialog.Title>
                      {/*Content */}
                      <div>
                        <Dialog.Title
                          as="h3"
                          className="text-white font-Montserrat text-md md:text-xl mb-5"
                        >
                          Login with email
                        </Dialog.Title>
                        <LoginWithEmail
                          inputStyles="px-1 py-2 text-base "
                          buttonStyles="text-lg py-1"
                        />
                        <span className="flex items-center justify-center font-semibold before:w-full before:bg-primaryAccentHover before:h-[5px] before:mt-[5px] before:rounded-lg before:mx-2 after:w-full after:bg-primaryAccentHover after:h-[5px] after:mt-[5px] after:rounded-lg after:mx-2 text-primaryAccent text-2xl my-5">
                          Or
                        </span>
                        <section className="flex flex-col gap-2">
                          <LoginWithGithub
                            styles="py-2 text-base sm:text-lg px-3"
                            imgWidth={50}
                          />
                          <LoginwithGoogle
                            styles="py-2 text-base sm:text-lg px-3"
                            imgWidth={50}
                          />
                        </section>
                        {/*register link */}
                        <div className="text-white text-sm lg:text-md text-center mt-3">
                          <h1>You don't have an account?</h1>
                          <Link
                            href="/auth/register"
                            className="text-primaryAccent underline hover:text-primaryAccentHover"
                          >
                            {" "}
                            Register now
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ReportProblem;

const ReportButton = ({ handleClick }: any) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex justify-center rounded-md border border-transparent bg-backgroundAccent px-4 py-2 text-sm font-medium font-Raleway text-white shadow-2xl hover:shadow-backgroundAccent hover:text-gray-400 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      onClick={handleClick}
    >
      {pending ? "Loading..." : "Submit"}
    </button>
  );
};
