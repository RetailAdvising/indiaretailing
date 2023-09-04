import React, { useState } from 'react'
import Image from 'next/image'
import styles from '@/styles/newsLetter.module.scss'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
import AlertPopup from '../common/AlertPopup';

export default function NewsList({ data }) {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [news, setNews] = useState()

  async function showPopup(data) {
    // console.log(data);
    setNews(data)
    setShowAlert(true);
  }

  return (
    <>
      {data && data.map((res, index) => {
        return (
          <div className={`flex gap-[10px]  justify-between ${index != data.length - 1 ? 'pb-[20px]' : ''}`} key={index}>
            <div  onClick={() => router.push(`/${res.route}`)} className={`cursor-pointer flex gap-[10px] lg:flex-[0_0_calc(15%_-_10px)] md:flex-[0_0_calc(35%_-_5px)]`}>
              <Image className={`lg:h-[90px] md:h-full w-full rounded-[3px] `} src={check_Image(res.custom_image_)} height={100} width={200} alt={res.custom_day} />
            </div>
            <div  onClick={() => router.push(`/${res.route}`)} className={`lg:leading-[1.7] md:gap-[5px] md:flex-[0_0_calc(65%_-_5px)] lg:flex-[0_0_calc(60%_-_10px)]`}>
              <p className={`text-[#818181] leading-[17.62px] lg:text-[14px] md:text-[11px]`}>{res.custom_day}</p>
              <p className={`line-clamp-1 font-semibold text-[16px] md:text-[14px]`}>{res.custom_category}</p>
              <p className={`text-[14px] md:text-[12px] line-clamp-2`}>{res.custom_title}</p>
              <div className='flex lg:hidden items-center md:gap-[10px] gap-[20px]'>
                <p className='cursor-pointer text-[14px] md:text-[12px] font-semibold' onClick={() => router.push(`/${res.route}`)}>Preview</p>
                <p className='flex cursor-pointer justify-center items-center seeMore' onClick={() => showPopup(res)}><span className='capitalize text-[11px] text-[#e21b22] font-semibold'>Sign Up</span> <Image className='img h-[14px] object-contain' src={'/arrowrightprimary.svg'} height={15} width={15} alt='signup' /></p>
              </div>
            </div>
            {/* justify-between */}
            <div className='flex md:hidden items-center gap-[10px] flex-[0_0_calc(25%_-_10px)]'>
              <p className='cursor-pointer flex-[0_0_calc(50%_-_10px)]' onClick={() => router.push(`/${res.route}`)}>Preview</p>
              <p className='flex cursor-pointer justify-center items-center seeMore' onClick={() => showPopup(res)}><span className='primary_text '>Sign Up</span> <Image className='img' src={'/arrowrightprimary.svg'} height={15} width={15} alt='signup' /></p>
            </div>
          </div>
        )
      })}
      {(showAlert && news) && <AlertPopup data={news} show={() => setShowAlert(false)} />}
    </>
  )
}
