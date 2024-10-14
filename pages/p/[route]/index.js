import SEO from '@/components/common/SEO';
import RootLayout from '@/layouts/RootLayout';
import { check_Image, HomePage } from '@/libs/api';
import { Nunito } from 'next/font/google';
import Image from 'next/image';
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
    console.log(page_route, "page_route")
    const [noProduct, setNoProduct] = useState(false)
    const [value, setValue] = useState([])
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
                                    <div key={index} className={`${res.class == 'flex-[0_0_calc(100%_-_0px)]' ? 'w-full' : res.class}  `}>
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