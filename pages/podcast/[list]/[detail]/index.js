import React from 'react'
import RootLayout from '@/layouts/RootLayout'
import AudioPlayer from '@/components/Podcast/AudioPlayer';
import { podcast_details, getAds, podcast_list } from '@/libs/api'
import SEO from '@/components/common/SEO'
import { check_Image } from '@/libs/common';
import Title from '@/components/common/Title'
import Cards from '@/components/common/Cards'
import List from '@/components/common/List'
import Placeholders from '@/components/common/Placeholders'

export default function PodcastDetail({ data, ads_data }) {
    // const {data,ads_data} = data
    // console.log(data);
    return (
        <>
            {data && <RootLayout homeAd={ads_data ? ads_data : null} head={data.message.title}>
                <SEO title={data.message.meta_title ? data.message.meta_title : data.message.title} ogImage={check_Image(data.message.image)} siteName={'India Retailing'} ogType={data.message.meta_keywords ? data.message.meta_keywords : data.message.title} description={data.message.meta_description ? data.message.meta_description : data.message.title} />
                <div className={`flex p-[30px_0px] md:p-[15px] justify-between flex-wrap gap-[25px] container`}>
                    {/* {
                        <div className="w-full">
                            <AudioPlayer data={data.message} />
                        </div>
                    } */}
                    <>
                        {/* <Placeholders placeholder={videoDetail.place_holders_ads}  /> */}
                        {
                            <div className="flex w-full justify-between gap-[15px]">
                                <div className="flex-[0_0_calc(70%_-_15px)] md:flex-[0_0_100%] md:w-full lg:pr-[10px] my-[10px]">
                                    <div className="w-full mb-5">
                                        <AudioPlayer data={data.message} />
                                    </div>

                                    <Title data={{ title: 'Related Podcasts' }} seeMore={false} />
                                    <div className={`flex gap-[10px] justify-between no_scroll lg:flex-wrap md:flex-wrap md:gap-[10px]`}>
                                        <Cards data={data.related_podcasts} isHome={'/podcast/'} check={true} border_none={true} height={'h-[220px]'} width={'w-[100%]'} flex={'flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(50%_-_10px)]'} />
                                    </div>
                                </div>
                                <div className="flex-[0_0_calc(30%_-_15px)] md:hidden">
                                    {
                                        data.place_holders_ads && data.place_holders_ads.length != 0 ?
                                            <Placeholders placeholder={data.place_holders_ads} />
                                            :
                                            <>
                                                <Title data={data.other_category} seeMore={false} />
                                                <List isHome={'/podcast/'} data={data.other_category.data} check={true} />
                                            </>
                                    }
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
    let Id = await params?.detail;
    let list_Id = await params?.list;
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