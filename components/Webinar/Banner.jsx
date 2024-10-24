import React from "react";
import ImageLoader from "../ImageLoader";
import { domain } from "@/libs/config/siteConfig";

const Banner = ({ data, click_data }) => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${data.banner_image ? `https://${domain}${data.banner_image}` : '/no-image.jpg'})`,
        }}
        className="lg:px-[15px] px-5 py-5 lg:py-10 flex flex-col bg-cover justify-start"
      >
        <div className="container mx-auto">
          {/* Brand Logos */}
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-8 items-start">
            {/* First logo */}
            {data.banner_logo_1 && (
              <div className="w-full lg:w-auto">
                <ImageLoader
                  style="rounded-[5px] object-contain h-[60px] w-full lg:w-auto"
                  src={data.banner_logo_1}
                />
              </div>
            )}
            {/* Second logo */}
            {data.banner_logo_2 && (
              <div className="w-full lg:w-auto">
                <ImageLoader
                  style="rounded-[5px] object-contain h-[60px] w-full lg:w-auto"
                  src={data.banner_logo_2}
                />
              </div>
            )}
          </div>

          {/* Banner Titles */}
          <div className="mt-3 lg:mt-2 text-center lg:text-left">
            {data.banner_title && (
              <h1 className="text-3xl lg:text-5xl font-bold text-white">
                {data.banner_title}
              </h1>
            )}
            {data.span_title && (
              <h1 className="text-3xl lg:text-5xl font-bold text-yellow-400 mt-2">
                {data.span_title}
              </h1>
            )}
          </div>

          {/* Date */}
          {data.date && (
            <div className="mt-4 text-center lg:text-left">
              <span className="font-normal text-[18px] lg:text-[20px] text-white">
                {data.date}
              </span>
            </div>
          )}

          {/* Button */}
          <div className="mt-6 text-center lg:text-left">
            <button
              onClick={() => click_data(data, "register")}
              className="w-fit text-[#CA4A56] bg-white font-bold uppercase px-4 py-2 lg:py-3 rounded-3xl text-sm lg:text-base"
            >
              {data.button_name}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
