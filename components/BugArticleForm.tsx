"use client";
import React, { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import SelectLanguage from "./SelectLanguage";
import CodeIcon from "@/public/icons/code_icon_white.svg";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BugArticleForm = ({
  userId,
  username,
}: {
  userId: string;
  username: string;
}) => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(0);

  useEffect(() => {
    switch (status) {
      case 200:
        toast.success("Question added successfully", {
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
        toast.error("You must complete the required fields", {
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
      case 403:
        toast.warn("You must be authenticated in order to post a solution", {
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

  const handleRequest = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const author = username;
      const data = { title, description, userId, code, language, author };
      const response = await fetch("/api/bugQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      setStatus(response.status);
      setLoading(false);
      setCode("");
      setTitle("");
      setDescription("");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleRequest}
        className="flex flex-col flex-shrink gap-5 items-center justify-center mt-5 w-full sm:w-[30%]"
      >
        <input
          type="text"
          placeholder="Title"
          name="title"
          maxLength={50}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-backgroundAccentDark  w-full py-2 px-5 text-sm sm:text-base rounded-lg focus:border-none focus:outline-none focus:outline-primaryAccentHover"
        />
        <textarea
          name="content"
          className="bg-backgroundAccentDark py-2 px-5 text-sm sm:text-base rounded-lg focus:border-none focus:outline-none focus:outline-primaryAccentHover w-full min-h-[170px]"
          cols={35}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your problem"
        ></textarea>

        <div className="flex justify-between w-full">
          <h1>Write your code here</h1>
          <SelectLanguage language={language} setLanguage={setLanguage} />
        </div>
        <Editor
          height="40vh"
          language={language}
          value={code}
          onChange={(code: any) => setCode(code)}
          theme="vs-dark"
        />
        <Button
          title={loading ? "Loading..." : "Add question"}
          image={CodeIcon}
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

export default BugArticleForm;
