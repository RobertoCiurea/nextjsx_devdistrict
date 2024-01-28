import React from "react";
import Link from "next/link";
import Image from "next/image";
import ReportIcon from "@/public/icons/report_icon.svg";

const ReportProblem = () => {
  return (
    <div className="flex mt-5 items-center gap-2">
      <Image src={ReportIcon} alt="Report Icon" />
      <Link href="#" className="font-Raleway text-gray-400 text-sm underline ">
        Report a problem
      </Link>
    </div>
  );
};

export default ReportProblem;
