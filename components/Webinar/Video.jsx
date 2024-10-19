import React from "react";
import ImageLoader from "../ImageLoader";

const Video = ({ data }) => {
  return (
    <>
      <div className="flex mt-5 no_scroll space-x-3">
        {data.map((res, i) => (
          <div key={i} className="min-w-[275px]">
            <img src={'https://indiaretailing.go1cms.com'+res.image} className="h-[150px] rounded-lg w-full" alt="" />
            <h2 className="text-[16px] font-medium mt-3">{res.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default Video;
