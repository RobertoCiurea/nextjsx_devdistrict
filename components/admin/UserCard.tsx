"use client";
import React, { useState, Fragment } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import BlogCard from "../BlogCard";
//actions
import { deleteBlogPost } from "@/actions/deleteBlogPost";
import { deleteUser } from "@/actions/deleteUser";
//headless ui
import { Transition, Dialog } from "@headlessui/react";
type TagType = {
  id: string;
  name: string;
  blogPostId: string;
};
type BlogPost = {
  id: string;
  title: string;
  content: string;
  likesCounter: number;
  commentsCounter: number;
  createdAt: Date | string;
  userId: string;
  username: string;
  tags: TagType[];
};
type UserType = {
  id: string;
  name: string | null;
  email: string | null;
  followersCounter: number;
  image: string | null;
  userType: string;
  blogPosts?: BlogPost[];
};
const UserCard = ({
  id,
  name,
  email,
  followersCounter,
  image,
  userType,
  blogPosts,
}: UserType) => {
  const [viewPostsModal, setViewPostsModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);

  //close modal function
  const closePostsModal = () => {
    setViewPostsModal(false);
  };
  const closeDeleteUserModal = () => {
    setDeleteUserModal(false);
  };
  //open modal function
  const openPostsModal = () => {
    setViewPostsModal(true);
  };
  const openDeleteUserModal = () => {
    setDeleteUserModal(true);
  };

  return (
    <div className="flex flex-col bg-backgroundAccent py-3 px-4 gap-5 mt-10 rounded-lg text-white shadow-xl">
      {/*Top section */}
      <p className="text-center">
        User ID: <span className="font-bold">{id}</span>
      </p>
      {/*Middle section */}
      <div className="flex gap-10 items-center">
        {/*Left section */}
        <span>
          <Link href={`/account/${name}`} title={`View ${name}'s account`}>
            <Image
              src={image as string}
              width={50}
              height={50}
              alt="User avatar"
              className="rounded-full"
            />
          </Link>
        </span>
        {/*Right section */}
        <div className="flex flex-col">
          <p>
            Username: <span className="font-bold">{name}</span>
          </p>
          <p>
            Email: <span className="font-bold">{email}</span>
          </p>
          <p>
            Followers: <span className="font-bold">{followersCounter}</span>
          </p>
          <p>
            Account type: <span className="font-bold">{userType}</span>
          </p>
        </div>
      </div>
      {/*Bottom section */}
      <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row justify-between">
        <Button
          styles=""
          title="View user's posts"
          handler={openPostsModal}
          buttonStyles="bg-primaryAccent hover:bg-primaryAccentHover transition-colors text-white px-2 py-1 rounded-lg shadow-xl"
        />
        <Button
          buttonStyles="bg-red-600 hover:bg-red-700 transition-colors text-white px-2 py-1 rounded-xl"
          styles=""
          handler={openDeleteUserModal}
          title="Delete User"
        />
      </div>
      {/*View blog posts headless ui dialog component */}
      <Transition appear show={viewPostsModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closePostsModal}>
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
                <Dialog.Panel className="w-full sm:max-w-lg transform overflow-x-hidden rounded-2xl bg-background p-6 text-left text-white align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 "
                  >
                    {name}'s Blog Posts
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col items-center gap-10">
                    {(blogPosts?.length as number) > 0 ? (
                      blogPosts?.map((post) => (
                        <div
                          key={post.id}
                          className="flex flex-col items-center"
                        >
                          <BlogCard
                            id={post.id}
                            title={post.title}
                            content={post.content}
                            username={post.username}
                            userid={post.userId}
                            likesCnt={post.likesCounter}
                            tags={post.tags}
                            commentsCnt={post.commentsCounter}
                          />
                          <form action={deleteBlogPost}>
                            <input
                              type="hidden"
                              defaultValue={post.id}
                              name="blogPostId"
                            />
                            <FormButton title="Delete post" />
                          </form>
                        </div>
                      ))
                    ) : (
                      <h1>No posts yet</h1>
                    )}
                  </div>

                  <div className="mt-4">
                    <Button
                      styles=""
                      title="Cancel"
                      handler={closePostsModal}
                      buttonStyles="bg-primaryAccent hover:bg-primaryAccentHover transition-colors text-white px-2 py-1 rounded-lg shadow-xl"
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/*headlessui modal for confirm of deleting a user */}
      <Transition appear show={deleteUserModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeDeleteUserModal}
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
                <Dialog.Panel className="w-full sm:max-w-lg transform overflow-x-hidden rounded-2xl bg-background p-6 text-left text-white align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 "
                  >
                    Delete {name}'s account?
                  </Dialog.Title>
                  <form action={deleteUser} className="mt-5">
                    <input type="hidden" defaultValue={id} name="userId" />
                    <FormButton title="Delete user" />
                  </form>

                  <div className="mt-4">
                    <Button
                      styles=""
                      title="Cancel"
                      handler={closeDeleteUserModal}
                      buttonStyles="bg-primaryAccent hover:bg-primaryAccentHover transition-colors text-white px-2 py-1 rounded-lg shadow-xl"
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default UserCard;

const FormButton = ({ title }: { title: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      title={pending ? "Loading..." : title}
      buttonStyles="bg-red-600 hover:bg-red-700 transition-colors text-white px-2 py-1 rounded-xl"
      styles=""
      buttonType={"submit"}
    />
  );
};
