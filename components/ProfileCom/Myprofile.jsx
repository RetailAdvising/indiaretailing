import React from 'react'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
import Image from 'next/image'

export default function Myprofile({ profileInfo, navigateToProfile }) {
  
  const router = useRouter();

  const clickTogo = (res,index) =>{
    navigateToProfile(res)
  }

  return (
    <>
      {profileInfo.map((res, index) => {
        return (
          <div onClick={()=>{clickTogo(res,index)}} className={`${res.selected == 1 ? 'lg:bg-[#eca2a221] lg:text-black' : null} flex items-center rounded-[10px] p-[10px] cursor-pointer gap-[10px] lg:hover:bg-[#eca2a221] lg:hover:text-black first:mt-[10px] m-[12px_15px]`} key={index} >
            <div className='flex items-center justify-center h-[18px]'><Image className="object-contain h-[18px]" height={20} priority width={20} alt='search' src={res.icon}></Image></div>
            <h6 className={'text-[15px] font-semibold gray_color'}>{res.title}</h6>
          </div>
        )
      })}
    </>
  )
}