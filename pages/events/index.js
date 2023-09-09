import RootLayout from '@/layouts/RootLayout'
import React, { useEffect, useRef, useState } from 'react'
import Title from '@/components/common/Title'
import Sliders from '@/components/Sliders/index'
import EventCards from '@/components/Events/EventCards'
import { getCategoryList, sliders, getAds } from '@/libs/api'
export default function Events({ data, slider_data, ads_data }) {
    // console.log(ads_data)  
    const [pageData, setPageData] = useState([])
    const [isLast, setIsLast] = useState([])
    const cardref = useRef()
    useEffect(() => {
        slider_data.map((res)=> {
            res.web_image ? res.image = res.web_image : res.image = ''
        })
        if (data) {
            setPageData(data)
        }
        if (!cardref?.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (isLast && entry.isIntersecting) {
                // newLimit();
                // loadMore()
                // console.log(entry)
                observer.unobserve(entry.target);
            }
        });

        observer.observe(cardref.current);
    }, [isLast, pageData]);

    return (
        <>
            <RootLayout homeAd={ads_data ? ads_data : null} isLanding={true} head={'Events'}>
                <div className="container">
                    {slider_data && slider_data.length != 0 && <Sliders imgClass={'h-[400px] w-full'} event={true} data={slider_data} perView={1} />}
                </div>
                <div className='gap-[20px] container justify-between flex-wrap p-[30px_0px] md:p-[15px] lg:flex'>
                    {(pageData && pageData.length != 0) && pageData.map((resp, index) => {
                        return (
                            <div key={index} className={`flex flex-col md:flex-[0_0_calc(100%_-_0px)] flex-[0_0_calc(100%_-_15px)] ${index != 0 ? 'md:pt-[15px]' : ''}`}>
                                {resp.events && resp.events.length != 0 && <div><Title data={resp} seeMore={true} /></div>}
                                {/* flex={'flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(100%_-_0px)]'} */}
                                <div className={`lg:grid lg:grid-cols-4 eventCards md:flex  md:gap-[15px] md:overflow-auto justify-between lg:gap-[20px]`}><EventCards data={resp.events.slice(0, 4)} flex={'md:flex-[0_0_calc(70%_-_10px)]'} height={'h-[210px] md:h-[150px]'} width={'w-full'} /></div>
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
        "doctype": "Community Event", "filter_name": "category", "parent_fields": ["name", "title", "thumbnail_path", "start_date", "description", "category", "route"], "category_doctype": "Event Category", "category_fields": ["name", "category_name", "route"], "page_no": 1, "records": 4, "category_count": 4
    }
    const resp = await getCategoryList(params);

    let slider_params = {
        page: 'Community Event',
        fields: ['name', 'title', 'web_image', 'mobile_image', 'mobile_app_image']
    }
    const res = await sliders(slider_params)
    const data = resp.message;
    const slider_data = res.message

    let ads_params = { doctype: 'Community Event', page_type: 'Home' }
    const res_ads = await getAds(ads_params);
    const ads_data = res_ads.message;
    return {
        props: { data, slider_data, ads_data }, revalidate: 50,
    }
}

// export async function getServerSideProps() {
//     let params = {
//         "doctype": "Community Event", "filter_name": "category", "parent_fields": ["name", "title","thumbnail_path","start_date","description","category","route"], "category_doctype": "Event Category", "category_fields": ["name", "category_name","route"], "page_no": 1, "records": 4, "category_count": 4
//     }
//     const resp = await getCategoryList(params);
//     const data = resp.message;
//     return {
//         props: { data }
//     }
// }