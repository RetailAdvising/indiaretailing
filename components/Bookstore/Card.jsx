import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
export default function Card({ data, category, check, flex, isBorder, boxShadow, isLanding, imgClass }) {
  const router = useRouter();
  return (
    <>
      {data.map((res, index) => {
        return (
          <div key={index} onClick={() => router.push(`${isLanding ? '/bookstore/' + category + '/' + res.route + '?id=' + res.name : '/bookstore/' + category + '/' + res.route + '?id=' + res.name}`)} className={`${flex} ${isBorder && 'border p-[10px] rounded-[5px]'}`}>
            <div className={``}>
              <Image className={`${imgClass ? imgClass : 'h-[300px] w-full'} ${boxShadow && 'shadow-2xl rounded-[5px]'}`} src={check ? check_Image(res.product_image) : res.image} height={200} width={300} alt={res.title ? res.title : 's'}></Image>
            </div>
            <p className={`pt-[15px] text-[16px] font-[500]`}>{res.item_title}</p>
          </div>
        )
      })}
    </>
  )
}
