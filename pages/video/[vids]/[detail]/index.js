import React, { useEffect, useState } from 'react'
import RootLayout from '@/layouts/RootLayout'
import { checkMobile } from '@/libs/api';
import { video_details } from '@/libs/api';
import { useRouter } from 'next/router';
import { check_Image } from '@/libs/common'
import Image from 'next/image';
import List from '@/components/common/List'
import Title from '@/components/common/Title'
import { WhatsappShareButton, LinkedinShareButton, TwitterShareButton, FacebookShareButton } from 'react-share'
import SEO from '@/components/common/SEO'
import Video from '../../../../components/Video/Video';
import Dropdowns from '../../../../components/common/Dropdowns';

export default function Videos() {

    const router = useRouter();
    let [isMobile, setIsmobile] = useState();
    let [videoDetail, setVideoDetail] = useState();
    const [validator, setValidator] = useState(false)
    const [prev, setPrev] = useState('')
    const icons = [{ icon: "/bookstore/linkedin.svg", name: 'Linkedin' }, { icon: "/bookstore/FB.svg", name: 'Facebook' }, { icon: "/bookstore/twitter.svg", name: 'Twitter' }, { icon: "/bookstore/whatsapp.svg", name: 'Whatsapp' }]

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
            console.log(res)
        }
        // setCartItems(cart_items);
    }

    const [sort, setSort] = useState(false);

    async function share() {
        await setSort(!sort);
        let element = document.getElementById('dropdown');
        sort ? element.classList.add('dropdown-menu-active') : element.classList.remove('dropdown-menu-active');
    }

    return (
        <RootLayout isLanding={true} head={'Detail'}>
            {videoDetail && <SEO title={videoDetail.message.meta_title ? videoDetail.message.meta_title : videoDetail.message.title} ogImage={check_Image(videoDetail.message.video_image)} siteName={'India Reatiling'} ogType={videoDetail.message.meta_keywords ? videoDetail.message.meta_keywords : videoDetail.message.title} description={videoDetail.message.meta_description ? videoDetail.message.meta_description : videoDetail.message.title} />}
            {videoDetail &&
                <div className='flex gap-[30px] container lg:py-[20px] md:flex-col md:p-[10px]'>
                    <div className="lg:flex-[0_0_calc(70%_-_30px)]">
                        {/* <h6 className='text-[20px] line-clamp-2 font-semibold'>{videoDetail.message.title}</h6> */}

                        <div className='flex items-center gap-[10px] mb-[10px]'>
                            <div className='flex items-center gap-[10px]'>
                                <Image className={`h-[15px] w-[15px] object-contain`} src={'/views.svg'} height={10} width={15} alt={'share'} />
                                <span className='text-[12px] gray_color'>{videoDetail.message.noof_views} Views</span>
                            </div>
                            <div className='flex items-center gap-[10px]'>
                                <Image className={`h-[15px] w-[15px] object-contain`} src={'/share.svg'} height={10} width={15} alt={'share'} />
                                <span className='text-[12px] gray_color'>4 Shares</span>
                            </div>
                        </div>

                        <div className={`flex md:p-[10px] lg:gap-5 md:gap-[5px] md:pb-[10px]`}>
                            <h6 className={`md:text-[16px] line-clamp-2 lg:text-[20px] md:w-[calc(90%_-_10px)] md:mr-[10px] font-semibold`}>{videoDetail.message.title}</h6>
                            {icons && <div className={``}><Dropdowns data={icons} share={true} /></div>}
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

                        <div className={`${validator ? 'lg:h-[430px] md:h-[220px]' : ''} my-[10px]`}>
                            {!validator ? <>
                                <Image src={check_Image(videoDetail.message.video_image)} alt='img' height={200} width={200} className='h-full w-full' />
                                <div className='border-0 p-[20px] my-[20px] rounded-md bg-[#e21b22] mt-6'>
                                    <div className='text-center text-[20px] md:text-[16px] font-semibold pb-[15px] text-[white] flex'>
                                        <Image src={'/ir-icon.svg'} height={38} width={38} alt={"image"} className='mr-3 object-contain' />
                                        <div className='text-center   pb-[15px] '>
                                            <h6 className='text-[20px] text-[white] md:text-[16px] font-semibold'>Prime Video</h6>
                                            <p className='text-[14px] text-[white] md:text-[13px]'>This video is for Premium Members you  have to buy Membership to Unlock</p>
                                        </div>

                                    </div>
                                    <div className='flex gap-[20px] justify-center pt-[0px]'>
                                        <button className='primary_btn p-[6px_8px] text-[13px] bg-[#fff] text-[#e21b22] flex' onClick={() => router.push('/membership')}><Image src={'/subscribe.svg'} height={18} width={18} alt={"image"} className='mr-1' />Subscribe</button>
                                    </div>
                                </div>
                            </> : <iframe
                                className={`h-full w-full`}
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

                        <div className='gray_color  mb-[20px]' dangerouslySetInnerHTML={{ __html: videoDetail.message.description }} />


                        {/* {videoDetail.other_category && videoDetail.other_category.data && videoDetail.other_category.data.length != 0 && 
                        <div className=''><Title data={videoDetail.other_category} seeMore={false} /><List fullWidth={true} check={true} isBB={true} isDesc={true} contentWidth={'w-[410px] md:w-[auto]'} imgFlex={'flex-[0_0_calc(20%_-_10px)] md:flex-[0_0_calc(40%_-_10px)]'} imgWidth={'w-full'} imgHeight={'h-[100px] md:h-[85px]'} data={videoDetail.other_category.data.slice(0,3)} borderRadius={'rounded-[5px]'} /></div>
                     } */}

                    </div>

                    <div className="lg:flex-[0_0_calc(30%_-_0px)] lg:pt-[40px]">


                        {videoDetail.related_videos && videoDetail.related_videos.length != 0 &&
                            <>
                                <Title data={{ title: 'Related Videos' }} seeMore={false} />
                                <div className='border p-[10px] rounded-[5px]'>
                                    <List imgFlex={'flex-[0_0_calc(40%_-_10px)]'} isDesc={true} titleClamp={'line-clamp-2'} check={true} imgWidth={'w-full'} imgHeight={'h-[90px] md:h-[85px]'} data={videoDetail.related_videos.slice(0, 3)} borderRadius={'rounded-[5px]'} />
                                </div>
                            </>
                        }

                        <div className='h-[260px] mt-[10px]'>
                            <Image className='h-[250px] w-[300px]' src={'/ads_baner.png'} height={250} width={300} layout="fixed" alt={''} />
                        </div>

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
        </RootLayout>
    )
}