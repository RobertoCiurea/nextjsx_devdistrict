import React, { SVGProps } from "react";
import Image from "next/image";
type ButtonType = {
  title: string;
  image?: SVGProps<SVGSVGElement> | string | any;
  buttonStyles: string;
  styles: string;
  imgWidth?: number;
  imgHeight?: number;
  buttonType?: string | any;
  handler?: () => void | any;
};
const Button = ({
  title,
  image,
  buttonStyles,
  imgWidth,
  imgHeight,
  styles,
  buttonType,
  handler,
}: ButtonType) => {
  if (image) {
    return (
      <div
        className={` cursor-pointer w-full  sm:text-base sm:px-3 sm:py-3 sm:w-auto py-2 px-1 flex justify-center gap-3  transition-colors ${styles} `}
        onClick={handler}
      >
        <Image src={image} alt={title} width={imgWidth} height={imgHeight} />

        <button
          className={buttonStyles}
          type={buttonType ? buttonType : "button"}
        >
          {title}
        </button>
      </div>
    );
  } else {
    return (
      <button className={buttonStyles} onClick={handler}>
        {title}
      </button>
    );
  }
};

export default Button;
