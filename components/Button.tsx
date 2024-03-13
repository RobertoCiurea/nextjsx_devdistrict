import React, { SVGProps } from "react";
import Image from "next/image";
type ButtonType = {
  title: string;
  image?: SVGProps<SVGSVGElement> | string | any;
  buttonStyles: string;
  styles: string;
};
const Button = ({ title, image, buttonStyles, styles }: ButtonType) => {
  if (image) {
    return (
      <div
        className={` cursor-pointer w-full  sm:text-base sm:px-3 sm:py-3 sm:w-auto py-2 px-1 flex justify-center gap-3  transition-colors ${styles} `}
      >
        <Image src={image} alt={title} />

        <button className={buttonStyles}>{title}</button>
      </div>
    );
  } else {
    return <button className={buttonStyles}>{title}</button>;
  }
};

export default Button;
