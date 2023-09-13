import React from 'react'
import Image from 'next/image'
import { check_Image } from '../../libs/api'
export default function CardCarousel({ data,cardClass }) {
    return (
        <>
            {data && data.map((res, index) => {
                return (
                    <div key={index} className={`${cardClass}`}>
                        <div className={``}>
                            <Image className={``} src={check_Image(res.res.thumbnail_image)} height={200} width={300} alt={index + 'image'} />
                        </div>
                        <div className={` flex flex-col justify-between`}>
                            {(res.primary_text && res.secondary_text) && <p className='flex gap-2 items-center'><span className={`text-red leading-normal tracking-wider !text-[10px] ${styles.primary_text}`}>{res.primary_text}</span> <span class="h-[10px] w-[1px] bg-[#6f6f6f]"></span> <span className={`${styles.secondary_text}`}>{res.secondary_text}</span></p>}
                            <h4 className={`title line-clamp-2`}>{res.title ? res.title : ''}</h4>
                            <p className={`sub_title mt-[6px] line-clamp-2`}>{res.sub_title ? res.sub_title : res.blog_intro ? res.blog_intro : ''}</p>
                            <p className='hashtags pt-1'>{res.hashtags ? res.hashtags : res.publisher ? res.publisher : ''}</p>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
