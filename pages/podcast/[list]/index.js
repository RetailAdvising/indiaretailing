import React from 'react';
import RootLayout from '@/layouts/RootLayout'
import { podcast_list, getAdvertisements } from '@/libs/api'
import HomePodcast from '@/components/Podcast/HomePodcast';
import SEO from '@/components/common/SEO'

export default function PodcastList(props) {
    // export default function PodcastList(data, ads_data) {
    // console.log(ads_data,'ads_data')
    // console.log(props,'props')
    return (
        <>
            <RootLayout  homeAd={props.ads_data ? props.ads_data : null}>
                {/* <SEO title={data.data.meta_title} ogImage={check_Image(data.data.image)} siteName={'India Retailing'} ogType={data.data.meta_keywords} description={data.data.meta_description}/> */}
                {props.data && <HomePodcast data={props} />}
            </RootLayout>
        </>
    )
}

export async function getServerSideProps({ params }) {
    let Id = await params?.list;
    let param = {
        route: Id,
        fields: ['name', 'title', 'sound', 'image', 'category', 'description', 'route'],
    }
    let value = await podcast_list(param);
    let data = value.message;
    let ads_params = { page: 'Podcasts', page_type: 'List' }
    const res_ads = await getAdvertisements(ads_params);
    const ads_data = res_ads.message;
    return {
        props: { data, ads_data }
    }
}