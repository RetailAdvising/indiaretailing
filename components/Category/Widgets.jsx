import React from 'react'
import Image from 'next/image'
import Title from '../common/Title'
import { check_Image } from '@/libs/api'
import Video from '@/components/Video/Video'

export default function Widgets({ data, index,routers,productNavigation }) {
  // console.log(data)
const checkRoute = (res,data) => {
  if (data.title == 'Articles') {
    res.route = res.route
    productNavigation(res.route)
} else if (data.title == 'Community Event' || data.title == 'Events') {
    res.route = '/events/' + res.route
    routers.push(res.route)
} else if (data.title == 'Books') {
    res.route = '/bookstore/' + res.category_route + '/' + res.route
    routers.push(res.route)
} else if (data.title == 'Videos') {
    res.route = '/video/' + res.route
    routers.push(res.route)
} else if (data.title == 'Podcasts') {
    res.route = '/podcast/' + res.route
    routers.push(res.route)
}
}
  return (
    <>
      <div className='border mb-[10px] rounded-[8px] p-[15px]'>
        <h6 className='text-[15px] font-semibold mb-[10px]'>{data.title}</h6>
        {data.data && data.data.length != 0 &&
          <div className='grid gap-5 grid-cols-3'>
            {data.title != 'Videos' && data.data.slice(0, 6).map((res, i) => {
              return (
                <div key={index} onClick={()=> checkRoute(res,data)} className='flex cursor-pointer h-[100px] gap-[10px] border rounded-[5px] p-[10px]'>
                  <div className='flex-[0_0_calc(40%_-_10px)]'>
                    <Image className='h-[75px] rounded-[5px] !p-0 w-full' height={200} width={400} alt={res.title ? res.title : res.item ? res.item : i} src={check_Image(res.thumbnail_image ? res.thumbnail_image : res.image ? res.image : res.thumbnail_path ? res.thumbnail_path : res.product_image ? res.product_image : res.video_image ? res.video_image : null)} />
                  </div>
                  <div> 
                    {(res.primary_text && res.secondary_text) && <p className={`flex gap-2 !mb-[5px] items-center py-[5px] line-clamp-1`}><span className={`primary_text leading-normal tracking-wider !text-[10px] line-clamp-1 flex-[0_0_50%]`}>{res.primary_text}</span> <span className="h-[10px] w-[1px] bg-[#6f6f6f] flex-[0_0_1%]"></span> <span className='secondary_text line-clamp-1 flex-[0_0_49%]'>{res.secondary_text}</span></p>}
                    {res.title && <p className='line-clamp-2 !mb-0 !text-[14px]'>{res.title}</p>}
                    {res.item && <p className='line-clamp-2 !mb-0 !text-[14px]'>{res.item}</p>}
                    {data.title == 'Events' &&
                      <div className={`flex gap-[5px] items-center lg:pt-[10px]`}>
                        <p className={`flex !mb-0 items-center gap-[5px] md:flex-direction`}><Image src={'/calendar.svg'} className='md:hidden h-[15px] w-[13px] !p-0' objectFit='contain' height={25} width={20} alt={res.title} />  <span className={`light_text !text-[9px]`}>{res.start_date}</span></p>{res.locations && <span className='h-[18px] w-[2px] mx-[6px] bg-[#ddd]'></span>}
                        {res.locations && <>
                          <p className={`flex !mb-0 flex-wrap items-center gap-[5px]`}><Image src={'/location.svg'} className='md:hidden !p-0' height={15} width={20} alt={res.title} />

                            {res.locations.slice(0, 1).map((item, index) => {
                              return (
                                <span key={index} className={`light_text !text-[9px]`}>{item.event_location}</span>
                              )
                            })}
                          </p>
                        </>}
                      </div>
                    }
                    {data.title == 'Podcasts' && res.description && <div className={`!text-[12px] innertag pt-[5px] line-clamp-1`} dangerouslySetInnerHTML={{ __html: res.description }}></div>
                    }
                  </div>
                </div>
              )
            })}

            {data.title == 'Videos' && data.data.slice(0,3).map((res, i) => {
              return (
                <div key={i + res.title}>
                  <div onClick={()=> checkRoute(res,data)} className={` lg:mb-[20px]  cursor-pointer relative`}>
                    <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' src={check_Image(res.video_image)} className={`!rounded-[5px] !p-0 h-[175px] w-full`} height={150} width={273} alt={res.title} />
                    {/* <ImageLoader style={`rounded-[5px] ${imgClass ? imgClass : 'h-[175px] w-full'}`} src={res.video_image} title={res.title ? res.title : 's'} /> */}
                    <Image src={'/irprime/youtube.svg'} className={`absolute bottom-[30px] left-[5px]  md:bottom-[30px]  object-contain h-[20px] w-[30px]`} height={100} width={100} alt={res.title} />
                    <p className={`pt-[10px] !text-[14px] md:!text-[13px]  line-clamp-1 `}>{res.title}</p>
                  </div>
                </div>
              )
            })}
          </div>}
      </div>
    </>
  )
}
