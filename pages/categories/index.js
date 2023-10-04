
import React, { Suspense, useEffect, useState, useRef } from 'react'
import RootLayout from '@/layouts/RootLayout';
import { getAds, getCategoryList, checkMobile } from '@/libs/api';
import SectionBox from '@/components/Category/SectionBox';
import MultiCarousel from '@/components/Sliders/MultiCarousel';

import Title from '@/components/common/Title';
import SEO from '@/components/common/SEO'
import CardCarousel from '../../components/Sliders/CardCarousel';
import CustomSlider from '@/components/Sliders/CustomSlider';

export default function Categories({ data, ads }) {
    const [isMobile, setIsMobile] = useState()
    const [activeNav, setActiveNav] = useState()
    const [datas, setDatas] = useState([])
    useEffect(() => {
        // console.log(data);
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

    let page_no = 1;
    let cardref = useRef(null);
    let no_product = false;
    useEffect(() => {
        console.log(data);
        if (data && data.length != 0) {
            setDatas(data)
        }
        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries[0].intersectionRatio <= 0) return;
            if (!no_product) {
                page_no > 1 ? getPageData() : null
                page_no = page_no + 1
            }
        });

        intersectionObserver?.observe(cardref?.current);

        return () => {
            cardref?.current && intersectionObserver?.unobserve(cardref?.current)
        }
    }, [])

    const [loading, setLoading] = useState(false);

    const getPageData = async () => {
        // console.log('load...',)
        setLoading(true)
        let params = {
            "doctype": "Articles", "filter_name": "articles_category", "parent_fields": ["name", "title",'image', "thumbnail_imagee as thumbnail_image", "articles_category", "route"], "category_doctype": "Articles Category", "category_fields": ["name", "title", "primary_text", "description", "route"], "page_no": page_no, "records": 10, "category_count": 5
        }
        const resp = await getCategoryList(params);
        // const data = res.message;
        //   const resp = await HomePage(param);
        if (resp.message && resp.message && resp.message.length != 0) {
            setTimeout(() => {
                setDatas(d => d = [...d, ...resp.message])
                setLoading(false)
            }, 400);
        } else {
            no_product = true;
            setLoading(false)
        }
    }


    return (
        <>
            <RootLayout homeAd={ads ? ads : null} head={'Categories'} isLanding={true}>
                <SEO title={'Categories'} siteName={'India Reatiling'} description={'Categories'} />

                <div className={` md:p-[15px_10px]  ${isMobile ? '' : 'container'}`}>
                    <Title data={{ title: 'Categories' }} font={'20px'} className='md:hidden' title_class='md:hidden' />
                    {datas && datas.map((res, index) => {
                        return (
                            <div key={index} className={`flex md:block md:mb-[10px] lg:mr-[15px] ${index == 0 ? 'lg:mb-[40px]' : 'lg:my-[35px]'} md:border md:rounded-[5px] justify-between gap-[15px] md:flex-col`}>
                                <div className={`lg:w-[calc(20%_-_10px)] md:w-[calc(100%_-_0px)]`} ><SectionBox data={res} /></div>
                                {/* <div className='lg:w-[calc(75%_-_10px)] categorySlide md:w-[calc(100%_-_0px)] xl:w-[calc(80%_-_10px)] md:p-[10px]'><MultiCarousel cardHeight={'lg:h-[280px] md:h-[200px]'} islanding={true} noPlay={false} check={true} height={'lg:h-[185px] md:h-[140px]'} perView={4} width={'w-full'} data={res.events} /></div> */}
                                <div className='lg:w-[calc(80%_-_10px)]  md:p-[10px]'>
                                    {/* <CardCarousel data={res.events} cardClass={'lg:h-[280px] md:h-[220px] flex-[0_0_calc(25%_-_15px)] md:flex-[0_0_calc(50%_-_10px)]'} imgClass={'lg:h-[185px] md:h-[140px] w-full'} /> */}
                                    <CustomSlider data={res.events} cardClass={'lg:h-[280px]  md:h-[220px]  flex-[0_0_calc(25%_-_15px)] md:flex-[0_0_calc(65%_-_10px)]'} imgClass={'lg:h-[185px] md:h-[140px] w-full'}
                                        slider_id={"slider_id" + index} slider_child_id={"slider_child_id" + index} subtitle_class={'hidden'} hashtags_class={'hidden'} primary_text_class={''}/>
                                </div>
                            </div>
                        )
                    })}
                    <div className='more h-[30px]' ref={cardref}></div>
                    {loading && <div id="wave">
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>}
                    {!data?.length && <Skeleton type='' />}
                </div>
            </RootLayout>

        </>
    )
}


export async function getStaticProps() {
    let params = {
        "doctype": "Articles", "filter_name": "articles_category", "parent_fields": ["name", "title", 'image', "thumbnail_imagee as thumbnail_image", "articles_category", "route"], "category_doctype": "Articles Category", "category_fields": ["name", "title", "primary_text", "description", "route","background_color"], "page_no": 1, "records": 10, "category_count": 5
    }
    const res = await getCategoryList(params);
    const data = res.message;

    let param = { doctype: 'Articles', page_type: 'Home' }
    const resp = await getAds(param);
    const ads = resp.message;
    return {
        props: { data, ads }, revalidate: 50,
    }
}

// export async function getServerSideProps() {
//     let params = {
//         "doctype": "Articles", "filter_name": "articles_category", "parent_fields": ["name", "title","thumbnail_image","articles_category","route"], "category_doctype": "Articles Category", "category_fields": ["name", "title","primary_text","description","route"], "page_no": 1, "records": 4, "category_count": 7
//     }
//     const res = await getCategoryList(params);
//     const data = res.message;
//     return {
//         props: { data }
//     }
// }