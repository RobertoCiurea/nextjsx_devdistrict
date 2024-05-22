"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import ReplyIcon from "@/public/icons/reply_icon.svg";
import Button from "./Button";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
//actions
import { handleCommentReply } from "@/actions/handleCommentReply";
import { deleteComment } from "@/actions/deleteComment";
import { deleteReply } from "@/actions/deleteReply";
//react toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeelteIcon from "@/public/icons/cancel_icon_red.svg";
//headlessui dialog
import { Dialog, Transition } from "@headlessui/react";

type ReplyType = {
  id: string;
  author: string;
  content: string;
  createdAt: Date | string;
  commentId: string;
};
type CommentType = {
  id: string;
  author: string;
  content: string;
  createdAt: Date | string;
  replies: ReplyType[];
  blogPostId: string;
};
const initialState = {
  message: "",
  status: 0,
};
const Comment = ({
  id,
  author,
  content,
  createdAt,
  replies,
  blogPostId,
}: CommentType) => {
  const [reply, setReply] = useState(false);
  const [state, formAction] = useFormState(handleCommentReply, initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const session = useSession();
  const pathname = usePathname();
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const openRepliesModal = () => {
    setShowReplies(true);
  };
  const closeRepliesModal = () => {
    setShowReplies(false);
  };
  function handleNotification(type: string, message: string) {
    if (type === "success") {
      toast.success(message, {
        position: "bottom-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (type === "error") {
      toast.error(message, {
        position: "bottom-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (type === "warning") {
      toast.warning(message, {
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
  }
  useEffect(() => {
    switch (state?.status) {
      case 200:
        handleNotification("success", state?.message);
        break;
      case 400:
        handleNotification("error", state?.message);
        break;
      case 401:
        handleNotification("warning", state?.message);
        break;
      case 500:
        handleNotification("error", "");
        break;
    }
  }, [state?.status, state?.message]);
  return (
    <>
      {/* Section of comments and replies */}
      <div className="flex flex-col gap-7">
        {/*The comment */}
        <span
          key={id}
          className="sm:px-3 py-2 bg-backgroundAccent flex flex-col justify-center shadow-xl  rounded-lg  max-w-[500px]"
        >
          {/*Delete comment button */}
          <div className="flex justify-end w-full mr-10">
            {session.data?.user?.name === author &&
            session.data.user.name !== "ADMIN" ? (
              <Image
                src={DeelteIcon}
                alt="Delete comment"
                className="cursor-pointer"
                title="Delete comment"
                onClick={openModal}
              />
            ) : (
              session.data?.user?.name === "ADMIN" && (
                <Button
                  title={"Delete"}
                  buttonStyles="bg-red-600 hover:bg-red-700 transition-colors text-white px-2 py-1 rounded-xl"
                  styles=""
                  handler={openModal}
                  buttonType={"submit"}
                />
              )
            )}
          </div>
          <p className=" break-all text-white">{content}</p>
          <div className="flex justify-between gap-5 items-center mt-5 ">
            <h1 className="sm:text-lg font-bold text-white">
              <span className="text-base font-normal ">By: </span>
              {author}
            </h1>
            <div className="flex flex-col">
              <h1 className="text-primaryGray text-sm sm:text-base font-Raleway">
                Created at: {createdAt as string}
              </h1>
              {/*Comment reactions */}
              <span className="flex justify-end text-primaryGray gap-5">
                {pathname !== "/admin-panel" && (
                  <button
                    className="flex items-center gap-1"
                    onClick={() => setReply(true)}
                  >
                    <h1 className="sm:text-lg underline ">Reply</h1>
                    <Image src={ReplyIcon} alt="Reply" width={20} />
                  </button>
                )}
              </span>
            </div>
          </div>
          {/*Show replies modal for admin panel */}
          {pathname === "/admin-panel" && (
            <Button
              title="Show replies"
              styles=""
              handler={openRepliesModal}
              buttonStyles="bg-primaryAccent hover:bg-primaryAccentHover transition-colors rounded-xl text-white px-2 py-1 font-Montserrat my-2 shadow-xl"
            />
          )}
        </span>
        {/*Reply input */}
        {reply && (
          <form action={formAction} className="flex flex-col justify-end">
            <input
              type="text"
              name="author"
              defaultValue={session.data?.user?.name as string}
              hidden
            />
            <input type="text" name="commentId" defaultValue={id} hidden />
            <textarea
              cols={45}
              rows={2}
              name="content"
              defaultValue={`@${author}`}
              className="text-gray-400 bg-backgroundAccent p-2 rounded-lg focus:border-none focus:outline-none focus:border-2 focus:border-primaryAccentHover"
            ></textarea>
            <div className="flex justify-end gap-2 mt-4">
              <span
                className="bg-red-700 p-1 rounded-lg hover:bg-red-800 transition-colors cursor-pointer"
                onClick={() => setReply(false)}
              >
                Cancel
              </span>
              <button
                type="submit"
                className="bg-primaryAccent p-1 rounded-lg hover:bg-primaryAccentHover transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        )}
        {/*The replies */}
        {replies.length > 0 &&
          //do not display the replies in this way in admin panel
          pathname !== "/admin-panel" &&
          replies.map((reply) => (
            <span
              key={reply.id}
              className="sm:px-3 py-2 bg-backgroundAccentDark ml-12 flex flex-col justify-end rounded-lg  max-w-[500px]"
            >
              <p className="mr-20 break-all">{reply.content}</p>
              <div className="flex  justify-center gap-20 mt-5 ">
                <h1 className="sm:text-lg font-bold">
                  <span className="text-base font-normal">By: </span>
                  {reply.author}
                </h1>
                <div className="flex flex-col">
                  <h1 className="text-primaryGray text-sm sm:text-base font-Raleway">
                    Created at: {reply.createdAt.toLocaleString()}
                  </h1>
                </div>
              </div>
              {/*Delete reply button */}
              {session.data?.user?.name === reply.author ||
                (session.data?.user?.name === "ADMIN" && (
                  <form action={deleteReply} className="mt-3">
                    <input
                      type="hidden"
                      name="replyId"
                      defaultValue={reply.id}
                    />
                    <FormButton title="Delete reply" />
                  </form>
                ))}
            </span>
          ))}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/*Headless ui dialog for deleting comment */}
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-backgroundAccentDark p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    Do you want to delete this comment?
                  </Dialog.Title>
                  <form
                    action={deleteComment}
                    className="mt-2 flex flex-col items-center text-white gap-2"
                  >
                    <input
                      type="text"
                      name="commentId"
                      defaultValue={id}
                      hidden
                    />

                    <input
                      type="text"
                      name="blogPostId"
                      defaultValue={blogPostId}
                      hidden
                    />

                    <span
                      className="bg-red-700 py-1 px-5 sm:px-10 rounded-lg sm:text-lg hover:bg-red-800 transition-colors cursor-pointer"
                      onClick={closeModal}
                    >
                      Cancel
                    </span>
                    <button
                      type="submit"
                      className="bg-primaryAccent py-1 px-5 sm:px-10 rounded-lg sm:text-lg hover:bg-primaryAccentHover transition-colors"
                      onClick={closeModal}
                    >
                      Delete
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/*headless ui component for showing replies (admin-panel only) */}
      {pathname === "/admin-panel" && (
        <Transition appear show={showReplies} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={closeRepliesModal}
          >
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 mb-5 text-white"
                    >
                      {author}'s Comment Replies
                    </Dialog.Title>
                    {replies.length > 0 ? (
                      <div className="flex flex-col gap-10 justify-center items-center">
                        {replies.map((reply) => (
                          <span
                            key={reply.id}
                            className="sm:px-3 py-2 bg-backgroundAccentDark flex flex-col justify-end rounded-lg  max-w-[500px]"
                          >
                            <span className="justify-end"></span>
                            <p className="mr-20 break-all text-white">
                              {reply.content}
                            </p>
                            <div className="flex  justify-center gap-20 mt-5 ">
                              <h1 className="sm:text-lg font-bold text-white">
                                <span className="text-base font-normal">
                                  By:{" "}
                                </span>
                                {reply.author}
                              </h1>
                              <div className="flex flex-col">
                                <h1 className="text-primaryGray text-sm sm:text-base font-Raleway">
                                  Created at: {reply.createdAt.toLocaleString()}
                                </h1>
                              </div>
                            </div>
                            <form action={deleteReply}>
                              <input
                                type="hidden"
                                name="replyId"
                                defaultValue={reply.id}
                              />
                              <FormButton title="Delete reply" />
                            </form>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <h1 className="text-xl text-primaryGray">
                        No replies yet
                      </h1>
                    )}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
};

export default Comment;

const FormButton = ({ title }: { title: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      title={pending ? "Loading..." : title}
      buttonStyles="bg-red-600 hover:bg-red-700 transition-colors text-white px-2  rounded-lg"
      styles=""
      buttonType={"submit"}
    />
  );
};
