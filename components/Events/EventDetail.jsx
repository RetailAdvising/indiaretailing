import Image from 'next/image'
import React from 'react'
import AdsBaner from '../Baners/AdsBaner'
import Cards from '../common/Cards'
import { check_Image } from '@/libs/common'
import detail from '@/libs/eventDetail'
export default function EventDetail({ data }) {
    console.log(data)
    return (
        <>
            {data && <div className={`p-[30px] container`}>
                <div> <Image height={200} width={400} priority src={check_Image(data.message.thumbnail_path)} className={`h-full w-full`} alt={data.message.title} /> </div>
                <div className={`flex gap-[20px] pt-[30px]`}>
                    <div className={`flex-[0_0_calc(75%_-_10px)] p-[10px] border rounded-[5px]`}>
                        <p>{data.message.start_date}</p>
                        <div className={`flex items-center pt-[15px] justify-between`}>
                            <h6 className={`text-xl font-semibold`}>{data.message.title}</h6>
                            <div className='flex gap-[5px]'>
                                <Image height={13} width={13} className={`h-[23px] w-[20px]`} alt={data.event_time} src={'/shares.svg'}></Image>
                                <Image height={13} width={13} objectFit='contain' className={`h-[23px] w-[20px] object-contain`} alt={data.event_time} src={'/settings.svg'}></Image>
                            </div>
                        </div>
                        <p className='sub_title pt-[15px] w-[80%]'>{data.message.description}</p>
                        <div className={`title_div py-5`}>
                            <h6 className={`title`}>When and where</h6>
                            <div className='line'></div>
                        </div>
                        <div className={`flex gap-[20px] pt-[10px] w-[80%]`}>
                            <div className='flex gap-[10px] items-start border_right pr-[60px]'>
                                <Image src={'/events/date_time.svg'} objectFit='contain' height={20} width={20} alt={data.start_date} />
                                <p className={`flex flex-col`}><span className='text-[15px] font-semibold'>Date and Time</span><span className='sub_title'>{data.message.start_date}</span></p>
                            </div>
                            <div className='flex gap-[10px] items-start pl-[20px]'>
                                <Image src={'/events/location.svg'} objectFit='contain' height={20} width={20} alt={data.date_time} />
                                <p className={`flex flex-col`}><span className='text-[15px] font-semibold'>Location</span>
                                <span className='sub_title'>Chennai</span>
                                </p>
                            </div>
                        </div>
                        <div className={`title_div py-5`}>
                            <h6 className={`title`}>About This Event</h6>
                            <div className='line'></div>
                        </div>
                        <p className='w-[80%]'>{data.message.description}</p>
                    </div>

                    {/* Col-2 */}
                    <div className='flex flex-col gap-[20px] items-center'>
                        <button type='button' className={`primary_button`}>Registration Now</button>
                        <button type='button' className={`primary_outline`}>More Details</button>
                        {data && <AdsBaner data={{ad_image:'/ads_baner.png'}} />}
                    </div>
                </div>
                {  <>
                    <div className={`title_div py-5`}>
                        <h4 className={`title`}>Upcoming Events</h4>
                        <div className='line'></div>
                    </div>
                    <div className='flex gap-[20px]'>
                        <Cards data={detail.upcoming_events} borderRadius={"10px 10px 0 0"} height={"h-[200px]"} width={'w-full'} flex={'basis-1/4'} isBorder={true} />
                    </div>
                </>}
            </div>}
        </>
    )
}
