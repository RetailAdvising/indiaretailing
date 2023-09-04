import React from 'react';
import RootLayout from '@/layouts/RootLayout'
import { getList } from '@/libs/api'
// import PageListData from '@/libs/PodcastList'
import HomePodcast from '@/components/Podcast/HomePodcast';

export default function PodcastList(data) {
    console.log(data)
    return (
        <>
            <RootLayout>
                {/* {(PageListData && PageListData.page_sections) && PageListData.page_sections.map((res, index) => {
                    return (
                        <HomePodcast key={index} data={res} />
                    )
                })} */}
            </RootLayout>

        </>
    )
}

export async function getServerSideProps({ params }) {
    console.log(params);
    // let Id = await params?.detail;
    // let param = {
    //     doctype: "Podcast",
    //     fields: Id    
    // }
    // let value = await getList(param);
    // let data = value.message;
    return {
        props: { params }
    }
}