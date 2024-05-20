"use client";
import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { languages } from "@/app/utils/programmingLanguages";
import Image from "next/image";
import DownArrowIcon from "@/public/icons/down_arrow_icon.svg";
const SelectLanguage = ({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: any;
}) => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full items-center justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            {language}
            <Image
              src={DownArrowIcon}
              alt="Down Arrow"
              width={25}
              height={25}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 z-10 origin-top-right h-[200px] overflow-y-scroll text-white rounded-md bg-backgroundAccent shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              {languages.map((lang, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`${
                        language === lang
                          ? "bg-primaryAccent"
                          : active
                          ? "bg-violet-500 text-white"
                          : "text-primaryGray"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => setLanguage(lang)}
                    >
                      {lang}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default SelectLanguage;
