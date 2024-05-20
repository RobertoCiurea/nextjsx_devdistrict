"use client";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import { voteSolution } from "@/actions/voteSolution";
import DownArrowIcon from "@/public/icons/down_arrow_icon.svg";
//react toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { stat } from "fs";
const initialState = {
  message: "",
  status: 0,
};
const VoteForm = ({
  solutionId,
  userId,
  voteId,
  votes,
  voteValue,
}: {
  solutionId: string;
  userId: string;
  voteId: string;
  votes: number;
  voteValue: number;
}) => {
  const [state, formAction] = useFormState(voteSolution, initialState);
  useEffect(() => {
    switch (state?.status) {
      case 401:
        toast.warn(state.message, {
          position: "bottom-right",
          autoClose: 5000,
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
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        break;
    }
  }, [state?.message, state?.status]);
  return (
    <>
      <div className="flex flex-col gap-2 items-center">
        {/*Upvote */}
        <form action={formAction}>
          <input type="hidden" name="solutionId" defaultValue={solutionId} />
          <input type="hidden" name="userId" defaultValue={userId} />
          <input type="hidden" name="voteId" defaultValue={voteId} />
          <input type="hidden" name="voteType" defaultValue={"upVote"} />

          <button
            type="submit"
            className={`rounded-full  p-2 cursor-pointer transition-colors rotate-180 ${
              voteValue === 1
                ? "bg-green-600 border-2 border-white"
                : "bg-primaryAccent hover:bg-primaryAccentHover"
            }`}
          >
            <Image
              src={DownArrowIcon}
              width={25}
              alt="Upvote"
              title={
                voteValue === 1 ? "Undo your vote" : "The answers was useful"
              }
            />
          </button>
        </form>
        <span className="text-2xl text-white">{votes}</span>
        {/*Down vote */}
        <form action={formAction}>
          <input type="hidden" name="solutionId" defaultValue={solutionId} />
          <input type="hidden" name="userId" defaultValue={userId} />
          <input type="hidden" name="voteId" defaultValue={voteId} />
          <input type="hidden" name="voteType" defaultValue={"downVote"} />

          <button
            type="submit"
            className={`rounded-full  p-2 cursor-pointer transition-colors ${
              voteValue === -1
                ? "bg-green-600 border-2 border-white"
                : "bg-primaryAccent hover:bg-primaryAccentHover"
            }`}
          >
            <Image
              src={DownArrowIcon}
              width={25}
              alt="Upvote"
              title={
                voteValue === -1
                  ? "Undo your vote"
                  : "The answers was not useful"
              }
            />
          </button>
        </form>
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

export default VoteForm;
