import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
export default function EventCards({ data, flex,height,width }) {
    const router = useRouter();
    return (
        <>
            {data && data.map((res, index) => {
               
                return (
                    <div className={` flex flex-col rounded-[10px] h-[390px]  border cursor-pointer ${flex}`} onClick={() => router.push(`/${router.asPath.split('/')[1]}/${res.route}`) } key={index}>
                        <div className={``} >
                            {/* style={{ height: '250px', width: '100%', borderRadius: '10px 10px 0 0' }} */}
                            <Image src={check_Image(res.thumbnail_path ? res.thumbnail_path : res.image_path ? res.image_path : null)} className={`rounded-[10px_10px_0_0] ${height} ${width}`}  height={100} width={200} alt={res.title} />
                        </div>
                        <div className={`flex flex-col p-[10px] h-full justify-between`}>
                            <h4 className={`event-title font-semibold text-lg line-clamp-2`}>{res.title} </h4>
                            <p className={`sub_title pt-[5px] line-clamp-2`}>{res.description}</p>
                            {/* <p className={`sub_title pt-[5px]`}>{res.end}</p> */}
                            <div className={`flex gap-[5px] items-center pt-[5px]`}>
                                <p className={`flex items-center gap-[5px] `}><Image src={'/calendar.svg'} objectFit='contain' height={15} width={20} alt={res.title} />  <span className={`light_text`}>{res.start_date}</span></p><span className='h-[18px] w-[3px] mx-[6px] bg-[#ddd]'></span>
                                <p className={`flex items-center gap-[5px]`}><Image src={'/location.svg'} objectFit='contain' height={15} width={20} alt={res.title} /> 
                                {res.locations && res.locations.map((item,index)=>{
                                    return(
                                        <span key={index} className={`light_text`}>{item.event_location}</span>
                                    )
                                })}
                                </p>
                            </div>
                            <div className='flex gap-[5px] pt-[5px]'><p className={`primary_text font-semibold capitalize `}>Register Now</p><Image src={'/arrowrightprimary.svg'} className='p-0.5 right-arrow' height={6} width={12} alt={'res.title'} /></div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
