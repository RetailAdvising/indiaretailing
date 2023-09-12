import React, { useState, useEffect } from 'react'
import RootLayout from '@/layouts/RootLayout'
// import PageData from '@/libs/Podcast'
import HomePodcast from '@/components/Podcast/HomePodcast'
import { podcastLanding, getAds } from '@/libs/api'
import SEO from '@/components/common/SEO'

export default function Podcast({ data, ads_data }) {

    // const [isMobile, setIsMobile] = useState()
    // useEffect(() => {
    //     checkIsMobile();
    //     window.addEventListener('resize', checkIsMobile)
    //     return () => {
    //         window.removeEventListener('resize', checkIsMobile);
    //     };
    // }, [])

    // const checkIsMobile = async () => {
    //     let isMobile = await checkMobile();
    //     setIsMobile(isMobile);
    // }
    return (
        <>
            <RootLayout homeAd={ads_data ? ads_data : null} isLanding={true} head="">
            <SEO title={'Podcast'} siteName={'India Reatiling'} description={'Podcast'}/>
                {(data && data) && data.map((res, index) => {
                    return (
                        <HomePodcast key={index} data={res} />
                    )
                })}
            </RootLayout>

        </>
    )
}

export async function getStaticProps() {
    let param = {
        fields: ['name', 'title', 'sound', 'image', 'category', 'description', 'route']
    }
    let value = await podcastLanding(param);
    let data = value.message;
    let ads_params = { doctype: 'Podcast', page_type: 'Home', position:'Header' }
    const res_ads = await getAds(ads_params);
    const ads_data = res_ads.message;
    return {
        props: { data,ads_data }, revalidate: 10,
    }
}