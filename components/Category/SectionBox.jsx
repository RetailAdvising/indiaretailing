import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';

export default function SectionBox({ data }) {
    const router = useRouter();
    return (
        <>
            {data && <div className={`border rounded-[10px] justify-center p-[10px] md:min-h-[310px] lg:h-[280px] flex flex-col gap-[15px]`}>
                <p className='text-red text-[14px]'>{data.primary_text}</p>
                <p className='text-[20px] font-semibold cursor-pointer'>{data.title}</p>
                <p className='sub_title cursor-pointer'>{data.description}</p>
                <p className='flex gap-[15px] items-center cursor-pointer seeMore' onClick={()=> router.push(`/categories/${data.route}`)}><span className='text-gray font-semibold '>See More</span><Image className='img' src={'/categories/arrowright.svg'} alt='arrow' height={20} width={20} /></p>
            </div>}
        </>
    )
}
