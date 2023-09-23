import { check_Image } from '@/libs/api'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router';
export default function AdsBaner({ data, height, Class, style, width, homeAd,footerAd }) {
  const router = useRouter()
  return (
    <>
      {
        data && <div style={style}  className={`${Class}`}>
          {data && 
          <div className='flex items-center justify-center gap-[5px]'>
             <span className='bg-[#00000066] h-[1px] w-[10px] rounded-[5px]'></span>
             <h6 className='text-[11px] tracking-[0.1]'>{data.title ? data.title : 'Advertisement'}</h6>
             <span className='bg-[#00000066] h-[1px] w-[10px] rounded-[5px]'></span>
          </div>  
          //  <h6 className='fnt_12 text-center ads_line relative text-[#0000009c]'>{data.title ? data.title : 'Advertisement'}</h6>
           }
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
      {
        (footerAd && footerAd.footer && footerAd.footer.length != 0) ? <>
          {footerAd.footer[0] &&
           <div className='flex items-center justify-center gap-[5px]'>
            <span className='bg-[#00000066] h-[1px] w-[10px] rounded-[5px]'></span>
            <h6 className='fnt_12'>Advertisement</h6>
            <span className='bg-[#00000066] h-[1px] w-[10px] rounded-[5px]'></span>
           </div> 
            // <p className="fnt_12 text-center">Advertisement</p>
          }
          {footerAd.footer[0] && 
          <div style={style} className={`${Class}`}>
            <Image priority  onClick={() => window.open(footerAd.footer[0].banner_link, '_blank')} src={check_Image(footerAd.footer[0].banner_image)} height={250}  className={`${height ? height : 'h-[250px]'} ${width ? width : 'w-[970px]'} object-contain cursor-pointer`} width={970} alt='ad' />
          </div>}
        </> : null
      }

    </>
  )
}
