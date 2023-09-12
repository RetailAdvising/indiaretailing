import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
export default function List({ data,border_b, flex, height, width, imgWidth, isLanding, boxShadow, check, category }) {
  const router = useRouter();
  return (
    <>
      {data.map((res, index) => {
        return (
          <div className={`flex gap-[10px] ${border_b ? border_b : null} ${flex}`} onClick={() => router.push(`/${router.asPath.split('/')[1] +'/' + category + '/' + res.route}`)} key={index}>
            <div className={`${imgWidth}`}>
              <Image className={`${height} ${width}  ${boxShadow && 'rounded-[5px]'}`} src={check ? check_Image(res.product_image) : res.image} height={210} width={162} alt={res.title}></Image>
            </div>
            <div className={`flex flex-col items-start gap-[10px] justify-center`}>
              {res.primary_text && <p className={`flex items-center`}><span className={`primary_text pr-[10px]`}>{res.primary_text}</span><span className='h-[15px] w-[2px] bg-[#121212]'></span><span className={`secondary_text pl-[10px]`}>{res.secondary_text}</span></p>}
              <h6 className='line-clamp-2 font-semibold'>{res.item_title}</h6>
              {res.short_description && <p className={`sub_title line-clamp-2`}>{res.short_description}</p>}
              {/* <button className={`primary_btn p-[5px] text-[13px]`}>select options</button> */}
            </div>
          </div>
        )
      })}
    </>
  )
}
