import React from 'react'
import Image from 'next/image'
import { check_Image } from '@/libs/api'
import Link from 'next/link'
export default function SectionList({ data }) {
  return (
    <>
      {data && data.map((res, index) => {
        return (
          <Link key={index} href={res.route}>
            <div className={`flex justify-between gap-[10px] mb-[20px] ${index != data.length - 1 && 'border_bottom'} items-center pb-[20px]`}>
              <div className={`flex flex-[0_0_calc(95%_-_10px)] w-full gap-[10px]`}>
                <div className={`flex-[0_0_calc(30%_-_10px)]`}>
                  <Image className={`rounded-[5px] h-[90px] w-full`} src={check_Image(res.thumbnail_image)} height={50} width={150} alt={"image"} ></Image>
                </div>
                <div className='grid'>
                  <p className='primary_text'>{res.primary_text}</p>
                  <h4 className='title line-clamp-2'>{res.title}</h4>
                  <p className='hashtags'>{res.primary_text}</p>
                </div>
              </div>
              <div className='flex-[1]'>
                <Image src={'/rightArrow.svg'} height={15} width={20} alt={'arrow'} ></Image>
              </div>
            </div>
          </Link>
        )
      })}
    </>
  )
}
