import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { postMethod, eventList, getAds } from '@/libs/api.js';
import RootLayout from '@/layouts/RootLayout';
import EventList from '@/components/Events/EventList';
import Title from '@/components/common/Title';
import EventCards from '@/components/Events/EventCards';
import SEO from '@/components/common/SEO'
import { check_Image } from '@/libs/common';

export default function EventDetails({ values }) {
    const router = useRouter();
    // const [list, setList] = useState(false);
    const [isChecked, setIsChecked] = useState(false)
    const [data, setData] = useState([])
    let apiCall = false;
    let page_no = 1;


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }
    // console.log(router.query.list)


    // async function  get_event_list(){
    //     const payload = {
    //         category:router.query.list
    //     }
    //     if (router.query.list) {
    //         const event_list = await postMethod("india_retailing.india_retailing.api.event_list",payload )
    //         console.log(event_list);
    //     }
    // }

    useEffect(() => {
        getAd()
        if (values) {
            // console.log(values);
            setData(values.message)
        }

        const handleScroll = (event) => {
            const scrollTop = document.documentElement.scrollTop
            const scrollHeight = document.documentElement.scrollHeight
            const clientHeight = document.documentElement.clientHeight

            if ((scrollTop + clientHeight) + 500 >= scrollHeight) {
                // console.log(scrollTop);
                // console.log(clientHeight);
                // console.log(scrollHeight);
                if (!apiCall) {
                    apiCall = true;
                    page_no += 1;
                    loadMore()
                    // sampleFunc();
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])


    async function loadMore() {
        let Id = router.query?.list;
        let param = { route: Id, page_no: page_no, page_length: 12, fields: ["name", "title", "description", "category_name", "start_date", "thumbnail_path"] }
        let value = await eventList(param)
        if (value && value.message.length != 0) {
            setData(d => d = [...d, ...value.message]);
            // setData(d => d={...d,...value});
            // setData(d => console.log(d));
            // data = [...data,...value.message]
            apiCall = false;
        } else {
            apiCall = true;
        }

    }

    const [ads,setAds] = useState()

    const getAd = async () => {
        let params = { doctype: 'Community Event', page_type: 'List',category_route:router.query.list }
        const res = await getAds(params);
        const ads = res.message;
        if(ads){
          setAds(ads)
        }
      }
    
    return (
        <>
            <RootLayout isLanding={false} head={values.title} homeAd={ads ? ads : null} >
            {values && <SEO title={values.title} siteName={'India Reatiling'}/>}
            {/* <SEO title={data.data.meta_title} ogImage={check_Image(data.data.image)} siteName={'India Reatiling'} ogType={data.data.meta_keywords} description={data.data.meta_description}/> */}
                <div className='md:p-[15px] container '>
                    <div className='flex md:hidden justify-between items-center'>
                        <div className='mt-[20px]'>
                            <Title data={values} />
                        </div>
                        {/* <div>
                            <label className='themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1'>
                                <input
                                    type='checkbox'
                                    className='sr-only'
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <span
                                    className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${!isChecked ? 'text-primary bg-[#f4f7ff]' : 'text-body-color'
                                        }`}
                                >
                                    List View
                                </span>
                                <span
                                    className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${isChecked ? 'text-primary bg-[#f4f7ff]' : 'text-body-color'
                                        }`}
                                >
                                    Grid View
                                </span>
                            </label>
                        </div> */}

                    </div>
                    {/*  ${!isChecked ? 'grid-cols-2 md:grid-cols-1' : 'grid-cols-4 md:grid-cols-2'} */}
                    <div className={`grid grid-cols-4 md:grid-cols-2 md:gap-[10px] gap-[20px] mb-[20px]`}>
                        {/* {data && <EventList data={data.message} />} */}
                        {(data) && <>
                            {/* {!isChecked ? <EventList data={data} height={'h-[200px]'} width={'w-full'} />
                                : <EventCards data={data} flex={'flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'} height={'h-[210px]'} width={'w-full'} />
                            } */}
                            <EventCards card={'h-[370px] md:h-[320px]'} data={data} height={'h-[210px] md:h-[150px]'} width={'w-full'} />
                        </>
                        }
                    </div>
                </div>
            </RootLayout>
        </>
    )
}
export async function getServerSideProps({ params }) {
    const Id = await params?.list;
    const datas = { route: Id, page_no: 1, page_length: 12, fields: ["name", "title", "description", "category_name", "start_date", "thumbnail_path", "route"] }
    const response = await eventList(datas)
    const values = await response;
    return {
        props: { values }
    }
}

