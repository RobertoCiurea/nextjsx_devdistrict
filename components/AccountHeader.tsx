"use client";
import React from "react";
import Image from "next/image";
import EditIcon from "@/public/icons/edit_icon.svg";
import FollowIcon from "@/public/icons/follow_icon.svg";
import Button from "./Button";
type UserType = {
  id: string | null | undefined;
  name: string | null;
  email: string | null;
  image: string | null;
};

const AccountHeader = ({
  user,
  isMyAccount,
}: {
  user: UserType;
  isMyAccount: boolean;
}) => {
  //get the params and check if the params match to the id received from props

  // console.log(user);
  return (
    <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between mx-2 md:mx-20 xl:mx-[25rem]">
      {/*User profile */}
      <div className="flex gap-2 items-end ">
        <Image
          src={user.image as string}
          alt={user.name as string}
          width={65}
          height={65}
          className="rounded-full"
        />
        {/*User data */}
        <div className="flex flex-col flex-start text-white">
          <h1 className="text-xl font-Montserrat">{user.name}</h1>
          <p className="text-sm font-Raleway ">241 folowers</p>
        </div>
      </div>
      {/*Edit profile button */}
      {isMyAccount ? (
        <Button
          title="Edit Profile"
          image={EditIcon}
          buttonStyles="text-white font-Raleway"
          styles="hover:shadow-2xl hover:bg-primaryAccentHover bg-primaryAccent rounded-xl shadow-xl "
        />
      ) : (
        <Button
          title="Follow"
          image={FollowIcon}
          buttonStyles="text-white font-Raleway"
          styles="hover:shadow-2xl hover:bg-primaryAccentHover bg-primaryAccent rounded-xl shadow-xl "
        />
      )}
    </div>
  );
};

export default AccountHeader;
