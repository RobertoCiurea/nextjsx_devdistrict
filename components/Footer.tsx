import React from "react";
import Image from "next/image";
import FooterBanner from "@/public/images/footer_banner.png";
import FacebookIcon from "@/public/icons/facebook_icon.svg";
import TwitterIcon from "@/public/icons/twitter_icon.svg";
import LinkedinIcon from "@/public/icons/linkedin_icon.svg";
import InstagramIcon from "@/public/icons/instagram_icon.svg";
//newsletter from
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
const Footer = () => {
  return (
    <section className="flex flex-col gap-20 items-center border-b-8 border-primaryAccentHover p-10">
      <div className="flex justify-around w-full flex-col gap-20 md:flex-row items-center ">
        {/*Left section */}
        <div className="flex flex-col gap-12 md:justify-evenly">
          {/*newsletter section */}

          <NewsletterForm />
          {/*useful links */}
          <div className="flex flex-col text-gray-500 gap-20">
            <div className="flex justify-between underline">
              <div className="flex flex-col under">
                <Link
                  href="#"
                  className="hover:text-primaryGray transition-transform hover:translate-x-2"
                >
                  About us
                </Link>
                <Link
                  href="#"
                  className="hover:text-primaryGray transition-transform hover:translate-x-2"
                >
                  Contact us
                </Link>
                <Link
                  href="#"
                  className="hover:text-primaryGray transition-transform hover:translate-x-2"
                >
                  Report problem
                </Link>
              </div>
              <div className="flex flex-col">
                <Link
                  href="#"
                  className="hover:text-primaryGray transition-transform hover:translate-x-2"
                >
                  Terms and Conditions
                </Link>
                <Link
                  href="#"
                  className="hover:text-primaryGray transition-transform hover:translate-x-2"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="hover:text-primaryGray transition-transform hover:translate-x-2"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/*Right secton */}
        {/*socials */}
        <div className="flex flex-col items-center gap-10">
          <div className="flex justify-center gap-8 md:gap-12">
            <Image
              src={FacebookIcon}
              alt="Facebook icon"
              className="rounded-xl cursor-pointer hover:-translate-y-2 transition-transform"
            />
            <Image
              src={TwitterIcon}
              alt="X icon"
              className="cursor-pointer hover:-translate-y-2 transition-transform"
            />
            <Image
              src={LinkedinIcon}
              alt="Linkedin icon"
              className="cursor-pointer hover:-translate-y-2 transition-transform"
            />
            <Image
              src={InstagramIcon}
              alt="Instagram icon"
              width={35}
              className="cursor-pointer hover:-translate-y-2 transition-transform"
            />
          </div>
          <h1 className="text-xl text-primaryGray">
            DevDistrict Copyright &copy; 2024
          </h1>
        </div>
      </div>
      <h1 className="font-Raleway text-primaryGray text-center">
        Made with<span className="text-xl "> &#9829;</span> by Ciurea Roberto
        Ionut
      </h1>
    </section>
  );
};

export default Footer;
