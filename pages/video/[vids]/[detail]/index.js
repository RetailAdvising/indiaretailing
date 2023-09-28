import React, { useEffect, useState } from 'react'
import RootLayout from '@/layouts/RootLayout'
import { checkMobile } from '@/libs/api';
import { video_details,getAds } from '@/libs/api';
import { useRouter } from 'next/router';
import { check_Image } from '@/libs/common'
import Image from 'next/image';
import List from '@/components/common/List'
import Title from '@/components/common/Title'
import SEO from '@/components/common/SEO'
import Video from '../../../../components/Video/Video';
import Dropdowns from '../../../../components/common/Dropdowns';
import { useSelector,useDispatch } from 'react-redux';
import AdsBaner from '@/components/Baners/AdsBaner'

export default function Videos(meta_info, ads_data) {
    // console.log(meta_info)
    const router = useRouter();
    let [isMobile, setIsmobile] = useState();
    let [videoDetail, setVideoDetail] = useState();
    const [validator, setValidator] = useState(false)
    const [prev, setPrev] = useState('')
    const icons = [{ icon: "/bookstore/linkedin.svg", name: 'Linkedin' }, { icon: "/bookstore/FB.svg", name: 'Facebook' }, { icon: "/bookstore/twitter.svg", name: 'Twitter' }, { icon: "/bookstore/whatsapp.svg", name: 'Whatsapp' }]
    const user = useSelector(s => s.user);
    let bannerImg = {ad_image:'/ads_baner.png'};

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage['roles'] && localStorage['roles'] != 'undefined') {
            const data = JSON.parse(localStorage['roles']);
            if (data && data.length != 0) {
                data.map(res => {
                    if (res.role == 'Member') {
                        setValidator(true);
                    }
                })
            }
        }
        if (router.query) {
            get_video_details()
            checkIsMobile();
            window.addEventListener('resize', checkIsMobile)
            return () => {
                window.removeEventListener('resize', checkIsMobile);
            };
        }
    }, [router.query])

    const checkIsMobile = async () => {
        isMobile = await checkMobile();
        setIsmobile(isMobile);
    }

    const get_video_details = async () => {
        let id = await router.query.vids + '/' + router.query.detail;
        // "primary_text","secondary_text",
        let data = {
            "route": id, fields: ["name", "route", "title", "video_image", 'description']
        }
        let res = await video_details(data);
        if (res && res.status == "Success") {
            setVideoDetail(res)
        }
    }

    const [sort, setSort] = useState(false);

    async function share() {
        await setSort(!sort);
        let element = document.getElementById('dropdown');
        sort ? element.classList.add('dropdown-menu-active') : element.classList.remove('dropdown-menu-active');
    }

    return (
        <RootLayout homeAd={ads_data ? ads_data : null} isLanding={true} head={'Detail'}>
            {meta_info && <SEO title={meta_info.meta_info.meta_title ? meta_info.meta_info.meta_title : meta_info.meta_info.title} ogImage={check_Image(meta_info.meta_info.video_image)} siteName={'India Reatiling'} ogType={meta_info.meta_info.meta_keywords ? meta_info.meta_info.meta_keywords : meta_info.meta_info.title} description={meta_info.meta_info.meta_description ? meta_info.meta_info.meta_description : meta_info.meta_info.title} />}
            {videoDetail ? <>
                {videoDetail &&
                    <div className='flex gap-[30px] container lg:py-[20px] md:flex-col md:p-[10px]'>
                        <div className="lg:flex-[0_0_calc(70%_-_30px)]">
                            {/* <h6 className='text-[20px] line-clamp-2 font-semibold'>{videoDetail.message.title}</h6> */}

                            {/* <div className='flex items-center gap-[10px] mb-[10px]'> */}
                                <div className='flex items-center gap-[10px] mb-[10px]'>
                                    <Image className={`h-[15px] w-[15px] object-contain`} src={'/views.svg'} height={10} width={15} alt={'share'} />
                                    <span className='text-[12px] gray_color'>{videoDetail.message.noof_views} Views</span>
                                </div>
                                {/* <div className='flex items-center gap-[10px]'>
                                    <Image className={`h-[15px] w-[15px] object-contain`} src={'/share.svg'} height={10} width={15} alt={'share'} />
                                    <span className='text-[12px] gray_color'>4 Shares</span>
                                </div> */}
                            {/* </div> */}

                            <div className={`flex md:p-[10px] lg:gap-5 md:gap-[5px] pb-[10px] md:pl-0`}>
                                <h6 className={`md:text-[16px] line-clamp-2 lg:text-[20px] md:w-[calc(90%_-_10px)] md:mr-[10px] font-semibold`}>{videoDetail.message.title}</h6>
                                {icons && <div className={``}><Dropdowns link={videoDetail.message} data={icons} share={true} /></div>}
                                {/* <div className='dropdowns md:w-[calc(10%_-_0px)] lg:w-[130px] md:h-[15px] md:relative cursor-pointer lg:pr-[40px] md:justify-end md:flex'> */}
                                {/* <Image onClick={share} className={`dropdowns transition-all delay-500`} src={'/share.svg'} height={10} width={15} alt={'share'} /> */}
                                {/* {sort && */}
                                {/* <div className={`md:absolute md:right-0 dropdown-menu p-[10px] grid justify-center`} style={{ borderRadius: '10px', width: '150px' }} id='dropdown'>
                                    {icons && icons.map((res, index) => {
                                        return (
                                            <div key={index}>
                                                {res.name == 'Linkedin' && <LinkedinShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                                                    <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                                                    <p>{res.name}</p>
                                                </LinkedinShareButton>}
                                                {res.name == 'Facebook' && <FacebookShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                                                    <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                                                    <p>{res.name}</p>
                                                </FacebookShareButton>}
                                                {res.name == 'Twitter' && <TwitterShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                                                    <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                                                    <p>{res.name}</p>
                                                </TwitterShareButton>}
                                                {res.name == 'Whatsapp' && <WhatsappShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                                                    <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                                                    <p>{res.name}</p>
                                                </WhatsappShareButton>}
                                            </div>
                                        )
                                    })}
                                </div> */}
                                {/* } */}
                                {/* </div> */}
                            </div>

                            <Image src={check_Image(videoDetail.message.video_image)} alt='img' height={200} width={200} className='lg:h-[500px] md:h-full w-full' />
         

                            <div className='gray_color  my-[20px]' dangerouslySetInnerHTML={{ __html: videoDetail.message.description }} />


                            <div className={`${validator ? 'lg:h-[80vh] md:h-[220px]' : ''} my-[10px]`}>
                                {(!validator && videoDetail.message.ir_prime == 1) ?
                                 <>

                                    
                                    <div className='grid place-content-center max-w-[400px] p-[30px_20px_20px_20px] md:p-[20px] m-[0_auto]'>
                                        <div className={`flex items-center gap-[10px] `}>
                                        <Image src={'/irprime/premium.svg'} height={20} width={20} alt='premium' />
                                        <p className='text-red font-semibold'>Prime Video</p>
                                        </div>
                                        <h6 className='text-[32px] font-[600] leading-[40px] md:text-[17px] md:leading-[22px] pt-[10px]'>Its a Premium Content,Simply buy Membership to Unlock</h6>
                                        <p className='text-[14px] font-[400] text-gray pt-[10px] leading-[20px] md:leading-[16px] md:pt-[15px]'>50,000+ articles Prime Video is the only subscription you need</p>

                                        <div className='w-full mt-[25px] md:mt-[15px] md:text-center'>
                                        <button className='primary_button w-full text-[16px] h-[50px] p-[5px_10px] md:text-[14px] md:h-[35px] md:w-max' onClick={() => router.push('/membership')} style={{ borderRadius: '9999px', textTransform: 'unset' }}>Subscribe to Prime Video</button>
                                        </div>

                                    </div>
                                    {/* <Image src={check_Image(videoDetail.message.video_image)} alt='img' height={200} width={200} className='h-full w-full' />
                                    <div className='border-0 p-[20px] my-[20px] rounded-md bg-[#e21b22] mt-6 flex justify-between md:block'>
                                        <div className='text-center text-[20px] md:text-[16px] font-semibold text-[white] flex md:pb-2'>
                                            <Image src={'/ir-icon.svg'} height={38} width={38} alt={"image"} className='mr-3 object-contain' />
                                            <div className='text-center'>
                                                <h6 className='text-[20px] text-[white] md:text-[16px] font-semibold text-left'>Prime Video</h6>
                                                <p className='text-[14px] text-[white] md:text-[13px] md:text-left font-normal'>This video is for Premium Members you  have to buy Membership to Unlock</p>
                                            </div>

                                        </div>
                                        <div className='flex gap-[20px] justify-center pt-[0px]'>
                                            <button className='m-auto primary_btn p-[6px_8px] text-[13px] bg-[#fff] text-[#e21b22] flex' onClick={() => router.push('/membership')}><Image src={'/subscribe.svg'} height={18} width={18} alt={"image"} className='mr-1' />Subscribe</button>
                                        </div>
                                    </div> */}
                                  </> 
                                : <iframe
                                    className={`lg:h-[80vh] md:h-[30vh] w-full`}
                                    title={videoDetail.message.title ? videoDetail.message.title : ''}
                                    src={`https://www.youtube.com/embed/${videoDetail.message.video_id ? videoDetail.message.video_id : videoDetail.message.video_id}`}
                                    // width={res.width}
                                    // height={res.height}
                                    frameBorder="2"
                                    loading="lazy"
                                // allowfullscreen="allowfullscreen"
                                ></iframe>}

                                {/* <Image className='h-[400px] ' src={check_Image(videoDetail.message.video_image)} height={430} width={430} layout="fixed" alt={''} /> */}
                            </div>


                            {/* {videoDetail.other_category && videoDetail.other_category.data && videoDetail.other_category.data.length != 0 && 
                        <div className=''><Title data={videoDetail.other_category} seeMore={false} /><List fullWidth={true} check={true} isBB={true} isDesc={true} contentWidth={'w-[410px] md:w-[auto]'} imgFlex={'flex-[0_0_calc(20%_-_10px)] md:flex-[0_0_calc(40%_-_10px)]'} imgWidth={'w-full'} imgHeight={'h-[100px] md:h-[85px]'} data={videoDetail.other_category.data.slice(0,3)} borderRadius={'rounded-[5px]'} /></div>
                     } */}

                        </div>

                        <div className="lg:flex-[0_0_calc(30%_-_0px)] lg:pt-[40px]">


                            {videoDetail.related_videos && videoDetail.related_videos.length != 0 &&
                                <>
                                    <Title data={{ title: 'Related Videos' }} seeMore={false} />
                                    <div className='border p-[10px] rounded-[5px] mb-[10px]'>
                                        <List imgFlex={'flex-[0_0_calc(40%_-_10px)]'} isDesc={true} titleClamp={'line-clamp-2'} check={true} imgWidth={'w-full'} imgHeight={'h-[90px] md:h-[85px]'} data={videoDetail.related_videos.slice(0, 3)} borderRadius={'rounded-[5px]'} />
                                    </div>
                                </>
                            }

                          <AdsBaner data={bannerImg} height={'h-[250px]'} />

                            {/* <div className='h-[260px] mt-[10px]'>
                                <Image className='h-[250px] w-[300px]' src={'/ads_baner.png'} height={250} width={300} layout="fixed" alt={''} />
                            </div> */}

                            {/* <div className='h-[600px] mt-[30px] mb-[10px]'>
                        <Image className='h-[600px] w-[300px]' src={'/ads_music.png'} height={600} width={300} layout="fixed" alt={''} />
                      </div> */}
                        </div>
                    </div>


                }
                {(videoDetail && videoDetail.other_category && videoDetail.other_category.data && videoDetail.other_category.data.length != 0) && <div className='container py-[20px] md:p-[15px]'>
                    <div>
                        <Title data={videoDetail.other_category} />
                    </div>
                    <div className='lg:grid grid-cols-4 lg:gap-5 no_scroll'>
                        <Video data={videoDetail.other_category.data} flex={'md:flex-[0_0_calc(70%_-_10px)] md:h-[235px]'} imgClass={'h-[180px] w-full'} />

                    </div>
                </div>}
            </> : <Skeleton />}
        </RootLayout>
    )
}

