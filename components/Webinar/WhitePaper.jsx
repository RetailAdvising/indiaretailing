import React from "react";
import ImageLoader from "../ImageLoader";

const WhitePaper = ({ data }) => {
  console.log("wp", data);

  return (
    <>
      {/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mt-5">
        {data.map((res, i) => (
          <div key={i} className="shadow-lg border rounded-2xl p-3">
            <ImageLoader
              src={res.image}
              style={`rounded-[5px] h-[190px] md:h-[140px] w-full`}
            />
            <p className="text-[18px] font-medium mt-2">{res.title}</p>
          </div>
        ))}
      </div> */}
      WhitePaper
    </>
  );
};

export default WhitePaper;
