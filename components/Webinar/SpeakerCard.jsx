import React from 'react'
import ImageLoader from '../ImageLoader'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({
    weight: ["300","400","500","600","700"],
    display: "block",
    preload: true,
    style: 'normal',
    subsets: ["latin"],
    variable: '--font-inter'
})

const SpeakerCard = ({ data }) => {
  return (
    <div className='relative flex flex-row gap-3 w-[280px]'>
      <div className='flex-shrink-0'>
        <ImageLoader src={data.profile_image} style="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px] rounded-xl" />
        <div className='absolute top-0 bg-[#F25022] rounded-tl-xl rounded-br-lg p-[6px] sm:p-[8px]'>
          <Image src="/webinar/microphone.png" width={8} height={7} />
        </div>
      </div>

      <div className='flex flex-col justify-between'>
        <div>
          <p className={`text-[14px] sm:text-[16px] font-medium ${inter.className}`}>
            {data.name1}
          </p>
          <p className='text-xs sm:text-sm text-[#666666] font-normal'>
            {data.designation}
          </p>
        </div>
        <span className='text-[#F25022] text-[12px] sm:text-[14px]'>
          {data.company_name}
        </span>
      </div>
    </div>
  )
}

export default SpeakerCard
