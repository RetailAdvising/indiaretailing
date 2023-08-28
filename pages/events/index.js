import RootLayout from '@/layouts/RootLayout'
import React, { useEffect, useRef, useState } from 'react'
// import EventList from '@/components/Events/EventList'
// import PageData from '@/libs/events'
// import HomePageBuilder from '@/components/Builders/HomePageBuilder'
import Title from '@/components/common/Title'
import EventCards from '@/components/Events/EventCards'
import { getCategoryList } from '@/libs/api'
export default function Events({ data }) {
    // console.log(res)
    // useEffect(() => {
    //     async function fetchData() {
    //         // You can await here
    //         const response = await getExclusives();
    //         console.log(response)
    //         // ...
    //     }
    //     fetchData();

    // }, [])
    const [pageData, setPageData] = useState([])
    const [isLast, setIsLast] = useState([])
    const cardref = useRef()
    useEffect(() => {
        if (data) {
            console.log(data);
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
            <RootLayout>
                <div className='gap-[20px] container justify-between flex-wrap p-[30px] flex'>
                    {(pageData && pageData.length != 0) && pageData.map((resp, index) => {
                        return (
                            <div key={index} className='flex flex-col md:flex-[0_0_calc(100%_-_10px)] flex-[0_0_calc(50%_-_15px)]'>
                                <div><Title data={resp} seeMore={true} /></div>
                                {/* flex={'flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'} */}
                                <div className={`grid grid-cols-2  justify-between gap-[20px]`}><EventCards data={resp.events.slice(0,4)}  height={'h-[210px]'} width={'w-full'} /></div>
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
        "doctype": "Community Event", "filter_name": "category", "parent_fields": ["name", "title","thumbnail_path","start_date","description","category","route"], "category_doctype": "Event Category", "category_fields": ["name", "category_name","route"], "page_no": 1, "records": 4, "category_count": 4
    }
    const resp = await getCategoryList(params);
    const data = resp.message;
    return {
        props: { data } , revalidate: 50,
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