import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
export default function Card({ data,height, category, padding ,check, flex,object_fit, isBorder, boxShadow, isLanding, imgClass }) {
  
  const router = useRouter();

  return (
    <>
      {data.map((res, index) => {
        return (
          <div key={index} onClick={() => router.push(`${isLanding ? '/'+router.asPath.split('/')[1]+'/'+ category + '/' + res.route : '/'+router.asPath.split('/')[1]+'/'+ router.asPath.split('/')[3] + '/' + res.route}`)} className={`${flex} cursor-pointer ${isBorder && 'border p-[10px] rounded-[5px]'}`}>
            <div className={`${padding ? 'p-[10px]' : null}`}>
              <Image className={` ${object_fit ? object_fit : 'object-contain'} ${imgClass ? imgClass : (height ? height : 'h-[150px]')} ${boxShadow && 'rounded-[5px]'}`} src={check ? check_Image(res.product_image) : res.image} height={300} width={242} alt={res.title ? res.title : 's'}></Image>
            </div>
            <h6 className={`pt-[10px] line-clamp-2 text-[16px] md:text-[14px] leading-normal font-[500] text-center`}>{res.item_title}</h6>
            
          </div>
        )
      })}
    </>
  )
}
