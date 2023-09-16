import React, { useState, useEffect } from 'react'
import RootLayout from '@/layouts/RootLayout'
// import PageData from '@/libs/Podcast'
import Sliders from '@/components/Sliders/index'

import HomePodcast from '@/components/Podcast/HomePodcast'
import { podcastLanding, getAds, sliders,checkMobile } from '@/libs/api'
import SEO from '@/components/common/SEO'

export default function Podcast({ data, ads_data,slider_data }) {

    const [isMobile, setIsMobile] = useState()


    useEffect(() => {
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile)
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [])

    const checkIsMobile = async () => {
        let isMobile = await checkMobile();
        setIsMobile(isMobile);
        slider_data && slider_data.map((res)=> {
            !isMobile ?res.web_image ? res.image = res.web_image : res.image = '' : ''
            isMobile ? res.mobile_image ? res.image = res.mobile_image : res.image = '' :''
        })
    }
    return (
        <>
            <RootLayout homeAd={ads_data ? ads_data : null} isLanding={true} head="">
            <SEO title={'Podcast'} siteName={'India Reatiling'} description={'Podcast'}/>
                <div className="container zero-gap ">
                    {slider_data && slider_data.length != 0 && <Sliders imgClass={'h-[400px] md:h-[220px] w-full'} event={true} data={slider_data} perView={1} className='gap-0' />}
                </div>
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

    let slider_params = {
        page: 'Podcast',
        fields: ['name', 'title', 'web_image', 'mobile_image', 'mobile_app_image']
    }
    const res = await sliders(slider_params)
    // const data = resp.message;
    const slider_data = res.message

    let ads_params = { doctype: 'Podcast', page_type: 'Home', position:'Header' }
    const res_ads = await getAds(ads_params);
    const ads_data = res_ads.message;
    return {
        props: { data,ads_data,slider_data }, revalidate: 10,
    }
}