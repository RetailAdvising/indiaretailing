import React from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({
    weight: ["300","400","500","600","700"],
    display: "block",
    preload: true,
    style: 'normal',
    subsets: ["latin"],
    variable: '--font-inter'
  })

const KeyPointsCard = ({data, len}) => {
  return (
    <div className='bg-[#F0F0F0] p-2 h-full'>
       <p className='text-[#797979] text-[16px] font-semibold'>[{`${len < 10 && '0'}${data.idx}`}]</p>

       <p className={`text-[#202121] mt-1 text-[18px] md:text-[16px] font-normal`}>{data.key_points}</p>
    </div>
  )
}

export default KeyPointsCard