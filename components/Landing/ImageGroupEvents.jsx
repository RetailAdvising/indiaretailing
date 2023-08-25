import Image from 'next/image'
import React from 'react'

export default function ImageGroupEvents({ data, height, width }) {
    return (
        <>
            {data && data.map((res, index) => {
                return (
                    <div className={`imageGroup`} key={index}>
                        <div className={`imageContainer`}>
                            <Image className={`image ${height} ${width}`} src={res.image} height={100} width={200} alt={res.title} />
                        </div>
                        <div className={`content pt-[10px]`}>
                            <p className={`primary_text `}>{res.primary_text} </p>
                            <div className={`flex gap-[10px] items-center pt-[5px]`}><p className={`font-semibold text-[20px]`}>{res.title} </p> 
                            <p className={`flex gap-[5px] `}><Image src={res.calender} objectFit='contain' height={15} width={20} alt={res.title} /> <span className={`light_text`}>{res.event_time}</span></p>
                            <p className={`flex gap-[5px]`}><Image src={res.location} objectFit='contain' height={10} width={20} alt={res.title} /> <span className={`light_text`}>{res.event_location}</span></p>
                            </div>
                            <p className={`sub_title pt-[5px]`}>{res.sub_title}</p>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
