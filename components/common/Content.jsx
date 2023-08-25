import React from 'react'
import styles from '@/styles/category.module.scss'
import Image from 'next/image'
import { check_Image } from '@/libs/common'
export default function Content({res}) {

    return (
        <>
            <div className='flex gap-4'>
                { res.primary_text && <p className={`${res.primary_text ? 'primary_text' : ''}`}>{res.primary_text ? res.primary_text : ''}</p>}
                <p className='flex items-center gap-2'><Image height={13} width={11} alt={"image"} src={'/views.svg'} /><span className='fnt_14 gray-text'>500 Views</span></p>
                <p className='flex items-center gap-2'><Image height={15} width={15} alt={"image"} src={'/shares.svg'} /><span className='fnt_14 gray-text'>3 Shares</span></p>
                <p className='flex items-center gap-2'><Image height={15} width={15} alt={"image"} src={'/time.svg'} /><span className='fnt_14 gray-text'>2 Minutes </span></p>
            </div>
            <h1 className='mega_title text-5xl my-5'>{res.title}</h1>
            <div className={`flex items-center justify-between ${styles.profile_div}`}>
                <div className='flex gap-3 items-center'>
                    <Image className='rounded-full object-contain' priority={true} src={res.avatar ? check_Image(res.avatar) : '/profit.svg'} height={43.12} width={43.12} alt={"image"} />
                    <p className='flex flex-col'>
                        <span className="font-semibold">{res.publisher}</span><span className='text-gray fnt_13 gray-text'>2 days ago</span>
                    </p>
                </div>

                <div className='flex items-center gap-2'>
                    <Image className='object-contain' src={'/share.svg'} height={14} width={15} alt={"image"} />
                    <Image className='object-contain h-[25px] w-[20px]' src={'/setting.svg'}  height={14} width={15} alt={'setting'} />
                </div>
            </div>

            <p className='py-3 text-[18px]'>{res.title}</p>
            <Image src={check_Image(res.thumbnail_image)} height={600} priority={true} width={1000} alt={res.title} className="py-3" />
            <p className='py-3 '>{res.blog_intro}</p>
        </>
    )
}
