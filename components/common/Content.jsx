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
    const setings = [{ name: 'More Stories' }, { name: 'Copy Link' }, { name: 'Comment' }]

    
    const dateFormat = (data) => {
        if (data && data != null) {
            const formattedDate = format(new Date(data), "iii, d LLL yyyy , hh : mm aaa");
            // setDate(formattedDate)
            // console.log(data)
            // console.log(formattedDate)
            return formattedDate
        } else {
            return data
        }
    }




    return (
        <>
            <div className='flex lg:gap-4 items-center md:gap-[10px] md:justify-between md:hidden'>
                {res.primary_text && <p className={`${res.primary_text ? 'primary_text' : ''}`}>{res.primary_text ? res.primary_text : ''}</p>}
                <div className='flex lg:gap-4 items-center md:gap-[10px] md:justify-between md:hidden'>
                    {/* {res.primary_text && <p className={`${res.primary_text ? 'primary_text' : ''}`}>{res.primary_text ? res.primary_text : ''}</p>} */}
                    <div className='flex md:block items-center gap-2'><Image height={11} width={11} alt={"image"} src={'/views.svg'} className='md:m-auto' /><span className='text-[12px] md:text-[10px] gray-text'>{res.views ? res.views : res.no_of_views ? res.no_of_views : 1} Views</span></div>
                    {/* <div className='flex md:block items-center gap-2'><Image height={11} width={13} alt={"image"} className='md:h-[13px] md:w-[11px] md:m-auto' src={'/shares.svg'} /><span className='md:text-[10px] text-[12px] gray-text'>3 Shares</span></div> */}
                    <div className='flex md:block items-center gap-2'><Image height={12} width={12} alt={"image"} src={'/time.svg'} className='md:m-auto' /><span className='text-[12px] md:text-[10px] gray-text'>{res.read_time} Minutes </span></div>
                </div>
            </div>
            <div className='flex lg:gap-4 items-center md:gap-[10px] md:justify-between lg:hidden'>
                {res.primary_text && <p className={`${res.primary_text ? 'primary_text' : ''}`}>{res.primary_text ? res.primary_text : ''}</p>}
            </div>

            <h1 className='mega_title lg:text-4xl md:text-[18px] md:leading-[29.23px] my-4 md:my-1 md:mb-[5px]'>{res.title}</h1>

            <div className={`flex items-center justify-between ${styles.profile_div} md:hidden`}>
                <div className='flex gap-4 items-center'>
                    <Image className='rounded-full object-cover w-[48px] h-[48px]' priority={true} src={(res.avatar && res.avatar != null) ? check_Image(res.avatar) : '/profit.svg'} height={43.12} width={43.12} alt={"image"} />
                    <div className='flex flex-col'>
                        <h6 className="font-semibold">{res.publisher}</h6><span className='text-gray lg:text-[13px] md:text-[12px] gray-text'>{dateFormat(res.published_on)}</span>
                    </div>
                    <div className='flex lg:gap-4 items-center md:gap-[10px] md:justify-between lg:hidden'>
                        {/* {res.primary_text && <p className={`${res.primary_text ? 'primary_text' : ''}`}>{res.primary_text ? res.primary_text : ''}</p>} */}
                        <div className='flex md:block items-center gap-2'><Image height={11} width={11} alt={"image"} src={'/views.svg'} className='md:m-auto' /><span className='text-[12px] md:text-[10px] gray-text'>{res.views ? res.views : res.no_of_views ? res.no_of_views : 1} Views</span></div>
                        {/* <div className='flex md:block items-center gap-2'><Image height={11} width={13} alt={"image"} className='md:h-[13px] md:w-[11px] md:m-auto' src={'/shares.svg'} /><span className='md:text-[10px] text-[12px] gray-text'>3 Shares</span></div> */}
                        <div className='flex md:block items-center gap-2'><Image height={12} width={12} alt={"image"} src={'/time.svg'} className='md:m-auto' /><span className='text-[12px] md:text-[10px] gray-text'>{res.read_time} Minutes </span></div>
                    </div>
                </div>

                <div className='flex items-center gap-[15px]'>
                    {icons && <Dropdowns share={true} link={res} width={'w-[170px]'} data={icons} />}

                    {setings && <Dropdowns setting={true} link={res} img={'/setting.svg'} element={`cmt${i}`} width={'w-[100px] lg:w-[160px]'} data={setings} />}
                </div>
            </div>
            <div className='flex gap-3 justify-between'>
                <div className='flex gap-[15px] items-center'>
                    <Image className='rounded-full object-contain lg:hidden w-[40] h-[40]' priority={true} src={(res.avatar && res.avatar != null) ? check_Image(res.avatar) : '/profit.svg'} height={43.12} width={43.12} alt={"image"} />
                    <div className='block'>
                        <h6 className="font-semibold lg:hidden text-[12px]">{res.publisher}</h6>
                        <span className='lg:hidden text-gray text-[11px] gray-text'>{dateFormat(res.published_on)}</span>
                    </div>
                </div>
                <div className='lg:hidden flex gap-[15px]'>
                    {icons && <Dropdowns link={res} share={true} width={'w-[170px]'} data={icons} />}

                    {setings && <Dropdowns link={res} setting={true} img={'/setting.svg'} element={`cmt${i}`} width={'w-[130px] lg:w-[160px]'} data={setings} />}
                </div>
            </div>

            <div className='flex lg:gap-4 items-center md:gap-[10px] lg:hidden my-[10px]'>
                {/* {res.primary_text && <p className={`${res.primary_text ? 'primary_text' : ''}`}>{res.primary_text ? res.primary_text : ''}</p>} */}
                <div className='flex items-center gap-2'><Image height={11} width={11} alt={"image"} src={'/views.svg'} className='md:m-auto' /><p className='text-[12px] md:text-[10px] gray-text'>{res.views ? res.views : res.no_of_views ? res.no_of_views : 1} Views</p></div>
                {/* <div className='flex items-center gap-2'><Image height={11} width={13} alt={"image"} className='md:h-[13px] md:w-[11px] md:m-auto' src={'/shares.svg'} /><p className='md:text-[10px] text-[12px] gray-text'>3 Shares</p></div> */}
                <div className='flex items-center gap-2'><Image height={12} width={12} alt={"image"} src={'/time.svg'} className='md:m-auto' /><p className='text-[12px] md:text-[10px] gray-text'>{res.read_time} Minutes </p></div>
            </div>
            {/* <p className='py-3 text-[18px] md:hidden'>{res.title}</p> */}
            <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' src={check_Image(res.image ? res.image : res.thumbnail_image)} height={600}  width={1000} alt={res.title} className="py-3 lg:h-[500px] md:object-contain w-full" />
            <p className='py-3 !leading-[1.74] !text-[15px] !text-justify'>{res.blog_intro}</p>
        </>
    )
}
