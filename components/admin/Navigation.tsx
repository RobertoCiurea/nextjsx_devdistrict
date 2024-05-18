"use client";
import React from "react";

const Navigation = () => {
  const scrollToUser = () => {
    const users = document.getElementById("users");
    if (users) {
      users.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }
  };
  const scrollToComment = () => {
    const comments = document.getElementById("comments");
    if (comments) {
      comments.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }
  };
  const scrollToReport = () => {
    const reports = document.getElementById("reports");
    if (reports) {
      reports.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }
  };
  return (
    <div className="font-Raleway flex gap-5 text-lg">
      <h1 className="text-white">Navigate to:</h1>
      <div className="flex gap-10">
        <h1
          onClick={scrollToUser}
          className="text-white cursor-pointer underline hover:text-primaryAccent transition-colors"
        >
          User
        </h1>
        <h1
          onClick={scrollToComment}
          className="text-white cursor-pointer underline hover:text-primaryAccent transition-colors"
        >
          Comments
        </h1>
        <h1
          onClick={scrollToReport}
          className="text-white cursor-pointer underline hover:text-primaryAccent transition-colors"
        >
          Reports
        </h1>
      </div>
    </div>
  );
};

export default Navigation;
