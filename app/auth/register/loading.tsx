import React from "react";
import Image from "next/image";
import LoadingIcon from "@/public/icons/loading_icon.svg";
const loading = () => {
  return (
    <div className="flex justify-center my-24">
      <Image
        src={LoadingIcon}
        alt="Loading..."
        width={250}
        className="animate-spin duration-1000"
      />
    </div>
  );
};

export default loading;
