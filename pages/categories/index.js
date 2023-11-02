
import React, { Suspense, useEffect, useState, useRef } from 'react'
import RootLayout from '@/layouts/RootLayout';
import { getAds, getCategoryList, checkMobile } from '@/libs/api';
import SectionBox from '@/components/Category/SectionBox';
import MultiCarousel from '@/components/Sliders/MultiCarousel';

import Title from '@/components/common/Title';
import SEO from '@/components/common/SEO'
import CardCarousel from '../../components/Sliders/CardCarousel';
import CustomSlider from '@/components/Sliders/CustomSlider';

// import Loader from '@/components/Loader';
// import { useRouter } from 'next/router';
export default function Categories({ data, ads }) {
    let [isMobile, setIsMobile] = useState(false)
    const [activeNav, setActiveNav] = useState()
    const [datas, setDatas] = useState([])
    useEffect(() => {
        // console.log(data);
        if (data && data.length != 0) {
            setTimeout(() => {
                setDatas(data)
            }, 200);
        }
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile)
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [])

    const checkIsMobile = async () => {
        let is_Mobile = await checkMobile();
        isMobile = is_Mobile
        setIsMobile(isMobile);
    }

    // let page_no = 1;
    let cardref = useRef(null);
    let [pageNo, setPageNo] = useState(1)
    let [loading, setLoading] = useState(false);
    let [noProduct, setNoProduct] = useState(false);
    // let no_product = false;
    useEffect(() => {


        // const intersectionObserver = new IntersectionObserver(entries => {
        //     if (entries[0].intersectionRatio <= 0) return;
        //     if (!no_product && isMobile) {
        //         page_no > 1 ? getPageData() : null
        //         page_no = page_no + 1
        //     }
        // });

        // intersectionObserver?.observe(cardref?.current);

        // return () => {
        //     cardref?.current && intersectionObserver?.unobserve(cardref?.current)
        // }

        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries[0].intersectionRatio <= 0) return;
            if (!loading && !noProduct && isMobile) {
                if (pageNo >= 2) {
                    loading = true
                    setLoading(loading)
                    pageNo += 1
                    setPageNo(pageNo)
                    getPageData()
                } else {
                    pageNo += 1
                    setPageNo(pageNo)
                    getPageData()
                }
            }
        });

        intersectionObserver?.observe(cardref?.current);

        return () => {
            cardref?.current && intersectionObserver?.unobserve(cardref?.current)
        }

    }, [])

    useEffect(() => {

        // const intersectionObserver = new IntersectionObserver(entries => {
        //   if (entries[0].intersectionRatio <= 0) return;
        //   if (!no_product) {
        //     page_no > 1 ? getPageData() : null
        //     page_no = page_no + 1
        //   }
        // });

        // intersectionObserver?.observe(cardref?.current);

        // return () => {
        //   cardref?.current && intersectionObserver?.unobserve(cardref?.current)
        // }


        if (!isMobile) {
            const handleScroll = () => {
                const scrollTop = document.documentElement.scrollTop
                const scrollHeight = document.documentElement.scrollHeight
                const clientHeight = document.documentElement.clientHeight
                if ((scrollTop + clientHeight) + 1500 >= scrollHeight) {
                    if (!loading && !noProduct && !isMobile) {
                        // no_product = true
                        if (pageNo > 1) {
                            loading = true
                            setLoading(loading)
                            getPageData()
                        } else {
                            pageNo += 1
                            setPageNo(pageNo)
                        }
                    }
                }
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }

        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries[0].intersectionRatio <= 0) return;
            if (!loading && !noProduct && isMobile) {
                if (pageNo > 1) {
                    loading = true
                    setLoading(loading)
                    getPageData()
                } else {
                    pageNo += 1
                    setPageNo(pageNo)
                    getPageData()
                }
            }
        });

        intersectionObserver?.observe(cardref?.current);

        return () => {
            cardref?.current && intersectionObserver?.unobserve(cardref?.current)
        }

        // const intersectionObserver = new IntersectionObserver(entries => {
        //   if (entries[0].intersectionRatio <= 0) return;
        //   if (!loading && !noProduct && isMobile) {
        //     if (pageNo > 1) {
        //       loading = true
        //       setLoading(loading)
        //       getPageData()
        //     } else {
        //       pageNo += 1
        //       setPageNo(pageNo)
        //     }
        //   }
        // });

        // intersectionObserver?.observe(cardref?.current);

        // return () => {
        //   cardref?.current && intersectionObserver?.unobserve(cardref?.current)
        // }
    }, [])




    const getPageData = async () => {
        // console.log('load...',)
        // setLoading(true)
        let params = {
            "doctype": "Articles", "filter_name": "articles_category", "parent_fields": ["name", "title", 'image', "thumbnail_imagee as thumbnail_image", "articles_category", "route"], "category_doctype": "Articles Category", "category_fields": ["name", "title", "primary_text", "description", "route"], "page_no": pageNo, "records": 10, "category_count": 5
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
            // no_product = true;
            // setLoading(false)

            noProduct = true;
            setNoProduct(noProduct)
        }
    }

    // const [loader, setLoader] = useState(false);
    // const router = useRouter()
    // useEffect(() => {
    //   const handleStart = () => {
    //     setLoader(true);
    //   };
    //   const handleComplete = () => {
    //     setLoader(false);
    //   };

    //   router.events.on("routeChangeStart", handleStart);
    //   router.events.on("routeChangeComplete", handleComplete);
    //   router.events.on("routeChangeError", handleComplete);

    //   return () => {
    //     router.events.off("routeChangeStart", handleStart);
    //     router.events.off("routeChangeComplete", handleComplete);
    //     router.events.off("routeChangeError", handleComplete);
    //   };
    // }, []);


    return (
        <>
            <RootLayout homeAd={ads ? ads : null} head={'Categories'} isLanding={true}>
                <SEO title={'Categories'} siteName={'India Reatiling'} description={'Categories'} />

                <div className={` md:p-[15px_10px]  ${isMobile ? '' : 'container'}`}>
                    <Title data={{ title: 'Categories' }} font={'20px'} className='md:hidden' title_class='md:hidden' />
                    {(datas && datas.length != 0) ? datas.map((res, index) => {
                        return (
                            <div key={index} className={`flex md:block md:mb-[10px] lg:mr-[15px] ${index == 0 ? 'lg:mb-[40px]' : 'lg:my-[35px]'} md:border md:rounded-[5px] justify-between gap-[15px] md:flex-col`}>
                                <div className={`lg:w-[calc(20%_-_10px)] md:w-[calc(100%_-_0px)]`} ><SectionBox data={res} /></div>
                                {/* <div className='lg:w-[calc(75%_-_10px)] categorySlide md:w-[calc(100%_-_0px)] xl:w-[calc(80%_-_10px)] md:p-[10px]'><MultiCarousel cardHeight={'lg:h-[280px] md:h-[200px]'} islanding={true} noPlay={false} check={true} height={'lg:h-[185px] md:h-[140px]'} perView={4} width={'w-full'} data={res.events} /></div> */}
                                <div className='lg:w-[calc(80%_-_10px)]  md:p-[10px]'>
                                    {/* <CardCarousel data={res.events} cardClass={'lg:h-[280px] md:h-[220px] flex-[0_0_calc(25%_-_15px)] md:flex-[0_0_calc(50%_-_10px)]'} imgClass={'lg:h-[185px] md:h-[140px] w-full'} /> */}
                                    <CustomSlider data={res.events} cardClass={'lg:h-[280px]  md:h-[235px]  flex-[0_0_calc(25%_-_15px)] md:flex-[0_0_calc(65%_-_10px)]'} imgClass={'lg:h-[185px] md:h-[140px] w-full'}
                                        slider_id={"slider_id" + index} slider_child_id={"slider_child_id" + index} subtitle_class={'hidden'} hashtags_class={'hidden'} primary_text_class={''} />
                                </div>
                            </div>
                        )
                    }) : <Skeleton />}

                    <div className='more lg:hidden md:h-[80px]' ref={cardref}></div>
                    {loading && <div id="wave">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>}
                    {!datas?.length && <Skeleton type='' />}
                </div>
            </RootLayout>

        </>
    )
}


