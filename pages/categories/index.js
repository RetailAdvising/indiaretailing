// 'use client'
import React, { useEffect } from 'react'
// import CategoryBuilder from '@/components/Builders/CategoryBuilder';
// import categories from '@/libs/categories'
// import HomePageBuilder from '@/components/Builders/HomePageBuilder';
// import data from '@/libs/categoryLanding';
import RootLayout from '@/layouts/RootLayout';
import { getCategoryList } from '@/libs/api';
import SectionBox from '@/components/Category/SectionBox';
import MultiCarousel from '@/components/Sliders/MultiCarousel';
import Title from '@/components/common/Title';
export default function Categories({ data }) {
    console.log(data);
    // useEffect(()=>{
        // const checkBfcache = (e) => {
        //     console.log("This page is restored from bfcache?", e.persisted);
        //     if (e.persisted) {
        //       alert("This page is served from bfcache");
        //     }
        //   };
        //   window.addEventListener("pageshow", checkBfcache);
    // },[])
    return (
        <>
            <RootLayout>
                <div className='p-[30px] container'>
                    <Title data={{title:'Categories'}} font={'26px'} />
                    {data && data.map((res, index) => {
                        return (
                            <div key={index} className={`flex justify-between gap-[15px]`}>
                                <div className={`lg:w-[calc(25%_-_10px)] md:w-[calc(40%_-_10px)] xl:w-[calc(20%_-_10px)]`}><SectionBox data={res} /></div>
                                <div className='lg:w-[calc(75%_-_10px)] categorySlide md:w-[calc(60%_-_10px)] xl:w-[calc(80%_-_10px)]'><MultiCarousel cardHeight={'lg:h-[280px] md:min-h-[310px]'} islanding={true} noPlay={true} check={true} height={'h-[185px]'} perView={4} width={'w-full'} data={res.events} /></div>
                            </div>
                        )
                    })}
                </div>
            </RootLayout>
        </>
    )
}


export async function getStaticProps() {
    let params = {
        "doctype": "Articles", "filter_name": "articles_category", "parent_fields": ["name", "title","thumbnail_image","articles_category","route"], "category_doctype": "Articles Category", "category_fields": ["name", "title","primary_text","description","route"], "page_no": 1, "records": 6, "category_count": 7
    }
    const res = await getCategoryList(params);
    const data = res.message;
    return {
        props: { data }, revalidate: 50,
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