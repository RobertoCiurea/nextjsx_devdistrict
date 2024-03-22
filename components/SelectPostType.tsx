"use client";
import React, { useState, Fragment } from "react";
import Button from "./Button";
import CreateIcon from "@/public/icons/create_icon.svg";
import CodeIconWhite from "@/public/icons/code_icon_white.svg";
import BlogIcon from "@/public/icons/blog_icon.svg";
import Link from "next/link";
import Image from "next/image";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
const SelectPostType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <>
      <Button
        title="New post"
        image={CreateIcon}
        buttonStyles="text-white font-Raleway"
        styles="hover:shadow-2xl hover:bg-primaryAccentHover bg-primaryAccent rounded-xl shadow-xl mx-10"
        handler={openModal}
      />
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
                <Dialog.Panel className="w-full px-2 sm:px-10 max-w-md transform overflow-hidden rounded-2xl bg-background py-14 text-left align-middle shadow-xl transition-all text-white font-Raleway flex flex-col  gap-10">
                  <Link href="/create/new-post" className="focus:none">
                    <div className="flex justify-center gap-2 border-2 border-primaryAccentHover py-2 px-5 rounded-xl cursor-pointer  hover:bg-primaryAccentHover">
                      <Image
                        src={BlogIcon}
                        alt="Blog Icon"
                        width={30}
                        height={30}
                      />
                      <h1>Create a new blog post</h1>
                    </div>
                  </Link>
                  <Link href="/create/new-question" className="focus:none">
                    <div className="flex justify-center gap-2 border-2 border-primaryAccentHover py-2 px-5 rounded-xl cursor-pointer hover:bg-primaryAccentHover">
                      <Image
                        src={CodeIconWhite}
                        alt="Code Icon"
                        width={30}
                        height={30}
                      />
                      <h1>Create a question about a problem or a bug</h1>
                    </div>
                  </Link>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SelectPostType;