export async function getStaticProps() {
    let params = {
        "doctype": "Articles", "filter_name": "articles_category", "parent_fields": ["name", "title", 'image', "thumbnail_imagee as thumbnail_image", "articles_category", "route"], "category_doctype": "Articles Category", "category_fields": ["name", "title", "primary_text", "description", "route", "background_color"], "page_no": 1, "records": 10, "category_count": 5
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

const Skeleton = () => {
    return (
        <>
            <div >
                {[0, 1, 2, 3, 4].map((res, i) => {
                    return (
                        <div key={i} className={`flex md:block md:mb-[10px] lg:mr-[15px] ${i == 0 ? 'lg:mb-[40px]' : 'lg:my-[35px]'} md:border md:rounded-[5px] justify-between gap-[15px] md:flex-col`}>
                            <div className={`lg:w-[calc(20%_-_10px)] md:w-[calc(100%_-_0px)]`}>
                                <div className={`border rounded-[10px] justify-center p-[10px] md:h-auto lg:h-[280px] flex flex-col md:gap-[5px] lg:gap-[15px]`} >
                                    <p className='bg-[#E5E4E2] h-[6px] w-[50px] rounded-[5px]'></p>
                                    <h6 className=' bg-[#E5E4E2] h-[10px] my-5 w-[100px] rounded-[5px]'></h6>
                                    <p className={`bg-[#E5E4E2] h-[6px] w-[200px] rounded-[5px]`}></p>
                                    <p className={`bg-[#E5E4E2] h-[6px] w-[200px] rounded-[5px]`}></p>
                                    <p className={`bg-[#E5E4E2] h-[6px] w-[200px] rounded-[5px]`}></p>
                                    <p className='bg-[#E5E4E2] h-[6px] mt-[10px] w-[80px] rounded-[5px]' ></p>
                                </div>
                            </div>
                            <div className='lg:w-[calc(80%_-_10px)] flex gap-[20px] overflow-auto scroll-smooth scrollbar-hide md:p-[10px]'>
                                {[0, 1, 2, 3, 4].map(index => {
                                    return (
                                        <div key={index} className='border rounded-[10px] h-[280px] flex-[0_0_calc(20%_-_10px)]'>
                                            <div className='bg-[#E5E4E2] h-[200px] w-full rounded-[5px_5px_0_0]'></div>
                                            <div className='p-[10px]'>
                                                <p className='flex gap-[10px] items-center'><span className='bg-[#E5E4E2] h-[6px] w-[100px] rounded-[5px]'></span><span className='bg-[#E5E4E2] h-[6px] w-[100px] rounded-[5px]'></span></p>
                                                <p className={`bg-[#E5E4E2] h-[8px] w-[220px] my-[10px] rounded-[5px]`}></p>
                                                <p className={`bg-[#E5E4E2] h-[8px] w-[220px] mb-[10px] rounded-[5px]`}></p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )

                })}

                <div></div>

            </div>

        </>
    )
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