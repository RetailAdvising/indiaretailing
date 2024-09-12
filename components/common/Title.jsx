import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { Inter,Nunito } from 'next/font/google'
const inter = Inter({
  weight: ["300","400","500","600","700"],
  display: "block",
  preload: true,
  style: 'normal',
  subsets: ["latin"],
  variable: '--font-inter'
})

const nunito = Nunito({
    weight: ["300","400","500","600","700"],
    display: "block",
    preload: true,
    style: 'normal',
    subsets: ["latin"],
    variable: '--font-inter',
  })
export default function Title({ data, textClass, seeMore, font, noPadding, isVid, see, route, title_class }) {
  const router = useRouter()

  async function goTo(data) {
    if (isVid) {
      router.push(route)
    } else if (route) {
      router.push(route)
    }
    else {
      router.push(`/${router.asPath.split('/')[1]}/${data.route}`)
    }
  }
  return (
    <> 
      {data &&
        <div className={`title_div ${noPadding ? '' : 'pb-3'} flex justify-between ${title_class ? title_class : ''}`}>
          <div className='cursor-pointer'>
            <h6 style={{ fontSize: font }} className={`title text-[18px] ${textClass} ${inter.className}`}>{data.title ? data.title : data.category_name ? data.category_name : ''}</h6>
            <div className='line mt-1'></div>
          </div>
          {
            seeMore &&
            <div className='flex items-center gap-[5px] cursor-pointer' onClick={() => goTo(data)}>
              <p className={`text-[12px] font-normal ${see} ${nunito.className}`}>View All</p>
              <Image className='h-[11px] w-[5px] object-contain' src={see ? '/arrow-white.svg' : '/forwardIcon.svg' } height={5} width={5} alt='View All' />
            </div>
          }

        </div>
      }
    </>
  )
}
