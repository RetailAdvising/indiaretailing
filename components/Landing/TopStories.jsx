import React from 'react'
import Image from 'next/image'
export default function TopStories({data}) {
    console.log(data)
  return (
    <>
    {data && data.map((res,index)=>{
        return(
            <div key={index} className={`flex gap-[10px] flex-[0_0_calc(33.333%_-_10px)] h-[100px] px-[10px] items-center rounded-[5px] bg-white  md:basis-full`}>
                <div className='flex-[0_0_calc(25%_-_10px)]'>
                <Image src={res.image} height={80} width={100} alt={res.content} className={`rounded-[5px] h-full w-full`} />
                </div>
                <div>
                    <p className={`${res.primary_title ? 'primary_text' : 'fnt_14'}`}>{res.primary_title}</p>
                    <h4 className={`pt-[5px] title`}>{res.content}</h4>
                </div>
            </div>
        )
    })}
    </>
  )
}
