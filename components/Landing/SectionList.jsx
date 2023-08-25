import React from 'react'
import Image from 'next/image'
export default function SectionList({ data }) {
  return (
    <>
      {data && data.map((res, index) => {
        return (
          <div key={index} className={`flex justify-between gap-[10px] mb-[20px] ${index != data.length -1 && 'border_bottom'} items-center pb-[20px]`}>
            <div className={`flex gap-[10px]`}> 
              <Image className={`rounded-[5px] h-[90px] w-[144px]`} src={res.image} height={50} width={150} alt={"image"} ></Image>
              <div className='flex justify-between flex-col'>
                <p className='primary_text'>{res.primary_text}</p>
                <h4 className='title'>{res.title}</h4>
                 <p className='hashtags'>{res.hashtags}</p>
              </div>
            </div>
            {/* <div> */}
            <Image src={res.chevron_icon_right} height={15} width={20} alt={'arrow'} ></Image>
            {/* </div> */}
          </div>
        )
      })}
    </>
  )
}
