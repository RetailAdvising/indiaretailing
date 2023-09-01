import Image from 'next/image'
import React,{useState} from 'react'
import AdsBaner from '../Baners/AdsBaner'
import Cards from '../common/Cards'
import { check_Image } from '@/libs/common'
// import detail from '@/libs/eventDetail'
import Title from '../common/Title'
import EventCards from './EventCards'
import { useRouter } from 'next/router'

export default function EventDetail({ data }) {
    console.log(data)
    const router = useRouter();

    const redirectTo = () => {
        if(data.message && data.message.link){
            window.open(data.message.link,'_blank')
        }
    }
    return (
        <>
            {data && <div className={`p-[30px] container`}>
                <Image height={200} width={400} priority src={check_Image(data.message.image_path ? data.message.image_path : data.message.thumbnail_path)} className={`lg:h-[450px] md:object-contain w-full`} alt={data.message.title} />
                <div className={`flex md:flex-wrap gap-[20px] pb-[20px] pt-[30px]`}>
                    <div className={`flex-[0_0_calc(75%_-_10px)] md:flex-[0_0_calc(100%_-_10px)] p-[10px] border rounded-[5px]`}>
                        <p>{data.message.start_date}</p>
                        {/* <div className={`flex items-center pt-[15px] justify-between`}> */}
                            <h6 className={`text-xl pt-[15px] font-semibold`}>{data.message.title}</h6>
                            {/* <div className='flex gap-[5px]'>
                                <Image height={13} width={13} className={`h-[18px] w-[18px]`} alt={'share'} src={'/shares.svg'}></Image>
                                <Image height={13} width={13} objectFit='contain' className={`h-[23px] w-[20px] object-contain`} alt={'settings'} src={'/settings.svg'}></Image>
                            </div> */}
                        {/* </div> */}
                        <p className='sub_title pt-[15px] w-[80%] line-clamp-2'>{data.message.description}</p>
                        <div className={`title_div py-5`}>
                            <h6 className={`title`}>When and where</h6>
                            <div className='line'></div>
                        </div>
                        <div className={`flex gap-[20px] pt-[10px] w-[80%]`}>
                            <div className='flex gap-[10px] items-start border_right pr-[60px]'>
                                <Image src={'/Events/Date-time.svg'}  height={20} width={20} alt={'date and time'} />
                                <p className={`flex flex-col`}><span className='text-[15px] font-semibold'>Date and Time</span><span className='sub_title'>{data.message.start_date}</span></p>
                            </div>
                            <div className='flex gap-[10px] items-start pl-[20px]'>
                                <Image src={'/Events/locations.svg'}  height={20} width={20} alt={'location'} />
                                <p className={`flex flex-col`}><span className='text-[15px] font-semibold'>Location</span>
                                    {(data.message.event_location && data.message.event_location.length != 0) && data.message.event_location.map((res, index) => {
                                        return (
                                            <span key={res.event_location} className='sub_title'>{res.event_location}</span>
                                        )
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className={`title_div py-5`}>
                            <h6 className={`title`}>About This Event</h6>
                            <div className='line'></div>
                        </div>
                        {/* <p className='w-[80%]'>{data.message.description}</p> */}
                        <div dangerouslySetInnerHTML={{ __html: data.message.event_description }}  className={`contents`} />
                    </div>

                    {/* Col-2 */}
                    <div className='flex flex-col flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(100%_-_10px)] gap-[20px] items-center'>
                        <button type='button' className={`primary_button h-[45px] w-full md:w-[45%]`} onClick={redirectTo} >Registration Now</button>
                        <button type='button' className={`primary_outline h-[45px] w-full md:w-[45%]`}  onClick={redirectTo}>More Details</button>
                        {data && <AdsBaner data={{ ad_image: '/ads_baner.png' }} />}
                    </div>
                </div>

                {(data.upcoming_events && data.upcoming_events.length != 0) && <>
                    {/* <div className={`title_div py-5`}>
                        <h4 className={`title`}>Upcoming Events</h4>
                        <div className='line'></div>
                    </div> */}
                    <Title data={{ title: 'Upcoming Events' }} />
                    <div className='grid grid-cols-4 md:grid-cols-2 gap-[20px]'>
                        <EventCards height={'h-[200px]'} width={'w-full'} data={data.upcoming_events} />
                        {/* <Cards data={data.upcoming_events} borderRadius={"10px 10px 0 0"} check={true} height={"h-[200px]"} width={'w-full'}  isBorder={true} /> */}
                    </div>
                </>}
            </div>}
        </>
    )
}
