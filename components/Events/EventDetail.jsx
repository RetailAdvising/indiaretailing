import Image from 'next/image'
import { check_Image } from '@/libs/common'
import format from 'date-fns/format'
import dynamic from 'next/dynamic'
const Placeholders = dynamic(()=> import('../common/Placeholders'))
const Advertisement = dynamic(()=> import('../Baners/Advertisement'))
const Dropdowns = dynamic(()=> import('../common/Dropdowns'))
const EventCards = dynamic(()=> import('./EventCards'))
const Title = dynamic(()=> import('../common/Title'))
export default function EventDetail({ data, ads_data }) {

    const redirectTo = () => {
        if (data.message && data.message.link) {
            window.open(data.message.link, '_blank')
        }
    }

    const viewMoreLink = () => {
        if (data.message && data.message.view_more_link) {
            window.open(data.message.view_more_link, '_blank')
        }
    }


    const videoLink = (link, type) => {
        return type == 'yt' ? 'https://www.youtube.com/embed/' + link : 'https://player.vimeo.com/video/' + link
    }

    const dateFormat = (data, type) => {
        if (data && data != null) {
            const formattedDate = type == 'start' ? format(new Date(data), "iii, LLL d") : format(new Date(data), "iii, d LLL yyyy");
            // setDate(formattedDate)
            return formattedDate
        } else {
            return data
        }
    }

    const icons = [{ icon: "/bookstore/linkedin.svg", name: 'Linkedin' }, { icon: "/bookstore/FB.svg", name: 'Facebook' }, { icon: "/bookstore/twitter.svg", name: 'Twitter' }, { icon: "/bookstore/whatsapp.svg", name: 'Whatsapp' }]
    const updateShare = async (data) => {
        // console.log(data,'share');
        // const param = {
        //   doc_id: data.name,
        //   doctype:'Product'
        // }
    
        // const resp = await update_no_of_shares(param);
        // if(resp.message == 'Success'){
        //   // console.log(resp)
    
        // }
      }

    return (
        <>
            {/* p-[30px_0px] */}
            {data && <div className={` md:p-[15px] container`}>
                <div className=' py-[5px] bg-[#f1f1f130]'>
                    {(data.message.attach_type == 'Video' && data.message.video_type == 'YouTube') ? <iframe
                        className={`h-[500px] md:h-[300px] w-full`}
                        title={data.message.title ? data.message.title : ''}
                        src={videoLink(data.message.video_id, 'yt')}
                        id={data.message.i}
                        // width={data.message.width}
                        // height={data.message.height}
                        frameBorder="2"
                        loading="lazy"
                    // allowfullscreen="allowfullscreen"
                    ></iframe> : (data.message.attach_type == 'Video' && data.message.video_type == 'Vimeo') ? <iframe
                        className={`h-[500px] md:h-[300px] w-full`}
                        title={data.message.title ? data.message.title : ''}
                        src={videoLink(data.message.video_id, 'vimeo')}
                        id={data.message.i}
                        // width={data.message.width}
                        // height={data.message.height}
                        frameBorder="2"
                        loading="lazy"
                    // allowfullscreen="allowfullscreen"
                    ></iframe> :
                        <Image height={200} width={400} priority src={check_Image(data.message.image_path ? data.message.image_path : data.message.thumbnail_path)} className={`lg:h-[450px] object-contain w-full`} alt={data.message.title} />}
                </div>
                <div className={`lg:flex md:flex-wrap gap-[20px] pb-[20px] pt-[30px] md:pt-[10px]`}>
                    <div className={`flex-[0_0_calc(75%_-_10px)] md:flex-[0_0_calc(100%_-_10px)] p-[10px] border rounded-[5px]`}>
                        <div className='flex items-center justify-between gap-[15px]'>
                            <p className={`nunito`}>{dateFormat(data.message.event_date, 'start')}</p>
                            <div>
                                {typeof window !== "undefined" && icons && <Dropdowns copy_link={true} share={true} updateShare={(data) => updateShare(data)} link={data.message} width={'w-[170px]'} btnClass={'md:w-[32px]'} data={icons} type={'books'} />}
                            </div>
                        </div>
                        <h6 className={`text-xl md:text-[17px] pt-[15px] md:pt-[10px] font-[700] nunito`}>{data.message.title}</h6>
                        
                        <p className='sub_title pt-[15px] md:pt-[10px]  line-clamp-2'>{data.message.description}</p>
                        <div className={`title_div py-5`}>
                            <h6 className={`text-[16px] md:text-[15px] nunito capitalize font-[700]`}>When and where</h6>
                            <div className='line'></div>
                        </div>
                        <div className={`flex gap-[20px] pt-[10px]`}>
                            {/* pr-[60px] */}
                            <div className='flex gap-[10px] items-center'>
                                <Image src={'/Events/Date-time.svg'} className='md:h-[18px] md:w-[18px]' height={20} width={20} alt={'date and time'} />
                                <p className={`flex flex-col`}><span className={`text-[15px] nunito md:text-[14px] font-[700]`}>Date and Time</span><span className={`sub_title josefin-sans`}>{dateFormat(data.message.event_date, 'end')}</span></p>
                            </div>
                            {/* pl-[20px] */}
                            <div className='flex gap-[10px] items-center'>
                                <Image src={'/Events/location.svg'} className='md:h-[20px] md:w-[18px] object-contain' height={20} width={20} alt={'location'} />
                                <p className={`flex flex-col`}><span className={`text-[15px] font-semibold md:text-[14px] nunito`}>Location</span>
                                    {(data.message.event_location && data.message.event_location.length != 0) && data.message.event_location.map((res, index) => {
                                        return (
                                            <span key={res.event_location} className={`sub_title josefin-sans`}>{res.event_location}</span>
                                        )
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className={`title_div py-5`}>
                            <h6 className={`text-[16px] md:text-[15px] capitalize jost font-semibold`}>About This Event</h6>
                            <div className='line'></div>
                        </div>
                        {/* <p className='w-[80%]'>{data.message.description}</p> */}
                        <div dangerouslySetInnerHTML={{ __html: data.message.event_description }} className={`contents`} />
                    </div>

                    {/* Col-2 */}
                    <div className='lg:flex  flex-col flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(100%_-_10px)] gap-[20px] items-center'>
                        <div className='flex md:my-[20px] w-full md:justify-between lg:flex-col gap-[10px]'>
                            {data.message.end_date > format(new Date(), "yyyy-MM-dd") && <button type='button' className={`primary_button h-[45px] md:h-[40px] md:text-[14px] w-full md:w-[45%]`} onClick={redirectTo} >Register Now</button>}
                            <button type='button' className={`primary_outline h-[45px] md:h-[40px] md:text-[14px] w-full md:w-[45%]`} onClick={viewMoreLink}>More Details</button>
                        </div>
                        {/* tagbasedAd={data.banner_ad && data.banner_ad.length != 0 && data.banner_ad.banner_ad_item.length != 0 ? data.banner_ad.banner_ad_item : [] } pro  ductNavigation={productNavigation}*/}
                        {(data.place_holders_ads && data.place_holders_ads.length != 0) ? <Placeholders ad_payload={{ page: 'Events', page_type: 'Detail' }} placeholder={data.place_holders_ads} /> :

                            <>
                                <Advertisement ad_payload={{ page: 'Events', page_type: 'Detail' }} adId={'right_first'} data={(ads_data && ads_data.right_first) && ads_data.right_first} position={"small"} adPos={'300'} insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[250px] w-[300px]`} />
                                {/* <Advertisement adId={'right_second'} data={(ads_data && ads_data.right_second) && ads_data.right_second} position={"small"} insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[250px] w-[300px]`} />
                         <Advertisement adId={'right_third'} data={(ads_data && ads_data.right_third) && ads_data.right_third} position={"small"} insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[250px] w-[300px]`} /> */}
                            </>

                        }

                    </div>
                </div>

                {(data.upcoming_events && data.upcoming_events.length != 0) && <>

                    <Title data={{ title: 'Upcoming Events' }} />
                    <div className='lg:grid lg:grid-cols-4 eventCards md:flex  md:gap-[15px] md:overflow-auto  gap-[20px]'>
                        <EventCards height={'h-[200px] md:h-[160px]'} flex={'md:flex-[0_0_calc(70%_-_10px)]'} card={'lg:h-[370px] md:h-[310px]'} width={'w-full'} data={data.upcoming_events.slice(0, 4)} />
                    </div>
                </>}
            </div>}
        </>
    )
}
