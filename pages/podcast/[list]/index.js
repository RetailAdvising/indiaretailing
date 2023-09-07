import React from 'react';
import RootLayout from '@/layouts/RootLayout'
import { getList } from '@/libs/api'
import HomePodcast from '@/components/Podcast/HomePodcast';

export default function PodcastList(data) {
    console.log(data)
    return (
        <>
            <RootLayout>
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
    return {
        props: { data }
    }
}