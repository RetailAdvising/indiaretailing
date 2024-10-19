import React from "react";
import ImageLoader from "../ImageLoader";

const Banner = ({ data }) => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(https://indiaretailing.go1cms.com${data.banner_image})`,
        }}
        className="lg:px-20 px-5 py-3 lg:py-10 flex flex-col bg-cover justify-start"
      >
        {/* Brand Logo and Name */}
        <div className="inline-flex w-fit gap-3 items-center">
          <ImageLoader
            style={`rounded-[5px] h-[60px] w-[70px]`}
            src={data.brand_logo}
          />
          <h1 className="text-white text-3xl lg:text-4xl font-bold">
            {data.brand_name}
          </h1>
        </div>

        {/* Banner Title and Subtitle */}
        <div className="mt-4">
          <h1 className="text-3xl lg:text-5xl text-white mt-3">
            {data.banner_title}
          </h1>
          <h1 className="text-3xl lg:text-5xl text-yellow-400 mt-3">
            {data.span_title}
          </h1>
        </div>

        {/* Date */}
        <span className="font-normal text-[18px] lg:text-[20px] text-white mt-5">
          {data.date}
        </span>

        {/* Button */}
        <button className="w-fit text-[#CA4A56] bg-white font-bold uppercase mt-5 px-4 py-2 lg:py-3 rounded-3xl text-sm lg:text-base">
          {data.button_name}
        </button>
      </div>
    </>
  );
};

export default Banner;
