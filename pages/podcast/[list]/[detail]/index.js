import React from 'react'
import RootLayout from '@/layouts/RootLayout'
import AudioPlayer from '@/components/Podcast/AudioPlayer';
import { podcast_details, getAds, podcast_list } from '@/libs/api'
import SEO from '@/components/common/SEO'
import { check_Image } from '@/libs/common';
import Title from '@/components/common/Title'
import Cards from '@/components/common/Cards'
import List from '@/components/common/List'


export default function PodcastDetail({ data, ads_data }) {
    // const {data,ads_data} = data
    // console.log(data);
    return (
        <>
            {data && <RootLayout homeAd={ads_data ? ads_data : null} head={data.message.title}>
                <SEO title={data.message.meta_title ? data.message.meta_title : data.message.title} ogImage={check_Image(data.message.image)} siteName={'India Retailing'} ogType={data.message.meta_keywords ? data.message.meta_keywords : data.message.title} description={data.message.meta_description ? data.message.meta_description : data.message.title} />
                <div className={`flex p-[30px_0px] md:p-[15px] justify-between flex-wrap gap-[25px] container`}>
                    {
                        <div className="w-full">
                            <AudioPlayer data={data.message} />
                        </div>
                    }
                    <>
                        {
                            <div className="flex w-full">
                                <div className="w-[75%] md:w-full lg:pr-[10px]">
                                    <Title data={{ title: 'Related Podcasts' }} seeMore={false} />
                                    <div className={`flex gap-[10px] justify-between no_scroll lg:flex-wrap md:flex-wrap md:gap-[10px]`}>
                                        <Cards data={data.related_podcasts} isHome={'/podcast/'} check={true} border_none={true} height={'h-[220px]'} width={'w-[100%]'} flex={'flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(50%_-_10px)]'} />
                                    </div>
                                </div>
                                <div className="w-[25%] p-[10px] border md:hidden">
                                    <Title data={data.other_category} seeMore={false} />
                                    <List isHome={'/podcast/'} data={data.other_category.data} check={true} />
                                </div>
                            </div>
                        }
                    </>
                </div>
            </RootLayout>}

        </>
    )
}
{/* {list_data && <HomePodcast data={list_data} />} */ }
{/* <Title data={data} seeMore={true} />
                            <div className={`flex gap-[10px] justify-between no_scroll lg:flex-wrap`}>
                                <Cards data={data.data} check={true} border_none={true} height={'h-[190px]'} flex={'flex-[0_0_calc(20%_-_10px)] md:flex-[0_0_calc(50%_-_10px)]'} />
                            </div> */}

export async function getServerSideProps({ params }) {
    let Id = await params ?.detail;
    let list_Id = await params ?.list;
    let param = {
        route: list_Id + '/' + Id,
        fields: ['name', 'title', 'sound', 'image', 'category', 'description', 'route'],
    }
    let value = await podcast_details(param);
    let data = value;

    let ads_params = { doctype: 'Podcast', page_type: 'Detail' }
    const res_ads = await getAds(ads_params);
    const ads_data = res_ads.message;
    return {
        props: { data, ads_data }
    }
}