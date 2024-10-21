import SEO from "@/components/common/SEO";
import Title from "@/components/common/Title";
import ImageLoader from "@/components/ImageLoader";
import RootLayout from "@/layouts/RootLayout";
import { check_Image, get_web_special_detail, getCurrentUrl, seo_Image } from "@/libs/api";
// import { Nunito } from 'next/font/google';
import Image from "next/image";
import {domain} from '@/libs/config/siteConfig'
import { useRouter } from "next/router";
import format from "date-fns/format";
import { useCallback, useEffect, useRef, useState } from "react";
import KeyPointsCard from "@/components/Webinar/KeyPointsCard";
import SpeakerCard from "@/components/Webinar/SpeakerCard";
import Agenda from "@/components/Webinar/Agenda";
import { Inter } from "next/font/google";
import Banner from "@/components/Webinar/Banner";
import Form from '@/components/Webinar/Form'
import Dropdowns from "@/components/common/Dropdowns";
import BrandDetails from "@/components/Webinar/BrandDetails";
import KeyDiscussion from "@/components/Webinar/KeyDiscussion";
import WhitePaper from '@/components/Webinar/WhitePaper'
import Reports from '@/components/Webinar/Reports'
import Video from '@/components/Webinar/Video'
import SocialMedia from '@/components/Webinar/SocialMedia'
import FeaturedContent from "@/components/WebSpecials/FeaturedContent";
import SideMenu from "@/components/WebSpecials/SideMenu";
import RegistrationForm from "@/components/WebSpecials/RegistrationForm";
import { WhatsappShareButton, LinkedinShareButton, TwitterShareButton, FacebookShareButton } from 'react-share'
import { websiteUrl } from "@/libs/config/siteConfig";
import Head from "next/head";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  display: "block",
  preload: true,
  style: "normal",
  subsets: ["latin"],
  variable: "--font-inter",
});

