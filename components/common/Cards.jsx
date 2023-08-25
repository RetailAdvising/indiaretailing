import React from 'react'
import styles from '@/styles/Cards.module.scss'
import { check_Image } from '@/libs/common'
import Image from 'next/image'
import { useRouter } from 'next/router'
export default function Cards({noPrimaryText,data, check,contentHeight, flex, border_none,isBorder,width,height,borderRadius,cardClass }) {
  const router = useRouter();
  return (
    <>
      {data && data.map((res, index) => {
        return (
          <div key={index} onClick={()=> router.push(`${router.asPath}/${res.name}`)} className={`${styles.cards} ${flex} ${isBorder&& 'border rounded-[10px]'} ${cardClass}`} >
            <div className={`${styles.img_div}`}>
              {/* layout="fill" sizes="(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw"  objectFit="cover" */}
              <Image height={100} width={200} className={` ${height} ${width} ${borderRadius} ${styles.card_img} ${border_none ? 'rounded-[5px]' : 'rounded-[10px]'} `} src={check ? check_Image(res.thumbnail_image) : res.image}  alt={"cards"} />
            </div>
            <div className={`${styles.content} ${isBorder && 'p-[10px] '} ${contentHeight}  flex mobile-flex  justify-between flex-col`}>
              {((res.primary_text && res.secondary_text) && !noPrimaryText) && <p className='flex mobile-flex gap-2'><span className='text-red fnt_13'>{res.primary_text}</span> <span className='h-[15px] w-[2px] bg-[#121212]'></span> <span className='fnt_12'>{res.secondary_text}</span></p>}
              {res.title && <h4 className='card-title mt-2 line-clamp-2'>{res.title ? res.title : ''}</h4>}
              {(res.sub_title || res.blog_intro) && <p className='sub_title pt-1 line-clamp-2'>{res.sub_title ? res.sub_title : res.blog_intro ? res.blog_intro :''}</p>}
              {((res.hashtags || res.publisher) && !noPrimaryText) && <p className={`hashtags pt-[10px]`}>{res.hashtags ? res.hashtags : res.publisher ? res.publisher : ''}</p>}
            </div>
          </div>
        )
      })}
    </>
  )
}
