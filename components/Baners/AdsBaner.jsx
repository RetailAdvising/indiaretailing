import { check_Image } from '@/libs/api'
import Image from 'next/image'
import React from 'react'

export default function AdsBaner({ data, height, Class, text, style, width, homeAd, }) {
  return (
    <>
      {
        data && <div style={style} className={`${Class}`}>
          {data.ad_title && <p className='fnt_12 text-center'>{data.ad_title ? data.ad_title : ''}</p>}
          <Image priority src={data.ad_image || check_Image(data.banner_image)} height={250} className={`${height} ${width} `} width={970} alt='ad' />
        </div>
      }
      {
        (homeAd && homeAd.header && homeAd.header.length != 0) ? <>
          {homeAd.header[0] && <div style={style} className={`${Class}`}>
            {/* {(homeAd.header[0].title && homeAd.header[0].title != null) && <p className='fnt_12 text-center'>{homeAd.header[0].title ? homeAd.header[0].title : ''}</p>} */}
            <Image priority src={check_Image(homeAd.header[0].banner_image)} height={250} className={`${height ? height : 'h-[250px]'} ${width ? width : 'w-full'} object-contain`} width={970} alt='ad' />
          </div>}
        </> : null
      }

    </>
  )
}
