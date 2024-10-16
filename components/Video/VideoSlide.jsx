import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { check_Image, parseISO8601Duration } from '../../libs/api'
import Link from 'next/link'
import { useRouter } from 'next/router';
import ImageLoader from '../ImageLoader';
// import { Nunito } from 'next/font/google'
// const nunito = Nunito({
//     weight: ["300", "400", "500", "600", "700"],
//     display: "block",
//     preload: true,
//     style: 'normal',
//     subsets: ["latin"],
//     variable: '--font-inter',
// })
export default function VideoSlide({ data, cardClass, imgClass, slider_id, slider_child_id, title_class, hide_scroll_button }) {
    const router = useRouter()

    let isDown = false;
    var slider = '';
    useEffect(() => {
        // router = type == 'widget' ?  routers : useRouter()
        if (slider_child_id) {
            slider = document.getElementById(slider_child_id);
            // setTimeout(() => {
            // }, 2000);
            (() => {
                slider.addEventListener('mousedown', start);
                slider.addEventListener('touchstart', start);

                slider.addEventListener('mousemove', move);
                slider.addEventListener('touchmove', move);

                slider.addEventListener('mouseleave', end);
                slider.addEventListener('mouseup', end);
                slider.addEventListener('touchend', end);
            })();
        }

    }, [])

    const sctollTo = (direction) => {
        if (slider_id && slider_child_id) {
            let custom_slider = document.getElementById(slider_id)
            let slider_div = document.getElementById(slider_child_id)
            let slider_width = custom_slider.clientWidth
            if (direction == 'next') {
                slider_div.scrollLeft += slider_width
            } else {
                slider_div.scrollLeft -= slider_width
            }
            // let nextBtn = document.getElementById('next_' + slider_id)
            // let prevBtn = document.getElementById('prev_' + slider_id)
            // if (slider_div.scrollLeft >= slider_div.clientWidth) nextBtn.classList.add('hidden')
            // else nextBtn.classList.remove('hidden')
            // if (slider_div.scrollLeft == 0) prevBtn.classList.add('hidden')
            // else prevBtn.classList.remove('hidden')
        }
    }

    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    let startX = ''
    let scrollLeft = ''

    // start
    const end = () => {
        isDown = false;
        slider.classList.remove('active');
    }

    const start = (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    }

    const move = (e) => {
        if (!isDown) return;

        e.preventDefault();
        const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
        const dist = (x - startX);
        slider.scrollLeft = scrollLeft - dist;
    }

    // end

    // };

    return (
        <>
            {<div className='relative lg:grid lg:h-full lg:items-center' id={slider_id}>
                <div className={`${hide_scroll_button && 'hidden'} absolute top-[25%] left-[-15px] h-[35px] w-[35px] z-10  text-black  rounded-full flex items-center justify-center  cursor-pointer`}
                    onClick={() => sctollTo('prev')} id={'prev_' + slider_id}>
                    <Image alt="Prev" src={'/video/black_left.svg'} width={35} height={35} ></Image>
                </div>
                {/* md:w-[calc(100vw_-_41px)] */}
                <div id={slider_child_id} ref={containerRef}
                    className=' overflow-auto scroll-smooth lg:flex-[0_0_calc(25%_-_15px)] scrollbar-hide md:gap-[10px] gap-[20px] flex md:p-[0px] md:w-[calc(100vw_-_60px)]'
                >
                    {data && data.map((res, index) => {
                        return (
                            <div key={index} className={`${cardClass} item cursor-pointer rounded-[10px] overfow-hidden`} onClick={() => router.push('/video/' + res.route)} >
                                <div className={`relative`} >
                                    {/* <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' className={`${imgClass} rounded-[10px_10px_0_0]`} src={check_Image(res.thumbnail_image ? res.thumbnail_image : res.thumbnail_imagee ? res.thumbnail_imagee : res.thumbnail_path ? res.thumbnail_path : res.image_path ? res.image_path : res.video_image ? res.video_image : res.product_image ? res.product_image : res.image)} height={200} width={300} alt={index + 'image'} /> */}
                                    {/* <ImageLoader style={`${imgClass} rounded-[10px_10px_0_0]`} src={res.video_image ? res.video_image : null} title={index + 'image'} /> */}
                                    <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' src={check_Image(res.video_image)} className={`rounded-[5px] ${imgClass ? imgClass : 'h-[175px] w-full'}`} height={150} width={273} alt={res.title} />
                                    {/* <Image src={'/irprime/youtube.svg'} className={`absolute bottom-[20px] left-[5px] object-contain h-[20px] w-[30px]`} height={100} width={100} alt={res.title} /> */}
                                    <div className={`absolute  bg-[#d50000] bottom-0 left-0 flex items-center gap-[7px] p-[3px_5px] rounded-[5px]`}>
                                        <Image src={'/irprime/youtube.svg'} className={`object-contain h-[12px] w-[12px]`} height={100} width={100} alt={res.title} />
                                        <p className='text-white text-[11px] font-[500]'>{parseISO8601Duration(res.duration ? res.duration : 'PT71M34S')}</p>
                                    </div>

                                </div>
                                <div className={` flex flex-col justify-between p-[10px] `}>
                                    <h4 className={`title !font-[500] ${title_class ? title_class : 'line-clamp-2'} nunito`}>{res.title ? res.title : ''}</h4>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={`${hide_scroll_button && 'hidden'} absolute top-[25%] right-[-15px] h-[35px] w-[35px] z-10 text-black  rounded-full flex items-center justify-center cursor-pointer `}
                    onClick={() => sctollTo('next')} id={'next_' + slider_id}>
                    <Image alt="forward" src={'/video/black_right.svg'} width={35} height={35}></Image>
                </div>
            </div>}

        </>
    )
}
