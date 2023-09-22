// 'use client'
import React, { useEffect, useState } from 'react'
import Title from '@/components/common/Title';
import Image from 'next/image';
import RootLayout from '@/layouts/RootLayout';
import List from '@/components/common/List';
import Cards from '@/components/common/Cards';
import { getList, checkMobile, check_Image, getAds, trending } from '@/libs/api';
import { useRouter } from 'next/router';
import SEO from '@/components/common/SEO'
export default function CategoryType({ values, ads }) {
    const router = useRouter();
    const [data, setData] = useState([]);

    let apiCall = false;
    let page_no = 1;

    useEffect(() => {
        console.log(values);
        if (values) {
            setData(values)
        }

        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop
            const scrollHeight = document.documentElement.scrollHeight
            const clientHeight = document.documentElement.clientHeight
            if ((scrollTop + clientHeight) + 700 >= scrollHeight) {
                if (!apiCall) {
                    apiCall = true;
                    page_no += 1;
                    loadMore()
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [router.query]);

    async function loadMore() {
        let Id = router.query.types;
        let param = {
            doctype: "Articles",
            page_no: page_no,
            page_size: 8,
            fields: ["blog_intro", "name", "articles_category", "title", "publisher", "secondary_text", "route", "primary_text", "thumbnail_image", "image", "sub_title", "_user_tags", "location"],
            filters: { articles_category: Id }
        }
        let value = await getList(param);
        if (value && value.message.length != 0) {
            setData(d => d = [...d, ...value.message]);
            // data = [...data,...value.message]
            apiCall = false;
        } else {
            apiCall = true;
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
                            {!isMobile && <Title data={{ title: router.query.types }} />}
                            <div className={`${isMobile ? '' : 'border'} rounded-[10px] lg:h-[520px] lg:p-[15px] cursor-pointer`}>{data.slice(0, 1).map((res, index) => {
                                return (
                                    <div key={index} onClick={() => router.push(`/categories/${res.route}`)} className={` pb-[10px]`}>
                                        <h6 className={`lg:text-[18px] md:text-[16px] font-semibold`}>{res.title}</h6>
                                        <Image className={`h-[330px] w-full mt-[10px] rounded-[5px]`} src={check_Image(res.thumbnail_image)} height={250} width={300} alt={res.title} />
                                        <p className={`flex items-center pt-[10px]`}><span className={`primary_text pr-[10px]`}>{res.primary_text}</span><span className='h-[15px] w-[2px] bg-[#6f6f6f]'></span><span className={`secondary_text pl-[10px]`}>{res.secondary_text}</span></p>
                                        <p className={`sub_title line-clamp-2 pt-[10px]`}>{res.blog_intro}</p>
                                        {/* <p className={`hashtags pt-[5px]`}>{res.publisher}</p> */}
                                        <p className={`light_text pt-[10px] flex gap-[5px]`}>{((res.tags && res.tags.length != 0)) && res.tags.map((tag, index_no) => {
                                            if(index_no < 2){return (
                                                <span onClick={($event)=>trending($event,tag)} key={index_no} className='text-[12px]'>#{tag.tag}</span>
                                            )}
                                        })
                                        }</p>
                                    </div>
                                )
                            })}</div>
                        </div>
                        <div className={`lg:flex-[0_0_calc(35%_-_10px)] lg:pt-[45px] md:pt-[20px] md:flex-[0_0_calc(100%_-_10px)]`}>
                            <div className='border p-[15px] lg:grid md:h-[auto] h-[520px] rounded-[10px]'> <List primary_pb={'mb-[10px]'} hash_bg={'mt-[10px]'} contentWidth={'flex-[0_0_calc(65%_-_10px)]'} titleClamp={'line-clamp-1 md:line-clamp-2 leading-none'} imgWidth={'w-full'} line={'line-clamp-1 md:hidden'} imgHeight={'h-[90px]'} check={true} data={data.slice(0, 4)} borderRadius={'rounded-[5px]'} isReverse={true} /></div>
                        </div>
                    </div>}
                    <div className={`grid grid-cols-4 md:grid-cols-2 md:pt-[20px] lg:py-8 md:gap-[10px] lg:gap-[20px]`}>
                        {/* contentHeight={'h-[175px]'} */}
                        <Cards cardClass={"lg:h-[315px] md:h-[260px]"} noPrimaryText={true} borderRadius={"rounded-[10px_10px_0_0]"} height={"lg:h-[180px] md:h-[150px]"} check={true} width={"w-full"} isBorder={true} data={data} />
                    </div>
                </div>
            </RootLayout>
        </>
    )
}


// export async function getStaticPaths({params}){

// }

export async function getServerSideProps({ params }) {
    let Id = await params?.types;
    let param = {
        doctype: "Articles",
        fields: ["blog_intro", "name", "articles_category", "title", "publisher", "secondary_text", "route", "primary_text", "thumbnail_image", "image", "sub_title", "_user_tags", "location"],
        page_no: 1,
        page_size: 8,
        filters: { articles_category: Id }
    }
    let value = await getList(param);
    let values = value.message;

    let param1 = { doctype: 'Articles', page_type: 'List' }
    const resp = await getAds(param1);
    const ads = resp.message;

    return {
        props: { values, ads }
    }
}