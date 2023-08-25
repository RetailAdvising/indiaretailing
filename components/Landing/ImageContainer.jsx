import React from 'react'
import Image from 'next/image'
export default function ImageContainer({ data,height,width }) {

    return (
        <>
            {data && <div className='relative '><Image width={530} className={`rounded-[5px] ${height} ${width}`} priority alt="image.." src={data.image} height={329} />
                <div className='absolute bottom-[5px] left-[10px] ml-2'>
                    {data.button && <button className='text-white h-[25px] w-[75px] text-sm' style={{ background: data.button_background }}>{data.button}</button>}
                    {data.content && <p className='font-semibold text-white text-[14px] py-1  text-xl'>{data.content}</p>}
                    {data.author && <p className='text-white text-[14px] mb-4'>{data.author}</p>}
                </div>
            </div>}
        </>
    )
}
