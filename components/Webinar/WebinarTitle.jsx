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


const WebinarTitle = ({data}) => {
  return (
    <>
        {data &&
        <div className={`title_div flex justify-between`}>
          <div className='cursor-pointer'>
            <h6 className={`text-[24px] font-medium ${inter.className}`}>{data.title ? data.title : data.category_name ? data.category_name : ''}</h6>
            {data.title && <div className='webinar-title-line mt-[2px]'></div>}
          </div>
        </div>
      }
    </>
  )
}

export default WebinarTitle