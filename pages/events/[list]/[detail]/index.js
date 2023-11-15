import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import RootLayout from '@/layouts/RootLayout';
import EventDetail from '@/components/Events/EventDetail';
import { postMethod, getAds,getAdvertisements } from '@/libs/api';
import SEO from '@/components/common/SEO'
import { check_Image } from '@/libs/common';

export default function EventDetails({ data, ads_data }) {
    const router = useRouter();
    useEffect(()=>{

    },[router.query])
    // console.log(data, 'detaial')
    return (
        <>
            <RootLayout homeAd={ads_data ? ads_data : null} isLanding={false} head={'Events'}>
                {data && data.message && <SEO title={data.message.meta_title ? data.message.meta_title : data.message.title} ogImage={check_Image(data.message.meta_image ? data.message.meta_image : data.message.image_path)} siteName={'India Reatiling'} ogType={data.message.meta_keywords ? data.message.meta_keywords : data.message.title} description={data.message.meta_description ? data.message.meta_description : data.message.title} />}
                {data && <EventDetail data={data} ads_data={ads_data} />}
            </RootLayout>
        </>
    )
}

export async function getServerSideProps({ params }) {
    const Id = await params?.list + '/' + params?.detail;
    const datas = { route: Id }
    const response = await postMethod("india_retailing.india_retailing.api.event_detail", datas)
    const data = await response;

    let ads_params = { page: 'Events', page_type: 'Detail' }
    const res_ads = await getAdvertisements(ads_params);
    const ads_data = res_ads.message;

    return {
        props: { data, ads_data }
    }
}

