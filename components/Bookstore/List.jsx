import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
export default function List({ data, flex, height, width, imgWidth, isLanding, boxShadow, check, category }) {
  const router = useRouter();
  return (
    <>
      {data.map((res, index) => {
        return (
          <div className={`flex gap-[10px] ${flex}`} onClick={() => router.push(`${isLanding ? '/bookstore/' + category + '/' + res.item_title + '?id=' + res.name : router.asPath + '/book' + index}`)} key={index}>
            <div className={`${imgWidth}`}>
              <Image className={`${height} ${width}  ${boxShadow && 'shadow-2xl rounded-[5px]'}`} src={check ? check_Image(res.product_image) : res.image} height={150} width={200} alt={res.title}></Image>
            </div>
            <div className={`flex flex-col items-start gap-[10px] justify-center`}>
              {res.primary_text && <p className={`flex items-center`}><span className={`primary_text pr-[10px]`}>{res.primary_text}</span><span className='h-[15px] w-[2px] bg-[#121212]'></span><span className={`secondary_text pl-[10px]`}>{res.secondary_text}</span></p>}
              <p className='line-clamp-2'>{res.item_title}</p>
              {res.sub_title && <p className={`sub_title line-clamp-2`}>{res.sub_title}</p>}
              {/* <button className={`primary_btn p-[5px] text-[13px]`}>select options</button> */}
            </div>
          </div>
        )
      })}
    </>
  )
}
