"use client";
import React from "react";
import Button from "@/components/Button";
import FavoriteIcon from "@/public/icons/favorite_icon.svg";
import FavoriteIconFocused from "@/public/icons/favorite_icon_focus.svg";
import SpinnerIcon from "@/public/icons/loading_icon.svg";
import Image from "next/image";
import { useFormStatus } from "react-dom";

//handle "save to favorite" action
import { handleFavoriteBlogPost } from "@/actions/handleFavoriteBlogPost";

const AddBlogPostToFavorite = ({
  userId,
  blogPostId,
  addedToFavorites,
}: {
  userId?: string;
  blogPostId: string;
  addedToFavorites: boolean;
}) => {
  return (
    <form action={handleFavoriteBlogPost}>
      <input type="text" hidden defaultValue={userId} name="userId" />
      <input type="text" hidden defaultValue={blogPostId} name="blogPostId" />
      <FormButton addedToFavorites={addedToFavorites} />
    </form>
  );
};

export default AddBlogPostToFavorite;

const FormButton = ({ addedToFavorites }: { addedToFavorites: boolean }) => {
  const { pending } = useFormStatus();
  if (!pending) {
    return (
      <Button
        image={addedToFavorites ? FavoriteIconFocused : FavoriteIcon}
        title={
          addedToFavorites
            ? "Post saved to favorites"
            : "Save post to favorites"
        }
        buttonStyles="text-white font-Raleway"
        styles={`${
          addedToFavorites ? "bg-primaryAccentHover" : "bg-primaryAccent"
        }  px-2 py-1 rounded-xl transition-colors hover:bg-primaryAccentHover shadow-xl`}
        buttonType={"submit"}
      />
    );
  } else {
    return (
      <span className="px-10 py-2 rounded-xl bg-primaryAccentHover text-lg text-white shadow-xl">
        Loading...
      </span>
    );
  }
};
