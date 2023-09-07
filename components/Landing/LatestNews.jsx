import React from 'react'
import Image from 'next/image'
import { check_Image } from '@/libs/api'
import Link from 'next/link'
export default function LatestNews({ data, height, width }) {
  return (
    <>
      {data && data.map((res, index) => {
        return (
          <Link key={index} href={'/news/'+res.route}>
            <div className={`pb-[10px] ${!res.image && ((index != data.length - 1 || index == 1)) && 'border_bottom'}`}>
              {(res.thumbnail_image && index < 2) && <Image priority src={check_Image(res.thumbnail_image)} className={`rounded-[5px] ${height} ${width}`} width={400} height={200} alt={res.title} />}
              {res.title && <p className={`my-[10px] line-clamp-1 title `}>{res.title}</p>}
              {(res.blog_intro && index >= 2) && <p className={`${!res.image && 'mb-[10px]'} sub_title line-clamp-2`}>{res.blog_intro}</p>}
            </div>
          </Link>
        )
      })}
    </>
  )
}
