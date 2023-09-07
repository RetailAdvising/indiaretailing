import React from 'react'
import styles from '@/styles/Cards.module.scss'
import { check_Image } from '@/libs/common'
import Image from 'next/image'
import { useRouter } from 'next/router'
export default function Cards({ noPrimaryText, data, isHome=undefined, check, contentHeight, flex, border_none, isBorder, width, height, borderRadius, cardClass }) {
  const router = useRouter();
  return (
    <>
      {data && data.map((res, index) => {
        return (
          <div key={index} onClick={() => router.push(`${isHome ? isHome + res.route : '/' + router.asPath.split('/')[1] + '/' + res.route}`)} className={`${styles.cards} ${flex} cursor-pointer ${isBorder && 'border rounded-[10px]'} ${cardClass}`} >
            <div className={`${styles.img_div}`}>
              {/* layout="fill" sizes="(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw"  objectFit="cover" */}
              <Image height={100} width={200} className={` ${height} ${width} ${borderRadius} ${styles.card_img} ${border_none ? 'rounded-[5px]' : 'rounded-[10px]'} `} src={check ? check_Image(res.thumbnail_image || res.image) : res.image} alt={"cards"} />
            </div>
            <div className={`${styles.content} ${isBorder && 'p-[10px] '} ${contentHeight}  flex mobile-flex  justify-between flex-col`}>
              {((res.primary_text && res.secondary_text) && !noPrimaryText) && <p className='flex mobile-flex gap-2 '><span className='primary_text fnt_13'>{res.primary_text}</span> <span className='h-[10px] w-[1px] bg-[#6f6f6f]'></span> <span className='secondary_text'>{res.secondary_text}</span></p>}
              {res.title && <h4 className='card-title mt-2 line-clamp-2'>{res.title ? res.title : ''}</h4>}
              {(res.sub_title || res.blog_intro) && <p className='sub_title pt-1 line-clamp-2'>{res.sub_title ? res.sub_title : res.blog_intro ? res.blog_intro : ''}</p>}
              {((res.hashtags || res.publisher) && !noPrimaryText) && <p className={`hashtags pt-[10px]`}>{res.hashtags ? res.hashtags : res.publisher ? res.publisher : ''}</p>}
            </div>
          </div>
        )
      })}
    </>
  )
}
