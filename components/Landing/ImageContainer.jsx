import React from 'react'
import Image from 'next/image'
import { check_Image } from '@/libs/api'
import Link from 'next/link';
export default function ImageContainer({ data, height, width,isWeb }) {

    return (
        <>
            {data && <div className='relative pb-[20px]'>
                <Link href={'/' + data.route}>
                    <Image width={530} loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' className={`rounded-[5px] ${height} ${width}`} alt="image.." src={check_Image(data.thumbnail_image)} height={329} />
                    {/* <div className={`${height ? height : 'h-[350px]'} absolute top-0 w-full bg-[#0000002e]]`}></div> */}
                    <Image className={`${height ? height : 'h-[350px]'} absolute top-0 w-full rounded-[5px]`} src={'/home/bg-png.png'} height={329} width={530} alt='background...' />
                    <div className={`absolute ${isWeb ? 'bottom-[30px] md:bottom-[30px]' : 'bottom-[20px] md:bottom-[15px]'}  left-[10px]`}>
                        {data.primary_text && <div className=''><button className='text-white h-[26px] font-semibold p-[0_10px] uppercase text-[11px] md:text-[10px] md:h-[24px]' style={{ background: 'linear-gradient(305deg, #F92A28 27.00%, #DA1752 100%, #FFF 100%)' }}>In Focus</button></div>}
                        {data.title && <p className='font-semibold text-white text-[17px] md:text-[16px] py-1 '>{data.title}</p>}
                        {data.publisher && <p className='text-white text-[12px] mb-4'>{data.publisher}</p>}
                    </div>
                </Link>
            </div>}
        </>
    )
}
