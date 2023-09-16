import { check_Image } from '@/libs/api'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router';
export default function AdsBaner({ data, height, Class, style, width, homeAd, }) {
  const router = useRouter()
  return (
    <>
      {
        data && <div style={style}  className={`${Class}`}>
          {data && <p className='fnt_12 text-center'>{data.title ? data.title : ''}</p>}
          <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' onClick={() => window.open(homeAd.header[0].banner_link, '_blank')} src={data.ad_image || check_Image(data.banner_image)} height={250} className={`${height} ${width} `} width={970} alt='ad' />
        </div>
      }
      {
        (homeAd && homeAd.header && homeAd.header.length != 0) ? <>
          {homeAd.header[0] && <div style={style} className={`${Class}`}>
            {/* loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' */}
            {/* {(homeAd.header[0].title && homeAd.header[0].title != null) && <p className='fnt_12 text-center'>{homeAd.header[0].title ? homeAd.header[0].title : ''}</p>} */}
            <Image priority  onClick={() => window.open(homeAd.header[0].banner_link, '_blank')} src={check_Image(homeAd.header[0].banner_image)} height={250}  className={`${height ? height : 'h-[250px]'} ${width ? width : 'w-[970px]'} object-contain cursor-pointer`} width={970} alt='ad' />
          </div>}
        </> : null
      }

    </>
  )
}
