import Image from 'next/image'
import React from 'react'

export default function Subscribe({ data, height, width }) {
  return (
    <>
      <div className={`flex items-center h-[186px] justify-center flex-col rounded bg-[#fbfbfd]`} >
        <div className={`relative`}>
          <p className={`absolute top-[35px] right-[120px] font-semibold text-[20px]`}>Subscribe</p>
          <Image src={'/newsletter1.svg'} className={`${height} ${width}`} height={30} width={50} alt="" />
          <input placeholder="Your email address" className={`subscribe_input`} style={{ border: 'none' }} />
        </div>
        <button className={`subscribe`}>Subscribe</button>
      </div>
    </>
  )
}
