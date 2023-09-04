import React from 'react'
import RootLayout from '@/layouts/RootLayout'
import AudioPlayer from '@/components/Podcast/AudioPlayer';
import { getDetails } from '@/libs/api'

export default function PodcastDetail(data) {

    console.log(data);
    return (
        <>
            <RootLayout>
                <div className={`flex p-[20px_30px] md:p-[10px] justify-between flex-wrap gap-[25px] container`}>
                    {
                        <div className="w-full">
                            <AudioPlayer />
                        </div>
                    }
                </div>
            </RootLayout>

        </>
    )
}


export async function getServerSideProps({ params }) {
    // console.log(params);
    let Id = await params?.detail;
    let param = {
        doctype: "Podcast",
        name: Id    
    }
    let value = await getDetails(param);
    let data = value.message;
    return {
        props: { params }
    }
}