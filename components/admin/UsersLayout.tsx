"use client";
import React, { useState, Fragment, useMemo } from "react";
import UserCard from "./UserCard";
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
  blogPosts: BlogPost[];
};
const UsersLayout = ({ users }: { users: UserType[] }) => {
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    return query === ""
      ? users
      : users.filter((user) => {
          return user.name?.toLowerCase().startsWith(query.toLowerCase());
        });
  }, [query, users]);
  console.log(filteredUsers);
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-2xl text-white">Users</h1>
      {/*Search user */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-xl text-lg bg-backgroundAccent py-2 px-4 text-white placeholder:text-primaryGray shadow-xl focus:border-none focus:outline-primaryAccentHover"
        placeholder="Search user by name"
      />
      {/*grid of users */}
      <div
        id="users"
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 md:gap-20 "
      >
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              followersCounter={user.followersCounter}
              image={user.image}
              userType={user.userType}
              blogPosts={user.blogPosts}
            />
          ))
        ) : (
          <h1 className="text-xl text-primaryGray">No users found</h1>
        )}
      </div>
    </div>
  );
};

export default UsersLayout;
