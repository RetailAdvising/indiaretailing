import React, { useState } from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { motion } from "framer-motion";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  display: "block",
  preload: true,
  style: "normal",
  subsets: ["latin"],
  variable: "--font-inter",
});

const Agenda = ({ data }) => {
  const [selected, setSelected] = useState(-1);

  const toggle = (index) => {
    setSelected(selected === index ? -1 : index);
  };

  return (
    <>
      {data.map((res, i) => (
        <div key={i} className="border-b">
          <div className="flex justify-between items-center py-3 cursor-pointer" onClick={() => toggle(i)}>
            <div>
              <span className="bg-[#F2F2F2] px-2 rounded-md text-[#999999] md:text-[10px] lg:text-sm font-semibold font-[Roboto] py-[2px]">
                {`${res.start_time} - ${res.end_time}`}
              </span>
              <p
                className={`mt-2 md:text-[12px] lg:text-[18px] font-normal ${inter.className}`}
              >
                {res.content}
              </p>
            </div>

            <div>
              <span
                className="text-[26px] cursor-pointer"
              >
                {selected === i ? "-" : "+"}
              </span>
            </div>
          </div>

          <motion.div
            initial={false}
            animate={{
              height: selected === i ? "auto" : 0,
              opacity: selected === i ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="py-2">
              {res.description}
            </p>
          </motion.div>
        </div>
      ))}
    </>
  );
};

export default Agenda;
