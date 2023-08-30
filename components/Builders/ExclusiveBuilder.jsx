import React from 'react'
import List from '../common/List'
import { check_Image } from '@/libs/common'
import Image from 'next/image'
import AdsBaner from '../Baners/AdsBaner'
import Cards from '../common/Cards'
import styles from '@/styles/Exclusives.module.scss'
import MultiCarousel from '../Sliders/MultiCarousel'
import Title from '../common/Title'
import YTVideo from '../Landing/YTVideo'
import val from '@/libs/irprime'
import { useRouter } from 'next/router'
export default function ExclusiveBuilder({ data }) {
    const router = useRouter();
    return (
        <>
            <div className={`flex flex-wrap gap-[15px] p-[30px] container`}>
                {(data.message && data.message.length != 0) && <div className={`lg:h-[685px] border rounded-[5px] p-[10px] flex-[0_0_calc(42%_-_10px)] md:basis-full`}>
                    {data.message.slice(0, 1).map((res, index) => {
                        return (
                            <div key={index} onClick={() => router.push(`/${router.asPath.split('/')[1]}/${res.route}`)} className={`mb-[10px] cursor-pointer pb-[10px] ${index == 0 ? 'border_bottom' : ''}`}>
                                <p className={`${index == 0 ? 'text-[18px] font-semibold' : ''}`}>{res.title}</p>
                                <Image className={`${index == 0 ? 'h-[320px] w-full pt-[10px] rounded-[5px]' : ''}`} src={check_Image(res.thumbnail_image)} height={250} width={300} alt={res.title} />
                                <p className={`flex items-center ${index == 0 ? 'pt-[10px]' : ''}`}><span className={`primary_text pr-[10px]`}>{res.primary_text}</span><span className='h-[15px] w-[2px] bg-[#121212]'></span><span className={`secondary_text pl-[10px]`}>{res.secondary_text}</span></p>
                                <p className={`sub_title line-clamp-3 ${index == 0 ? 'pt-[10px]' : ''}`}>{res.blog_intro}</p>
                            </div>
                        )
                    })}
                    <List check={true} imgWidth={'w-full'} isBB={false} imgHeight={'h-[90px]'} data={data.message.slice(1, 2)} borderRadius={'rounded-[10px]'} isReverse={true} />
                </div>}


                <div className={`overflow-auto customScroll rounded-[5px] flex-[0_0_calc(33%_-_10px)] md:basis-full border p-[10px] lg:h-[685px]`}>
                    <List imgFlex={'flex-[0_0_calc(40%_-_10px)]'} check={true} imgWidth={'w-[130px] md:w-full'} imgHeight={'h-[80px] md:h-full'} data={data.message.slice(2, data.message.length - 1)} borderRadius={'rounded-[5px]'} isReverse={true} />
                </div>

                {(data.sec1 && data.sec1.data && data.sec1.data.length != 0) && <div className='w-full lg:h-[685px] pb-5 flex-[0_0_calc(25%_-_10px)] md:basis-full'>
                    <Title data={data.sec1} />
                    <div className={`border lg:h-[648px] p-[10px] rounded-[5px]`}><List check={true} tittleOnly={true} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} isBB={true} imgWidth={'w-[130px] md:w-full'} imgHeight={'h-[82px] md:h-[110px]'} data={data.sec1.data.slice(0, 5)} borderRadius={'rounded-[5px]'} isTop={true} /></div>
                </div>}

            </div>

            {/* Section - 2 p-[20px_30px_0_0] w-[30%]*/}
            <div className={`flex p-[30px] container flex-wrap justify-between w-full gap-[15px] pt-[30px]`}>
                <div className='w-[calc(75%_-_10px)] md:basis-full pt-[10px]'>
                    <div className='flex gap-2 items-center pb-[10px]'>
                        <h6 className={`text-[15px] font-semibold`}>{val.section_2.col_1.section_title}</h6>
                        <Image className='h-[20px] w-[15px]' src={'/arrowrightprimary.svg'} height={6} width={8} alt={'chevron'} />
                    </div>
                    <div className='primeSlide'>
                        <MultiCarousel type={'profile'} noPlay={true} height={'h-[185px]'} perView={4} width={'w-full'} data={val.section_2.col_1.data} />
                    </div>
                </div>

                {(val.section_2 && val.section_2.col_2) && <div className='w-[calc(25%_-_10px)] md:basis-full'><AdsBaner height={'h-[330px] '} Class={'pt-[40px]'} width={'w-full'} data={val.section_2.col_2} /></div>}
            </div>

            {/* Section - 3 p-[20px_30px]*/}

            {(data.videos && data.videos.ir_video && data.videos.ir_video.length != 0) &&
                <div className='bg-[#F8F8F8] '>
                    <div className='p-[30px]  container'>
                        <Title data={data.videos} seeMore={true} />
                        {/* <div className='flex  gap-[15px] justify-between'><YTVideo data={res.ir_video} flex={"flex-[0_0_calc(25%_-_10px)]"} /></div> */}
                        <div className='grid grid-cols-4 md:grid-cols-2  gap-[15px] justify-between'>
                            {data.videos.ir_video.map((res, index) => {
                                return (
                                    <div key={index}>
                                        <Image src={check_Image(res.video_image)} className='h-[175px] w-full' height={100} width={100} alt={res.title} />
                                        <p className='pt-[10px]'>{res.title}</p>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>}

            {/* Section - 4 */}
            {(data.sec2 && data.sec2.data && data.sec2.data.length != 0) && <div className={`p-[30px] container flex-wrap justify-between flex gap-[15px]`}>
                <div className={`flex-[0_0_calc(75%_-_10px)] md:basis-full`}>
                    <Title data={data.sec2} seeMore={true} />
                    <List fullWidth={true} check={true} isBB={true} contentWidth={'w-[410px] md:w-[auto]'} imgFlex={'flex-[0_0_calc(35%_-_10px)]'} imgWidth={'w-full'} imgHeight={'h-[160px]'} data={data.sec2.data.slice(0, 3)} borderRadius={'rounded-[5px]'} />
                </div>
                {(val.section_4 && val.section_4.col_2) && <div className='flex-[0_0_calc(25%_-_10px)] pt-[15px] md:basis-full'> <AdsBaner height={'h-[560px]'} width={'w-full'} data={val.section_4.col_2} /></div>}
            </div>}
            {/* </div> */}
        </>
    )
}
