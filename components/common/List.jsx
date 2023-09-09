import React from 'react'
import Image from 'next/image'
import { check_Image } from '@/libs/common'
import exclusives from '@/styles/Exclusives.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link'
// import {Roboto} from 'next/font/google'

// const roboto = Roboto({
//     weight: ["200","300","400","500","600",'700'],
//     display: "block",
//     preload: true,
//     style: 'normal',
//     subsets: ["latin"]
//   })
  
  
export default function List({ imgFlex,hash_bg, contentWidth,primary_pb, line, data,titleClamp ,check, isTop, isReverse, borderRadius, imgHeight, imgWidth, isBB, flex, fullWidth, noWidth, tittleOnly, isHome = undefined }) {
    const router = useRouter();
    return (
        <>
            {data && data.map((res, index) => {
                return (
                    // style={{flex:flex}}
                    <div key={index} onClick={() => router.push(`${isHome ? isHome + res.route : '/' + router.asPath.split('/')[1] + '/' + res.route}`)} className={`${flex} flex cursor-pointer gap-3 ${index != data.length - 1 ? 'pb-[10px]' : ''} relative ${exclusives.card_item} ${(isReverse) ? 'flex-row-reverse items-center  mb-[10px] justify-between' : ''} ${(isReverse && index != data.length - 1) ? 'border_bottom' : ''} ${(isBB && index != data.length - 1) && 'border_bottom mb-[10px]'}`}>
                        {(res.primary_text && res.secondary_text && isTop) && <p className={`flex  ${exclusives.title_top}  items-center absolute`}><span className='primary_text pr-[8px] '>{res.primary_text}</span> <span className='h-[10px] w-[1px] bg-[#6f6f6f]'></span> <span className='pl-[8px] secondary_text'>{res.secondary_text}</span></p>}
                        {/* ${check ? '' : 'basis-1/4'} */}
                        <div className={`${imgFlex} ${isTop && 'pt-[25px]'} ${isReverse ? 'flex-[0_0_calc(35%_-_10px)]' : ''}`}>
                            <Image className={`${imgHeight} ${imgWidth} ${borderRadius}`} src={check ? check_Image(res.image || res.video_image || res.thumbnail_image) : res.image} height={100} width={100} alt={"image"} />
                        </div>
                        {/* w-[280px] */}
                        <div className={`${(!fullWidth && !isReverse) && ''} ${contentWidth} flex flex-col leading-[1] ${isTop && 'pt-[25px]'}`}>
                            {(res.primary_text && res.secondary_text && !isTop) && <p className={`flex items-center ${primary_pb}`}><span className='primary_text pr-[8px] '>{res.primary_text}</span> <span className='h-[10px] w-[1px] bg-[#6f6f6f]'></span> <span className='secondary_text pl-[8px]'>{res.secondary_text}</span></p>}
                            {res.title && <h6 className={`title  pt-[5px] ${titleClamp ? titleClamp : 'line-clamp-1'}`}>{res.title ? res.title : ''}</h6>}
                            {((res.sub_title || res.blog_intro) && !tittleOnly) && <p className={`sub_title pt-[5px] ${line ? line : 'line-clamp-2'}`}>{res.sub_title ? res.sub_title : res.blog_intro ? res.blog_intro : ''}</p>}
                            {((res.hashtags || res.publisher) && !tittleOnly) && <p className={`hashtags pt-[5px] ${hash_bg}`}>{res.hashtags ? res.hashtags : res.publisher ? res.publisher : ''}</p>}
                        </div>
                    </div>
                )
            })}
        </>
    )
}
