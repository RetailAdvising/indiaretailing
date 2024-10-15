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
    // console.log(data, "data")

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

    const click_data = (data) => {
        console.log(data, "data")
    }
    const [activeIndex, setActiveIndex] = useState(0)

    const activateSection = async (data, i) => {
        // console.log(data,"data")
        setActiveIndex(i)
        let el = document.getElementById(data.url)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
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
                                                <div key={c.component_title} id={c.component_title} className={`md:py-[15px]`}>

                                                    {/* Title and Description */}
                                                    {(c.cid && data.data[c.cid] && c.component_title == "Title and Description") && <>
                                                        <div className={`flex items-center gap-[10px]`}>
                                                            <div className={`flex-[0_0_auto]`}>
                                                                <Image className='h-[23px] w-[23px] object-contain' height={100} width={100} alt={data.data[c.cid].description} src={check_Image(data.data[c.cid].logo)}></Image>
                                                            </div>

                                                            <h6 className={`flex items-center gap-[5px]  ${nunito.className}`}>
                                                                <span className='text-[18px] font-[800] uppercase'>{data.data[c.cid].heading1}</span>
                                                                <span className='text-[18px] font-[800] text-[#E21B22] uppercase'>{data.data[c.cid].span_heading}</span>
                                                                <span className='text-[18px] font-[800] uppercase'>{data.data[c.cid].heading2}</span>
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
                                                                            <div key={resp.title} className={`${index == data.data[c.cid]['side_menu'].length - 1 ? '' : 'border-b border-b-[#D9D9D9]'} p-[10px] cursor-pointer`} onClick={() => activateSection(resp, index)}>
                                                                                {/* ${resp.url == } */}
                                                                                <h6 className={`text-[14px] ${activeIndex == index ? 'text-[#E21B22] font-[700]' : 'text-[#737373]'} `}>{resp.title}</h6>

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

                                                            <p className={`text-[#999999] uppercase text-[12px] py-[15px] md:py-[5px] ${nunito.className}`}>{data.data[c.cid].heading}</p>
                                                            <div className='flex gap-5 justify-between md:flex-col'>
                                                                <div>
                                                                    <p className='text-[18px] md:text-[16px] font-semibold pb-[10px]'>{data.data[c.cid].p_title}</p>
                                                                    <div>
                                                                        <span className={`text-[14px] text-[#202121B2] pr-[10px] ${nunito.className}`}>{data.data[c.cid].s_title}</span>
                                                                        <span className={`border-l border-l-[#000] pl-[10px] text-[14px] font-[700]  ${nunito.className}`}>{data.data[c.cid].date}</span>
                                                                    </div>
                                                                </div>

                                                                <div className='flex-[0_0_auto] flex items-center gap-[15px] md:justify-end'>
                                                                    <Image className='md:h-[15px] md:w-[15px]' src={'/share.svg'} height={20} width={20} alt='share'></Image>

                                                                    <div className='border flex items-center gap-[5px] border-[#000000] px-[15px] md:px-[10px] md:h-[35px] h-[40px] rounded-[25px]'>
                                                                        <h6 className='text-[15px] md:text-[13px] font-semibold text-[#292930]'>{'watch on demand'}</h6>
                                                                        <Image className='md:h-[15px] md:w-[15px]' src={'/ytplay.svg'} height={20} width={20} alt='ytplay'></Image>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            {(data.data[c.cid].speaker_list && data.data[c.cid].speaker_list.length > 0) && <div className='lg:py-[15px] md:pt-[15px] scrollbar-hide md:overflow-auto flex items-center gap-[15px]'>
                                                                {data.data[c.cid].speaker_list.map((resp, index) => {
                                                                    return (
                                                                        <div key={resp.name} className='flex gap-[10px] cursor-pointer md:flex-[0_0_calc(100%_-_10px)]' onClick={() => click_data(resp)}>
                                                                            {/* flex-[0_0_calc(27%_-_5px)] */}
                                                                            <div className='flex-[0_0_auto]'>
                                                                                <ImageLoader style={`rounded-[5px] h-[65px] w-full`} src={resp.image} title={resp.name} />
                                                                            </div>

                                                                            <div className='flex-[0_0_calc(73%_-_5px)] '>
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
                                                                        <div className={`border-b border-b-[#e9e9e9] ${i == 0 ? 'pb-[10px]' : 'py-[10px]'} cursor-pointer`} onClick={() => click_data(resp)} key={resp.title}>
                                                                            <p className={`text-[#999999] text-[14px] md:text-[12px] font-semibold ${nunito.className}`}>{data.data[c.cid].heading}</p>
                                                                            <div className='flex gap-[15px] justify-between pt-[5px]'>
                                                                                <div className='flex-[0_0_calc(90%_-_15px)] flex gap-[10px]'>
                                                                                    <div className='flex-[0_0_calc(9%_-_10px)] md:flex-[0_0_calc(27%_-_10px)]'>
                                                                                        <ImageLoader style={`rounded-[5px] h-[65px] md:h-[65px] w-full`} src={resp.image} title={resp.title} />
                                                                                    </div>

                                                                                    <div className='flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(70%_-_10px)]'>
                                                                                        <h6 className='text-[16px] md:text-[13px] font-semibold line-clamp-2 '>{resp.title}</h6>
                                                                                    </div>
                                                                                </div>

                                                                                <div className='flex-[0_0_auto]'>
                                                                                    <Image className='md:h-[15px] md:w-[15px]' src={'/share.svg'} height={20} width={20} alt='share'></Image>
                                                                                </div>
                                                                            </div>

                                                                            <div className='flex items-center gap-[10px]'>
                                                                                <p className={`text-[13px] md:text-[12px] text-[#202121B2] border-r border-r-[#000000] pr-[10px]`}>{resp.specification_1}</p>
                                                                                <p className={`text-[13px] md:text-[12px] text-[#202121B2] border-r border-r-[#000000] px-[10px]`}>{resp.specification_2}</p>
                                                                                <p className={`text-[13px] md:text-[12px] text-[#202121B2] px-[10px]`}>{resp.specification_3}</p>
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

                                                            {<div className='grid grid-cols-4 md:grid-cols-2 md:gap-[15px] lg:gap-[20px]'>
                                                                {data.data[c.cid].brand_profile_list.map(resp => {
                                                                    return (
                                                                        <div key={resp.title} className='cursor-pointer' onClick={() => click_data(resp)}>
                                                                            <ImageLoader style={`rounded-[5px] h-[215px] md:h-[140px] w-full`} src={resp.image} title={resp.title} />
                                                                            <h6 className={`text-[11px] font-[700] py-[2px] line-clamp-1 text-[#E21B22] uppercase ${nunito.className}`}>{resp.primary_text}</h6>
                                                                            <p className={`text-[15px] md:text-[13px] font-semibold line-clamp-2 ${nunito.className}`}>{resp.title}</p>
                                                                        </div>
                                                                    )
                                                                })}

                                                            </div>}
                                                        </div>
                                                    </>}

                                                    {(c.cid && data.data[c.cid] && (data.data[c.cid].case_studies_list && data.data[c.cid].case_studies_list.length > 0) && c.component_title == "Case Studiess") && <>
                                                        <div className='py-[20px]'>
                                                            <Title data={{ title: "Case Studies" }} isIcon={true} see={`uppercase !font-semibold !text-[#e21b22]`} seeMore={true} />

                                                            <div className='grid grid-cols-3 md:grid-cols-1 gap-[15px]'>
                                                                {data.data[c.cid].case_studies_list.map(resp => {
                                                                    return (
                                                                        <div className='border border-[#e9e9e9] rounded-[10px] p-[10px] cursor-pointer' onClick={() => click_data(resp)} key={resp.title}>
                                                                            <div className='relative pb-[5px]'>
                                                                                <ImageLoader style={`rounded-[10px] h-[215px] md:h-[185px] w-full`} src={resp.image} title={resp.title} />
                                                                                <div className='absolute bottom-[10px] left-0 p-[5px] rounded-[0_10px_0_10px] bg-[#FFE7E7]'>
                                                                                    <Image src={'/pdf_file.svg'} height={20} width={20} alt='pdf'></Image>
                                                                                </div>
                                                                            </div>
                                                                            <h6 className={`text-[14px] font-semibold  ${nunito.className}`}>{resp.title}</h6>

                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </>}


                                                    {(c.cid && data.data[c.cid] && (data.data[c.cid].data && data.data[c.cid].data.length > 0) && c.component_title == "Featured Content") && <>
                                                        <div className='py-[20px]'>
                                                            <Title data={{ title: c.component_title }} isIcon={true} see={`uppercase !font-semibold !text-[#e21b22]`} seeMore={true} />

                                                            <div className='grid grid-cols-4 md:grid-cols-2 gap-[15px] md:gap-[20px]'>
                                                                {data.data[c.cid].data.slice(0, 4).map(resp => {
                                                                    return (
                                                                        <div className='cursor-pointer' onClick={() => click_data(resp)} key={resp.title}>
                                                                            <p className='flex gap-2 line-clamp-1 items-center'><span className={`primary_text fnt_13 line-clamp-1 ${nunito.className}`}>{resp.primary_text}</span> {resp.secondary_text && <span className='h-[10px] w-[1px] bg-[#6f6f6f]'></span>} <span className={`secondary_text line-clamp-1 ${nunito.className}`}>{resp.secondary_text}</span></p>
                                                                            <div className='relative py-[5px]'>
                                                                                <ImageLoader style={`rounded-[10px] h-[215px] md:h-[140px] w-full`} src={resp.thumbnail_imagee} title={resp.title} />
                                                                                <div className='absolute bottom-[10px] left-0 p-[5px] '>
                                                                                    <Image src={'/book.svg'} height={20} width={20} alt='pdf'></Image>
                                                                                </div>
                                                                            </div>
                                                                            <h6 className={`text-[14px] line-clamp-2 font-semibold min-h-[40px] ${nunito.className}`}>{resp.title}</h6>
                                                                            <p className={`sub_title pt-1 line-clamp-2 md:line-clamp-1`}>{resp.blog_intro ? resp.blog_intro : ''}</p>
                                                                        </div>
                                                                    )
                                                                })}
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