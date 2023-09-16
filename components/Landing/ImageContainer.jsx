import React from 'react'
import Image from 'next/image'
import { check_Image } from '@/libs/api'
import Link from 'next/link';
export default function ImageContainer({ data, height, width }) {

    return (
        <>
            {data && <div className='relative pb-[20px]'>
                <Link href={'/news/' + data.route}>
                    <Image width={530} loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' className={`rounded-[5px] ${height} ${width}`} alt="image.." src={check_Image(data.thumbnail_image)} height={329} />
                    <div className='absolute bottom-[40px] md:bottom-[15px] left-[10px] ml-2'>
                        {data.primary_text && <div className=''><button className='text-white h-[35px]  p-[0_10px] text-[13px] md:text-[12px] md:h-[30px]' style={{ background: 'linear-gradient(305deg, #F92A28 27.00%, #DA1752 100%, #FFF 100%)' }}>{data.primary_text}</button></div>}
                        {data.title && <p className='font-semibold text-white text-[16px] md:text-[14px] py-1 '>{data.title}</p>}
                        {data.publisher && <p className='text-white text-[12px] mb-4'>{data.publisher}</p>}
                    </div>
                </Link>
            </div>}
        </>
    )
}
