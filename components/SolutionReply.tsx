"use client";
import React, { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ReplyIcon from "@/public/icons/reply_icon.svg";
import Button from "./Button";
//actions
import { addSolutionReply } from "@/actions/addSolutionReply";
import { deleteSolutionReply } from "@/actions/deleteSolutionReply";
//react toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
Image;

const initialState = {
  message: "",
  status: 0,
};

type ReplyType = {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
  solutionId: string;
};
const SolutionReply = ({
  solutionId,
  author,
  replies,
}: {
  solutionId: string;
  author: string;
  replies: ReplyType[];
}) => {
  const session = useSession();
  const [reply, setReply] = useState(false);
  const [state, formAction] = useFormState(addSolutionReply, initialState);
  useEffect(() => {
    switch (state.status) {
      case 200:
        toast.success(state.message, {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        break;
      case 400:
        toast.error(state.message, {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        break;
      case 401:
        toast.warn(state.message, {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        break;

      case 500:
        toast.error(state.message, {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        break;
    }
  }, [state.message, state.status]);
  return (
    <>
      <div className="flex flex-col gap-3">
        {session.data?.user && (
          <span className="flex items-center cursor-pointer gap-1 justify-end">
            <Image src={ReplyIcon} alt="Reply" width={25} />
            <button
              className="underline"
              type="button"
              onClick={() => setReply((prevState) => !prevState)}
            >
              Reply
            </button>
          </span>
        )}
        {reply && (
          <form
            action={formAction}
            onSubmit={() => setReply(false)}
            className="flex flex-col items-center gap-2"
          >
            <textarea
              cols={45}
              rows={3}
              name="content"
              defaultValue={`@${author} `}
              className="text-gray-400 bg-backgroundAccent p-2 rounded-lg focus:border-none focus:outline-none focus:border-2 focus:border-primaryAccentHover"
            ></textarea>
            <input type="hidden" name="solutionId" defaultValue={solutionId} />

            <input
              type="hidden"
              name="author"
              defaultValue={session.data?.user?.name as string}
            />
            {/*buttons */}
            <div className="flex justify-end gap-2">
              <span
                className="bg-red-700 p-1 rounded-lg text-white hover:bg-red-800 transition-colors cursor-pointer"
                onClick={() => setReply(false)}
              >
                Cancel
              </span>
              <FormButton
                title="Submit"
                buttonStyles="bg-primaryAccent hover:bg-primaryAccentHover transition-colors text-white rounded-lg px-2"
              />
            </div>
          </form>
        )}
        {/*show  replies */}
        {/*create maybe show replies button */}
        {replies.length > 0 &&
          replies.map((reply) => (
            <span
              key={reply.id}
              className="sm:px-3 py-2 bg-backgroundAccentDark flex flex-col justify-end rounded-lg  max-w-[500px]"
            >
              <p className="mr-20 break-all text-white">{reply.content}</p>
              {/*Bottom */}
              <div className="flex justify-between gap-20 mt-5 ">
                <h1 className="sm:text-lg font-bold text-white">
                  <span className="text-base font-normal">By: </span>
                  {reply.author}
                </h1>
                <div className="flex flex-col">
                  <h1 className="text-primaryGray text-sm sm:text-base font-Raleway">
                    Created at: {reply.createdAt.toLocaleString()}
                  </h1>
                  {/*delete reply button */}
                  {session.data?.user?.name === reply.author ||
                    (session.data?.user?.name === "ADMIN" && (
                      <form
                        action={deleteSolutionReply}
                        className="flex justify-end"
                      >
                        <input
                          type="hidden"
                          name="replyId"
                          defaultValue={reply.id}
                        />
                        <FormButton
                          title="Delete reply"
                          buttonStyles="bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors px-2 font-Raleway"
                        />
                      </form>
                    ))}
                </div>
              </div>
            </span>
          ))}
      </div>
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

export default SolutionReply;

const FormButton = ({
  title,
  buttonStyles,
}: {
  title: string;
  buttonStyles: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      title={pending ? "Loading..." : title}
      styles=""
      buttonType={"submit"}
      buttonStyles={buttonStyles}
    />
  );
};
