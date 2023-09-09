import React from 'react';
import RootLayout from '@/layouts/RootLayout'
import { getList , getAds } from '@/libs/api'
import HomePodcast from '@/components/Podcast/HomePodcast';

export default function PodcastList(data, ads_data) {
    console.log(data)
    return (
        <>
            <RootLayout homeAd={ads_data ? ads_data : null}>
                {data && <HomePodcast data={data} />}
            </RootLayout>
        </>
    )
}

export async function getServerSideProps({ params }) {
    let Id = await params?.list;
    let param = {
        doctype: "Podcast",
        fields: ['name', 'title', 'sound', 'image', 'category', 'description', 'route'],
        filters: { "route": ["like", '%' + Id + '%'] }
    }
    let value = await getList(param);
    let data = value.message;
    let ads_params = { doctype: 'Podcast', page_type: 'List' }
    const res_ads = await getAds(ads_params);
    const ads_data = res_ads.message;
    return {
        props: { data, ads_data }
    }
}