const Skeleton = () => {
    return (
        <>
            <div className='lg:flex md:flex-wrap container justify-between p-[30px_0px] md:p-[20px_15px]'>
                <div className='flex-[0_0_calc(70%_-_10px)] md:overflow-hidden md:flex-[0_0_calc(100%_-_10px)]'>
                    <div className='flex gap-[5px]'>
                        {[0, 1, 2, 3].map((res, index) => {
                            return (
                                <p key={index} className='h-[15px] w-[100px] bg-[#E5E4E2]'></p>
                            )
                        })}
                    </div>
                    <p className='h-[20px] my-[20px] w-full bg-[#E5E4E2]'></p>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-[10px]'>
                            <p className='h-[40px]  w-[40px] rounded-full bg-[#E5E4E2]'></p>
                            <p className='flex flex-col gap-[5px]'><span className='h-[15px] w-[80px] bg-[#E5E4E2]'></span><span className='h-[15px] w-[80px] bg-[#E5E4E2]'></span></p>
                        </div>
                        <p className='flex gap-[5px]'><span className='h-[20px] w-[20px] bg-[#E5E4E2]'></span><span className='h-[20px] w-[20px] bg-[#E5E4E2]'></span></p>
                    </div>
                    <p className='h-[20px] my-[20px] w-full bg-[#E5E4E2]'></p>
                    <p className='h-[400px]  w-full bg-[#E5E4E2]'></p>
                    <p className='h-[20px] mt-[20px] w-full bg-[#E5E4E2]'></p>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((res, index) => {
                        return (
                            <p key={index} className='h-[20px] mt-[5px] w-full bg-[#E5E4E2]'></p>
                        )
                    })}
                    <p className='flex justify-between'>
                        <span className='h-[20px] mt-[10px] w-[130px] bg-[#E5E4E2]'></span>
                        <span className='h-[20px] mt-[10px] w-[140px] bg-[#E5E4E2]'></span>
                        <span className='h-[20px] mt-[10px] w-[120px] bg-[#E5E4E2]'></span>
                    </p>
                    <div className='flex justify-center my-5'>
                        <p className='flex justify-center items-center gap-[10px]'>
                            {[0, 1, 2, 3].map((res, index) => {
                                return (
                                    <span key={index} className='h-[40px] rounded-full mt-[10px] w-[40px] bg-[#E5E4E2]'></span>
                                )
                            })}
                        </p>
                    </div>
                    <p className='h-[20px] mt-[10px] w-[100px] bg-[#E5E4E2]'></p>
                    <div className='flex flex-col'>

                        {[0, 1, 2].map((res, index) => {
                            return (
                                <div className='flex gap-[10px] mt-[10px]' key={index}>
                                    <p className='h-[50px] rounded-full  w-[50px] bg-[#E5E4E2]'></p>
                                    <div className='w-[80%]'>
                                        <p className='h-[20px]  w-[120px] bg-[#E5E4E2]'></p>
                                        <p className='h-[20px] mt-[5px] w-ful bg-[#E5E4E2]'></p>
                                        <p className='flex gap-[10px] mt-[10px]'><span className='h-[20px]  w-[80px] bg-[#E5E4E2]'></span><span className='h-[20px]  w-[100px] bg-[#E5E4E2]'></span><span className='h-[20px]  w-[100px] bg-[#E5E4E2]'></span></p>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
                <div className='flex-[0_0_calc(30%_-_10px)] md:overflow-hidden md:mt-[20px] md:flex-[0_0_calc(100%_-_10px)]'>
                    <p className='h-[15px] w-[100px] bg-[#E5E4E2]'></p>
                    {[0, 1, 2].map((res, index) => {
                        return (
                            <div key={index} className='flex gap-[10px] mt-5'>
                                <p className='h-[90px] w-[100px] rounded-[5px] bg-[#E5E4E2]'></p>
                                <p className='flex flex-col w-[65%] gap-[10px]'>
                                    <span className='h-[15px] w-[100px] bg-[#E5E4E2]'></span>
                                    <span className='h-[15px] w-full bg-[#E5E4E2]'></span>
                                    <span className='h-[15px] w-full bg-[#E5E4E2]'></span>
                                    <span className='h-[15px] w-[100px] bg-[#E5E4E2]'></span>
                                </p>
                            </div>
                        )
                    })}
                    <p className='h-[250px] my-[20px] w-full bg-[#E5E4E2]'></p>
                    <p className='h-[15px] w-[100px] bg-[#E5E4E2]'></p>
                    {[0, 1, 2].map((res, index) => {
                        return (
                            <div key={index} className='flex gap-[10px] mt-5'>
                                <p className='h-[90px] w-[100px] rounded-[5px] bg-[#E5E4E2]'></p>
                                <p className='flex flex-col w-[65%] gap-[10px]'>
                                    <span className='h-[15px] w-[100px] bg-[#E5E4E2]'></span>
                                    <span className='h-[15px] w-full bg-[#E5E4E2]'></span>
                                    <span className='h-[15px] w-full bg-[#E5E4E2]'></span>
                                    <span className='h-[15px] w-[100px] bg-[#E5E4E2]'></span>
                                </p>
                            </div>
                        )
                    })}
                    <p className='h-[600px] my-[20px] w-full bg-[#E5E4E2]'></p>
                    <p className='h-[15px] mb-[20px] w-[100px] bg-[#E5E4E2]'></p>
                    {[0, 1, 2, 3, 4].map((res, index) => {
                        return (
                            <div className='mb-[10px]' key={index}>
                                <p className='flex gap-[10px]'><span className='h-[15px] w-[45px] bg-[#E5E4E2]'></span> <span className='h-[15px] w-[45px] bg-[#E5E4E2]'></span></p>
                                <div className='flex items-center gap-[10px] mt-[10px]'>
                                    <p className='h-[70px] w-[100px] rounded-[5px] bg-[#E5E4E2]'></p>
                                    <p className='flex gap-[10px] flex-col w-[65%]'><span className='h-[15px] w-full bg-[#E5E4E2]'></span><span className='h-[15px] w-full bg-[#E5E4E2]'></span></p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Cards */}
            <div className='container lg:px-[30px] md:px-[15px] md:mb-[20px] md:overflow-hidden flex justify-between gap-[15px]'>
                {[0, 1, 2, 3, 4].map((res, index) => {
                    return (
                        <div key={index} className='flex-[0_0_calc(20%_-_10px)]'>
                            <p className='h-[140px] w-full bg-[#E5E4E2] rounded-[5px]'></p>
                            <p className='flex my-[10px] flex-col gap-[5px]'><span className='h-[15px] w-full bg-[#E5E4E2] rounded-[5px]'></span><span className='h-[15px] w-full bg-[#E5E4E2] rounded-[5px]'></span></p>
                            <p className='flex my-[10px] flex-col gap-[5px]'><span className='h-[15px] w-full bg-[#E5E4E2] rounded-[5px]'></span><span className='h-[15px] w-full bg-[#E5E4E2] rounded-[5px]'></span></p>
                            <p className='h-[15px] w-[100px] bg-[#E5E4E2] rounded-[5px]'></p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}


export async function getServerSideProps({ params }) {
    let id = await params ?.vids + '/' + await params ?.detail;
    let data = {
        "route": id, fields: ["name", "route", "title", "video_image", 'description']
    }
    let res = await video_details(data);
    let meta_info = res.message;

    let ads_params = { doctype: 'Video', page_type: 'Detail' }
    const res_ads = await getAds(ads_params);
    const ads_data = res_ads.message;
    return {
        props: { meta_info, ads_data }
    }
}