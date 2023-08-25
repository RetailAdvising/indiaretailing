import React from 'react'
import Image from 'next/image'
export default function LatestNews({ data,height,width }) {
  return (
    <>
      {data && data.map((res, index) => {
        return (
          <div key={index} className={`pb-[10px] ${!res.image && ((index != data.length-1)) && 'border_bottom'}`}>
            {res.image && <Image priority src={res.image}  className={`rounded-[5px] ${height} ${width}`} width={400} height={200} alt={res.title} />}
            {res.title && <p className={`py-[10px] title ${!res.image && 'py-[10px]'}`}>{res.title}</p>}
            {res.sub_title && <p className={`${!res.image && 'pb-[10px]'} sub_title`}>{res.sub_title}</p>}
          </div>
        )
      })}
    </>
  )
}
