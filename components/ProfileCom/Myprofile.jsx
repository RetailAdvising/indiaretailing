import React from 'react'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
import Image from 'next/image'

export default function Myprofile({ profileInfo }) {
  
  const router = useRouter();

  return (
    <>
      {profileInfo.map((res, index) => {
        return (
          <div className={'flex items-center p-[10px] cursor-pointer gap-[10px]'} key={index} >
            <div className='flex items-center justify-center h-[25px]'><Image className="object-contain h-[23px]" height={40} priority width={20} alt='search' src={res.icon}></Image></div>
            <h6 className={'text-[15px] font-semibold gray_color'}>{res.title}</h6>
          </div>
        )
      })}
    </>
  )
}