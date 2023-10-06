import React from 'react'
import styles from '@/styles/category.module.scss'
import Image from 'next/image'
import { check_Image } from '@/libs/api'
import { useRouter } from 'next/router'
import Dropdowns from './Dropdowns'
import format from 'date-fns/format'

export default function Content({ res, i }) {
    const router = useRouter()
    const icons = [{ icon: "/bookstore/linkedin.svg", name: 'Linkedin' }, { icon: "/bookstore/FB.svg", name: 'Facebook' }, { icon: "/bookstore/twitter.svg", name: 'Twitter' }, { icon: "/bookstore/whatsapp.svg", name: 'Whatsapp' }]
    const setings = [{ name: 'Copy Link', icon: '/bookstore/Copy.svg' }, { name: 'Comment', icon: '/bookstore/comment.svg' }, { name: 'More Stories', icon: '/bookstore/more-stories.svg' }]


    const dateFormat = (data) => {
        // console.log(data)
        if (data && data != null) {
            const formattedDate = format(new Date(data), "iii, d LLL yyyy , hh : mm aaa");
            // setDate(formattedDate)
            // console.log(formattedDate)
            return formattedDate
        } else {
            return data
        }
    }

    const videoLink = (link, type) => {
        return type == 'yt' ? 'https://www.youtube.com/embed/' + link : 'https://player.vimeo.com/video/' + link
    }

    return (
        <>

            <div className='flex lg:gap-4 items-center md:gap-[10px] md:justify-between md:hidden'>
                {res.primary_text && <p className={`${res.primary_text ? 'primary_text' : ''}`}>{res.primary_text ? res.primary_text : ''}</p>}
                <div className='flex lg:gap-4 items-center md:gap-[10px] md:justify-between md:hidden'>
                    {/* {res.primary_text && <p className={`${res.primary_text ? 'primary_text' : ''}`}>{res.primary_text ? res.primary_text : ''}</p>} */}
                    <div className='flex md:block items-center gap-2'><Image height={11} width={11} alt={"image"} src={'/views.svg'} className='md:m-auto' /><span className='text-[12px] md:text-[10px] gray-text'>{res.views ? res.views : res.no_of_views ? res.no_of_views : 1} Views</span></div>
                    {/* <div className='flex md:block items-center gap-2'><Image height={11} width={13} alt={"image"} className='md:h-[13px] md:w-[11px] md:m-auto' src={'/shares.svg'} /><span className='md:text-[10px] text-[12px] gray-text'>3 Shares</span></div> */}
                    <div className='flex md:block items-center gap-2'><Image height={12} width={12} alt={"image"} src={'/time.svg'} className='md:m-auto' /><span className='text-[12px] md:text-[10px] gray-text'>{res.read_time} </span></div>
                </div>
            </div>

            <div className='flex lg:gap-4 items-center md:gap-[10px] md:justify-between lg:hidden'>
                {res.primary_text && <p className={`${res.primary_text ? 'primary_text' : ''}`}>{res.primary_text ? res.primary_text : ''}</p>}
            </div>

            <h1 className='mega_title lg:text-[40px] md:text-[18px] md:leading-[29.23px] leading-[1.3] m-[8px_0] md:my-1 md:mb-[5px]'>{res.title}</h1>

            <h6 className='text-gray text-[11px] gray-text pb-[10px]'><span className='text-[12px] text-[#000] font-semibold'>Published On : </span>{dateFormat(res.published_on)}</h6>

            <div className={`flex items-center justify-between ${styles.profile_div} md:hidden`}>
                <div className='lg:hidden flex gap-4 items-center'>

                    {/* <Image className='rounded-full object-cover w-[48px] h-[48px]' priority={true} src={(res.avatar && res.avatar != null) ? check_Image(res.avatar) : '/profit.svg'} height={43.12} width={43.12} alt={"image"} />
                    <div className='flex flex-col'>
                        <h6 className="text-[14x] font-semibold montserrat_fnt">{res.publisher}</h6>
                        <span className='text-gray lg:text-[13px] montserrat_fnt md:text-[12px] gray-text'>{dateFormat(res.published_on)}</span>
                    </div> */}
                    <div className='flex lg:gap-4 items-center md:gap-[10px] md:justify-between '>
                        {/* {res.primary_text && <p className={`${res.primary_text ? 'primary_text' : ''}`}>{res.primary_text ? res.primary_text : ''}</p>} */}
                        <div className='flex md:block items-center gap-2'><Image height={11} width={11} alt={"image"} src={'/views.svg'} className='md:m-auto' /><span className='text-[12px] md:text-[10px] gray-text'>{res.views ? res.views : res.no_of_views ? res.no_of_views : 1} Views</span></div>
                        {/* <div className='flex md:block items-center gap-2'><Image height={11} width={13} alt={"image"} className='md:h-[13px] md:w-[11px] md:m-auto' src={'/shares.svg'} /><span className='md:text-[10px] text-[12px] gray-text'>3 Shares</span></div> */}
                        <div className='flex md:block items-center gap-2'><Image height={12} width={12} alt={"image"} src={'/time.svg'} className='md:m-auto' /><span className='text-[12px] md:text-[10px] gray-text'>{res.read_time} </span></div>
                    </div>
                </div>

                <div className={`flex items-center gap-[8px] flex-wrap`}>
                    {res.publisher && res.publisher.length != 0 &&
                        res.publisher.map((r, index) => {
                            return (
                                <div key={index} className='flex gap-[8px] items-center inner_line'>
                                    <Image className='rounded-full object-contain w-[30px] h-[30px]' priority={true} src={(r.avatar && r.avatar != '' && r.avatar != '') ? check_Image(r.avatar) : '/profit.svg'} height={43.12} width={43.12} alt={"image"} />
                                    <div className='block'>
                                        <h6 className="font-semibold text-[12px]">{r.full_name}</h6>
                                        {/* <span className='text-gray text-[11px] gray-text'>{dateFormat(res.published_on)}</span> */}
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>


                <div className='flex items-center gap-[15px] pr-[10px]'>
                    {icons && <Dropdowns share={true} link={res} width={'w-[170px]'} data={icons} />}
                    {setings && <Dropdowns setting={true} link={res.articles_category[0].category_route} img={'/setting.svg'} element={`cmt${i}`} width={'w-[100px] lg:w-[160px]'} data={setings} />}
                </div>
            </div>
            <div className='flex gap-3 justify-between'>
                <div className={`lg:hidden flex items-center gap-[8px] flex-wrap`}>
                    {res.publisher && res.publisher.length != 0 &&

                        res.publisher.map((r, index) => {
                            return (
                                <div key={index} className='flex gap-[8px] items-center inner_line'>
                                    <Image className='rounded-full object-contain w-[25px] h-[25px]' priority={true} src={(r.avatar && r.avatar != null) ? check_Image(r.avatar) : '/profit.svg'} height={43.12} width={43.12} alt={"image"} />
                                    <div className='block'>
                                        <h6 className="font-semibold text-[12px]">{r.full_name}</h6>
                                        {/* <span className='text-gray text-[11px] gray-text'>{dateFormat(res.published_on)}</span> */}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='lg:hidden flex gap-[15px] mr-[10px]'>
                    {icons && <Dropdowns link={res} share={true} width={'w-[170px]'} data={icons} />}

                    {setings && <Dropdowns link={res} setting={true} img={'/setting.svg'} element={`cmt${i}`} width={'w-[160px] lg:w-[160px]'} data={setings} />}
                </div>
            </div>

            <div className='flex lg:gap-4 items-center md:gap-[10px] lg:hidden my-[10px]'>
                {/* {res.primary_text && <p className={`${res.primary_text ? 'primary_text' : ''}`}>{res.primary_text ? res.primary_text : ''}</p>} */}
                <div className='flex items-center gap-2'><Image height={11} width={11} alt={"image"} src={'/views.svg'} className='md:m-auto' /><p className='text-[12px] md:text-[10px] gray-text'>{res.views ? res.views : res.no_of_views ? res.no_of_views : 1} Views</p></div>
                {/* <div className='flex items-center gap-2'><Image height={11} width={13} alt={"image"} className='md:h-[13px] md:w-[11px] md:m-auto' src={'/shares.svg'} /><p className='md:text-[10px] text-[12px] gray-text'>3 Shares</p></div> */}
                <div className='flex items-center gap-2'><Image height={12} width={12} alt={"image"} src={'/time.svg'} className='md:m-auto' /><p className='text-[12px] md:text-[10px] gray-text'>{res.read_time} </p></div>
            </div>
            {/* <p className='py-3 text-[18px] md:hidden'>{res.title}</p> */}
            {(res.attach_type == 'Video' && res.video_type == 'YouTube') ? <iframe
                className={`h-[500px] md:h-[300px] w-full`}
                title={res.title ? res.title : ''}
                src={videoLink(res.video_id, 'yt')}
                id={res.i}
                // width={res.width}
                // height={res.height}
                frameBorder="2"
                loading="lazy"
            // allowfullscreen="allowfullscreen"
            ></iframe> : (res.attach_type == 'Video' && res.video_type == 'Vimeo') ? <iframe
                className={`h-[500px] md:h-[300px] w-full`}
                title={res.title ? res.title : ''}
                src={videoLink(res.video_id, 'vimeo')}
                id={res.i}
                // width={res.width}
                // height={res.height}
                frameBorder="2"
                loading="lazy"
            // allowfullscreen="allowfullscreen"
            ></iframe> : <div className='w-full lg:h-[500px]'><Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' src={check_Image(res.image ? res.image : res.thumbnail_image)} height={600} width={1000} alt={res.title} className="py-3 lg:h-full object-contain w-full" /></div>
            }

            {/* <p className='py-3 !leading-[1.74] !text-[15px] !text-justify font-semibold'>{res.blog_intro}</p> */}
            <p className='py-3 !leading-[1.5] !text-[18px] !text-justify font-semibold'>{res.blog_intro}</p>
        </>
    )
}
