import React from 'react'
import Image from 'next/image'
import { check_Image } from '@/libs/api'
import Link from 'next/link';
export default function ImageContainer({ data, height, width }) {

    return (
        <>
            {data && <div className='relative pb-[20px]'>
                <Link href={data.route}>
                    <Image width={530} className={`rounded-[5px] ${height} ${width}`} priority alt="image.." src={check_Image(data.thumbnail_image)} height={329} />
                    <div className='absolute bottom-[40px] left-[10px] ml-2'>
                        {data.primary_text && <button className='text-white h-[25px] w-[90px] text-[13px]' style={{ background: 'linear-gradient(305deg, #F92A28 27.00%, #DA1752 100%, #FFF 100%)' }}>{data.primary_text}</button>}
                        {data.title && <p className='font-semibold text-white text-[16px] py-1 '>{data.title}</p>}
                        {data.publisher && <p className='text-white text-[12px] mb-4'>{data.publisher}</p>}
                    </div>
                </Link>
            </div>}
        </>
    )
}
