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
            {data && <div className={`lg:border-[0px] rounded-[10px] justify-center p-[10px] md:h-auto lg:h-[280px] flex flex-col md:gap-[5px] lg:gap-[15px]`}  style={{ backgroundColor:`${data.background_color ? data.background_color : '#EDF6E5' }`}}>
                <p className='text-red lg:text-[14px] md:text-[12px] cursor-pointer'>{data.primary_text}</p>
                <h6 className='lg:text-[20px] md:text-[15px] line-clamp-[2] font-semibold cursor-pointer'>{data.title}</h6>
                <p className={`sub_title line-clamp-[4] cursor-pointer `}>{data.description}</p>
                <p className='flex gap-[5px] items-center cursor-pointer  seeMore' onClick={()=> router.push(`/categories/${data.route}`)}><span className='text-gray font-medium	 md:text-[12px]'>View All</span><Image className='img md:h-[14px] md:w-[14px]' src={'/categories/arrowright.svg'} alt='arrow' height={16} width={16} /></p>
            </div>}
        </>
    )
}
