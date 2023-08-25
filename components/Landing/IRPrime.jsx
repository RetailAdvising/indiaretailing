import React from 'react'
import Image from 'next/image'
export default function IRPrime({ data }) {
    return (
        <>
            {
                data && <div style={{ background: data.background }} className={`p-[15px] my-[10px] rounded`}>
                    <div className={`flex justify-between items-center pb-[5px] border_bottom_white`} >
                        <div className={`flex gap-2`}>
                            <div className={``}>
                                <Image src={data.image} height={30} width={35} className={``} alt={"IR Prime"}></Image>
                            </div>
                            <p className={`flex flex-col`}>
                                <span className={`text-sm font-semibold`}>{data.title}</span><span className={`text-[13px] hashtags`}>{data.sub_title}</span>
                            </p>
                        </div>
                        <div>
                            <p className={`text-[13px] bg-white rounded-full w-[60px] text-center p-[2px] button_text_color`}>{data.button_round}</p>
                        </div>
                    </div>
                    {data.data.map((res, index) => {
                        return (
                            <div key={index} className={`flex items-center gap-[10px] ${index != data.data.length - 1 && 'border_bottom_white'} py-[10px]`}>
                                <div className='flex-[0_0_calc(25%_-_10px)]'>
                                    <Image className='h-[40px] object-contain w-[50px]' src={res.image} alt={res.title} height={50} width={70} />
                                </div>
                                <p className={`text-sm font-400 line-clamp-2`}>{res.title}</p>
                            </div>
                        )
                    })}
                </div>

            }
        </>
    )
}
