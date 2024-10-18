import SEO from "@/components/common/SEO";
import Title from "@/components/common/Title";
import ImageLoader from "@/components/ImageLoader";
import RootLayout from "@/layouts/RootLayout";
import { check_Image, getWebinarData, HomePage } from "@/libs/api";
// import { Nunito } from 'next/font/google';
import Image from "next/image";
import { useRouter } from "next/router";
import format from "date-fns/format";
import { useCallback, useEffect, useRef, useState } from "react";
import WebinarTitle from "@/components/Webinar/WebinarTitle";
import KeyPointsCard from "@/components/Webinar/KeyPointsCard";
import SpeakerCard from "@/components/Webinar/SpeakerCard";
import Agenda from "@/components/Webinar/Agenda";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  display: "block",
  preload: true,
  style: "normal",
  subsets: ["latin"],
  variable: "--font-inter",
});

// const nunito = Nunito({
//     weight: ["300", "400", "500", "600", "700"],
//     display: "block",
//     preload: true,
//     style: 'normal',
//     subsets: ["latin"],
//     // variable: '--font-nunito',
// })
const index = ({ data, page_route, ads, webinar_data }) => {
  // const index = ({ data, page_route, ads }) => {
  console.log(page_route, "page_route");

  const [noProduct, setNoProduct] = useState(false);
  const [webinarData, setWebinarData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [keyPointsList, setKeyPointslist] = useState([]);
  const [date, setDate] = useState();
  const [value, setValue] = useState([]);
  const router = useRouter();
  // useEffect(() => {
  //     if (data && data.page_content && data.page_content.length != 0) {
  //         setTimeout(() => {
  //             setValue(data.page_content)
  //         }, 100)

  //     }

  // }, [])

  useEffect(() => {
    const formattedDate = format(new Date(), "iiii, d MMMM yyyy");
    setDate(formattedDate);
    // console.log('router.asPath',router.asPath);
    // console.log('router.asPath',nav);
  }, []);

  useEffect(() => {
    if (webinarData) {
      setTimeout(() => {
        setWebinarData(webinar_data);
      }, 100);
    }
  }, []);

  //   const keyPoints = (data)=>{
  //     setShowMore(!showMore);

  //      if(showMore){
  //         setKeyPointslist(data)
  //      }else{
  //         setKeyPointslist(data.slice(0,4))
  //      }
  //   }

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
        route: page_route,
      };
      loadMore(data);
      setLoading(false);
    }
  }, [page]);

  const loadMore = async (data) => {
    const resp = await HomePage(data);
    if (
      resp.message &&
      resp.message.page_content &&
      resp.message.page_content.length > 0
    ) {
      setValue([...value, ...resp.message.page_content]);
      setNoProduct(false);
    } else {
      setNoProduct(true);
    }
  };

  const click_data = (data) => {
    console.log(data, "data");
  };
  const [activeIndex, setActiveIndex] = useState(0);

  const activateSection = async (data, i) => {
    // console.log(data,"data")
    setActiveIndex(i);
    let el = document.getElementById(data.url);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  };

  console.log("wd", webinarData.banner_image);

  return (
    <>
      <RootLayout
        data={data}
        isLanding={true}
        head={""}
        adIdH={page_route + "head"}
        adIdF={page_route + "foot"}
        homeAd={ads && ads.header ? ads : null}
      >
        <SEO
          title={"India Retailing"}
          siteName={"India Retailing"}
          description={
            "This is IndiaRetailing and its about news and articles based on the popular site."
          }
        />

        <div>
          {/* {(value && value.length != 0) ? value.map((data, i) => {
                    return (
                        <div key={i} ref={value.length === i + 1 ? lastPostElementRef : null} className={`py-[20px] container  md:p-[15px]  md:py-[10px] lg:flex gap-5`}>
                            {(data.layout_json && JSON.parse(data.layout_json).length != 0) && JSON.parse(data.layout_json).map((res, index) => {
                                return (
                                    <div key={index} className={`${res.class == 'flex-[0_0_calc(100%_-_0px)]' ? 'w-full' : res.class == "flex-[0_0_calc(80%_-_15px)]" ? 'flex-80' : res.class == "flex-[0_0_calc(20%_-_15px)]" ? 'flex-custom-20' : res.class}  `}>
                                        {(res.components && res.components.length != 0) && res.components.map((c, c_index) => {
                                            return (
                                                <div key={c.component_title} id={c.component_title} className={`md:py-[15px]`}>

                                                    
                                                    {(c.cid && data.data[c.cid] && c.component_title == "Title and Description") && <>
                                                        <div className={`flex items-center gap-[10px]`}>
                                                            <div className={`flex-[0_0_auto]`}>
                                                                <Image className='h-[23px] w-[23px] object-contain' height={100} width={100} alt={data.data[c.cid].description} src={check_Image(data.data[c.cid].logo)}></Image>
                                                            </div>

                                                            <h6 className={`flex items-center gap-[5px]  nunito`}>
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
                                                                                
                                                                                <h6 className={`text-[14px] ${activeIndex == index ? 'text-[#E21B22] font-[700]' : 'text-[#737373]'} `}>{resp.title}</h6>

                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>

                                                        </>
                                                    }

                                                    
                                                    {(c.cid && data.data[c.cid] && (data.data[c.cid] && data.data[c.cid]) && c.component_title == "Webinars") && <>

                                                        <div>
                                                            <Title data={{ title: c.component_title }} isIcon={true} see={`uppercase !font-semibold !text-[#e21b22]`} seeMore={true} />

                                                            <p className={`text-[#999999] uppercase text-[12px] py-[15px] md:py-[5px] nunito`}>{data.data[c.cid].heading}</p>
                                                            <div className='flex gap-5 justify-between md:flex-col'>
                                                                <div>
                                                                    <p className='text-[18px] md:text-[16px] font-semibold pb-[10px]'>{data.data[c.cid].p_title}</p>
                                                                    <div>
                                                                        <span className={`text-[14px] text-[#202121B2] pr-[10px] nunito`}>{data.data[c.cid].s_title}</span>
                                                                        <span className={`border-l border-l-[#000] pl-[10px] text-[14px] font-[700]  nunito`}>{data.data[c.cid].date}</span>
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
                                                                           
                                                                            <div className='flex-[0_0_auto]'>
                                                                                <ImageLoader style={`rounded-[5px] h-[65px] w-full`} src={resp.image} title={resp.name} />
                                                                            </div>

                                                                            <div className='flex-[0_0_calc(73%_-_5px)] '>
                                                                                <h6 className={`text-[13px] leading-[14px] line-clamp-1 nunito font-[700]`}>{resp.name}</h6>
                                                                                <p className={`text-[#666666] text-[12px] leading-[16px] line-clamp-2 pb-[5px]`}>{resp.designation}</p>
                                                                                <p className={`text-[12px] text-[#C93742] nunito`}>{resp.company}</p>
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
                                                                            <p className={`text-[#999999] text-[14px] md:text-[12px] font-semibold nunito`}>{data.data[c.cid].heading}</p>
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
                                                                            <h6 className={`text-[11px] font-[700] py-[2px] line-clamp-1 text-[#E21B22] uppercase nunito`}>{resp.primary_text}</h6>
                                                                            <p className={`text-[15px] md:text-[13px] font-semibold line-clamp-2 nunito`}>{resp.title}</p>
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
                                                                            <h6 className={`text-[14px] font-semibold  nunito`}>{resp.title}</h6>

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
                                                                            <p className='flex gap-2 line-clamp-1 items-center'><span className={`primary_text fnt_13 line-clamp-1 nunito`}>{resp.primary_text}</span> {resp.secondary_text && <span className='h-[10px] w-[1px] bg-[#6f6f6f]'></span>} <span className={`secondary_text line-clamp-1 nunito`}>{resp.secondary_text}</span></p>
                                                                            <div className='relative py-[5px]'>
                                                                                <ImageLoader style={`rounded-[10px] h-[215px] md:h-[140px] w-full`} src={resp.thumbnail_imagee} title={resp.title} />
                                                                                <div className='absolute bottom-[10px] left-0 p-[5px] '>
                                                                                    <Image src={'/book.svg'} height={20} width={20} alt='pdf'></Image>
                                                                                </div>
                                                                            </div>
                                                                            <h6 className={`text-[14px] line-clamp-2 font-semibold min-h-[40px] nunito`}>{resp.title}</h6>
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
                }) : <></>} */}
        </div>

        <>
          <div className="container">
            {/* <div style={{backgroundImage: `url(https://indiaretailing.go1cms.com${webinarData.banner_image})`}} className='lg:px-20 lg:py-10 flex flex-col justify-start'>
                        <div className='inline-flex w-[200px]'>
                            <ImageLoader style={`rounded-[5px] h-[65px] w-[80px]`} src={webinarData.brand_logo} />
                            <h1 className='text-white text-3xl'>{webinarData.brand_name}</h1>
                        </div>
                      </div> */}

            <div className="px-5 lg:px-16">
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <div className="border p-2 rounded-lg">
                    <ImageLoader
                      src={webinarData.brand_logo}
                      style={`rounded-[5px] h-[65px] w-[80px]`}
                    />
                  </div>
                  <div className="">
                    <h1 className="text-[28px] font-bold">
                      {webinarData.brand_name}
                    </h1>
                    <p className="text-lg font-normal text-[#202121]">
                      {webinarData.title}
                    </p>
                    <div className="flex gap-1 items-center">
                      <Image src="/calendar-minus.png" width={14} height={14} />
                      <span className="text-sm">{date && date}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Image src="/shares.svg" width={24} height={24} />
                </div>
              </div>

              <div className="mt-5">
                {webinarData.overview && (
                  <>
                    <div>
                      <WebinarTitle data={{ title: "Overview" }} />
                      <p className="text-[18px] font-normal text-[#202121B2] text-justify mt-3">
                        {webinarData.overview}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div>
                {webinarData.key_points && webinarData.length !== 0 && (
                  <>
                    <div className="mt-5">
                      <div className="flex justify-between items-center">
                        <WebinarTitle
                          data={{ title: "KEY DISCUSSION POINTS" }}
                        />

                        {webinarData.key_points.length > 3 && (
                          <div>
                            <div
                              className="flex items-center text-[20px] font-bold gap-[5px] cursor-pointer"
                              onClick={""}
                            >
                              <p className={`nunito`}>More</p>
                              <Image
                                className="h-[11px] w-[5px] object-contain"
                                src="/forwardIcon.svg"
                                height={5}
                                width={5}
                                alt="View All"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 mt-5">
                      {webinarData.key_points &&
                        webinarData.key_points.map((res, i) => (
                          <div key={i}>
                            <KeyPointsCard data={res} />
                          </div>
                        ))}
                    </div>
                  </>
                )}
              </div>

              {webinarData.speakers && webinarData.speakers.length !== 0 && (
                <>
                  <div className="mt-5">
                    <WebinarTitle data={{ title: "SPEAKERS" }} />
                    <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-6 mt-5">
                      {webinarData.speakers.map((res, i) => (
                        <div key={i}>
                          <SpeakerCard data={res} />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {webinarData.agenda && webinarData.agenda !== 0 && (
                <>
                  <div className="mt-5">
                    <WebinarTitle data={{ title: "AGENDA" }} />

                    <div className="mt-5">
                      <Agenda data={webinarData.agenda} />
                    </div>
                  </div>
                </>
              )}

              {webinarData.who_should_attend && (
                <>
                  <div className="mt-5">
                    <WebinarTitle data={{ title: "WHO SHOULD ATTEND" }} />

                    <div
                      className={`mt-8 text-[20px] font-medium text-[#202121] bg-[#F2F2F2] rounded-md p-2 w-fit ${inter.className}`}
                    >
                      <p>{webinarData.who_should_attend}</p>
                    </div>
                  </div>
                </>
              )}

              {webinarData.contact_name &&
                webinarData.contact_number &&
                webinarData.contact_email && (
                  <>
                    <div className="mt-5">
                      <WebinarTitle data={{ title: "CONTACT US" }} />
                      <div className={`mt-8 ${inter.className}`}>
                        <p className="md:text-base lg:text-lg font-normal break-words">
                          {`For Delegation | ${webinarData.contact_name} | ${webinarData.contact_email} | ${webinarData.contact_number}`}
                        </p>
                      </div>
                    </div>
                  </>
                )}


                {
                    <div className="p-5 bg-[#F2F2F2] flex flex-col mt-5">
                        <h3 className="text-[30px] font-bold">{webinarData.bottom_banner_title}</h3>
                        <p className="text-[22px] text-[#8D9D9D]">{webinarData.bottom_banner_description}</p>
                        <span className="text-[20px] font-medium text-[#202121] mt-3">{webinarData.date}</span>
                        <button className="px-3 py-2 text-sm font-bold w-fit mt-2 webinar-btn rounded-md text-white">{webinarData.button_name}</button>
                    </div>
                }
            </div>
          </div>
        </>
      </RootLayout>
    </>
  );
};

export default index;

export async function getServerSideProps({ params }) {
  let page_route = await params;
  // // let Id = 'beauty-wellness';
  // const param = {
  //     // "application_type": "mobile",
  //     "route": page_route,
  //     page_no: 1,
  //     page_size: 4
  // }
  // const resp = await HomePage(param);
  // const data = await resp.message;

  // return {
  //     props: { data, page_route }
  // }

  const param = {
    route: "webinars/reimagine-next--the-future-of-retail",
  };

  const res = await getWebinarData(param);
  const webinar_data = res.message;

  return {
    props: { page_route, webinar_data },
  };
}
