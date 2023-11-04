// 'use client'
import React, { useEffect, useState,useRef } from 'react'
import Title from '@/components/common/Title';
import Image from 'next/image';
import RootLayout from '@/layouts/RootLayout';
import List from '@/components/common/List';
import Cards from '@/components/common/Cards';
import { getList, articlesList, checkMobile, check_Image, getAds, trending } from '@/libs/api';
import { useRouter } from 'next/router';
import SEO from '@/components/common/SEO'
import Tags from '@/components/common/Tags';
import ImageLoader from '@/components/ImageLoader';
import { Nunito } from 'next/font/google'
const nunito = Nunito({
    weight: ["300","400","500","600","700"],
    display: "block",
    preload: true,
    style: 'normal',
    subsets: ["latin"],
    variable: '--font-inter',
  })
export default function CategoryType({ values, ads }) {
    const router = useRouter();
    const [data, setData] = useState([]);

    // let apiCall = false;
    let page_no = 1;
    let cardref = useRef(null);
    let no_product = false;
    const [loading, setLoading] = useState(false);

    // console.log(ads)

    useEffect(() => {
        // console.log(values);
        if (values) {
            setData(values)
        }

        // const handleScroll = () => {
        //     const scrollTop = document.documentElement.scrollTop
        //     const scrollHeight = document.documentElement.scrollHeight
        //     const clientHeight = document.documentElement.clientHeight
        //     if ((scrollTop + clientHeight) + 700 >= scrollHeight) {
        //         if (!apiCall) {
        //             apiCall = true;
        //             page_no += 1;
        //             loadMore()
        //         }
        //     }
        // };

        // window.addEventListener('scroll', handleScroll);

        // return () => {
        //     window.removeEventListener('scroll', handleScroll);
        // };

        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries[0].intersectionRatio <= 0) return;
            if (!no_product) {
                page_no > 1 ? loadMore() : null
                page_no = page_no + 1
            }
        });

        intersectionObserver?.observe(cardref?.current);

        return () => {
            cardref?.current && intersectionObserver?.unobserve(cardref?.current)
        }

    }, [router.query]);

    async function loadMore() {
        setLoading(true)
        let Id = router.query.types;
        let param = {
            // doctype: "Articles",
            category_route: Id,
            page_no: page_no,
            page_size: 13,
            // fields: ["blog_intro", "name", "articles_category", "title", "publisher", "secondary_text", "route", "primary_text", "thumbnail_image", "image", "sub_title", "_user_tags", "location"],
            // filters: { articles_category: Id, ir_prime: 0, published: 1 }
        }
        let value = await articlesList(param);
        if (value && value.message.length != 0) {
            setData(d => d = [...d, ...value.message]);
            // data = [...data,...value.message]
            setLoading(false)
            no_product = false;
        } else {
            no_product = true;
            setLoading(false)
        }

    }

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
            <RootLayout isLanding={false} homeAd={ads ? ads : null} head={router.query.types}>
                <SEO title={router.query.types} siteName={'India Reatiling'} ogType={router.query.types} description={router.query.types} />
                <div className={`${isMobile ? 'md:p-[15px]' : 'container'}`} id='root' >
                    {(data && data.length != 0) && <div className={`lg:flex lg:flex-wrap  lg:gap-[20px]`}>
                        <div className={`flex-[0_0_calc(65%_-_10px)]  md:flex-[0_0_calc(100%_-_10px)]`}>
                            {/* {!isMobile && <Title data={{ title: router.query.types }} />} */}
                            <div className={`${isMobile ? '' : 'border'} rounded-[10px] lg:h-[520px] lg:p-[15px] cursor-pointer`}>{data && data.slice(0, 1).map((res, index) => {
                                return (
                                    <div key={res.title ? res.title : index} onClick={() => router.push(`/${res.route}`)} className={` pb-[10px]`}>
                                        <h6 className={`lg:text-[18px] md:text-[16px] font-[700] ${nunito.className}`}>{res.title}</h6>
                                        <ImageLoader style={`h-[330px] w-full mt-[10px] rounded-[5px]`} src={res.image ? res.image : res.thumbnail_image} title={res.title ? res.title : 'indiaRetail'} />
                                        {/* <Image className={`h-[330px] w-full mt-[10px] rounded-[5px]`} src={check_Image(res.image ? res.image : res.thumbnail_image)} height={250} width={300} alt={res.title} /> */}
                                        <p className={`flex items-center pt-[10px]`}><span className={`primary_text pr-[10px] ${nunito.className}`}>{res.primary_text}</span><span className='h-[15px] w-[2px] bg-[#6f6f6f]'></span><span className={`secondary_text pl-[10px] ${nunito.className}`}>{res.secondary_text}</span></p>
                                        <p className={`sub_title line-clamp-2 pt-[10px]`}>{res.blog_intro}</p>
                                        {/* <p className={`hashtags pt-[5px]`}>{res.publisher}</p> */}
                                        <Tags tags={res.tags} />
                                    </div>
                                )
                            })}</div>
                        </div>
                        {/* lg:pt-[45px] */}
                        <div className={`lg:flex-[0_0_calc(35%_-_10px)]  md:pt-[20px] md:flex-[0_0_calc(100%_-_10px)]`}>
                            <div className='border p-[15px] lg:grid md:h-[auto] h-[520px] rounded-[10px]'> <List primary_pb={'mb-[5px]'} hash_bg={'mt-[10px]'} contentWidth={'flex-[0_0_calc(65%_-_10px)]'} titleClamp={'line-clamp-2 '} imgWidth={'w-full'} line={'line-clamp-1 md:hidden'} imgHeight={'h-[90px] md:h-[80px]'} check={true} data={data.slice(1, 5)} borderRadius={'rounded-[5px]'} isReverse={true} /></div>
                        </div>
                    </div>}
                    <div className={`grid grid-cols-4 md:grid-cols-2 md:pt-[20px] lg:py-8 md:gap-[10px] lg:gap-[20px]`}>
                        {/* contentHeight={'h-[175px]'} */}
                        <Cards cardClass={"lg:h-[315px] md:h-[260px]"} noPrimaryText={true} borderRadius={"rounded-[10px_10px_0_0]"} height={"lg:h-[180px] md:h-[150px]"} check={true} width={"w-full"} isBorder={true} data={data.slice(5, data.length - 1)} />
                    </div>
                </div>

                <div className='more h-[30px]' ref={cardref}></div>
                {(loading && isMobile) && <div id="wave">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>}
            </RootLayout>
        </>
    )
}


// export async function getStaticPaths({params}){

// }

export async function getServerSideProps({ params }) {
    let Id = await params?.types;
    let param = {
        //    s: ["blog_intro", "name", "articles_category", "title", "publisher", "secondary_text", "route", "primary_text", "thumbnail_image", "image", "sub_title", "_user_tags", "location"],
        category_route: Id,
        page_no: 1,
        page_size: 13,
    }
    // let value = await getList(param);
    let value = await articlesList(param);
    let values = value.message;

    let param1 = { doctype: 'Articles', page_type: 'List', category_route: Id }
    const resp = await getAds(param1);
    const ads = resp.message;

    return {
        props: { values, ads }
    }
}