import RootLayout from '@/layouts/RootLayout'
import React, { useEffect, useState } from 'react'
import Title from '@/components/common/Title'
import Cards from '@/components/common/Cards'
import { getList, getAds,news_list } from '@/libs/api'
import { useRouter } from 'next/router'
import List from '@/components/common/List'
export default function News({data}) {
    const [isChecked, setIsChecked] = useState(false)
    const router = useRouter();

    useEffect(() => {

        // const getdata = async () =>{
        //     const Id = await router.query?.types;
        //     let param = {
        //         doctype: "News",
        //         fields: ["blog_intro", "name", "title", "publisher", "secondary_text", "route", "primary_text", "thumbnail_image"],
        //         filters: { news_category: Id },
        //     }
        //     let value = await news_list(param);
        //     let data = value.message;
        //     console.log(data)
        // }

        // getdata()
    }, [router])

    // console.log(data)


    return (
        <>
            <RootLayout isLanding={false} head={'List'}>
                <div className='p-[30px_0px] md:p-[15px] container'>
                    <>
                        {/* ${!isChecked ? 'grid grid-cols-2' : 'grid grid-cols-4'} */}
                        {(data) && <>
                            
                            <div className={`grid grid-cols-4 md:grid-cols-1 lg:gap-5 md:gap-[15px]`}>
                                <Cards cardClass={"h-[345px] md:h-[335px]"} check={true} noPrimaryText={false} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[180px]"} width={"w-full"} isBorder={true} data={data} />
                            </div>
                        </>}
                    </>
                </div>
            </RootLayout>
        </>
    )
}

export async function getServerSideProps({ params }) {
    let Id = await params?.types;
    // let Id = 'beauty-wellness';
    let param = {
       route:Id,
        fields: ["blog_intro", "name", "title", "publisher", "secondary_text", "route", "primary_text", "thumbnail_image"],
    }
    let value = await news_list(param);
    let data = value.message;

    let param1 = { doctype: 'News', page_type: 'List' }
    const resp = await getAds(param1);
    const ads = resp.message;

    return {
        props: { data, ads }
    }
}