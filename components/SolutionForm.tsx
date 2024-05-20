"use client";
import React, { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import Button from "./Button";
//react toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SolutionForm = ({
  questionId,
  userId,
  language,
  author,
}: {
  questionId: string;
  userId: string;
  language: string;
  author: string;
}) => {
  const [code, setCode] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
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
  const handlreRequest = async () => {
    setLoading(true);
    try {
      const data = { content, code, language, questionId, userId, author };
      const response = await fetch("/api/solution", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      setStatus(response.status);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handlreRequest} className="flex flex-col  gap-5">
        <h1 className="text-xl text-white font-Montserrat text-start">
          Type your solution
        </h1>
        <textarea
          name="content"
          className="bg-backgroundAccentDark py-2 px-5 text-sm sm:text-base rounded-lg focus:border-none focus:outline-none focus:outline-primaryAccentHover w-full min-h-[170px]"
          cols={100}
          placeholder="Describe the solution"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <h1>Type your solution code here (optional)</h1>
        <Editor
          language={language}
          height={"30vh"}
          value={code}
          theme="vs-dark"
          onChange={(code: any) => setCode(code)}
        />
        <div className="flex justify-center">
          <Button
            title={loading ? "Loading..." : "Submit"}
            buttonStyles="bg-primaryAccent hover:bg-primaryAccentHover sm:text-lg transition-colors rounded-xl shadow-xl px-3 py-1"
            styles=""
            buttonType={"submit"}
          />
        </div>
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

export default SolutionForm;
