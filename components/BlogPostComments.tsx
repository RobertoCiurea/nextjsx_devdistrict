"use client";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
//action
import { addBlogPostComment } from "@/actions/addBlogPostComment";
import { useSession } from "next-auth/react";
import Button from "./Button";
import Comment from "./Comment";
//react toastify notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  message: "",
  status: 0,
};
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
  createdAt: string;
  replies: ReplyType[];
  blogPostId?: string;
};

const BlogPostComments = ({
  blogPostId,
  comments,
}: {
  blogPostId: string | undefined;
  comments: CommentType[] | any;
}) => {
  const [state, formAction] = useFormState(addBlogPostComment, initialState);
  const session = useSession();
  const user = session.data?.user;

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
        handleNotification("error", state.message);
        break;
    }
  }, [state?.status, state?.message]);
  return (
    <div className="flex flex-col my-20">
      <form className="flex flex-col items-center gap-5" action={formAction}>
        <textarea
          name="comment"
          placeholder="Add a comment"
          cols={50}
          rows={5}
          className="bg-backgroundAccent py-1 px-2 focus:border-none focus:outline-none focus:border-2 focus:border-primaryAccentHover rounded-xl"
        ></textarea>
        <input
          name="author"
          type="text"
          defaultValue={user?.name as string}
          hidden
        />

        <input name="blogPostId" type="text" defaultValue={blogPostId} hidden />
        <CommentButton />
      </form>
      <div className="flex flex-col gap-10">
        <h1 className="text-2xl">Comments</h1>
        {comments.length === 0 ? (
          <h1>No comments yet</h1>
        ) : (
          comments.map((comment: CommentType) => (
            <Comment
              key={comment.id}
              id={comment.id}
              author={comment.author}
              content={comment.content}
              replies={comment.replies}
              createdAt={comment.createdAt.toLocaleString()}
              blogPostId={blogPostId as string}
            />
          ))
        )}
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3500}
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
    </div>
  );
};

export default BlogPostComments;

const CommentButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      buttonStyles="bg-primaryAccent px-5 py-1 rounded-xl transition-colors hover:bg-primaryAccentHover"
      title={pending ? "Loading..." : "Add"}
      buttonType={"submit"}
      styles=""
    />
  );
};
