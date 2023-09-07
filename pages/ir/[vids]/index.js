import RootLayout from '@/layouts/RootLayout'
import React from 'react'
import { getList, getAds } from '@/libs/api'
import Video from '@/components/Video/Video'
import { useRouter } from 'next/router'
export default function Videos({data,ads}) {
    const router = useRouter()
    return (
        <>
            <RootLayout isLanding={false} head={router.query.vids}>
                {(data && data.length != 0) && <div className='grid grid-cols-4 md:grid-cols-2 container lg:p-[30px_0px] md:p-[15px] gap-[15px] justify-between'>
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