import React from 'react'
import Image from 'next/image'
import { check_Image } from '@/libs/api'
import Link from 'next/link'
export default function TopStories({ data }) {
    // console.log(data)
    return (
        <>
            {data && data.map((res, index) => {
                return (
                    <Link key={index} href={'/' + res.route} className='flex-[0_0_calc(30%_-_10px)] flex gap-[10px]  items-center h-[100px] px-[10px]  rounded-[5px] bg-white  md:h-[90px] md:flex-[0_0_calc(85%_-_10px)]'>
                        {/* <div  className={`flex gap-[10px]  items-center h-[100px] px-[10px]  rounded-[5px] bg-white  md:h-[80px]  md:flex-[0_0_calc(90%_-_10px)] ${index == data.length - 1 ? 'md:mx-[15px]' : index == 0 ? '' : 'md:ml-[15px]'}`}> */}
                        {/* <div > */}
                        <Link href={'/' + res.route} className='flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(35%_-_10px)]'>
                            <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' src={check_Image(res.thumbnail_image ? res.thumbnail_image : res.image)} height={80} width={100} alt={res.title} className={`rounded-[5px] h-[75px] md:h-[70px] w-full`} />
                        </Link>
                        {/* </div> */}
                        <div>
                            <p className={`${res.primary_text ? 'top_primary_text' : 'fnt_14'}`}>{res.primary_text}</p>
                            <Link href={'/' + res.route}>
                                <h6 className={`top_title`}>{res.title}</h6>
                            </Link>
                        </div>
                        {/* </div>                     */}
                    </Link>
                )
            })}
        </>
    )
}
