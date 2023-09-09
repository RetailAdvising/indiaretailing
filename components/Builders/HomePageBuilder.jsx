import React, { useRef, useEffect, useState } from 'react'
import TopStories from '../Landing/TopStories'
import ImageContainer from '../Landing/ImageContainer'
import SectionList from '../Landing/SectionList'
import LatestNews from '../Landing/LatestNews'
import AdsBaner from '../Baners/AdsBaner'
import IRPrime from '../Landing/IRPrime'
import Subscribe from '../Landing/Subscribe'
import BulletList from '../Landing/BulletList'
import Cards from '../common/Cards'
import TrendingBox from '../Landing/TrendingBox'
import List from '../common/List'
import ImageGroupEvents from '../Landing/ImageGroupEvents'
import EventList from '../Events/EventList'
import MultiCarousel from '../Sliders/MultiCarousel'
import EventCards from '../Events/EventCards'
import { useSelector } from 'react-redux'
import Title from '../common/Title'
import SectionBox from '../Category/SectionBox'
import Video from '../Video/Video'

export default function HomePageBuilder({ data, isLast, loadMore,i }) {
    const cardref = useRef()
    useEffect(() => {
        if (!cardref?.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (isLast && entry.isIntersecting) {
                // newLimit();
                loadMore()
                // console.log(entry)
                observer.unobserve(entry.target);
            }
        });

        observer.observe(cardref.current);
    }, [isLast]);
    // console.log(data)
    // console.log(data.layout_json)
    console.log(JSON.parse(data.layout_json))
    return (
        <>
            {/* {data && data.map((res,index) => { */}
            {/* return ( */}
            {/* <div ref={cardref} className={`${data.layout_id == "STL-0003" && 'border_bottom'}`} style={{ background: data.background }}>
                <div className={`flex p-[20px_0px] justify-between flex-wrap gap-[25px] container`}>
                    {
                        (data.layout_json) && data.layout_json.map((item, index) => {
                            return (
                             
                                <div key={index} className={`${item.class} md:w-full md:basis-full`} style={{ background: item.background }}>
                                    {item.components.map((resp, index) => {
                                        return (
                                            <div className={`${resp.class}`} key={index}>
                                                {(resp.component_title == 'TopStories' && resp.data && resp.data.data) && <div className={`flex gap-5 md:flex-col justify-between`}><TopStories data={resp.data.data} /></div>}
                                                {(resp.component_title == "ImageContainer" && resp.component_type == 'Image' && resp.data) && <ImageContainer data={resp.data} height={"h-full"} width={'w-full'} />}
                                                {(resp.component_title == "SectionList" && resp.data && resp.data.data) && <div className={`pt-[20px]`}><SectionList data={resp.data.data} /></div>}
                                                {(resp.component_title == "LatestNews" && resp.data && resp.data.data) && <>
                                                    <Title data={resp.data} seeMore={true} />
                                                    <div className={``}><LatestNews height={'h-full'} width={'w-full'} data={resp.data.data} /></div>
                                                </>}
                                                {(resp.component_title == "AdsBaner" && resp.component_type == "Ad1" && resp.data) && <AdsBaner data={resp.data} height={'h-[280px]'} width={'w-[330px]'} />}
                                                {(resp.component_title == "IRPrime" && resp.data.data) && <IRPrime data={resp.data} />}
                                                {(resp.component_title == "Subscribe" && resp.data) && <Subscribe data={resp.data} height={"h-[162px]"} width={"w-full"} />}
                                                {(resp.component_title == "ImageContainer" && resp.component_type == "BulletList" && resp.data) && <>
                                                    <Title data={resp.data} />
                                                    <div className={`flex gap-[20px] justify-between flex-wrap`}>
                                                        <div className='flex-[0_0_calc(55%_-_10px)]'><ImageContainer data={resp.data} height={'h-[250px]'} width={'w-[500px]'} /></div>
                                                        <div className={`border_right border_left px-[20px] h-[250px] flex-[0_0_calc(45%_-_10px)]`}><BulletList data={resp.data.data.slice(0, 5)} /></div>
                                                        <div className={` flex  `}><BulletList isBorder={true} data={resp.data.data.slice(0, 3)} /></div>
                                                    </div>
                                                </>}
                                                {(resp.component_title == "AdsBaner" && resp.component_type == "Ad2" && resp.data) && <div className={``}><AdsBaner data={resp.data} height={'h-[280px]'} width={'w-[330px]'} /></div>}
                                                {(resp.component_title == "CardSpecial" && resp.component_type == "card" && resp.data) && <div className={`flex gap-[10px] flex-wrap justify-between`}><Cards data={resp.data.data} border_none={true} flex={'flex-[0_0_calc(20%_-_10px)] md:flex-[0_0_calc(50%_-_10px)]'} /></div>}
                                                {(resp.component_title == "TrendingBox" && resp.component_type == "box" && resp.data) && <>
                                                    <Title data={resp.data} />
                                                    <div className='flex justify-between gap-5'>
                                                        <div className={`flex gap-[10px] overflow-auto trending`}><TrendingBox data={resp.data.data} /></div>
                                                        <div className={`flex gap-[10px] flex-[0_0_calc(7%_-_10px)] justify-end`}><TrendingBox icons={resp.data} parentElement={'trending'} /></div>
                                                    </div>
                                                </>}
                                                {(resp.component_title == "MultiCarousel" && resp.component_type == "slider" && resp.data) && <>
                                                    <Title data={resp.data} />
                                                    {resp.data.data &&
                                                        <MultiCarousel perView={3} data={resp.data.data} cardHeight={'h-[310px]'} card_width={"285px !important"} height={"h-[185px]"} width={"w-full"} type={'card'} />}
                                                </>}
                                                {(resp.component_title == "MultiCarousel" && resp.component_type == "slider1" && resp.data) && <>
                                                    <Title data={resp.data} />
                                                    {resp.data.data &&
                                                        <div className={`pr-[30px]`}><MultiCarousel cardHeight={'h-[310px]'} perView={2} data={resp.data.data} card_width={"285px !important"} height={"h-[185px]"} width={'w-full'} type={'card'} /></div>}
                                                </>}
                                                {(resp.component_title == "VideoContainer" && resp.component_type == "video" && resp.data) && <>
                                                    <Title data={resp.data} textClass={'text-white'} />
                                                    <><YTVideo data={resp.data.data} isBg={true} frame={resp.data.title == 'IR Video Wall' && 'h-[85%]'} classImg={resp.data.title == 'IR Video Wall' ? 'h-full' : 'h-[50%]'} /></>
                                                </>}
                                                {(resp.component_title == "AdsBaner" && resp.component_type == "Ad3" && resp.data) && <><AdsBaner Class={'flex pt-[10px] flex-col justify-center items-center'} height={'h-full'} width={'w-full'} data={resp.data} /></>}
                                                {(resp.component_title == "List" && resp.component_type == "list1" && resp.data) && <>
                                                    <Title data={resp.data} />
                                                    <div className={`flex gap-5 flex-wrap`}><List imgFlex={'flex-[0_0_calc(40%_-_10px)]'} data={resp.data.data} flex={'flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'} imgWidth={"h-[160px]"} imgHeight={"w-[215px]"} borderRadius={"rounded-[10px]"} /></div>
                                                </>}
                                                {(resp.component_title == "List" && resp.component_type == "list1/2" && resp.data) && <>
                                                    <Title data={resp.data} />
                                                    <div className={`border p-[10px] rounded-[5px]`}><List imgFlex={'flex-[0_0_calc(25%_-_10px)]'} data={resp.data.data} imgWidth={"w-[100px]"} imgHeight={"h-[60px]"} borderRadius={"rounded-[10px]"} isTop={true} isBB={true} /></div>
                                                </>}
                                                {(resp.component_title == "Card" && resp.component_type == "card1" && resp.data) && <>
                                                    <Title data={resp.data} />
                                                    <div className={`flex gap-5 justify-between flex-wrap`}><Cards cardClass={"h-[300px]"} data={resp.data.data} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[180px]"} width={"w-full"} flex={'flex-[0_0_calc(20%_-_20px)] md:flex-[0_0_calc(50%_-_20px)]'} isBorder={true} /></div>
                                                </>}
                                                {(resp.component_title == "List" && resp.component_type == "list2" && resp.data) && <>
                                                    <Title data={resp.data} />
                                                    <div className={`border p-[10px] rounded-[5px]`}><List imgFlex={'flex-[0_0_calc(40%_-_10px)]'} data={resp.data.data} imgWidth={"w-[164px]"} imgHeight={"h-[144px]"} borderRadius={"rounded-[10px]"} /></div>
                                                </>}
                                                {(resp.component_title == "List" && resp.component_type == "list3" && resp.data) && <>
                                                    <Title data={resp.data} />
                                                    <div className={``}><List data={resp.data.data} fullWidth={true} imgWidth={"w-[164px]"} imgHeight={"h-[144px]"} borderRadius={"rounded-[10px]"} /></div>
                                                </>}
                                                {(resp.component_title == "List" && resp.component_type == "list3/2" && resp.data) && <>
                                                    <Title data={resp.data} />
                                                    <div className={``}><List data={resp.data.data} imgWidth={"w-[60px]"} imgHeight={"h-[50px]"} isBB={true} borderRadius={"rounded-[10px]"} /></div>
                                                </>}
                                                {(resp.component_title == "VideoContainer" && resp.component_type == "video2" && resp.data) && <>
                                                    <Title data={resp.data} />
                                                    <div className={``}><YTVideo data={resp.data.data} /></div>
                                                </>}
                                                {(resp.component_title == "AdsBaner" && resp.component_type == "Ad4" && resp.data) && <><AdsBaner Class={'flex pt-[10px] flex-col justify-center items-center'} data={resp.data} height={"100px"} /></>}
                                                {(resp.component_title == "List" && resp.component_type == "list4" && resp.data) && <>
                                                    <Title data={resp.data} />
                                                    <div className={`${resp.data.title == 'Technology' && 'border p-[10px] rounded-[5px]'}`}><List data={resp.data.data} imgFlex={resp.data.title == 'Technology' ? 'flex-[0_0_calc(25%_-_10px)]' : 'flex-[0_0_calc(40%_-_10px)]'} imgWidth={resp.data.title == 'Technology' ? "w-[100px]" : "w-[185px]"} imgHeight={resp.data.title == 'Technology' ? "h-[75px]" : "h-[156px]"} borderRadius={"rounded-[10px]"} isTop={resp.data.title == 'Technology' ? true : false} isBB={resp.data.title == 'Technology' ? true : false} /></div>
                                                </>}
                                                {(resp.component_title == "Card" && resp.component_type == "card2" && resp.data) && <>
                                                    <Title data={resp.data} />
                                                    <div className={`flex gap-5`}><Cards data={resp.data.data} cardClass={"h-[300px]"} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[180px]"} width={"w-full"} flex={'basis-1/3'} isBorder={true} /></div>
                                                </>}
                                                {(resp.component_title == "MultiCarousel" && resp.component_type == "slider2" && resp.data) && <>
                                                    <Title data={resp.data} />
                                                    {resp.data.data &&
                                                        <MultiCarousel perView={2} data={resp.data.data} height={"h-[175px]"} width={'w-full'} type={'card'} />}
                                                </>}
                                                {(resp.component_title == "ImageGroupEvents" && resp.component_type == "event1" && resp.data) && <>
                                                    <Title data={resp.data} />
                                                    <div className={``}><ImageGroupEvents data={resp.data.data} height={"h-[80%]"} width={"w-[80%]"} /></div>
                                                </>}
                                                {(resp.component_title == "EventList" && resp.component_type == "event1" && resp.data) && <div className={`flex flex-wrap p-[30px_0px] gap-[10px_20px]`}><EventList check={true} data={resp.data.data} height={"h-[110px]"} width={"w-full"} flex={'flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'} isHome={true} imageBackground={"#f7f7f7"} /></div>}
                                                {(resp.component_title == "Card" && resp.component_type == "card3" && resp.data) && <>
                                                    <Title data={resp.data} />
                                                    <div className={`flex flex-wrap gap-5 justify-between`}><Cards data={resp.data.data} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[330px]"} width={"w-full"} flex={'flex-[0_0_calc(20%_-_20px)] md:flex-[0_0_calc(50%_-_10px)]'} isBorder={true} /></div>
                                                </>}
                                                {(resp.component_title == "Card" && resp.component_type == "card4" && resp.data) && <>
                                                    <Title data={resp.data} />
                                                    <div className={`flex flex-wrap gap-5 justify-between`}><Cards flex={'flex-[0_0_calc(25%_-_20px)] md:flex-[0_0_calc(50%_-_10px)]'} data={resp.data.data} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[200px]"} width={"w-full"} isBorder={true} /></div>
                                                </>}
                                                {(resp.component_title == "AdsBaner" && resp.component_type == "Adbike" && resp.data) && <div className='pt-[30px]'><AdsBaner Class={'flex pt-[10px] flex-col justify-center items-center'} height={"h-full"} width={'w-full'} data={resp.data} /></div>}
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })
                    }

                </div>
            </div> */}

            <div className={`lg:py-[10px] ${i == 0 ? 'lg:p-5 bg-[#F8F9FA]' : i == 5 ? 'bg-[#000] lg:p-[20px_40px]' : i == 12 ? 'bg-[#f1f1f1] p-5' : 'container'}  md:p-[15px] md:py-[10px] lg:flex gap-5`}>
                {(data.layout_json && JSON.parse(data.layout_json).length != 0) && JSON.parse(data.layout_json).map((res, index) => {
                    return (
                        <div key={index} className={`${res.class == 'flex-[0_0_calc(100%_-_0px)]' ? 'w-full' : res.class} `}>
                            {(res.components && res.components.length != 0) && res.components.map(c => {
                                return (
                                    <div key={c.component_title} className={`${c.component_title == "Top 3 Stories" ? 'top3 lg:justify-center' : ''}`}>
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Top 3 Stories") && <TopStories data={data.data[c.cid].data} />}
                                        {(c.component_title == "News" && c.cid && data.data[c.cid] && data.data[c.cid].data) && <div className='lg:flex gap-5'>
                                            <div className={`flex-[0_0_calc(65%_-_10px)]`}><ImageContainer data={data.data[c.cid].data[0]} height={"h-[340px]"} width={'w-full'} />
                                                <SectionList data={data.data[c.cid].data.slice(1, 4)} /></div>
                                            <div className={`flex-[0_0_calc(35%_-_10px)]`}>
                                                <Title data={{ title: 'Latest News' }} />
                                                <LatestNews height={'h-[190px]'} width={'w-full'} data={data.data[c.cid].data.slice(4, 8)} />
                                            </div>
                                        </div>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Advertisement") && <AdsBaner data={data.data[c.cid].data[0]} height={'h-[200px]'} />}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IR Exclusive") && <IRPrime data={data.data[c.cid].data} />}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IR Exclusive") && <Subscribe height={"h-[162px]"} width={"w-full"} />}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Web specials") && <>
                                            <div className='lg:w-[calc(70%_-_10px)]'><Title data={{ title: c.component_title }} /></div>
                                            <div className={`lg:flex gap-5`}>
                                                <div className='lg:flex flex-wrap justify-between flex-[0_0_calc(70%_-_10px)]'>
                                                    <div className='flex-[0_0_calc(55%_-_10px)]'><ImageContainer data={data.data[c.cid].data[0]} height={'h-[250px]'} width={'w-[500px]'} /></div>
                                                    <div className={`border_right border_left px-[20px] h-[250px] flex-[0_0_calc(45%_-_10px)]`}><BulletList data={data.data[c.cid].data.slice(0, 5)} /></div>
                                                    <div className={` flex  md:hidden`}><BulletList isBorder={true} data={data.data[c.cid].data.slice(0, 3)} /></div>
                                                </div>
                                                <div className='md:my-[15px]'><AdsBaner data={{ ad_image: '/ads_baner.png' }} height={'h-[280px]'} width={'w-[330px]'} /></div>
                                            </div>
                                            <div className={`lg:flex no_scroll lg:my-[15px] md:my-[10px] gap-[10px] lg:flex-wrap lg:justify-between`}><Cards isHome={'/news/'} data={data.data[c.cid].data.slice(0, 5)} check={true} height={'h-[125px] w-full'} border_none={true} flex={'flex-[0_0_calc(20%_-_10px)] md:flex-[0_0_calc(60%_-_10px)]'} /></div>
                                        </>}

                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Trending") && <>
                                            <Title data={{ title: c.component_title }} />
                                            <div className='flex justify-between items-center gap-[10px]'>
                                                <div className={`flex gap-[10px] overflow-auto trending`}><TrendingBox data={data.data[c.cid].data} /></div>
                                                <div className={`flex gap-[10px] flex-[0_0_calc(7%_-_10px)] justify-end`}><TrendingBox icons={true} parentElement={'trending'} /></div>
                                            </div>
                                        </>}

                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Leaders Ink") && <>
                                            <Title data={{ title: c.component_title }} />
                                            {data.data[c.cid].data &&
                                                <div className='none leaders'><MultiCarousel isHome={'/categories/'} perView={3} check={true} none={true} data={data.data[c.cid].data} cardHeight={'h-[310px]'} card_width={"285px !important"} height={"h-[185px]"} width={"w-full"} type={'profile'} /></div>}
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Research") && <>
                                            <Title data={{ title: c.component_title }} />
                                            {data.data[c.cid].data &&
                                                <div className={`pr-[30px] none research`}><MultiCarousel isHome={'/categories/'} none={true} check={true} cardHeight={'h-[310px]'} perView={2} noPlay={true} data={data.data[c.cid].data} card_width={"285px !important"} height={"h-[185px]"} width={'w-full'} type={'card'} /></div>}
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IR Video Wall") && <>
                                            <Title data={{ title: c.component_title }} textClass={'text-white'} />
                                            <><Video data={data.data[c.cid].data} isHome={'/ir/'} isBg={true} big={true} imgClass={'h-[460px] w-full'} /></>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Retail with Rasul Bailay") && <>
                                            <Title data={{ title: c.component_title }} textClass={'text-white'} />
                                            <><Video data={data.data[c.cid].data} isHome={'/ir/'} isBg={true} imgClass={'h-[150px] w-full'} /></>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IR Prime Videos") && <>
                                            <Title data={{ title: c.component_title }} textClass={'text-white'} />
                                            <><Video data={data.data[c.cid].data} isHome={'/ir/'} isBg={true} imgClass={'h-[150px] w-full'} /></>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IR Store Videos") && <>
                                            <Title data={{ title: c.component_title }} textClass={'text-white'} />
                                            <><Video data={data.data[c.cid].data} isHome={'/ir/'} isBg={true} imgClass={'h-[150px] w-full'} /></>
                                        </>}

                                        {/* {(resp.component_title == "AdsBaner" && resp.component_type == "Ad3" && resp.data) && <><AdsBaner Class={'flex pt-[10px] flex-col justify-center items-center'} height={'h-full'} width={'w-full'} data={resp.data} /></>} */}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Fashion & Lifestyle") && <>
                                            <Title data={{ title: c.component_title }} />
                                            {/* imgWidth={"h-[160px]"} */}
                                            <div className={`flex gap-5 flex-wrap`}><List primary_pb={'lg:pb-[5px]'} hash_bg={'lg:pt-[10px]'} titleClamp={'line-clamp-2'} isHome={'/categories/'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} data={data.data[c.cid].data} check={true} flex={'flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'} imgWidth={"h-[135px]"} imgHeight={"w-[215px]"} borderRadius={"rounded-[10px]"} /></div>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Beauty & Wellness") && <>
                                            <Title data={{ title: c.component_title }} />
                                            <div className={`border p-[10px] rounded-[5px]`}><List titleClamp={'line-clamp-2'} isHome={'/categories/'} imgFlex={'flex-[0_0_calc(25%_-_10px)]'} data={data.data[c.cid].data.slice(0,4)} check={true} imgWidth={"w-[100px]"} imgHeight={"h-[70px]"} borderRadius={"rounded-[5px]"} isTop={true} isBB={true} /></div>
                                        </>}

                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Food & Beverage") && <>
                                            <Title data={{ title: c.component_title }} />
                                            <div className={`flex gap-5 justify-between flex-wrap`}><Cards isHome={'/categories/'} cardClass={"h-[300px]"} check={true} data={data.data[c.cid].data} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[180px]"} width={"w-full"} flex={'flex-[0_0_calc(20%_-_20px)] md:flex-[0_0_calc(50%_-_20px)]'} isBorder={true} /></div>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && (c.component_title == "E-Commerce" || c.component_title == "People" || c.component_title == "D2C Buzz")) && <>
                                            <Title data={{ title: c.component_title }} />
                                            {/* h-[144px] */}
                                            <div className={`border p-[10px] rounded-[5px]`}><List check={true} titleClamp={'line-clamp-2'} isHome={'/news/'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} data={data.data[c.cid].data} imgWidth={"w-full"} imgHeight={"h-[125px]"} borderRadius={"rounded-[10px]"} /></div>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Shopping Centers") && <>
                                            <Title data={{ title: c.component_title }} />
                                            <div className={``}><List isHome={'/news/'} imgFlex={'flex-[0_0_calc(20%_-_10px)]'} titleClamp={'line-clamp-2'} data={data.data[c.cid].data} check={true} fullWidth={true} imgWidth={"w-full"} imgHeight={"h-[144px]"} borderRadius={"rounded-[10px]"} /></div>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Podcast") && <>
                                            <Title data={{ title: c.component_title }} />
                                            <div className={`mb-[20px]`}><List isHome={'/podcast/'} data={data.data[c.cid].data} imgWidth={"w-[60px]"} imgHeight={"h-[50px]"} check={true} isBB={true} borderRadius={"rounded-[10px]"} /></div>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Privilege Members Corner") && <>
                                            <Title data={{ title: c.component_title }} />
                                            <div className={``}><Video imgClass={'h-[150px] object-contain w-full'} data={data.data[c.cid].data} /></div>
                                        </>}
                                        {/* {(resp.component_title == "AdsBaner" && resp.component_type == "Ad4" && resp.data) && <><AdsBaner Class={'flex pt-[10px] flex-col justify-center items-center'} data={resp.data} height={"100px"} /></>} */}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && (c.component_title == "Supply Chain" || c.component_title == "Marketing")) && <>
                                            <Title data={{ title: c.component_title }} />
                                            <><List isHome={'/news/'} data={data.data[c.cid].data} check={true} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} imgWidth={"w-[185px]"} imgHeight={"h-[156px]"} borderRadius={"rounded-[10px]"} /></>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Technology") && <>
                                            <Title data={{ title: c.component_title }} />
                                            <div className={'border p-[10px] rounded-[5px]'}><List isHome={'/news/'} check={true} data={data.data[c.cid].data} imgFlex={'flex-[0_0_calc(25%_-_10px)]'} imgWidth={"w-[100px]"} imgHeight={"h-[75px]"} isBB={true} isTop={true} borderRadius={"rounded-[10px]"} /></div>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Case Studies") && <>
                                            <Title data={{ title: c.component_title }} />
                                            <div className={`flex gap-5`}><Cards check={true} isHome={'/categories/'} data={data.data[c.cid].data} cardClass={"h-[300px]"} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[180px]"} width={"w-full"} flex={'basis-1/3'} isBorder={true} /></div>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Photo Essays") && <>
                                            <Title data={{ title: c.component_title }} />
                                            <div className='photo'><MultiCarousel perView={2} isHome={'/categories/'} check={true} cardHeight={'h-[300px]'} data={data.data[c.cid].data} height={"h-[175px]"} width={'w-full'} type={'card'} /></div>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IMAGES Group Events") && <>
                                            <Title data={{ title: c.component_title }} />
                                            <div className='flex gap-5'>
                                                <div className={`flex-[0_0_calc(30%_-_10px)]`}><ImageGroupEvents isHome={'/events/'} data={data.data[c.cid].data.slice(0, 1)} height={"h-[80%]"} width={"w-[80%]"} /></div>
                                                <div className={`flex flex-wrap p-[30px_0px] gap-[10px_20px]`}><EventList isRoute={'/events/'} check={false} data={data.data[c.cid].data.slice(1, 7)} height={"h-[180px]"} width={"w-full"} flex={'flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'} isHome={true} imageBackground={"#f7f7f7"} /></div>
                                            </div>
                                        </>}
                                        {/* {(resp.component_title == "Card" && resp.component_type == "card3" && resp.data) && <>
                                            <Title data={resp.data} />
                                            <div className={`flex flex-wrap gap-5 justify-between`}><Cards data={resp.data.data} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[330px]"} width={"w-full"} flex={'flex-[0_0_calc(20%_-_20px)] md:flex-[0_0_calc(50%_-_10px)]'} isBorder={true} /></div>
                                        </>} */}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Reconnect") && <>
                                            <Title data={{ title: c.component_title }} />
                                            <div className={`flex flex-wrap gap-5 justify-between`}><Cards check={true} isHome={'/categories/'} flex={'flex-[0_0_calc(25%_-_20px)] md:flex-[0_0_calc(50%_-_10px)]'} data={data.data[c.cid].data} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[200px]"} width={"w-full"} isBorder={true} /></div>
                                        </>}
                                        {/* {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Reconnect") && <div className='pt-[30px]'><AdsBaner Class={'flex pt-[10px] flex-col justify-center items-center'} height={"h-full"} width={'w-full'} data={{ad_image: '/ads_bike.png'}} /></div>} */}


                                    </div>
                                )
                            })}
                            {/* {(res.u_id) &&  data[u_id]} */}
                        </div>
                    )
                })}
            </div>
            {/* ) */}
            {/* })} */}
        </>
    )
}
