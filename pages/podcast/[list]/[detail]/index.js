import React from 'react'
import RootLayout from '@/layouts/RootLayout'
import AudioPlayer from '@/components/Podcast/AudioPlayer';
import { podcast_details, getAdvertisements, podcast_list } from '@/libs/api'
import SEO from '@/components/common/SEO'
import { check_Image } from '@/libs/common';
import Title from '@/components/common/Title'
import Cards from '@/components/common/Cards'
import List from '@/components/common/List'
import Advertisement from '@/components/Baners/Advertisement'
import Placeholders from '@/components/common/Placeholders'

export default function PodcastDetail({ data, ads_data }) {
    // const {data,ads_data} = data
    console.log(data);
    return (
        <>
            {data && <RootLayout homeAd={ads_data ? ads_data : null} head={data.message.title}>
                <SEO title={data.message.meta_title ? data.message.meta_title : data.message.title} ogImage={check_Image(data.message.image)} siteName={'India Retailing'} ogType={data.message.meta_keywords ? data.message.meta_keywords : data.message.title} description={data.message.meta_description ? data.message.meta_description : data.message.title} />
                <div className={`flex md:p-[15px] justify-between flex-wrap gap-[25px] container`}>
                    {/* {
                        <div className="w-full">
                            <AudioPlayer data={data.message} />
                        </div>
                    } */}
                    <>
                        {/* <Placeholders placeholder={videoDetail.place_holders_ads}  /> */}
                        {
                            <div className="flex w-full justify-between gap-[15px]">
                                <div className="flex-[0_0_calc(70%_-_15px)] md:flex-[0_0_100%] md:w-full lg:pr-[10px] md:my-[10px]">
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
                                            <div className={`border p-[15px] rounded-[5px]`}>
                                                <Title data={data.other_category} seeMore={false} />
                                                
                                                <List isHome={'/podcast/'} isDesc={true}  imgFlex={`flex-[0_0_calc(40%_-_10px)]`} imgHeight={`h-[90px]`} borderRadius={'rounded-[5px]'} titleClamp={'line-clamp-2'} imgWidth={`w-full`} data={data.other_category.data} check={true} />
                                            </div>
                                    }
                                </div>
                            </div>
                        }
                    </>
                </div>
                {ads_data && ads_data.right_first && <Advertisement data={ads_data.right_first} divClass={`h-[250px] w-[300px]`} />}
                {ads_data && ads_data.right_second && <Advertisement data={ads_data.right_second} divClass={`h-[250px] w-[300px]`} />}
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

    let ads_params = { page: 'Podcasts', page_type: 'Detail' }
    const res_ads = await getAdvertisements(ads_params);
    const ads_data = res_ads.message;
    return {
        props: { data, ads_data }
    }
}