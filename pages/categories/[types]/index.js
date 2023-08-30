// 'use client'
import React, { useEffect, useState } from 'react'
import Title from '@/components/common/Title';
import Image from 'next/image';
import RootLayout from '@/layouts/RootLayout';
import List from '@/components/common/List';
import Cards from '@/components/common/Cards';
import { getList } from '@/libs/api';
import { check_Image } from '@/libs/common';
import { useRouter } from 'next/router';
export default function CategoryType({ values }) {
    const router = useRouter();
    const [data, setData] = useState([]);
 
    let apiCall = false;
    let page_no = 1;

    console.log(router);
    useEffect(() => {
        if (values) {
            console.log(values);
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

    }, []);

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
    return (
        <>
            <RootLayout>
                <div className='container' id='root' >
                    {(data && data.length != 0) && <div className={`flex flex-wrap p-[20px_30px] gap-[20px]`}>
                        <div className={`flex-[0_0_calc(65%_-_10px)]  md:flex-[0_0_calc(100%_-_10px)]`}>
                            <Title data={{ title: router.query.types }} />
                            <div className='border rounded-[10px] h-[520px] p-[17px]'>{data.slice(0, 1).map((res, index) => {
                                return (
                                    <div key={index} onClick={() => router.push(`/categories/${res.route}`)} className={` pb-[10px]`}>
                                        <p className={`text-[18px] font-semibold`}>{res.title}</p>
                                        <Image className={`h-[330px] w-full pt-[10px] rounded-[5px]`} src={check_Image(res.thumbnail_image)} height={250} width={300} alt={res.title} />
                                        <p className={`flex items-center pt-[10px]`}><span className={`primary_text pr-[10px]`}>{res.primary_text}</span><span className='h-[15px] w-[2px] bg-[#121212]'></span><span className={`secondary_text pl-[10px]`}>{res.secondary_text}</span></p>
                                        <p className={`sub_title line-clamp-2 pt-[10px]`}>{res.blog_intro}</p>
                                        <p className={`hashtags pt-[5px]`}>{res.publisher}</p>
                                    </div>
                                )
                            })}</div>
                        </div>
                        <div className={`flex-[0_0_calc(35%_-_10px)] pt-[35px] md:flex-[0_0_calc(100%_-_10px)]`}>
                            <div className='border p-[17px] lg:grid md:h-[auto] h-[520px] rounded-[10px]'> <List contentWidth={'flex-[0_0_calc(65%_-_10px)]'} imgWidth={'w-full'} line={'line-clamp-1'} imgHeight={'h-[80px]'} check={true} data={data.slice(0, 3)} borderRadius={'rounded-[5px]'} isReverse={true} /></div>
                        </div>
                    </div>}
                    <div className={`grid grid-cols-4 md:grid-cols-2 p-[20px_30px] gap-[20px]`}>
                        {/* contentHeight={'h-[175px]'} */}
                        <Cards cardClass={"h-[310px]"} noPrimaryText={true} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[180px]"} check={true} width={"w-full"} isBorder={true} data={data} />
                    </div>
                </div>
            </RootLayout>
        </>
    )
}


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

    return {
        props: { values }
    }
}