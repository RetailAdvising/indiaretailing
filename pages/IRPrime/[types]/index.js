import RootLayout from '@/layouts/RootLayout'
import React, { useEffect, useState } from 'react'
import { getList, getAds } from '@/libs/api'
import List from '@/components/common/List'
export default function Lists({ data, ads }) {
    return (
        <>
            <RootLayout isLanding={false} head={'List'}>
                <div className='p-[30px_0px] md:p-[15px] container'>
                    {data && <>
                        {/* {!isChecked ? <List fullWidth={true} check={true} isBB={true} contentWidth={'w-[410px] md:w-[auto]'} imgFlex={'flex-[0_0_calc(35%_-_10px)]'} imgWidth={'w-full'} imgHeight={'h-[160px]'} data={data} borderRadius={'rounded-[5px]'} />
                                : <Cards cardClass={"h-[360px]"} check={true} noPrimaryText={false} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[180px]"}  width={"w-full"} isBorder={true} data={data} />} */}
                        <div className={`grid grid-cols-2 md:grid-cols-1 lg:gap-5`}>
                            <List fullWidth={true} check={true} isBB={true} contentWidth={'w-[410px] md:w-[auto]'} imgFlex={'flex-[0_0_calc(35%_-_10px)] md:flex-[0_0_calc(40%_-_10px)]'} imgWidth={'w-full'} imgHeight={'h-[160px] md:h-[130px]'} data={data} borderRadius={'rounded-[5px]'} />
                            {/* <Cards cardClass={"h-[360px]"} check={true} noPrimaryText={false} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[180px]"} width={"w-full"} isBorder={true} data={data} /> */}
                        </div>
                    </>}
                </div>
            </RootLayout>
        </>
    )
}

export async function getServerSideProps({ params }) {
    let Id = await params?.types;
    // let Id = 'beauty-wellness';
    let param = {
        doctype: "Articles",
        fields: ["blog_intro", "name", "articles_category", "title", "publisher", "secondary_text", "route", "primary_text", "thumbnail_image"],
        filters: { articles_category: Id, ir_prime: 1, published: 1 },

    }
    let value = await getList(param);
    let data = value.message;

    let param1 = { doctype: 'Articles', page_type: 'List', category_route: params.types }
    const resp = await getAds(param1);
    const ads = resp.message;

    return {
        props: { data, ads }
    }
}