import { check_Image } from '@/libs/common'
import Image from 'next/image'
import React from 'react'

export default function AdsBaner({ data, height,Class, text, style, width }) {
  return (
    <>
      {
        data && <div style={style} className={`${Class}`}>
         {data.ad_title &&  <p className='fnt_12 text-center'>{data.ad_title ? data.ad_title : ''}</p>}
          <Image priority src={data.ad_image} height={250} className={`${height} ${width} `} width={970}  alt='ad' />
          
        </div>
      }
    </>
  )
}
