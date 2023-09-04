import React, { useState, useEffect } from 'react'
import RootLayout from '@/layouts/RootLayout'
// import PageData from '@/libs/Podcast'
import HomePodcast from '@/components/Podcast/HomePodcast'
import { podcastLanding, checkMobile } from '@/libs/api'

export default function Podcast({ data }) {

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
            <RootLayout>
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
    return {
        props: { data }, revalidate: 10,
    }
}