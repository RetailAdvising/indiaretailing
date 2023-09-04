import React, { useState, useEffect } from 'react'
import RootLayout from '@/layouts/RootLayout'
import PageData from '@/libs/Podcast'
import HomePodcast from '@/components/Podcast/HomePodcast'
import { podcastLanding } from '@/libs/api'

export default function Podcast({ data }) {
    console.log(data)
    return (
        <>
            <RootLayout>
                {(PageData && PageData.page_sections) && PageData.page_sections.map((res, index) => {
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