"use client";
import React, { useState, Fragment, useEffect } from "react";
import BlogIcon from "@/public/icons/blog_icon.svg";
import Button from "@/components/Button";
import { tags } from "@/app/utils/tags";
import Image from "next/image";
import CloseIcon from "@/public/icons/close_cion.svg";
import { Combobox, Transition } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckIcon from "@/public/icons/check_icon.svg";

const BlogPostForm = ({
  userId,
  username,
}: {
  userId: string;
  username: string;
}) => {
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [tagsList, setTagsList] = useState<{ id: string; name: string }[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [query, setQuery] = useState<string>("");
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const addTagToList = (tagName: string) => {
    if (tagsList.length >= 5) {
      toast.error("You can't add more tags", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (tagsList.filter((tag) => tag.name === tagName).length > 0) {
      toast.error("Tag already used", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setTagsList((prevTagsList) => [
        ...prevTagsList,
        { id: crypto.randomUUID(), name: tagName },
      ]);
      setQuery(tagName);
    }
    setQuery("");
  };
  const deleteTag = (tagId: string) => {
    const updatedTagsList = tagsList.filter((tag) => tag.id !== tagId);
    setTagsList(updatedTagsList);
  };

  const filteredtags =
    query === ""
      ? tags
      : tags.filter((tag) => {
          return tag.name.toLowerCase().includes(query.toLowerCase());
        });

  async function handleBlogPostRequest(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { title, content, userId, username, tagsList };
      const response = await fetch("/api/blogPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      // console.log(response);
      setLoading(false);
      setStatus(response.status);
    } catch (error) {
      console.log(error);
    }
    setTitle("");
    setContent("");
    setTagsList([]);
    setQuery("");
  }
  //manage notifications (user feedback)
  useEffect(() => {
    switch (status) {
      case 200:
        toast.success("Blog post created successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        break;
      case 400:
        toast.error("You must complete all the fields", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        break;
      case 500:
        toast.error("Oops... Something went wrong!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
    }
    setStatus(0);
  }, [status]);
  return (
    <>
      <form
        onSubmit={handleBlogPostRequest}
        className="flex flex-col flex-shrink gap-5 items-center justify-center mt-5 w-full sm:w-[30%]"
      >
        <input
          type="text"
          name="title"
          placeholder="title"
          className="bg-backgroundAccent w-full py-2 px-5 text-sm sm:text-base rounded-lg focus:border-none focus:outline-none focus:outline-primaryAccentHover"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="content"
          placeholder="content"
          rows={5}
          className="bg-backgroundAccent py-2 px-5 text-sm sm:text-base rounded-lg focus:border-none focus:outline-none focus:outline-primaryAccentHover w-full min-h-[50px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input type="text" defaultValue={userId} name="userId" hidden />
        <Combobox value={selectedTag} onChange={setSelectedTag}>
          <Combobox.Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(tag: any) => tag.name}
            className={
              "bg-backgroundAccent relative w-full py-2 px-5 text-sm sm:text-base rounded-lg focus:border-none focus:outline-none focus:outline-primaryAccentHover"
            }
            placeholder="tag"
          />

          <Combobox.Options
            className={"min-h-[75px] max-h-[200px] overflow-y-scroll "}
          >
            {filteredtags.map((tag, index) => (
              <Combobox.Option key={index} value={tag.name} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    onClick={() => addTagToList(tag.name)}
                    className={`${
                      active
                        ? "bg-primaryAccentHover rounded-xl border-none"
                        : "bg-transparent"
                    } px-4 py-2 cursor-pointer h-[50px] border-b-2 mb-5 border-white flex items-center gap-5`}
                  >
                    {selected && <Image src={CheckIcon} alt="Selected" />}
                    {tag.name}
                  </li>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
        <div className="flex jusitfy-evenly">
          {tagsList.length > 0 &&
            tagsList.map((tag) => (
              <span
                className="mx-5 flex flex-col bg-primaryAccentHover py-1 px-3 rounded-2xl min-w-[100px] justify-center items-center"
                key={tag.id}
              >
                <div className="flex w-full justify-end">
                  <Image
                    src={CloseIcon}
                    alt="Close Icon"
                    className="cursor-pointer"
                    onClick={() => deleteTag(tag.id)}
                  />
                </div>
                {tag.name}
              </span>
            ))}
        </div>
        <Button
          title={loading ? "Loading..." : "Create"}
          image={BlogIcon}
          imgWidth={20}
          imgHeight={20}
          buttonType={"submit"}
          styles="hover:shadow-2xl hover:bg-primaryAccentHover bg-primaryAccent rounded-xl shadow-xl mx-10 sm:w-[75%]"
          buttonStyles="font-Raleway text-white"
        />
      </form>
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

export default BlogPostForm;
