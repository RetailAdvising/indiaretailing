import React from 'react'
import Image from 'next/image'
import { check_Image } from '@/libs/api'
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function IRPrime({ data }) {
    const router = useRouter();
    return (
        <>
            {
                <div className={`p-[15px] my-[10px] rounded bg-[#FFEDEF]`}>
                    <div className={`flex justify-between cursor-pointer items-center pb-[5px] border_bottom_white`} >
                        <div className={`flex gap-2`}>
                            <div className={``}>
                                <Image src={'/IR.svg'} height={30} width={35} className={``} alt={"IR Prime"}></Image>
                            </div>
                            <p className={`flex flex-col`}>
                                <span className={`text-sm font-semibold`}>IR Prime</span><span className={`text-[13px] hashtags`}>Top 3  stories of the day</span>
                            </p>
                        </div>
                        <div>
                            <p onClick={() => router.push('/IRPrime')} className={`text-[13px] bg-white rounded-full w-[60px] text-center p-[2px] button_text_color`}>See All</p>
                        </div>
                    </div>
                    {data.map((res, index) => {
                        return (
                            <Link key={index} href={'/IRPrime/' + res.route}>
                                <div className={`flex items-center gap-[10px] ${index != data.length - 1 && 'border_bottom_white'} py-[10px]`}>
                                    <div className='flex-[0_0_calc(25%_-_10px)]'>
                                        <Image className='h-[65px] rounded-[5px] w-full' src={check_Image(res.thumbnail_image)} alt={res.title} height={50} width={70} />
                                    </div>
                                    <p className={`text-sm font-400 line-clamp-2`}>{res.title}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>

            }
        </>
    )
}
