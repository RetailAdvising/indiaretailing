import { useRouter } from 'next/router'
import React from 'react'
import Detail from '@/libs/eventDetail';
import RootLayout from '@/layouts/RootLayout';
import EventDetail from '@/components/Events/EventDetail';
import { postMethod } from '@/libs/api';
export default function EventDetails({data}) {
    const router = useRouter();

    return (
        <>
            <RootLayout>
                {data && <EventDetail data={data} />}
            </RootLayout>
        </>
    )
}

export async function getServerSideProps({ params }) {
    const Id = await params?.detail;
    const datas = { event: Id }
    const response = await postMethod("india_retailing.india_retailing.api.event_detail", datas)
    const data = await response;
    return {
        props: { data }
    }
}

