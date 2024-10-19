import React, { useState } from "react";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  display: "block",
  preload: true,
  style: "normal",
  subsets: ["latin"],
  variable: "--font-inter",
});

const Agenda = ({ data }) => {
  const [seclected, setSelcted] = useState(-1);

  const toggle = (index) => {
    for (let i = 0; i < data.length; i++) {
      if (index == i) {
        seclected == index ? setSelcted(-1) : setSelcted(i);
      }
    }
  };

  return (
    <>
      {data.map((res, i) => (
        <div className="border-b">
          <div className="flex justify-between items-center py-2">
            <div>
              <span className="bg-[#F2F2F2] px-2 rounded-md text-[#999999] md:text-[10px] lg:text-sm font-semibold font-[Roboto] py-[2px]">{`${res.start_time} - ${res.end_time}`}</span>
              <p className={`mt-2 md:text-[12px] lg:text-[18px] font-normal ${inter.className}`}>
                {res.content}
              </p>
            </div>

            <div>
            <span className="text-[26px] cursor-pointer" onClick={()=> toggle(i)}>{(seclected == i) ? '-' : '+'}</span>
            </div>
          </div>

          <p className={`${seclected == i ? 'block' : 'hidden'} py-2`}>desc</p>
        </div>
      ))}
    </>
  );
};

export default Agenda;
