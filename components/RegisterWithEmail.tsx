"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
//toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const RegisterWithEmail = () => {
  const router = useRouter();
  const session = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterRequest = async () => {
    try {
      const data = { name, email, password };
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      const userData = await response.json();
      if (userData.status === 200) router.push("/");
      else
        toast.error(`${userData.message}. Please try again!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
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
      <form
        action={handleRegisterRequest}
        className="flex flex-col items-center gap-3"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="w-full bg-backgroundAccent text-white p-1 md:p-2 pl-2 focus:outline-none focus:border-none focus:outline-2 focus:outline-primaryGray text-md md:text-xl rounded-lg text-centers"
          placeholder="yourname"
          name="name"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-full bg-backgroundAccent text-white p-1 md:p-2 pl-2 focus:outline-none focus:border-none focus:outline-2 focus:outline-primaryGray text-md md:text-xl rounded-lg text-centers"
          placeholder="email@example.com"
          name="email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="w-full bg-backgroundAccent text-white p-1 md:p-2 pl-2 focus:outline-none focus:border-none focus:outline-2 focus:outline-primaryGray text-md md:text-xl rounded-lg text-centers"
          placeholder="password"
          name="password"
          required
        />
        <button
          type="submit"
          className="m-2 w-full bg-primaryAccent p-2 text-white font-semibold text-lg md:text-xl rounded-lg mx-auto hover:bg-primaryAccentHover hover:text-gray-300"
        >
          Regitser with Email
        </button>
      </form>
    </>
  );
};

export default RegisterWithEmail;
