import React from 'react'
import RootLayout from '@/layouts/RootLayout'
import AudioPlayer from '@/components/Podcast/AudioPlayer';
import { podcast_details } from '@/libs/api'

export default function PodcastDetail(data) {

    // console.log(data);
    return (
        <>
            <RootLayout>
                <div className={`flex p-[20px_30px] md:p-[10px] justify-between flex-wrap gap-[25px] container`}>
                    {
                        <div className="w-full">
                            <AudioPlayer data={data.data}/>
                            {/* <Title data={data} seeMore={true} />
                            <div className={`flex gap-[10px] justify-between no_scroll lg:flex-wrap`}>
                                <Cards data={data.data} check={true} border_none={true} height={'h-[190px]'} flex={'flex-[0_0_calc(20%_-_10px)] md:flex-[0_0_calc(50%_-_10px)]'} />
                            </div> */}
                        </div>
                    }
                </div>
            </RootLayout>

        </>
    )
}


export async function getServerSideProps({ params }) {
    let Id = await params?.detail;
    let list_Id = await params?.list;
    let param = {
        route: list_Id+'/'+Id    
    }
    let value = await podcast_details(param);
    let data = value.message;
    return {
        props: { data }
    }
}