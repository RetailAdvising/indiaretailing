import React, { useState, useEffect } from 'react'
import List from '../common/List'
import { check_Image, checkMobile } from '@/libs/api'
import Image from 'next/image'
import AdsBaner from '../Baners/AdsBaner'
import MultiCarousel from '../Sliders/MultiCarousel'
import Title from '../common/Title'
import val from '@/libs/irprime'
import { useRouter } from 'next/router'
import ListSlider from '@/components/Sliders/ListSlider'

export default function ExclusiveBuilder({ data }) {
    const router = useRouter();
    console.log(data)
    const [isMobile, setIsMobile] = useState()
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
            <div className={`lg:flex lg:flex-wrap lg:gap-[15px] lg:p-[30px_0px] ${isMobile ? 'p-[15px] ' : 'container'}`}>
                {/* lg:h-[685px] */}
                {(data.message && data.message.length != 0) && <div className={`lg:h-[640px] ${isMobile ? '' : 'border p-[10px]'} rounded-[5px]  flex-[0_0_calc(42%_-_10px)] md:basis-full`}>
                    {data.message.slice(0, 1).map((res, index) => {
                        return (
                            <div key={index} onClick={() => router.push(`/${router.asPath.split('/')[1]}/${res.route}`)} className={`mb-[10px] cursor-pointer pb-[10px] ${(index == 0 && !isMobile) ? 'border_bottom' : ''}`}>
                                <h6 className={`${index == 0 ? 'lg:text-[18px] md:text-[17px] font-semibold' : ''}`}>{res.title}</h6>
                                <Image className={`${index == 0 ? 'h-[320px] w-full mt-[10px] rounded-[5px]' : ''}`} src={check_Image(res.thumbnail_image)} height={250} width={300} alt={res.title} />
                                <p className={`flex items-center ${index == 0 ? 'pt-[10px]' : ''}`}><span className={`primary_text pr-[10px]`}>{res.primary_text}</span><span className='h-[10px] w-[1px] bg-[#6f6f6f]'></span><span className={`secondary_text pl-[10px]`}>{res.secondary_text}</span></p>
                                <p className={`sub_title line-clamp-2 ${index == 0 ? 'pt-[10px]' : ''}`}>{res.blog_intro}</p>
                            </div>
                        )
                    })}
                    {!isMobile && <List check={true} imgWidth={'w-full'} isBB={false} imgHeight={'h-[90px]'} data={data.message.slice(1, 2)} borderRadius={'rounded-[10px]'} isReverse={true} />}
                </div>}


                <div className={`overflow-auto customScroll rounded-[5px] flex-[0_0_calc(33%_-_10px)] md:basis-full border p-[10px] lg:h-[640px]`}>
                    <List imgFlex={'flex-[0_0_calc(40%_-_10px)]'} check={true} imgWidth={'w-[130px] md:w-full'} imgHeight={'h-[80px] md:h-full'} data={(isMobile ? data.message.slice(2, 5) : data.message.slice(2, data.message.length - 1))} borderRadius={'rounded-[5px]'} isReverse={true} />
                </div>

                {(data.sec1 && data.sec1.data && data.sec1.data.length != 0) &&
                    isMobile ? <div className='beautySlide pt-[20px]'><Title noPadding={true} data={data.sec1} /><ListSlider data={data.sec1.data.slice(0, 5)} auto={false} /></div>
                    :
                    <div className='w-full lg:h-[640px] md:pt-[20px] lg:pb-5 flex-[0_0_calc(25%_-_10px)] md:basis-full'>
                        <Title data={data.sec1} />
                        <div className={`border lg:h-[595px] p-[10px] rounded-[5px]`}><List check={true} tittleOnly={true} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} isBB={true} imgWidth={'w-[130px] md:w-full'} imgHeight={'h-[70px] md:h-[110px]'} data={data.sec1.data.slice(0, 5)} borderRadius={'rounded-[5px]'} isTop={true} /></div>
                    </div>
                }
            </div>

            {/* {isMobile && <div>
                
                // Ads
                </div>} */}

            {/* Section - 2 p-[20px_30px_0_0] w-[30%]*/}
            <div className={`flex lg:p-[20px 0] md:p-[0_15px] container flex-wrap justify-between w-full gap-[15px]`}>
                <div className='w-[calc(75%_-_10px)] md:basis-full md:pt-[10px]'>
                    {isMobile ? <Title data={{ title: 'IR Prime Leaders Ink' }} noPadding={true} /> : <div className='flex gap-2 items-center pb-[10px]'>
                        <h6 className={`text-[15px] font-semibold`}>{val.section_2.col_1.section_title}</h6>
                        <div className='line mt-1'></div>
                        {/* <Image className='h-[20px] w-[15px]' src={'/arrowrightprimary.svg'} height={6} width={8} alt={'chevron'} /> */}
                    </div>}
                    <div className='primeSlide'>
                        <MultiCarousel cardHeight={'h-[280px]'} type={'profile'} noPlay={true} height={'h-[150px]'} perView={4} width={'w-full'} data={val.section_2.col_1.data} />
                    </div>
                </div>

                {(val.section_2 && val.section_2.col_2 && !isMobile) && <div className='w-[calc(25%_-_10px)] md:basis-full'><AdsBaner height={'h-[280px] '} Class={'pt-[40px]'} width={'w-full'} data={val.section_2.col_2} /></div>}
            </div>

            {/* Section - 3 p-[20px_30px]*/}

            {(data.videos && data.videos.ir_video && data.videos.ir_video.length != 0) &&
                <div className='bg-[#F8F8F8] md:mt-[20px]'>
                    <div className='lg:py-8 md:p-[15px] container'>
                        <Title data={data.videos} isVid={true} seeMore={true} />
                        {/* <div className='flex  gap-[15px] justify-between'><YTVideo data={res.ir_video} flex={"flex-[0_0_calc(25%_-_10px)]"} /></div> */}
                        <div className='lg:grid lg:grid-cols-4 md:grid-cols-2 irVideos lg:gap-[15px] lg:justify-between'>
                            {data.videos.ir_video.map((res, index) => {
                                return (
                                    <div key={index} onClick={() => router.push(`/video/${res.route}`)} className='ir_div cursor-pointer'>
                                        <div className='relative'>
                                            <Image src={check_Image(res.video_image)} className='h-[175px] w-full' height={100} width={100} alt={res.title} />
                                            <Image src={'/irprime/youtube.svg'} className='absolute bottom-[10px] left-[10px] object-contain h-[20px] w-[30px]' height={100} width={100} alt={res.title} />
                                        </div>
                                        <p className='pt-[10px]'>{res.title}</p>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>}

            {/* Section - 4 */}
            {(data.sec2 && data.sec2.data && data.sec2.data.length != 0) && <div className={`lg:py-8 md:p-[30px_15px]  container flex-wrap justify-between flex gap-[15px]`}>
                <div className={`flex-[0_0_calc(75%_-_10px)] md:basis-full`}>
                    <Title data={data.sec2} seeMore={true} />
                    <List fullWidth={true} check={true} isBB={true} titleClamp={'line-clamp-2'} contentWidth={'w-[410px] md:w-[auto]'} imgFlex={'flex-[0_0_calc(35%_-_10px)] md:flex-[0_0_calc(40%_-_10px)]'} imgWidth={'w-full'} imgHeight={'h-[160px] md:h-[130px]'} data={data.sec2.data.slice(0, 3)} borderRadius={'rounded-[5px]'} />
                </div>
                {(val.section_4 && val.section_4.col_2 && !isMobile) && <div className='flex-[0_0_calc(25%_-_10px)] pt-[15px] md:basis-full'> <AdsBaner height={'h-[560px]'} width={'w-full'} data={val.section_4.col_2} /></div>}
            </div>}
            {/* </div> */}
        </>
    )
}
