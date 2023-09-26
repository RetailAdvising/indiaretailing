import React from 'react'
import Image from 'next/image'
import { check_Image, trending } from '@/libs/api'
import Link from 'next/link'
import Tags from '../common/Tags'
export default function SectionList({ data }) {
  return (
    <>
      {data && data.map((res, index) => {
        return (
          <Link key={index} href={'/categories/' + res.route}>
            <div className={`flex justify-between gap-[10px] ${index == 0 ? 'lg:mt-[15px]' : ''} ${index != data.length - 1 ? 'mb-[20px] md:mb-[15px]' : ''} ${index != data.length - 1 && 'border_bottom'} items-center pb-[20px] md:pb-[15px]`}>
              <div className={`flex flex-[0_0_calc(95%_-_10px)] w-full gap-[10px]`}>
                <div className={`flex-[0_0_calc(30%_-_10px)] md:flex-[0_0_calc(40%_-_10px)]`}>
                  <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' className={`rounded-[5px] h-[90px] w-full`} src={check_Image(res.thumbnail_image)} height={50} width={150} alt={"image"} ></Image>
                </div>
                <div className='grid'>
                  <p className='primary_text'>{res.primary_text}</p>
                  <h4 className='title line-clamp-2'>{res.title}</h4>
                  {/* {res.publisher && <p className='light_text'>{res.publisher}</p>} */}
                  <Tags tags={res.tags}/>
                </div>
              </div>
              <div className='flex-[1] md:hidden'>
                <Image src={'/rightArrow.svg'} height={15} width={20} alt={'arrow'} ></Image>
              </div>
            </div>
          </Link>
        )
      })}
    </>
  )
}
