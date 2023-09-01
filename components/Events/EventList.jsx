import React from 'react'
import Image from 'next/image'
import { check_Image } from '@/libs/common'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function EventList({ data, flex, height, width, imageBackground,check, isHome }) {
    const router = useRouter();
    return (
        <>
            {/* {data && data.map((res, index) => {
                return (
                    <>

                        <div className={`overflow-hidden ${isHome ? 'flex rounded-[5px]' : 'rounded-[10px]'}  bg-white gap-[10px]   border ${flex}`} onClick={() => router.push(`${router.asPath}/${res.name}`)} key={index}>
                            <div className={`flex items-center justify-center `} style={{ background: imageBackground, flex: '0 0 calc(40% - 10px)' }}>

                                <Image src={check_Image(res.thumbnail_path)} className='w-[100%] h-[200px]' height={100} width={200} alt={res.title} />
                            </div>
                            <div className={`flex flex-col justify-between px-[10px] min-h-[185px]`}>
                                <h4 className={`font-semibold text-[18px] text-[#39364F] py-[10px]`}>{res.title} </h4>
                                <p className={`sub_title line-clamp-2`}>{res.description}</p>

                                <div className={`flex gap-[10px] items-center pt-[10px] `}>
                                    <p className={`flex gap-[5px] items-center border_right pr-[10px]`}><Image src="/calendar.svg" className={`object-contain`} objectFit='contain' height={15} width={20} alt={res.title} /> <span className={`light_text pt-[2px]`}>{res.start_date}</span></p>
                                    <p className={`flex gap-[5px] items-center`}><Image src="/location.svg" className={`object-contain`} objectFit='contain' height={10} width={20} alt={res.title} /> <span className={`light_text `}>{res.locations[0] && res.locations[0].event_location}</span></p>
                                </div>
                                <div className='flex gap-[5px] items-center py-[10px]'><p className={`primary_text font-semibold`}>Register Now</p>
                                    <Image src="/arrowrightprimary.svg" className={`h-[17px] w-[17px] p-0.5`} height={14} width={14} alt={'res.title'} />
                                </div>
                            </div>
                        </div>
                    </>
                )
            })} */}

            {data && data.map((res, index) => {
                return (
                    <div className={`overflow-hidden cursor-pointer flex ${isHome ? 'flex rounded-[5px] border' : ''} border_bottom pb-[20px] bg-white gap-[10px]   ${flex}`} onClick={() => router.push(`/${router.asPath.split('/')[1]}/${res.route}`)} key={index}>
                        <div className='flex-[0_0_calc(40%_-_10px)]'>
                            <Image height={100} width={200} alt={res.title} src={!check ? check_Image(res.thumbnail_path) : res.image} className={`${height} ${width} rounded-[10px]`} />
                        </div>
                        <div className={`flex flex-col leading-[2] px-[10px] min-h-[185px]`}>
                            <h4 className={`font-semibold text-[18px] text-[#39364F] py-[10px]`}>{res.title} </h4>
                            <p className={`sub_title line-clamp-2`}>{res.description}</p>
                            {/* <p className={`sub_title pt-[5px]`}>{res.end}</p> */}
                            <div className={`flex gap-[10px] items-center pt-[10px] `}>
                                <p className={`flex gap-[5px] items-center `}><Image src="/calendar.svg" className={`object-contain`} objectFit='contain' height={15} width={20} alt={res.title} /> <span className={`light_text pt-[2px]`}>{res.start_date}</span></p> <span className='h-[18px] w-[3px] mx-[6px] bg-[#ddd]'></span>
                                <p className={`flex gap-[5px] items-center`}><Image src="/location.svg" className={`object-contain`} objectFit='contain' height={10} width={20} alt={res.title} /> <span className={`light_text `}>{res.locations[0] && res.locations[0].event_location}</span></p>
                            </div>
                            <div className='flex gap-[5px] items-center py-[10px]'><p className={`primary_text font-semibold`}>Register Now</p>
                                <Image src="/arrowrightprimary.svg" className={`h-[17px] w-[17px] p-0.5`} height={14} width={14} alt={'res.title'} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
