import React from "react";
import ReportProblem from "./ReportProblem";
const Banner = () => {
  return (
    <div className="pb-[100px] sm:pb-[250px] relative">
      <section className="w-full bg-devdistrict-banner absolute bg-cover bg-top -top-[149px] sm:-top-[198px]  -z-10 h-[340px] md:bg-center sm:h-[500px] bg-no-repeat lg:bg-opacity-20 pb-24"></section>
      <div className="text-white text-lg ml-5 font-Montserrat mdL md:text-xl lg:text-2xl md:text-center md:mx-10 -z-10">
        <p>
          Interact with <span className="font-bold">developers</span>{" "}
        </p>
        <p>
          all over the
          <span className="font-bold"> world</span> while{" "}
          <span className="font-bold">sharing</span>
        </p>
        <p>
          experiences and <span className="font-bold">resolving</span> problems{" "}
        </p>
        <button className="text-md md:text-lg xl:text-2xl bg-gradient-to-b from-purple-700 to-purple-900 px-3 py-1 font-bold font-Montserrat rounded-xl mt-7 hover:from-purple-800 hover:to-purple-950 transition-colors hover:text-gray-300 shadow-xl shadow-purple-600/70 hover:shadow-purple-700/60">
          Explore More
        </button>
      </div>
      <section className="hidden md:block absolute right-20 bottom-16 ">
        <ReportProblem />
      </section>
    </div>
  );
};

export default Banner;
