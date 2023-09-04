import RootLayout from '@/layouts/RootLayout'
import React from 'react'
import { getList, getAds } from '@/libs/api'
import Video from '@/components/Video/Video'
export default function Videos({data,ads}) {
    return (
        <>
            <RootLayout>
                {(data && data.length != 0) && <div className='grid grid-cols-4 md:grid-cols-2 container lg:p-[30px_20px] gap-[15px] justify-between'>
                    <Video data={data} />
                </div>}
            </RootLayout>
        </>
    )
}


export async function getServerSideProps({ params }) {
    let Id = await params?.types;
    // let Id = 'beauty-wellness';
    let param = {
        doctype: 'Video',
        fields: ["name", "video_id", "video_image", "title", "category"],
        filters: { category: 'IR Prime Videos' },
        ir_prime: 1,
    }

    let value = await getList(param);
    let data = value.message;

    let param1 = { doctype: 'Video', page_type: 'List' }
    const resp = await getAds(param1);
    const ads = resp.message;

    return {
        props: { data, ads }
    }
}