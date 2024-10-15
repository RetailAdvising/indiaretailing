import SEO from '@/components/common/SEO';
import Title from '@/components/common/Title';
import ImageLoader from '@/components/ImageLoader';
import RootLayout from '@/layouts/RootLayout';
import { check_Image, HomePage } from '@/libs/api';
import { Nunito } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react'


const nunito = Nunito({
    weight: ["300", "400", "500", "600", "700"],
    display: "block",
    preload: true,
    style: 'normal',
    subsets: ["latin"],
    variable: '--font-inter',
})
const index = ({ data, page_route, ads }) => {
    console.log(data, "data")

    const [noProduct, setNoProduct] = useState(false)
    const [value, setValue] = useState([])
    const router = useRouter()
    useEffect(() => {
        if (data && data.page_content && data.page_content.length != 0) {
            setTimeout(() => {
                setValue(data.page_content)
            }, 100)

        }

    }, [])

    // Pagination
    const observer = useRef();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const lastPostElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1); // trigger loading of new posts by chaging page no
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading]
    );

    useEffect(() => {
        if (page > 1 && !noProduct) {
            // console.log(page,"page")
            setLoading(true);
            const data = {
                page_no: page,
                page_length: 10,
                route: page_route
            }
            loadMore(data)
            setLoading(false);
        }
    }, [page]);


    const loadMore = async (data) => {
        const resp = await HomePage(data);
        if (resp.message && resp.message.page_content && resp.message.page_content.length > 0) {
            setValue([...value, ...resp.message.page_content])
            setNoProduct(false)
        } else {
            setNoProduct(true)
        }
    }

    return (
        <>
            <RootLayout data={data} isLanding={true} head={''} adIdH={page_route + 'head'} adIdF={page_route + 'foot'} homeAd={ads && ads.header ? ads : null}>
                <SEO title={'India Retailing'} siteName={'India Retailing'} description={'This is IndiaRetailing and its about news and articles based on the popular site.'} />
                {(value && value.length != 0) ? value.map((data, i) => {
                    return (
                        <div key={i} ref={value.length === i + 1 ? lastPostElementRef : null} className={`py-[20px] container  md:p-[15px]  md:py-[10px] lg:flex gap-5`}>
                            {(data.layout_json && JSON.parse(data.layout_json).length != 0) && JSON.parse(data.layout_json).map((res, index) => {
                                return (
                                    <div key={index} className={`${res.class == 'flex-[0_0_calc(100%_-_0px)]' ? 'w-full' : res.class == "flex-[0_0_calc(80%_-_15px)]" ? 'flex-80' : res.class == "flex-[0_0_calc(20%_-_15px)]" ? 'flex-custom-20' : res.class}  `}>
                                        {(res.components && res.components.length != 0) && res.components.map((c, c_index) => {
                                            return (
                                                <div key={c.component_title} className={``}>
                                                    {(c.cid && data.data[c.cid] && (data.data[c.cid]['card-list'] && data.data[c.cid]['card-list'].length > 0) && c.component_title == "Featured Content") && <>
                                                        <Title data={{ title: data.data[c.cid].title }} />
                                                        <div className={`flex items-center gap-[20px] md:overflow-auto lg:flex-wrap scrollbar-hide md:gap-[15px]`}>
                                                            {data.data[c.cid]['card-list'].map((resp, index) => {
                                                                return (
                                                                    <div className={`flex-[0_0_calc(50%_-_15px)] md:flex-[0_0_calc(100%_-_10px)] gap-[15px] cursor-pointer flex items-center bg-white rounded-[10px] p-[10px] relative cursor-pointer`} onClick={() => router.push(resp.url)} key={resp.url}>
                                                                        <div className='lg:flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(40%_-_10px)]'>
                                                                            {/* <Image src={check_Image(resp['image'])} className='h-[250px] md:h-[150px] w-full rounded-[10px]' height={100} width={100} alt={resp.url}></Image> */}
                                                                            <ImageLoader style={`rounded-[5px] h-[106px] md:h-[80px] w-full`} src={resp.image} title={resp.heading} />
                                                                        </div>

                                                                        <div className='absolute top-0 right-0 bg-[#E21B22] rounded-[0_10px_0_10px] min-w-[70px] text-center p-[3px_10px]'>
                                                                            <p className={`text-white text-[11px] `}>{resp.tag}</p>
                                                                        </div>

                                                                        <div className='lg:flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(60%_-_10px)]'>
                                                                            <h6 className={`line-clamp-2 title ${nunito.className}`}>{resp.heading}</h6>
                                                                            <p className={`line-clamp-2 sub_title lg:py-[5px] `}>{resp.description}</p>
                                                                            <div className='flex items-center gap-[5px] py-[5px]'>
                                                                                <span className='text-[#999999] text-[12px] md:flex-[0_0_auto]'>Published On : </span>
                                                                                <p className={`text-[13px] md:text-[12px] font-[500] ${nunito.className}`}>{resp['published-on']}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>

                                                    </>}

                                                    {/* Title and Description */}
                                                    {(c.cid && data.data[c.cid] && c.component_title == "Title and Description") && <>
                                                        <div className={`flex items-center gap-[10px]`}>
                                                            <div className={`flex-[0_0_auto]`}>
                                                                <Image className='h-[23px] w-[23px] object-contain' height={100} width={100} alt={data.data[c.cid].description} src={check_Image(data.data[c.cid].logo)}></Image>
                                                            </div>

                                                            <h6 className={`flex items-center gap-[5px]  ${nunito.className}`}>
                                                                <span className='text-[18px] font-[800] uppercase'>India</span>
                                                                <span className='text-[18px] font-[800] text-[#E21B22] uppercase'>Retail</span>
                                                                <span className='text-[18px] font-[800] uppercase'>India</span>
                                                            </h6>

                                                        </div>

                                                        <p className={`p-[15px] sub_title lg:w-[50%]`}>{data.data[c.cid].description}</p>

                                                    </>}

                                                    {
                                                        (c.cid && data.data[c.cid] && (data.data[c.cid]['side_menu'] && data.data[c.cid]['side_menu'].length > 0) && c.component_title == "Side Menu") && <>
                                                            <div>
                                                                <div className='w-fit bg-[#ddd] p-[3px_5px] rounded-[5px_5px_0_0]'>
                                                                    <h6 className='text-[12px] font-semibold uppercase'>{data.data[c.cid]['heading']}</h6>
                                                                </div>

                                                                <div className='border border-[#D9D9D9] rounded-[0_10px_10px_10px]'>
                                                                    {data.data[c.cid]['side_menu'].map((resp, index) => {
                                                                        return (
                                                                            <div key={resp.title} className={`${index == data.data[c.cid]['side_menu'].length - 1 ? '' : 'border-b border-b-[#D9D9D9]'} p-[10px]`}>
                                                                                {/* ${resp.url == } */}
                                                                                <h6 className={`text-[14px]  text-[#737373]`}>{resp.title}</h6>

                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>

                                                        </>
                                                    }

                                                    {/* { (c.cid && data.data[c.cid] && (data.data[c.cid]['side_menu'] && data.data[c.cid]['side_menu'].length > 0) && c.component_title == "Side Menu") && <> */}
                                                    {(c.cid && data.data[c.cid] && (data.data[c.cid] && data.data[c.cid]) && c.component_title == "Webinars") && <>

                                                        <div>
                                                            <Title data={{ title: c.component_title }} isIcon={true} see={`uppercase !font-semibold !text-[#e21b22]`} seeMore={true} />

                                                            <p className={`text-[#999999] uppercase text-[12px] py-[15px] ${nunito.className}`}>{data.data[c.cid].heading}</p>
                                                            <div className='flex gap-5 justify-between'>
                                                                <div>
                                                                    <p className='text-[18px] md:text-[16px] font-semibold pb-[10px]'>{data.data[c.cid].p_title}</p>
                                                                    <div>
                                                                        <span className={`text-[14px] text-[#202121B2] pr-[10px] ${nunito.className}`}>{data.data[c.cid].s_title}</span>
                                                                        <span className={`border-l border-l-[#000] pl-[10px] text-[14px] font-[700]  ${nunito.className}`}>{data.data[c.cid].date}</span>
                                                                    </div>
                                                                </div>

                                                                <div className='flex-[0_0_auto] flex items-center gap-[15px]'>
                                                                    <Image className='' src={'/share.svg'} height={20} width={20} alt='share'></Image>

                                                                    <div className='border flex items-center gap-[5px] border-[#000000] px-[15px] h-[40px] rounded-[25px]'>
                                                                        <h6 className='text-[15px] font-semibold text-[#292930]'>{'watch on demand'}</h6>
                                                                        <Image className='' src={'/ytplay.svg'} height={20} width={20} alt='share'></Image>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            {(data.data[c.cid].speaker_list && data.data[c.cid].speaker_list.length > 0) && <div className='py-[15px] flex items-center gap-[15px]'>
                                                                {data.data[c.cid].speaker_list.map((resp, index) => {
                                                                    return (
                                                                        <div key={resp.name} className='flex gap-[10px]'>
                                                                            {/* flex-[0_0_calc(27%_-_5px)] */}
                                                                            <div className='flex-[0_0_auto]'>
                                                                                <ImageLoader style={`rounded-[5px] h-[65px] w-full`} src={resp.image} title={resp.name} />
                                                                            </div>

                                                                            <div className='flex-[0_0_calc(73%_-_5px)]'>
                                                                                <h6 className={`text-[13px] leading-[14px] line-clamp-1 ${nunito.className} font-[700]`}>{resp.name}</h6>
                                                                                <p className={`text-[#666666] text-[12px] leading-[16px] line-clamp-2 pb-[5px]`}>{resp.designation}</p>
                                                                                <p className={`text-[12px] text-[#C93742] ${nunito.className}`}>{resp.company}</p>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}

                                                            </div>}
                                                        </div>
                                                    </>}

                                                    {(c.cid && data.data[c.cid] && (data.data[c.cid].lead_list && data.data[c.cid].lead_list.length > 0) && c.component_title == "Lead Generation") && <>
                                                        <div>
                                                            <Title data={{ title: data.data[c.cid].heading }} isIcon={true} see={`uppercase !font-semibold !text-[#e21b22]`} seeMore={true} />

                                                            <div className='pb-[20px] '>
                                                                {data.data[c.cid].lead_list.map((resp, index) => {
                                                                    return (
                                                                        <div className={`border-b border-b-[#e9e9e9] ${i == 0 ? 'pb-[10px]' : 'py-[10px]'} `} key={resp.title}>
                                                                            <p className={`text-[#999999] text-[14px] font-semibold ${nunito.className}`}>{data.data[c.cid].heading}</p>
                                                                            <div className='flex gap-[15px] justify-between pt-[5px]'>
                                                                                <div className='flex-[0_0_calc(90%_-_15px)] flex gap-[10px]'>
                                                                                    <div className='flex-[0_0_calc(9%_-_10px)]'>
                                                                                        <ImageLoader style={`rounded-[5px] h-[65px] md:h-[65px] w-full`} src={resp.image} title={resp.title} />
                                                                                    </div>

                                                                                    <h6 className='text-[16px] font-semibold line-clamp-2 flex-[0_0_calc(50%_-_10px)]'>{resp.title}</h6>
                                                                                </div>

                                                                                <div className='flex-[0_0_auto]'>
                                                                                    <Image className='' src={'/share.svg'} height={20} width={20} alt='share'></Image>
                                                                                </div>
                                                                            </div>

                                                                            <div className='flex items-center gap-[10px]'>
                                                                                <p className={`text-[13px] text-[#202121B2] border-r border-r-[#000000] pr-[10px]`}>{resp.specification_1}</p>
                                                                                <p className={`text-[13px] text-[#202121B2] border-r border-r-[#000000] px-[10px]`}>{resp.specification_2}</p>
                                                                                <p className={`text-[13px] text-[#202121B2] border-r border-r-[#000000] px-[10px]`}>{resp.specification_3}</p>
                                                                            </div>

                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>



                                                    </>}

                                                    {(c.cid && data.data[c.cid] && (data.data[c.cid] && data.data[c.cid]) && c.component_title == "Brand Profile") && <>
                                                        <div className='py-[20px]'>
                                                            <Title data={{ title: c.component_title }} isIcon={true} see={`uppercase !font-semibold !text-[#e21b22]`} seeMore={true} />

                                                            {<div className='grid grid-cols-4 md:gap-[15px] lg:gap-[20px]'>
                                                                {data.data[c.cid].brand_profile_list.map(resp => {
                                                                    return (
                                                                        <div key={resp.title}>
                                                                            <ImageLoader style={`rounded-[5px] h-[215px] md:h-[165px] w-full`} src={resp.image} title={resp.title} />
                                                                            <h6 className={`text-[11px] font-[700] py-[2px] line-clamp-1 text-[#E21B22] uppercase ${nunito.className}`}>{resp.primary_text}</h6>
                                                                            <p className={`text-[15px] font-semibold line-clamp-2 ${nunito.className}`}>{resp.title}</p>
                                                                        </div>
                                                                    )
                                                                })}

                                                            </div>}
                                                        </div>
                                                    </>}

                                                    {(c.cid && data.data[c.cid] && (data.data[c.cid] && data.data[c.cid]) && c.component_title == "Case Studiess") && <>
                                                        <div className='py-[20px]'>
                                                            <Title data={{ title: c.component_title }} isIcon={true} see={`uppercase !font-semibold !text-[#e21b22]`} seeMore={true} />

                                                            <div className='grid grid-cols-4 gap-[15px]'>
                                                                <div>
                                                                    <ImageLoader style={`rounded-[5px] h-[215px] md:h-[165px] w-full`} src={'/no-img.png'} title={'resp.heading'} />
                                                                    <h6 className={`text-[14px] text-[#E21B22] uppercase ${nunito.className}`}>{'mICROSOFT'}</h6>
                                                                    <p className={`text-[15px] font-semibold ${nunito.className}`}>{'Progressive Grocer – June 2023'}</p>
                                                                </div>

                                                                <div>
                                                                    <ImageLoader style={`rounded-[5px] h-[215px] md:h-[165px] w-full`} src={'/no-img.png'} title={'resp.heading'} />
                                                                    <h6 className={`text-[14px] text-[#E21B22] uppercase ${nunito.className}`}>{'mICROSOFT'}</h6>
                                                                    <p className={`text-[15px] font-semibold ${nunito.className}`}>{'Progressive Grocer – June 2023'}</p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </>}

                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    )
                }) : <></>}
            </RootLayout>
        </>
    )
}

export default index

export async function getServerSideProps({ params }) {
    let page_route = await params?.route;
    // let Id = 'beauty-wellness';
    const param = {
        // "application_type": "mobile",
        "route": page_route,
        page_no: 1,
        page_size: 4
    }
    const resp = await HomePage(param);
    const data = await resp.message;

    return {
        props: { data, page_route }
    }
}