const index = ({ page_route, ads, webinar_data, category_route }) => {
  // const index = ({ data, page_route, ads }) => {
  // console.log(category_route, "category_route");
  // console.log(webinar_data, "webinar_data");

  const icons = [
    { icon: "/bookstore/linkedin.svg", name: "Linkedin" },
    { icon: "/bookstore/FB.svg", name: "Facebook" },
    { icon: "/bookstore/twitter.svg", name: "Twitter" },
    { icon: "/bookstore/whatsapp.svg", name: "Whatsapp" },
  ];

  const socials = [
    {
      "icon": "/fb.svg",
      "name": "fb"
    },
    {
      "icon": "/twitter.svg",
      "name": "twitter"
    },
    {
      "icon": "/linkedin.svg",
      "name": "linkedin"
    },
    {
      "icon": "/ws.svg",
      "name": "ws"
    }
  ]

  const [showMore, setShowMore] = useState(true);
  const router = useRouter();

  const [side_menu, setSideMenu] = useState([
    { title: "Webinars", url: "Webinars" },
    { title: "Lead Generation", url: "Lead Generation" },
    { title: "Brand Profile", url: "Brand Profile" },
    { title: "Case Studies", url: "Case Studies" },
    { title: "Featured Content", url: "Featured Content" },
  ]);

  useEffect(() => {

    if (category_route == "case-studies") {
      let data = [...webinar_data.content_1, ...webinar_data.content_2]
      let menus = []
      if (data && data.length > 0) {
        for (let index = 0; index < data.length; index++) {
          if (data[index]['title']) {
            let obj = { title: data[index]['title'], url: data[index]['title'] }
            menus.push(obj)
          }
        }
      }

      setSideMenu(menus)
    }
  }, [router]);

  const click_data = (data, type) => {
    // console.log(data, "data");


    if (type == "register") {
      showRegister()
    } else {
      if (data.route) {
        let route = type == "article" ? ('/' + data.route) : ("/p/" + data.route)
        if ((category_route == "featured-content" || category_route == "web-special-list")) {
          router.push(route);
        } else {
          if (!webinar_data.is_registration_required) {
            router.push(route);
          } else {
            showRegister()
          }
        }
      }
    }

  };
  const [activeIndex, setActiveIndex] = useState(0);

  const activateSection = async (data, i, type) => {
    // console.log(data,"data")
    setActiveIndex(data);
    if (type == 'click') {
      let el = document.getElementById(data);
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  };


  const [visible, setVisible] = useState(false)
  const showRegister = () => {
    setVisible(true)
    document.body.style.overflow = "hidden"
  }

  const hide = (data) => {
    setVisible(false)
    document.body.style.overflow = "auto"
    if (data) {

    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      let activeSection = '';
      // console.log(sections,"sections")
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          activeSection = section.id;
        }
      });

      if (activeSection) {
        activateSection(activeSection, '', "scroll");
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateShare = (data) => {

  }


  // console.log("wd", webinar_data.banner_image);

  return (
    <>
      {visible && <RegistrationForm visible={visible} hide={hide} />}
      <RootLayout
        data={webinar_data}
        isLanding={true}
        head={""}
        adIdH={category_route + "head"}
        adIdF={category_route + "foot"}
        homeAd={ads && ads.header ? ads : null}
      >

        {category_route == "web-special-list" ? <SEO
          title={"India Retailing"}
          siteName={"India Retailing"}
          description={
            "This is IndiaRetailing and its about news and articles based on the popular site."
          }
        /> :
          <Head>
            <title key="title">{(category_route == "featured-content" && webinar_data.message && webinar_data.message.article_detail) ? webinar_data.message.article_detail[0]['title']  : webinar_data?.meta_title}</title>
            <meta name="description" content={(category_route == "featured-content" && webinar_data.message && webinar_data.message.article_detail) ? webinar_data.message.article_detail[0]['blog_intro']  : webinar_data?.meta_description} />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
            <meta name="theme-color" content="#e21b22" />
            <meta property="og:type" content={'Article'} />
            <meta property="og:title" content={(category_route == "featured-content" && webinar_data.message && webinar_data.message.article_detail) ? webinar_data.message.article_detail[0]['title']  : webinar_data?.meta_title} />
            <meta property="og:description" content={(category_route == "featured-content" && webinar_data.message && webinar_data.message.article_detail) ? webinar_data.message.article_detail[0]['blog_intro']  : webinar_data?.meta_description} />
            <meta property="og:url" content={getCurrentUrl(router.asPath)}></meta>
            <meta property="og:locale" content="en_IE" />
            <meta

              property="og:image"
              itemprop="image"
              content={seo_Image((category_route == "featured-content" && webinar_data.message && webinar_data.message.article_detail) ? webinar_data.message.article_detail[0]['thumbnail_imagee']  : webinar_data.meta_image ? webinar_data.meta_image : webinar_data.thumbnail_imagee)}
            />
            <meta

              property="og:image:alt"
              content={`${(category_route == "featured-content" && webinar_data.message && webinar_data.message.article_detail) ? webinar_data.message.article_detail[0]['title']  : webinar_data?.title} | ${'IndiaRetailing'}`}
            />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            <meta name="robots" content="index,follow" />

            <meta

              name="twitter:card"
              content="summary_large_image"
            />
            <meta

              name="twitter:site"
              content={'@d__indiaRetail'}
            />
            <meta

              name="twitter:creator"
              content={'@d__indiaRetail'}
            />
            <meta property="twitter:image" content={seo_Image((category_route == "featured-content" && webinar_data.message && webinar_data.message.article_detail) ? webinar_data.message.article_detail[0]['thumbnail_imagee']  : webinar_data?.meta_image)} />
            <meta

              property="twitter:title"
              content={(category_route == "featured-content" && webinar_data.message && webinar_data.message.article_detail) ? webinar_data.message.article_detail[0]['title']  : webinar_data?.title}
            />
            <meta

              property="twitter:description"
              content={(category_route == "featured-content" && webinar_data.message && webinar_data.message.article_detail) ? webinar_data.message.article_detail[0]['blog_intro']  : webinar_data?.meta_description}
            />


            <link rel="shortcut icon" href="/ir_2023.png" />
          </Head>

        }




        {category_route == "web-special-list" &&
          webinar_data &&
          webinar_data.message && (
            <>
              <div className={`py-[20px] container md:p-[15px] md:py-[10px] `}>
                <div className={`flex items-center gap-[10px]`}>
                  <div className={`flex-[0_0_auto]`}>
                    <Image
                      className="h-[23px] w-[23px] object-contain"
                      height={100}
                      width={100}
                      alt={
                        "Watch the experts reveal their recipes for business success, packed with real life examples to help you make better business decisions & achieve your business goals anywhere you are!"
                      }
                      src={"/web_special/video_retail.png"}
                    ></Image>
                  </div>

                  <h6 className={`flex items-center gap-[5px]  nunito`}>
                    <span className="text-[18px] font-[800] uppercase">
                      India
                    </span>
                    <span className="text-[18px] font-[800] text-[#E21B22] uppercase">
                      Retailing
                    </span>
                    <span className="text-[18px] font-[800] uppercase">
                      Web Specials
                    </span>
                  </h6>
                </div>

                <p className={`p-[15px] sub_title lg:w-[50%]`}>
                  Watch the experts reveal their recipes for business success,
                  packed with real life examples to help you make better
                  business decisions & achieve your business goals anywhere you
                  are!
                </p>

                <div className="lg:flex gap-5 md:pt-[10px] lg:pt-[20px]">
                  {/* <div className="flex-[0_0_calc(20%_-_15px)] lg:sticky lg:h-full lg:top-[15px]">
                    {side_menu && side_menu.length > 0 && (
                      <>
                        <div className="w-fit bg-[#ddd] p-[3px_5px] rounded-[5px_5px_0_0]">
                          <h6 className="text-[12px] font-semibold uppercase">
                            CATEGORIES
                          </h6>
                        </div>

                        <div className="border border-[#D9D9D9] rounded-[0_10px_10px_10px]">
                          {side_menu.map((resp, index) => {
                            return (
                              <div
                                key={resp.title}
                                className={`${index == side_menu.length - 1
                                  ? ""
                                  : "border-b border-b-[#D9D9D9]"
                                  } p-[10px] cursor-pointer`}
                                onClick={() => activateSection(resp, index)}
                              >
                                <h6
                                  className={`text-[14px] ${activeIndex == index
                                    ? "text-[#E21B22] font-[700]"
                                    : "text-[#737373]"
                                    } `}
                                >
                                  {resp.title}
                                </h6>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div> */}
                  <SideMenu side_menu={side_menu} activateSection={activateSection} activeIndex={activeIndex} />

                  <div className={`md:py-[15px] flex-[0_0_calc(80%_-_15px)]`}>
                    {webinar_data.message.webinars_data &&
                      webinar_data.message.webinars_data.length > 0 && (
                        <div id={"Webinars"} data-section >
                          <Title
                            data={{
                              title: "Webinars",
                              count: webinar_data.message.webinar_count,
                            }}
                            counter={true}
                            isIcon={true}
                            see={`uppercase !font-semibold !text-[#e21b22]`}
                            seeMore={true}
                          />

                          {webinar_data.message.webinars_data.map((res) => {
                            return (
                              <div key={res.name}>
                                <p
                                  className={`text-[#999999] uppercase text-[12px] py-[10px] md:py-[5px] nunito`}
                                >
                                  webinar
                                </p>
                                <div className="flex gap-5 justify-between md:flex-col">
                                  <div>
                                    <p className="text-[18px] md:text-[16px] font-semibold pb-[10px]">
                                      {res.title}
                                    </p>
                                    <span
                                      className={`text-[14px] font-[700]  nunito`}
                                    >
                                      {format(
                                        new Date(res.start_time),
                                        "EEEE , dd MMM YYY"
                                      )}
                                    </span>
                                  </div>

                                  <div className="flex-[0_0_auto] flex items-center gap-[15px] md:justify-end">
                                    {/* <Image className='md:h-[15px] md:w-[15px]' src={'/share.svg'} height={20} width={20} alt='share'></Image> */}

                                    <div className="border flex items-center gap-[5px] border-[#000000] px-[15px] md:px-[10px] md:h-[35px] h-[40px] rounded-[25px] cursor-pointer">
                                      <h6 className="text-[15px] md:text-[13px] font-semibold text-[#292930]">
                                        {"watch on demand"}
                                      </h6>
                                      <Image
                                        className="md:h-[15px] md:w-[15px]"
                                        src={"/ytplay.svg"}
                                        height={20}
                                        width={20}
                                        alt="ytplay"
                                      ></Image>
                                    </div>
                                  </div>
                                </div>

                                {res.speakers && res.speakers.length > 0 && (
                                  <div className="lg:py-[15px] md:pt-[15px] scrollbar-hide md:overflow-auto flex items-center md:gap-[15px] lg:gap-[20px]">
                                    {res.speakers.map((resp, index) => {
                                      return (
                                        <div
                                          key={resp.name}
                                          className="flex gap-[10px] cursor-pointer md:flex-[0_0_calc(100%_-_10px)]"
                                          onClick={() => click_data(resp, 'speakers')}
                                        >
                                          <div className="flex-[0_0_auto]">
                                            <ImageLoader
                                              style={`rounded-[5px] h-[65px] w-full`}
                                              src={resp.profile_image}
                                              title={resp.name1}
                                            />
                                          </div>

                                          <div className="flex-[0_0_calc(73%_-_5px)] ">
                                            <h6
                                              className={`text-[13px] leading-[14px] line-clamp-1 nunito font-[700]`}
                                            >
                                              {resp.name1}
                                            </h6>
                                            <p
                                              className={`text-[#666666] text-[12px] leading-[16px] line-clamp-2 pb-[5px]`}
                                            >
                                              {resp.designation}
                                            </p>
                                            <p
                                              className={`text-[12px] text-[#C93742] nunito`}
                                            >
                                              {resp.company_name}
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                    {webinar_data.message.lead_data &&
                      webinar_data.message.lead_data.length > 0 && (
                        <>
                          <div className="py-[20px]" id={"Lead Generation"} data-section>
                            <Title
                              data={{ title: "Lead Generation" }}
                              isIcon={true}
                              see={`uppercase !font-semibold !text-[#e21b22]`}
                              seeMore={true}
                            />

                            <div className="pb-[20px] ">
                              {webinar_data.message.lead_data.map(
                                (resp, index) => {
                                  return (
                                    <div
                                      className={`border-b border-b-[#e9e9e9] ${index == 0 ? "pb-[10px]" : "py-[10px]"
                                        } cursor-pointer`}
                                      onClick={() => click_data(resp, 'lead_data')}
                                      key={resp.title}
                                    >
                                      <p
                                        className={`text-[#999999] text-[14px] md:text-[12px] font-semibold nunito`}
                                      >
                                        LEAD GENERATION
                                      </p>
                                      <div className="flex gap-[15px] justify-between pt-[5px]">
                                        <div className="flex-[0_0_calc(90%_-_15px)] flex gap-[10px]">
                                          <div className="flex-[0_0_calc(9%_-_10px)] md:flex-[0_0_calc(27%_-_10px)]">
                                            <ImageLoader
                                              style={`rounded-[5px] h-[65px] md:h-[65px] w-full`}
                                              src={resp.image}
                                              title={resp.title}
                                            />
                                          </div>

                                          <div className="flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(70%_-_10px)]">
                                            <h6 className="text-[16px] md:text-[13px] font-semibold line-clamp-2 ">
                                              {resp.title}
                                            </h6>
                                          </div>
                                        </div>

                                        <div className="flex-[0_0_auto]">
                                          <Image
                                            className="md:h-[15px] md:w-[15px]"
                                            src={"/share.svg"}
                                            height={20}
                                            width={20}
                                            alt="share"
                                          ></Image>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-[10px]">
                                        <p
                                          className={`text-[13px] md:text-[12px] text-[#202121B2] border-r border-r-[#000000] pr-[10px]`}
                                        >
                                          {resp.video_count} Video Sessions
                                        </p>
                                        <p
                                          className={`text-[13px] md:text-[12px] text-[#202121B2] border-r border-r-[#000000] px-[10px]`}
                                        >
                                          {resp.reports_count} Research Reports
                                        </p>
                                        <p
                                          className={`text-[13px] md:text-[12px] text-[#202121B2] px-[10px]`}
                                        >
                                          {resp.whitepaper_count} Whitepapers
                                        </p>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </>
                      )}

                    {webinar_data.message.brand_profile_data &&
                      webinar_data.message.brand_profile_data.length > 0 && (
                        <>
                          <div className="py-[20px]" id={"Brand Profile"} data-section>
                            <Title
                              data={{ title: "Brand Profile" }}
                              isIcon={true}
                              see={`uppercase !font-semibold !text-[#e21b22]`}
                              seeMore={true}
                            />

                            <div className="grid grid-cols-4 md:grid-cols-2 md:gap-[15px] lg:gap-[20px]">
                              {webinar_data.message.brand_profile_data.map(
                                (resp) => {
                                  return (
                                    <div
                                      key={resp.title}
                                      className="cursor-pointer"
                                      onClick={() => click_data(resp, 'brand_profile_data')}
                                    >
                                      <ImageLoader
                                        style={`rounded-[5px] h-[215px] md:h-[140px] w-full`}
                                        src={resp.meta_image}
                                        title={resp.title}
                                      />
                                      <h6
                                        className={`text-[11px] font-[700] py-[2px] line-clamp-1 text-[#E21B22] uppercase nunito`}
                                      >
                                        {resp.company}
                                      </h6>
                                      <p
                                        className={`text-[15px] md:text-[13px] font-semibold line-clamp-2 nunito`}
                                      >
                                        {resp.title}
                                      </p>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </>
                      )}

                    {webinar_data.message.case_studies_data &&
                      webinar_data.message.case_studies_data.length > 0 && (
                        <>
                          <div className="py-[20px]" id={"Case Studies"} data-section>
                            <Title
                              data={{ title: "Case Studies" }}
                              isIcon={true}
                              see={`uppercase !font-semibold !text-[#e21b22]`}
                              seeMore={true}
                            />

                            <div className="grid grid-cols-3 md:grid-cols-1 gap-[15px]">
                              {webinar_data.message.case_studies_data.map(
                                (resp) => {
                                  return (
                                    <div
                                      className="border border-[#e9e9e9] rounded-[10px] p-[10px] cursor-pointer"
                                      onClick={() => click_data(resp, 'case_studies_data')}
                                      key={resp.title}
                                    >
                                      <div className="relative pb-[5px]">
                                        <ImageLoader
                                          style={`rounded-[10px] h-[215px] md:h-[185px] w-full`}
                                          src={resp.image}
                                          title={resp.title}
                                        />
                                        {/* <div className="absolute bottom-[10px] left-0 p-[5px] rounded-[0_10px_0_10px] bg-[#FFE7E7]">
                                          <Image
                                            src={"/pdf_file.svg"}
                                            height={20}
                                            width={20}
                                            alt="pdf"
                                          ></Image>
                                        </div> */}
                                      </div>
                                      <h6
                                        className={`text-[14px] font-semibold  nunito`}
                                      >
                                        {resp.title}
                                      </h6>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </>
                      )}

                    {webinar_data.message.featured_content_data &&
                      webinar_data.message.featured_content_data.length > 0 && (
                        <>
                          <div className="py-[20px]" id={"Featured Content"} data-section>
                            <Title
                              data={{ title: "Featured Content" }}
                              isIcon={true}
                              see={`uppercase !font-semibold !text-[#e21b22]`}
                              seeMore={true}
                            />

                            <FeaturedContent
                              click_data={click_data}
                              cols={"grid-cols-4 md:grid-cols-2"}
                              webinar_data={
                                webinar_data.message.featured_content_data
                              }
                            />
                          </div>
                        </>
                      )}
                  </div>
                </div>
              </div>
            </>
          )}

        {category_route == "webinars" && webinar_data && (
          <>
            <div className="container">
              {/*Tob Banner */}
              <Banner data={webinar_data} click_data={click_data} />

              {/*Webinar Details */}
              <div className="px-5 lg:px-16 py-8">
                {/*Brand Details */}
                <BrandDetails webinar_data={webinar_data} updateShare={updateShare} icons={icons} />

                {/*Overview */}
                <div className="py-[20px]">
                  {webinar_data.overview && (
                    <>
                      <div>
                        <Title data={{ title: "Overview" }} />
                        <p className="text-[18px] font-normal text-[#202121B2] text-justify pt-3">
                          {webinar_data.overview}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/*Key discussion */}
                <div>
                  {webinar_data.key_points &&
                    webinar_data.key_points.length !== 0 && (
                      <KeyDiscussion
                        setShowMore={setShowMore}
                        webinar_data={webinar_data}
                        showMore={showMore}
                      />
                    )}
                </div>

                {/* speakers details */}
                {webinar_data.speakers &&
                  webinar_data.speakers.length !== 0 && (
                    <>
                      <div className="mt-5">
                        <Title data={{ title: "SPEAKERS" }} />
                        <div className="flex no_scroll lg:gap-6 mt-5">
                          {webinar_data.speakers.map((res, i) => (
                            <div key={i}>
                              <SpeakerCard data={res} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                {/* Agenda */}

                {webinar_data.agenda && webinar_data.agenda !== 0 && (
                  <>
                    <div className="mt-5">
                      <Title data={{ title: "AGENDA" }} />

                      <div className="mt-5">
                        <Agenda data={webinar_data.agenda} />
                      </div>
                    </div>
                  </>
                )}

                {/*Who Should Attend */}
                {webinar_data.who_should_attend && (
                  <>
                    <div className="mt-5">
                      <Title data={{ title: "WHO SHOULD ATTEND" }} />

                      <div
                        className={`mt-5 text-[20px] font-medium text-[#202121] bg-[#F2F2F2] rounded-md p-2 w-fit ${inter.className}`}
                      >
                        <p>{webinar_data.who_should_attend}</p>
                      </div>
                    </div>
                  </>
                )}

                {/* contact */}

                {webinar_data.contact_name &&
                  webinar_data.contact_number &&
                  webinar_data.contact_email && (
                    <>
                      <div className="mt-5">
                        <Title data={{ title: "CONTACT US" }} />
                        <div className={`mt-5 ${inter.className}`}>
                          <p className="md:text-base lg:text-lg font-normal break-words">
                            {`For Delegation | ${webinar_data.contact_name} | ${webinar_data.contact_email} | ${webinar_data.contact_number}`}
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                {/* bottom banner */}
                {
                  <div
                    style={{
                      backgroundImage: `url(https://${domain}${webinar_data.bottom_banner_image})`,
                    }}
                    className="p-5 md:p-8 lg:p-10 flex flex-col my-5 bg-cover bg-center"
                  >
                    {webinar_data.bottom_banner_title && (
                    <h3 className="text-[24px] md:text-[28px] lg:text-[30px] font-bold">
                      {webinar_data.bottom_banner_title}
                    </h3>
                    )}
                    {webinar_data.bottom_banner_description && (
                    <p className="text-[18px] md:text-[20px] lg:text-[22px] text-[#8D9D9D]">
                      {webinar_data.bottom_banner_description}
                    </p>
                    )}
                    {webinar_data.date && (
                    <span className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-[#202121] mt-3">
                      {webinar_data.date}
                    </span>
                    )}
                    <button className="px-4 py-2 text-sm md:text-base font-bold w-fit mt-2 webinar-btn rounded-md text-white">
                      {webinar_data.button_name}
                    </button>
                  </div>
                }

                {webinar_data.social_media &&
                  webinar_data.social_media.length !== 0 && (
                    <>
                      <SocialMedia data={webinar_data.social_media} />
                    </>
                  )}
              </div>
            </div>
          </>
        )}

        {category_route == "lead-generation" && webinar_data && (
          <>
            <Banner data={webinar_data} click_data={click_data} />
            <div className="py-[20px] container md:p-[15px] md:py-[10px]">
              <div className="py-[20px]">
                <BrandDetails webinar_data={webinar_data} updateShare={updateShare} icons={icons} />
              </div>

              {webinar_data.overview && (
                <div className="py-[20px]">
                  <Title data={{ title: "Overview" }} />
                  <p className="text-[18px] font-normal text-[#202121B2] text-justify mt-3">
                    {webinar_data.overview}
                  </p>
                </div>
              )}

              <div>
                {webinar_data.key_points &&
                  webinar_data.key_points.length !== 0 && (
                    <KeyDiscussion
                      setShowMore={setShowMore}
                      webinar_data={webinar_data}
                      showMore={showMore}
                    />
                  )}
              </div>

              <div>
                {
                  webinar_data.white_papers && webinar_data.length !== 0 && (
                    <div className="mt-5">
                      <Title data={{ title: 'WHITE PAPERS' }} />
                      <WhitePaper data={webinar_data.white_papers} />
                    </div>
                  )
                }
              </div>

              <div>
                {
                  webinar_data.reports_detail && webinar_data.reports_detail !== 0 && (
                    <div className="mt-5">
                      <Title data={{ title: 'REPORTS' }} />
                      <Reports data={webinar_data.reports_detail} />
                    </div>
                  )
                }
              </div>

              <div>
                {
                  webinar_data.video_detail && webinar_data.length !== 0 && (
                    <div className="mt-5">
                      <Title data={{ title: "VIDEOS" }} />
                      <Video data={webinar_data.video_detail} />
                    </div>
                  )
                }
              </div>

              <div>
                <Form />
              </div>

              {webinar_data.social_media &&
                webinar_data.social_media.length !== 0 && (
                  <>
                    <SocialMedia data={webinar_data.social_media} />
                  </>
                )}
            </div>
          </>
        )}

        {category_route == "brand-profile" && webinar_data && (
          <>
            <Banner data={webinar_data} click_data={click_data} />

            <div className="py-[20px] container md:p-[15px] md:py-[10px]">
              <div className="py-[20px]">
                <BrandDetails webinar_data={webinar_data} updateShare={updateShare} icons={icons} />
              </div>

              {webinar_data.overview && (
                <div className="py-[20px]">
                  <Title data={{ title: "Overview" }} />
                  <p className="text-[18px] font-normal text-[#202121B2] text-justify mt-3">
                    {webinar_data.overview}
                  </p>
                </div>
              )}

              <div className="py-[20px]">
                {webinar_data.key_points &&
                  webinar_data.key_points.length !== 0 && (
                    <KeyDiscussion
                      setShowMore={setShowMore}
                      webinar_data={webinar_data}
                      showMore={showMore}
                    />
                  )}
              </div>

              <div>
                {
                  webinar_data.white_papers && webinar_data.length !== 0 && (
                    <div className="mt-5">
                      <Title data={{ title: 'WHITE PAPERS' }} />
                      <WhitePaper data={webinar_data.white_papers} />
                    </div>
                  )
                }
              </div>


              <div>
                {
                  webinar_data.reports_detail && webinar_data.reports_detail !== 0 && (
                    <div className="mt-5">
                      <Title data={{ title: 'REPORTS' }} />
                      <Reports data={webinar_data.reports_detail} />
                    </div>
                  )
                }
              </div>

              <div>
                {
                  webinar_data.video_detail && webinar_data.length !== 0 && (
                    <div className="mt-5">
                      <Title data={{ title: "VIDEOS" }} />
                      <Video data={webinar_data.video_detail} />
                    </div>
                  )
                }
              </div>

              <div className="py-[20px]">
                <Title data={{ title: "ARTICLES" }} />

                <FeaturedContent
                  click_data={click_data}
                  article={true}
                  cols={"grid-cols-5 md:grid-cols-2"}
                  webinar_data={webinar_data.articles}
                />
              </div>

              {webinar_data.social_media &&
                webinar_data.social_media.length !== 0 && (
                  <>
                    <SocialMedia data={webinar_data.social_media} />
                  </>
                )}
            </div>
          </>
        )}

        {category_route == "case-studies" && webinar_data && (
          <>
            <Banner data={webinar_data} click_data={click_data} />

            <div className="py-[20px] container md:p-[15px] md:py-[10px]">
              <div className="py-[20px]">
                <BrandDetails updateShare={updateShare} icons={icons} webinar_data={webinar_data} />
              </div>


              <div className="lg:flex gap-5 md:pt-[10px] lg:pt-[20px]">
                <SideMenu side_menu={side_menu} activateSection={activateSection} activeIndex={activeIndex} />

                <div className={`md:py-[15px] flex-[0_0_calc(80%_-_15px)]`}>
                  {(webinar_data.content_1 && webinar_data.content_1.length > 0) &&
                    webinar_data.content_1.map(res => {
                      return (
                        <div id={res.title} data-section className="py-[20px]">
                          <Title data={{ title: res.title }} />
                          <p className="text-[18px] font-normal text-[#202121B2] text-justify mt-3">
                            {res.description}
                          </p>
                        </div>
                      )
                    })
                  }

                  {webinar_data.video_id && <div className="py-[20px]">

                  </div>}


                  {(webinar_data.content_2 && webinar_data.content_2.length > 0) &&
                    webinar_data.content_2.map(res => {
                      return (
                        <div id={res.title} data-section className="py-[20px]">
                          <Title data={{ title: res.title }} />
                          <p className="text-[18px] font-normal text-[#202121B2] text-justify mt-3">
                            {res.description}
                          </p>
                        </div>
                      )
                    })
                  }
                </div>
              </div>

              <div className="py-[20px]">
                <Title data={{ title: "ARTICLES" }} />

                <FeaturedContent
                  click_data={click_data}
                  article={true}
                  cols={"grid-cols-5 md:grid-cols-2"}
                  webinar_data={webinar_data.articles}
                />
              </div>

              {webinar_data.social_media &&
                webinar_data.social_media.length !== 0 && (
                  <>
                    <SocialMedia data={webinar_data.social_media} />
                  </>
                )}

            </div>
          </>
        )}

        {category_route == "featured-content" && (webinar_data && webinar_data.message) && <>
          {(webinar_data.message.article_detail && webinar_data.message.article_detail.length > 0) && <div>
            <div className={`w-full lg:h-[375px] `}><ImageLoader style={`lg:h-full md:object-contain w-full`} src={webinar_data.message.article_detail[0].image ? webinar_data.message.article_detail[0].image : webinar_data.message.article_detail[0].thumbnail_image} title={webinar_data.message.article_detail[0]['title']} /></div>

            <div className="container">
              <div className="py-[20px]">
                <h1 className="text-[22px] md:text-[16px] font-semibold">{webinar_data.message.article_detail[0]['title']}</h1>



                <div className={`flex items-center justify-between py-[20px] md:py-[10px]`}>
                  <div className='flex gap-4 items-center'>
                    <div className='flex lg:gap-4 items-center md:gap-[10px] md:justify-between '>
                      <div className='flex md:block items-center gap-2'><Image height={11} width={11} alt={"image"} src={'/views.svg'} className='md:m-auto' /><span className='text-[12px] md:text-[10px] gray-text'>{webinar_data.message.article_detail[0].views ? webinar_data.message.article_detail[0].views : webinar_data.message.article_detail[0].no_of_views ? webinar_data.message.article_detail[0].no_of_views : 1} Views</span></div>
                      <div className='flex  items-center gap-2'><Image height={11} width={13} alt={"image"} className='md:h-[13px] md:w-[11px] md:m-auto' src={'/shares.svg'} /><span className='md:text-[10px] text-[12px] gray-text'>{webinar_data.message.article_detail[0].no_of_shares + ' shares'}</span></div>
                      <div className='flex md:block items-center gap-2'><Image height={12} width={12} alt={"image"} src={'/time.svg'} className='md:m-auto' /><span className='text-[12px] md:text-[10px] gray-text'>{webinar_data.message.article_detail[0].read_time} </span></div>
                    </div>
                  </div>

                  <div className={`flex items-center gap-[8px] flex-wrap`}>
                    {webinar_data.message.article_detail[0].publisher && webinar_data.message.article_detail[0].publisher.length != 0 &&
                      webinar_data.message.article_detail[0].publisher.map((r, index) => {
                        return (
                          <div key={index} className='flex gap-[8px] items-center inner_line'>
                            <Image className='rounded-full object-contain w-[30px] h-[30px]' priority={true} src={(r.avatar && r.avatar != '' && r.avatar != '') ? check_Image(r.avatar) : '/profit.svg'} height={43.12} width={43.12} alt={"image"} />
                            <div className='block'>
                              <h6 className={`font-[700] nunito text-[12px]`}>{r.full_name}</h6>
                            </div>

                          </div>
                        )
                      })
                    }
                  </div>


                  {typeof window !== "undefined" && <div className='flex items-center gap-[15px] pr-[10px]'>
                    {icons && <Dropdowns noBg={true} updateShare={(data) => updateShare(data)} share={true} link={webinar_data.message.article_detail[0]} type={'articles'} width={'w-[170px]'} data={icons} />}
                  </div>}
                </div>

                <h6 className="text-[20px] pb-[15px] md:pb-[10px] md:text-[16px] font-semibold nunito">{webinar_data.message.article_detail[0]['blog_intro']}</h6>

                <div dangerouslySetInnerHTML={{ __html: webinar_data.message.article_detail[0].content }} id={`innerHtml`} className={`contents  ${'innerHtml'} `} />


                <div className='flex flex-row gap-3 items-center justify-center py-5'>
                  {socials.map((res, index) => {
                    return (
                      <div key={index} onClick={() => updateShare(webinar_data.message.article_detail[0])}>
                        {
                          res.name == 'fb' ? <FacebookShareButton url={`${websiteUrl + webinar_data.message.article_detail[0].route}`}>
                            <div key={index} className={`rounded-full bg-light-gray p-[10px]`}>
                              <Image src={res.icon} alt={res.name} height={25} width={20} />
                            </div>
                          </FacebookShareButton>
                            : res.name == 'ws' ? <WhatsappShareButton url={`${websiteUrl + webinar_data.message.article_detail[0].route}`}>
                              <div key={index} className={`rounded-full bg-light-gray p-[10px]`}>
                                <Image src={res.icon} alt={res.name} height={25} width={20} />
                              </div>
                            </WhatsappShareButton>
                              : res.name == 'linkedin' ? <LinkedinShareButton url={`${websiteUrl + webinar_data.message.article_detail[0].route}`}>
                                <div key={index} className={`rounded-full bg-light-gray p-[10px]`}>
                                  <Image src={res.icon} alt={res.name} height={25} width={20} />
                                </div>
                              </LinkedinShareButton>
                                : res.name == 'twitter' ? <TwitterShareButton url={`${websiteUrl + webinar_data.message.article_detail[0].route}`}>
                                  <div key={index} className={`rounded-full bg-light-gray p-[10px]`}>
                                    <Image src={res.icon} alt={res.name} height={25} width={20} />
                                  </div>
                                </TwitterShareButton>
                                  : null
                        }

                      </div>
                    )
                  })}
                </div>
              </div>

              {webinar_data.message.other_articles_data &&
                webinar_data.message.other_articles_data.length > 0 && (
                  <>
                    <div className="py-[20px]">
                      <Title
                        data={{ title: "ARTICLES" }}

                      />

                      <FeaturedContent
                        click_data={click_data}
                        article={true}
                        cols={"grid-cols-5 md:grid-cols-2"}
                        webinar_data={
                          webinar_data.message.other_articles_data.slice(0, 5)
                        }
                      />
                    </div>
                  </>
                )}

              {webinar_data.message.featured_content_data &&
                webinar_data.message.featured_content_data.length > 0 && (
                  <>
                    <div className="py-[20px]">
                      <Title
                        data={{ title: "Featured Content" }}

                      />

                      <FeaturedContent
                        click_data={click_data}
                        cols={"grid-cols-5 md:grid-cols-2"}
                        webinar_data={
                          webinar_data.message.featured_content_data.slice(0, 5)
                        }
                      />
                    </div>
                  </>
                )}

              <div className="py-[20px]">
                <Form />
              </div>

            </div>
          </div>}
        </>}
      </RootLayout>
    </>
  );
};

export default index;

export async function getServerSideProps({ params }) {
  let page_route = await params.route;
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

  let webinar_data;
  let category_route =
    page_route && page_route.length > 0 ? page_route[0] : null;
  if (page_route && page_route.length > 1) {
    const param = {
      route: `${page_route[0]}/${page_route[1]}`,
      category: category_route,
      // route: "webinars/reimagine-next--the-future-of-retail",
    };

    const res = await get_web_special_detail(param);
    webinar_data = res.message;
  } else {
    webinar_data = null;
  }

  return {
    props: { page_route, webinar_data, category_route },
  };
}
