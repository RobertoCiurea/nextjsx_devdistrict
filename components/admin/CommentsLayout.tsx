import React from "react";
import Comment from "../Comment";
type ReplyType = {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  commentId: string;
};
type CommentType = {
  id: string;
  author: string;
  content: string;
  createdAt: Date | string;
  blogPostId: string;
  replies: ReplyType[];
};
const CommentsLayout = ({ comments }: { comments: CommentType[] }) => {
  return (
    <div id="comments" className="flex flex-col gap-5  font-Raleway">
      <h1 className="text-2xl text-white my-5 text-center">Comments</h1>

      {/*grid of users */}
      <div className="flex flex-col sm:flex-row justify-start  gap-10">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            content={comment.content}
            author={comment.author}
            createdAt={comment.createdAt.toLocaleString()}
            blogPostId={comment.blogPostId}
            replies={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsLayout;
