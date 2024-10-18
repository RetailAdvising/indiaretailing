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

const SpeakerCard = ({data}) => {
  return (
    <div className='relative flex gap-3'>
        <div className=''>
            <ImageLoader src={data.profile_image} style={"h-[90px] w-[90px] rounded-xl"} />
            <div className='absolute top-0 bg-[#F25022] rounded-tl-xl rounded-br-lg p-[8px]'>
                <Image src="/webinar/microphone.png" width={8} height={7} />
            </div>
        </div>

        <div className='flex flex-col justify-between'>
            <div>
            <p className={`text-[16px] font-medium ${inter.className}`}>{data.name1}</p>
            <p className='text-sm text-[#666666] font-normal'>{data.designation}</p>
            </div>
            <span className='text-[#F25022] text-[14px]'>{data.company_name}</span>
        </div>
    </div>
  )
}

export default SpeakerCard