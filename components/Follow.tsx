"use client";
import React, { useEffect } from "react";
import Button from "./Button";
import { useFormState, useFormStatus } from "react-dom";
import FollowIcon from "@/public/icons/follow_icon.svg";
//follow action
import { followUser } from "@/actions/followUser";
import { unfollowUser } from "@/actions/unfollowUser";
//react toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FollowType = {
  id: string;
  followerId: string;
  followingId: string;
};

const initialState = {
  message: "",
  status: 0,
};

const Follow = ({
  followerId,
  followingId,
  follow,
}: {
  followerId: string;
  followingId: string;
  follow?: FollowType | null;
}) => {
  const [followState, followFormAction] = useFormState(
    followUser,
    initialState
  );
  const [unfollowState, unfollowFormAction] = useFormState(
    unfollowUser,
    initialState
  );
  function handleNotification(type: string, message: string) {
    if (type === "success") {
      toast.success(message, {
        position: "bottom-right",
        autoClose: 2000,
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
        autoClose: 2000,
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
        autoClose: 2000,
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
    switch (followState.status) {
      case 200:
        handleNotification("success", followState.message);
        break;
      case 401:
        handleNotification("warning", followState.message);
        break;
      case 500:
        handleNotification("error", followState.message);
        break;
    }
    switch (unfollowState.status) {
      case 200:
        handleNotification("success", unfollowState.message);
        break;

      case 500:
        handleNotification("error", unfollowState.message);
        break;
    }
  }, [
    followState.message,
    followState.status,
    unfollowState.message,
    unfollowState.status,
  ]);

  //if the user is already followed (there is a follow query) then show the unfollow option
  if (follow) {
    return (
      <>
        <form action={unfollowFormAction}>
          <input
            type="hidden"
            name="followId"
            defaultValue={follow?.id as string}
          />
          <input type="hidden" name="followingId" defaultValue={followingId} />

          <FormButton title="Unfollow" />
        </form>
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
      </>
    );
    //if the user is not followed (there is no follow query) then show the follow option
  } else {
    return (
      <>
        <form action={followFormAction}>
          <input type="hidden" name="followerId" defaultValue={followerId} />
          <input type="hidden" name="followingId" defaultValue={followingId} />
          <FormButton title="Follow" />
        </form>
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
      </>
    );
  }
};

export default Follow;
const FormButton = ({ title }: { title: string }) => {
  const { pending } = useFormStatus();
  if (pending) {
    return (
      <Button
        title="Loading..."
        buttonStyles="text-white font-Raleway px-4 text-center py-3 hover:shadow-2xl hover:bg-primaryAccentHover bg-primaryAccent rounded-xl shadow-xl "
        styles=""
        buttonType="submit"
      />
    );
  } else {
    return (
      <Button
        title={title}
        image={FollowIcon}
        buttonStyles="text-white font-Raleway"
        styles="hover:shadow-2xl hover:bg-primaryAccentHover bg-primaryAccent rounded-xl shadow-xl"
        buttonType="submit"
      />
    );
  }
};
