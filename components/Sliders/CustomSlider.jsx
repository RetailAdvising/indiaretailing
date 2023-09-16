import React, { useEffect } from 'react'
import Image from 'next/image'
import { check_Image } from '../../libs/api'
import Link from 'next/link'
import { useRouter } from 'next/router';
export default function CustomSlider({ data, cardClass, imgClass,slider_id,slider_child_id,type,route }) {
    const router = useRouter()
  
    const sctollTo = (direction) => {
        let custom_slider = document.getElementById(slider_id)
        let slider_div = document.getElementById(slider_child_id)
        let slider_width = custom_slider.clientWidth
        console.log(slider_width);
        if(direction == 'next'){
            slider_div.scrollLeft += slider_width
        }else{
            slider_div.scrollLeft -= slider_width
        }
        
    }
    return (
        <>
        {!type && <div className='relative' id={slider_id}>
        <div className='absolute top-[40%] left-[-15px] h-[35px] w-[35px] z-10 bg-[#fff] text-black  rounded-full flex items-center justify-center  cursor-pointer md:hidden'
        onClick={()=>sctollTo('prev')} > 
        {/* drop-shadow-md */}
            <Image alt="forward" src={'/less_than.svg'} width={35} height={35}></Image>
         </div>
            <div id={slider_child_id} className='overflow-auto scroll-smooth lg:flex-[0_0_calc(25%_-_15px)] justify-between scrollbar-hide gap-[20px] flex md:p-[0px]' 
            >
                {data && data.map((res, index) => {
                    return (
                        <Link key={index} className={`${cardClass} border rounded-[10px] overfow-hidden`} href={route ? route + res.route : '/' + router.asPath.split('/')[1] + '/' + res.route}>
                            <div className={``} >
                                <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' className={`${imgClass} rounded-[10px_10px_0_0]`} src={check_Image(res.thumbnail_image)} height={200} width={300} alt={index + 'image'} />
                            </div>
                            <div className={` flex flex-col justify-between p-[10px] `}>
                                {(res.primary_text && res.secondary_text) && <p className='flex gap-2 items-center'><span className={`text-red leading-normal tracking-wider !text-[10px]`}>{res.primary_text}</span> <span class="h-[10px] w-[1px] bg-[#6f6f6f]"></span> <span>{res.secondary_text}</span></p>}
                                <h4 className={`title line-clamp-2`}>{res.title ? res.title : ''}</h4>
                                {(res.sub_title || res.blog_intro) && <p className={`sub_title mt-[6px] line-clamp-2`}>{res.sub_title ? res.sub_title : res.blog_intro ? res.blog_intro : ''}</p>}
                                {(res.hashtags || res.publisher) && <p className='hashtags pt-1'>{res.hashtags ? res.hashtags : res.publisher ? res.publisher : ''}</p>}
                            </div>
                        </Link>
                    )
                })}
            </div>
            <div className='absolute top-[40%] right-[-15px] h-[35px] w-[35px] z-10 bg-[#fff] text-black  rounded-full flex items-center justify-center cursor-pointer md:hidden'
        onClick={()=>sctollTo('next')}>
            <Image alt="forward" src={'/greater_than.svg'} width={35} height={35}></Image>
        </div>
        </div>}
        {type == 'beautySlide' &&
            <div id={slider_child_id} className='overflow-auto scroll-smooth  justify-between scrollbar-hide gap-[20px] flex md:p-[0px]' 
            >
                {data && data.map((res, index) => {
                    return (
                        <Link key={index} className={`${cardClass} flex gap-[15px] mt-[10px] items-center flex-[0_0_100%] border rounded-[5px] overfow-hidden p-[10px]`} href={'/' + router.asPath.split('/')[1] + '/' + res.route}>
                            <div className={`flex-[0_0_30%]`} >
                                <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' className={`${imgClass} h-[70px] `} src={check_Image(res.thumbnail_image)} 
                                style={{borderRadius:'5px'}} height={50} width={100} alt={index + 'image'} />
                            </div>
                            <div >
                                {(res.primary_text && res.secondary_text) && <p className='flex gap-2 items-center'><span className={`text-red leading-normal tracking-wider primary_text`}>{res.primary_text}</span> <span class="h-[10px] w-[1px] bg-[#6f6f6f] "></span> <span className='secondary_text'>{res.secondary_text}</span></p>}
                                <h4 className={`title leading-4 line-clamp-2`}>{res.title ? res.title : ''}</h4>
                                {(res.hashtags || res.publisher) && <p className='hashtags pt-1 text-[#757575]'>{res.hashtags ? res.hashtags : res.publisher ? res.publisher : ''}</p>}
                            </div>
                        </Link>
                    )
                })}
            </div>
      }
            

        </>
    )
}
