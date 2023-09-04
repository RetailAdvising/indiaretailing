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
          <div key={index} onClick={() => router.push(`${isLanding ? '/'+router.asPath.split('/')[1]+'/'+ category + '/' + res.route : '/'+router.asPath.split('/')[1]+'/'+ router.asPath.split('/')[3] + '/' + res.route}`)} className={`${flex} ${isBorder && 'border p-[10px] rounded-[5px]'}`}>
            <div className={`${padding ? 'p-[10px]' : null}`}>
              <Image className={` ${object_fit ? object_fit : 'object-cover'} ${imgClass ? imgClass : (height ? height : 'h-[300px] w-full')} ${boxShadow && 'shadow-2xl rounded-[5px]'}`} src={check ? check_Image(res.product_image) : res.image} height={200} width={300} alt={res.title ? res.title : 's'}></Image>
            </div>
            <p className={`pt-[15px] line-clamp-2 text-[16px] font-[500]`}>{res.item_title}</p>
            
          </div>
        )
      })}
    </>
  )
}
