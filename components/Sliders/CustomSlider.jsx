import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { check_Image } from '../../libs/api'
import Link from 'next/link'
import { useRouter } from 'next/router';
export default function CustomSlider({ data, cardClass, imgClass, slider_id, slider_child_id, type, route }) {
    const router = useRouter()
    // const [isNext,setIsNext] = useState(true)
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
            let nextBtn = document.getElementById('next_' + slider_id)
            let prevBtn = document.getElementById('prev_' + slider_id)
            if (slider_div.scrollLeft >= slider_div.clientWidth) nextBtn.classList.add('hidden')
            else nextBtn.classList.remove('hidden')
            if (slider_div.scrollLeft == 0) prevBtn.classList.add('hidden')
            else prevBtn.classList.remove('hidden')
        }
    }


    // const [mouseDown,setMouseDown] = useState(false);
    // const [startX,setStartX] = useState()
    // const [scrollLeft,setScrollLeft] = useState()
    // const ourRef = useRef(null)
    // useEffect(() => {
    //     let mouseDown1 = false;
    //     // let scrollLeft;
    //     const slider = document.getElementById(slider_child_id);

    //     const startDragging = (e) => {
    //         mouseDown1 = true;
    //         setMouseDown(true)
    //         // startX = e.pageX - slider.offsetLeft;
    //         setStartX(e.pageX - slider.offsetLeft)
    //         // scrollLeft = slider.scrollLeft;
    //         setScrollLeft(slider.scrollLeft)
    //     }

    //     const stopDragging = (e) => {
    //         // mouseDown1 = false;
    //         setMouseDown(false)
    //     }

    //     const move = (e) => {
    //         e.preventDefault();
    //         if (!mouseDown) { return; }
    //         const x = e.pageX - slider.offsetLeft;
    //         const scroll = x - startX;
    //         slider.scrollLeft = scrollLeft - scroll;
    //     }

    //     // Add the event listeners
    //     slider.addEventListener('mousemove', move, false);
    //     slider.addEventListener('mousedown', startDragging, false);
    //     slider.addEventListener('mouseup', stopDragging, false);
    //     slider.addEventListener('mouseleave', stopDragging, false);
    // }, [mouseDown,startX,scrollLeft])

    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(null);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Adjust the scroll speed as needed
        containerRef.current.scrollLeft = scrollLeft - walk;
    };
    return (
        <>
            {!type && <div className='relative' id={slider_id}>
                <div className='absolute top-[40%] left-[-15px] h-[35px] w-[35px] z-10 bg-[#fff] text-black  rounded-full flex items-center justify-center  cursor-pointer md:hidden'
                    onClick={() => sctollTo('prev')} id={'prev_' + slider_id}>
                    {/* drop-shadow-md */}
                    <Image alt="Prev" src={'/less_than.svg'} width={35} height={35} ></Image>
                </div>
                {/* ref={ourRef} onMouseDown={handleMouseDown} */}
                <div id={slider_child_id} ref={containerRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onMouseMove={handleMouseMove} className='overflow-auto scroll-smooth lg:flex-[0_0_calc(25%_-_15px)] justify-between scrollbar-hide md:gap-[10px] gap-[20px] flex md:p-[0px]'
                >
                    {data && data.map((res, index) => {
                        return (
                            // '/' + router.asPath.split('/')[1] +
                            <Link key={index} className={`${cardClass} border rounded-[10px] overfow-hidden`} href={route ? route + res.route : '/' + res.route}>
                                <div className={``} >
                                    <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' className={`${imgClass} rounded-[10px_10px_0_0]`} src={check_Image(res.thumbnail_image ? res.thumbnail_image : res.thumbnail_imagee ? res.thumbnail_image: res.image)} height={200} width={300} alt={index + 'image'} />
                                </div>
                                <div className={` flex flex-col justify-between p-[10px] `}>
                                    {(res.primary_text && res.secondary_text) && <p className='flex gap-2 items-center py-[5px]'><span className={`primary_text leading-normal tracking-wider !text-[10px]`}>{res.primary_text}</span> <span class="h-[10px] w-[1px] bg-[#6f6f6f]"></span> <span className='secondary_text'>{res.secondary_text}</span></p>}
                                    <h4 className={`title line-clamp-2`}>{res.title ? res.title : ''}</h4>
                                    {(res.sub_title || res.blog_intro) && <p className={`sub_title mt-[6px] line-clamp-2`}>{res.sub_title ? res.sub_title : res.blog_intro ? res.blog_intro : ''}</p>}
                                    {(res.hashtags || res.publisher) && <p className='hashtags pt-1'>{res.hashtags ? res.hashtags : res.publisher ? res.publisher : ''}</p>}
                                </div>
                            </Link>
                        )
                    })}
                </div>
                <div className='absolute top-[40%] right-[-15px] h-[35px] w-[35px] z-10 bg-[#fff] text-black  rounded-full flex items-center justify-center cursor-pointer md:hidden'
                    onClick={() => sctollTo('next')} id={'next_' + slider_id}>
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
                                        style={{ borderRadius: '5px' }} height={50} width={100} alt={index + 'image'} />
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
