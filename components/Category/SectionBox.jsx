import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google'


const inter = Inter({
  weight: ["400"],
  display: "swap",
  preload: true,
  subsets: ["latin"]
})
export default function SectionBox({ data }) {
    const router = useRouter();
    return (
        <>
            {data && <div className={`border rounded-[10px] justify-center p-[10px] md:h-[270px] lg:h-[280px] flex flex-col gap-[15px]`}>
                <p className='text-red text-[14px]'>{data.primary_text}</p>
                <p className='text-[20px] font-semibold cursor-pointer'>{data.title}</p>
                <p className={`sub_title line-clamp-[4] cursor-pointer `}>{data.description}</p>
                <p className='flex gap-[15px] items-center cursor-pointer seeMore' onClick={()=> router.push(`/categories/${data.route}`)}><span className='text-gray font-semibold '>See More</span><Image className='img' src={'/categories/arrowright.svg'} alt='arrow' height={20} width={20} /></p>
            </div>}
        </>
    )
}
