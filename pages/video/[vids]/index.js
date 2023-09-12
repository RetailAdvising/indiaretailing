import RootLayout from '@/layouts/RootLayout'
import React from 'react'
import { getAds,video_list } from '@/libs/api'
import Video from '@/components/Video/Video'
import { useRouter } from 'next/router'
export default function Videos({data,ads}) {
    const router = useRouter()
    console.log(data)
    return (
        <>
            <RootLayout isLanding={false} head={router.query.vids ? router.query.vids : 'List'}>
                {(data && data.length != 0) && <div className='grid grid-cols-4 md:grid-cols-2 container lg:p-[30px_0px] md:p-[15px] gap-[15px] justify-between'>
                    <Video isList={true}  data={data} imgClass={'h-[180px] md:h-[135px] w-full'} />
                </div>}
            </RootLayout>
        </>
    )
}


export async function getServerSideProps({ params }) {
    let Id = await params?.vids;
    // let Id = 'beauty-wellness';
    let param = {
      route: Id,
      fields:["name", "route", "title", "video_image"]
    }

    let value = await video_list(param);
    let data = value.message;

    let param1 = { doctype: 'Video', page_type: 'List' }
    const resp = await getAds(param1);
    const ads = resp.message;

    return {
        props: { data, ads }
    }
}