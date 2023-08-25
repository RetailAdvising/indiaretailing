import Image from 'next/image'
import React from 'react'

export default function Subscribe({ data,height,width }) {
  return (
    <>
      {data && <div className={`flex items-center h-[186px] justify-center flex-col rounded`} style={{ background: data.background }}>
        <div className={`relative`}>
          <p className={`absolute top-[35px] right-[120px] font-semibold text-[20px]`}>{data.button}</p>
          <Image src={data.image}  className={`${height} ${width}`} height={30} width={50} alt={data.button} />
          <input placeholder={data.placeholder} className={`subscribe_input`} style={{border:'none'}} />
        </div>
        <button className={`subscribe`}>{data.button}</button>
      </div>}
    </>
  )
}
