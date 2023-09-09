import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Detail from '@/libs/eventDetail';
import RootLayout from '@/layouts/RootLayout';
import EventDetail from '@/components/Events/EventDetail';
import { postMethod , getAds } from '@/libs/api';
export default function EventDetails({ data, ads_data }) {
    const router = useRouter();
    // useEffect(()=>{

    // },[router.query])
    return (
        <>
            <RootLayout homeAd={ads_data ? ads_data : null} isLanding={false} head={'Events'}>
                {data && <EventDetail data={data} />}
            </RootLayout>
        </>
    )
}

export async function getServerSideProps({ params }) {
    const Id = await params?.list + '/' + params?.detail;
    const datas = { route: Id }
    const response = await postMethod("india_retailing.india_retailing.api.event_detail", datas)
    const data = await response;

    let ads_params = { doctype: 'Community Event', page_type: 'Detail' }
    const res_ads = await getAds(ads_params);
    const ads_data = res_ads.message;

    return {
        props: { data,ads_data }
    }
}

