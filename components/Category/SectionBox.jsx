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
            {data && <div className={`border rounded-[10px] justify-center p-[10px] md:h-[200px] lg:h-[280px] flex flex-col md:gap-[5px] lg:gap-[15px]`}>
                <p className='text-red lg:text-[14px] md:text-[12px] cursor-pointer'>{data.primary_text}</p>
                <p className='lg:text-[20px] md:text-[15px] line-clamp-[2] font-semibold cursor-pointer'>{data.title}</p>
                <p className={`sub_title line-clamp-[4] cursor-pointer `}>{data.description}</p>
                <p className='flex gap-[15px] items-center cursor-pointer  seeMore' onClick={()=> router.push(`/categories/${data.route}`)}><span className='text-gray font-semibold md:text-[12px]'>See More</span><Image className='img md:h-[18px] md:w-[18px]' src={'/categories/arrowright.svg'} alt='arrow' height={20} width={20} /></p>
            </div>}
        </>
    )
}
