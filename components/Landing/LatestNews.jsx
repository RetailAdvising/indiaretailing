import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { check_Image, checkMobile } from '@/libs/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function LatestNews({ data, height, width, isList }) {
  const [isMobile, setIsMobile] = useState()
  const router = useRouter()
  useEffect(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [])

  const checkIsMobile = async () => {
    let isMobile = await checkMobile();
    setIsMobile(isMobile);
  }
  return (
    <>
      {(data && !isMobile) ? data.map((res, index) => {
        return (
          <Link key={index} href={'/news/' + res.route}>
            <div className={`pb-[10px] ${!res.image && ((index != data.length - 1 || index == 1)) && 'border_bottom'}`}>
              {(res.thumbnail_image && index < 2) && <Image priority src={check_Image(res.thumbnail_image)} className={`rounded-[5px] ${height} ${width}`} width={400} height={200} alt={res.title} />}
              {res.title && <h6 className={`my-[10px] line-clamp-1 title `}>{res.title}</h6>}
              {(res.blog_intro && index >= 2) && <p className={`${!res.image && 'mb-[10px]'} sub_title line-clamp-2`}>{res.blog_intro}</p>}
            </div>
          </Link>
        )
      })

        : <>
          {(data && isMobile && !isList) &&
            data.slice(0, 2).map((res, i) => {
              return (
                <Link key={i} href={'/news/' + res.route} className='flex-[0_0_calc(80%_-_10px)] border rounded-[10px] h-[250px]'>
                  <div>
                    <Image priority src={check_Image(res.thumbnail_image)} className={`rounded-[5px] ${height} ${width}`} width={400} height={200} alt={res.title} />
                  </div>
                  <div className='px-[10px]'>
                    <h6 className={`my-[10px] line-clamp-1 title `}>{res.title}</h6>
                  </div>
                </Link>
              )
            })
          }

          {(data && isMobile && isList) && data.map((res, i) => {
            return (
              <div key={i} onClick={() => router.push('/news/' + res.route)} className={`${i == 0 ? 'border_top border_bottom' : 'mb-[15px]'}`}>
                {res.title && <h6 className={`my-[10px] line-clamp-1 title `}>{res.title}</h6>}
                {(res.blog_intro) && <p className={`${!res.image && 'mb-[10px]'} sub_title line-clamp-2`}>{res.blog_intro}</p>}

              </div>
            )
          })}



        </>}
    </>
  )
}
