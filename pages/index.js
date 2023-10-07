import Image from 'next/image'
import RootLayout from '@/layouts/RootLayout'
// import { useDispatch, useSelector } from 'react-redux'
// import { useRouter } from 'next/router'
// import { useEffect } from 'react';
// import {setRoutes} from 'redux/actions/routesAction';
// import PageData from '@/libs/buider'
// import HomePageBuilder from '@/components/Builders/HomePageBuilder';
import { HomePage, getAds, newsLanding, checkMobile, getList } from '../libs/api';
import { useEffect, useState, useRef } from 'react';
import SEO from '@/components/common/SEO'
import dynamic from 'next/dynamic'
import TopStories from '@/components/Landing/TopStories'
import ImageContainer from '@/components/Landing/ImageContainer'
import SectionList from '@/components/Landing/SectionList'
import LatestNews from '@/components/Landing/LatestNews'
import AdsBaner from '@/components/Baners/AdsBaner'
import IRPrime from '@/components/Landing/IRPrime'
import Subscribe from '@/components/Landing/Subscribe'
import BulletList from '@/components/Landing/BulletList'
import TrendingBox from '@/components/Landing/TrendingBox'
import Title from '@/components/common/Title'
import Video from '@/components/Video/Video'
import CustomSlider from '@/components/Sliders/CustomSlider';
// import ListSlider from '../Sliders/ListSlider'
// import ImageGroupEvents from '../Landing/ImageGroupEvents'
// import EventList from '../Events/EventList'
// import Cards from '../common/Cards'
// import List from '../common/List'
// import MultiCarousel from '../Sliders/MultiCarousel'
// import EventCards from '../Events/EventCards'
// import { useSelector } from 'react-redux'
// import SectionBox from '../Category/SectionBox'
// import Tabs from '../Landing/Tabs'
// import CardCarousel from '../Sliders/CardCarousel'

const List = dynamic(() => import('@/components/common/List'))
const Cards = dynamic(() => import('@/components/common/Cards'))
const CardCarousel = dynamic(() => import('@/components/Sliders/CardCarousel'))
const ImageGroupEvents = dynamic(() => import('@/components/Landing/ImageGroupEvents'))
const EventList = dynamic(() => import('@/components/Events/EventList'))
const ListSlider = dynamic(() => import('@/components/Sliders/ListSlider'));
const Card = dynamic(() => import('@/components/Bookstore/Card'))
export default function Home({ data }) {
  // console.log(data);
  const [value, setValue] = useState([])
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([])
  const [ads,setAds] = useState()
  let page_no = 1;



  // const userInfo = useSelector(s=>s.user);
  // const dispatch = useDispatch()

  function get_customer_info() {
    let users = {}
    users.cust_email = localStorage['userid'] ? localStorage['userid'] : undefined;
    users.cust_name = localStorage['full_name'] ? localStorage['full_name'] : undefined;
    users.customer_id = localStorage['customer_id'] ? localStorage['customer_id'] : undefined;
    // dispatch(userAction(users));
  }

  const getAd = async () => {
    let params = { doctype: 'Web Page Builder', page_type: 'Home' }
    const res = await getAds(params);
    const ads = res.message;
    if(ads){
      setAds(ads)
    }
  }

  let cardref = useRef();
  let no_product = false;

  useEffect(() => {
    if (data && data.page_content && data.page_content.length != 0) {
      setValue(data.page_content)
      // console.log('data1234567',data);
      // console.log(ads)
    }

    getNewsLetters();
    getBooks();
    getAd();
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries[0].intersectionRatio <= 0) return;
      if (!no_product) {
        page_no > 1 ? getPageData() : null
        page_no = page_no + 1
      }
    });

    intersectionObserver?.observe(cardref?.current);

    return () => {
      cardref?.current && intersectionObserver?.unobserve(cardref?.current)
    }
  }, [])
  // console.log(data)

  const getNewsLetters = async () => {
    let param = {
      fields: ['custom_day', 'name', 'custom_category', 'custom_description', 'custom_image_', 'custom_title', 'route']
    }
    let value = await newsLanding(param);
    let data = value.message;
    if (data && data.length != 0) {
      setNews(data);
    }
  }




  const getPageData = async () => {
    // console.log('load...',)
    setLoading(true)
    if (page_no > 1) {
      const param = {
        // "application_type": "mobile",
        "route": "home",
        page_no: page_no,
        page_size: 4
      }
      const resp = await HomePage(param);
      if (resp.message && resp.message.page_content && resp.message.page_content.length != 0) {
        setTimeout(() => {
          setValue(d => d = [...d, ...resp.message.page_content])
          setLoading(false)
        }, 200);
        console.log(resp.message.page_content)
      } else {
        no_product = true;
        setLoading(false)
      }
    }

  }

  //   function WriteCookie() {
  //     var now = new Date();
  //     now = now.getTime() + 300;

  //     document.cookie="name=john";
  //     document.cookie = "expires=" + now + ";"
  //     console.log ("Setting Cookies : " + "name=john"  );
  //  }

  const [isMobile, setIsMobile] = useState()
  useEffect(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [])

  const checkIsMobile = async () => {
    let isMobile = await checkMobile();
    setIsMobile(isMobile);
  }

  const getBooks = async () => {
    const params = {
      doctype: 'Product',
      fields: ['name', 'route', 'item', 'image'],
      page_no: 1,
      page_size: 5
    };
    const resp = await getList(params);
    // console.log(resp);
    if (resp.message && resp.message.length != 0) {
      setBooks(resp.message)
    } 
  }



  return (
    <>
      {/*  isLast={index == value.length - 1} */}
      <RootLayout data={data} isLanding={true} head={''} homeAd={ads ? ads : null}>
        <SEO title={'India Reatiling'} siteName={'India Reatiling'} description={'This is IndiaRetailing and its about news and articles based on the popular site.'} />
        {(value && value.length != 0) && value.map((data, i) => {
          return (
            // <HomePageBuilder news={news ? news : []} key={index} isLast={index == value.length - 1} i={index} val={value} data={res} loadMore={() => load()} />
            <div key={i} className={`py-[20px] ${data.section == 'PS-23-00094' ? 'lg:p-5 bg-[#F8F9FA]' : data.section == 'PS-23-00150' ? 'border-b border-[#d4d8d8] container' : data.section == 'PS-23-00120' ? 'bg-[#000] lg:my-5 lg:p-[20px_40px] md:py-[20px] md:h-[350px] no_scroll' : data.section == 'PS-23-00130' ? 'lg:bg-[#f1f1f1] p-5 lg:my-5' : 'container'}  md:p-[15px] md:py-[10px] lg:flex gap-5`}>
              {(data.layout_json && JSON.parse(data.layout_json).length != 0) && JSON.parse(data.layout_json).map((res, index) => {
                return (
                  // || i == 5
                  <div key={index} className={`${res.class == 'flex-[0_0_calc(100%_-_0px)]' ? 'w-full' : res.class} ${(data.section != 'PS-23-00094') ? 'md:mb-[20px]' : 'container'}  ${((data.section == 'PS-23-00130') && !isMobile) ? 'container' : ''} `}>
                    {(res.components && res.components.length != 0) && res.components.map((c,c_index)=> {
                      return (
                        <div key={c.component_title} className={`${c.component_title == "Top 3 Stories" ? 'top3 lg:justify-center md:gap-5' : ''}`}>
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Top 3 Stories") && <TopStories data={data.data[c.cid].data.slice(0,3)} />}
                          {(c.component_title == "In Focus" && c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_data_type == 'Location') && <div className='lg:flex gap-5'>
                            <div className={``}>
                              <ImageContainer data={data.data[c.cid].data[0]} height={"h-[350px] md:h-[250px]"} width={'w-full'} />
                              <SectionList data={data.data[c.cid].data.slice(1, 4)} /></div>
                          </div>}
                          {(c.component_title == "Latest News" && c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_data_type == 'Location') && <>
                            <Title data={{ title: 'Latest News' }} />
                            {isMobile ? <><div className='no_scroll md:mb-[15px]'><LatestNews height={'h-[190px]'} width={'w-full'} data={data.data[c.cid].data.slice(0, 4)} /></div><LatestNews height={'h-[190px]'} width={'w-full'} isList={true} data={data.data[c.cid].data.slice(4, 6)} /></> : <LatestNews height={'h-[222px]'} width={'w-full'} data={data.data[c.cid].data.slice(0, 4)} />}
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Advertisement") && <AdsBaner data={data.data[c.cid].data[0]} height={'h-[250px] w-[300px] object-contain'} />}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IR Exclusive") && <IRPrime data={data.data[c.cid].data} />}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IR Exclusive" && !isMobile) && <Subscribe height={"h-[162px]"} data={news} width={"w-full"} />}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Web Special" && c.component_data_type == 'Location') && <>
                            <div className='lg:w-[calc(70%_-_10px)]'><Title data={{ title: c.component_title }} /></div>
                            <div className={`lg:flex gap-5`}>
                              <div className='lg:flex flex-wrap justify-between flex-[0_0_calc(70%_-_10px)]'>
                                <div className='flex-[0_0_calc(55%_-_10px)]'><ImageContainer isWeb={true} data={data.data[c.cid].data[0]} height={'h-[250px]'} width={'w-[500px]'} /></div>
                                <div className={`${isMobile ? '' : 'border_right border_left px-[20px] h-[250px] flex-[0_0_calc(45%_-_10px)]'}`}><BulletList data={data.data[c.cid].data.slice(1, 6)} /></div>
                                <div className={` flex border-t border-[#d4d8d8] pt-[15px] md:hidden`}><BulletList isBorder={true} data={data.data[c.cid].data.slice(6, 10)} /></div>
                              </div>
                              <div className='md:my-[15px] md:hidden'><AdsBaner data={{ ad_image: '/ads_baner.png' }} height={'h-[250px]'} width={'w-[300px]'} /></div>
                            </div>
                            <div className={`lg:flex no_scroll lg:my-[15px] md:my-[10px] gap-[10px] lg:flex-wrap lg:justify-between`}><Cards noPrimaryText={true} titleOnly={true} contentHeight={'pt-[10px]'} isHome={'/'} data={data.data[c.cid].data.slice(10, 15)} check={true} height={'h-[125px] w-full'} border_none={true} flex={'flex-[0_0_calc(20%_-_10px)] md:flex-[0_0_calc(60%_-_10px)]'} /></div>
                          </>}

                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Trending" && !isMobile) && <>
                            <Title data={{ title: c.component_title }} />
                            <div className='lg:flex justify-between items-center gap-[10px]'>
                              <div className={`flex gap-[10px] flex-[0_0_calc(4%_-_10px)]`}><TrendingBox icons={'left'} parentElement={'trending'} /></div>
                              <div className={`flex gap-[10px] overflow-auto trending`}><TrendingBox data={data.data[c.cid].data} /></div>
                              <div className={`flex gap-[10px] flex-[0_0_calc(4%_-_10px)] justify-end`}><TrendingBox icons={'right'} parentElement={'trending'} /></div>
                            </div>
                          </>}

                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Leaders Ink") && <>
                            <Title data={{ title: c.component_title }} />
                            {data.data[c.cid].data &&
                              <div className='overflow-auto scrollbar-hide gap-[15px] flex'>
                                {/* <CardCarousel isHome={'/'} data={data.data[c.cid].data} cardClass={'h-[310px] md:h-[275px] flex-[0_0_calc(33.333%_-_15px)] md:flex-[0_0_calc(70%_-_10px)]'} imgClass={'lg:h-[185px] md:h-[140px] w-full'} /> */}
                               <CustomSlider hide_scroll_button={true} slider_child_id={'leaders_ink'+c_index} isHome={'/'} data={data.data[c.cid].data} cardClass={'h-[310px] md:h-[260px] flex-[0_0_calc(25%_-_15px)] md:flex-[0_0_calc(75%_-_10px)]'} 
                                 imgClass={'lg:h-[185px] md:h-[150px] w-full'} title_class={'min-h-[35px] line-clamp-2'}/>
                              </div>}

                            {/* <div className='none leaders'><MultiCarousel isHome={'/categories/'} perView={3} check={true} none={true} data={data.data[c.cid].data} cardHeight={'h-[310px]'} card_width={"285px !important"} height={"h-[185px]"} width={"w-full"} type={'profile'} /></div>} */}
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Research") && <>
                            {/* route={'/categories/'} seeMore={true} */}
                            <Title data={{ title: c.component_title }} />
                            {data.data[c.cid].data && isMobile ? <div className='mb-[10px] research'><ListSlider route={'/'} noDots={true} auto={false} data={data.data[c.cid].data} /></div> :
                              <div className='overflow-auto scrollbar-hide gap-[15px] flex '>
                                {/* <CardCarousel isHome={'/'} data={data.data[c.cid].data} cardClass={'h-[310px] md:h-[220px] flex-[0_0_calc(70%_-_15px)] md:flex-[0_0_calc(50%_-_10px)]'} imgClass={'lg:h-[185px] md:h-[140px] w-full'} /> */}
                                <CustomSlider hide_scroll_button={true} slider_child_id={'research'+c_index} isHome={'/'} data={data.data[c.cid].data} cardClass={'h-[310px] md:h-[275px] flex-[0_0_calc(75%_-_15px)] md:flex-[0_0_calc(70%_-_10px)]'} 
                                 imgClass={'lg:h-[185px] md:h-[140px] w-full'} title_class={'min-h-[35px]'}/>
                                </div>

                              // <div className={`pr-[30px] none research`}><MultiCarousel isHome={'/categories/'} none={true} check={true} cardHeight={'h-[310px]'} perView={2} noPlay={true} data={data.data[c.cid].data} card_width={"285px !important"} height={"h-[185px]"} width={'w-full'} type={'card'} /></div>
                            }
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IR Video Wall") && <>
                            <Title data={{ title: c.component_title }} textClass={'text-white'} see={'text-white'} route={'/video'} seeMore={true} />
                            <><Video data={data.data[c.cid].data} isHome={'/video/'} isBg={true} big={true} imgClass={'h-[460px] w-full md:h-[200px]'} /></>
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Retail with Rasul Bailay") && <>
                            <Title data={{ title: c.component_title }} textClass={'text-white'} />
                            <><Video data={isMobile ? data.data[c.cid].data.slice(0, 1) : data.data[c.cid].data} isHome={'/video/'} vh={'h-[205px]'} isBg={true} imgClass={'h-[150px] w-full md:h-[200px]'} /></>
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IR Prime Videos") && <>
                            <Title data={{ title: c.component_title }} textClass={'text-white'} />
                            <><Video data={isMobile ? data.data[c.cid].data.slice(0, 1) : data.data[c.cid].data} vh={'h-[205px]'} isHome={'/video/'} isBg={true} imgClass={'h-[150px] w-full md:h-[200px]'} /></>
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IR Store Videos") && <>
                            <Title data={{ title: c.component_title }} textClass={'text-white'} />
                            <><Video data={isMobile ? data.data[c.cid].data.slice(0, 1) : data.data[c.cid].data} vh={'h-[205px]'} isHome={'/video/'} isBg={true} imgClass={'h-[150px] w-full md:h-[200px]'} /></>
                          </>}

                          {/* {(resp.component_title == "AdsBaner" && resp.component_type == "Ad3" && resp.data) && <><AdsBaner Class={'flex pt-[10px] flex-col justify-center items-center'} height={'h-full'} width={'w-full'} data={resp.data} /></>} */}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Fashion & Lifestyle") && <>
                            <Title data={{ title: c.component_title }} route={'/categories/fashion-lifestyle'} seeMore={true} />
                            {/* imgWidth={"h-[160px]"} */}
                            <div className={`flex gap-5 md:gap-[5px] flex-wrap`}><List primary_pb={'lg:pb-[5px]'} hash_bg={'pt-[10px]'} titleClamp={'line-clamp-2'} isHome={'/categories/'} imgFlex={'flex-[0_0_calc(40%_-_10px)] md:flex-[0_0_calc(45%_-_10px)]'} data={isMobile ? data.data[c.cid].data.slice(0, 3) : data.data[c.cid].data} check={true} flex={'flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'} imgWidth={"h-[135px]"} imgHeight={"w-[215px]"} borderRadius={"rounded-[10px]"} /></div>
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Beauty & Wellness") && <div className='md:bg-[#F3F4F6] md:p-[10px] md:rounded-[5px]'>
                            <Title data={{ title: c.component_title }} route={'/categories/beauty-wellness'} seeMore={true} />
                            <div className={`${isMobile ? '' : 'border'} p-[10px] rounded-[5px]`}><List titleClamp={'line-clamp-2'} isHome={'/categories/'} imgFlex={'flex-[0_0_calc(25%_-_10px)]'} data={data.data[c.cid].data.slice(0, 4)} check={true} imgWidth={"w-[100px]"} imgHeight={"h-[73px]"} borderRadius={"rounded-[5px]"} isTop={isMobile ? false : true} isReverse={isMobile ? true : false} isBB={true} /></div>
                          </div>}

                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Food & Beverage") && <>
                            <Title data={{ title: c.component_title }} />
                            <div className={`${isMobile ? 'no_scroll' : 'grid gap-5  grid-cols-5'}`}><Cards isHome={'/'} cardClass={"h-[300px] md:h-[290px]"} check={true} data={data.data[c.cid].data} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[180px]"} width={"w-full"} flex={'md:flex-[0_0_calc(75%_-_15px)]'} isBorder={true} /></div>
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && (c.component_title == "E-Commerce" || c.component_title == "People" || c.component_title == "D2C Buzz")) && <div className={`${isMobile ? '' : 'border p-[10px_15px] rounded-[10px]'}`}>
                            {/* {isMobile ? <>
                                        
                                        <div className='flex'><Tabs categories={["E-Commerce","People","D2C Buzz"]} setTabs={(data) => setTab(data)} tab={tab} /></div>
                                        {(tab == c.component_title && data.data[c.cid].data) && <div className={`border p-[10px] rounded-[5px]`}><List check={true} titleClamp={'line-clamp-2'} isHome={'/news/'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} data={data.data[c.cid].data} imgWidth={"w-full"} imgHeight={"h-[125px]"} borderRadius={"rounded-[10px]"} /></div>}                                       
                                        
                                        </> : <>
                                            <Title data={{ title: c.component_title }} />
                                            <div className={`border p-[10px] rounded-[5px]`}><List check={true} titleClamp={'line-clamp-2'} isHome={'/news/'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} data={data.data[c.cid].data} imgWidth={"w-full"} imgHeight={"h-[125px]"} borderRadius={"rounded-[10px]"} /></div>
                                        </>

                                        } */}
                            <Title data={{ title: c.component_title }} route={c.component_title == "E-Commerce" ? '/categories/e-commerce' : c.component_title == "People" ? '/categories/people' : c.component_title == "D2C Buzz" ? '/categories/d2c-buzz' : null} seeMore={true} />
                            {/* //  h-[144px] contentWidth={'lg:gap-[3px]'}  */}
                            <div className={` lg:grid lg:gap-[10px] md:flex md:flex-col md:gap-[5px]`}><List primary_pb={'lg:pb-[5px]'} hash_bg={'pt-[10px]'} check={true} titleClamp={'line-clamp-2'} line={'line-clamp-2'} isHome={'/'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} flex={'items-center'} data={data.data[c.cid].data} imgWidth={"w-full"} imgHeight={"h-[135px] md:h-[115px]"} borderRadius={"rounded-[7px]"} /></div>
                          </div>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Shopping Centers") && <>
                            <Title data={{ title: c.component_title }} route={'/categories/shopping-centers'} seeMore={true} />
                            <div className={`md:flex md:flex-col md:gap-[5px]`}><List isHome={'/'} flex={'items-center lg:mb-[8px] lg:gap-5'} imgFlex={'flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(40%_-_10px)]'} contentWidth={'lg:flex-[0_0_calc(60%_-_10px)] lg:gap-[5px]'} titleClamp={'line-clamp-2'} line={'line-clamp-2 md:line-clamp-1'} data={data.data[c.cid].data} check={true} fullWidth={true} imgWidth={"w-full"} imgHeight={"h-[130px] md:h-[110px]"} borderRadius={"rounded-[5px]"} /></div>
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Podcast") && <div className={`border md:mt-[15px] p-[10px] rounded-[5px]`}>
                            <Title data={{ title: c.component_title }} route={'/podcast'} seeMore={true} />
                            <List titleClamp={'md:pt-[0px]'} descLine={'line-clamp-2'} isHome={'/podcast/'} isDesc={true} data={isMobile ? data.data[c.cid].data : data.data[c.cid].data.slice(0, 1)} imgWidth={"w-full "} imgFlex={'lg:flex-[0_0_calc(27%_-_10px)] md:flex-[0_0_calc(30%_-_10px)]'} imgHeight={"h-[80px] md:h-[75px]"} check={true} isBB={true} borderRadius={"rounded-[6px]"} />
                          </div>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Privilege Members Corner") && <>
                            <Title data={{ title: c.component_title }} route={'/video'} seeMore={true} />
                            <Video imgClass={'h-[210px] md:h-[190px] w-full'} isHome={'/video/'} vh={'h-[265px] md:h-[245px]'} data={data.data[c.cid].data} />
                          </>}
                          {/* {(resp.component_title == "AdsBaner" && resp.component_type == "Ad4" && resp.data) && <><AdsBaner Class={'flex pt-[10px] flex-col justify-center items-center'} data={resp.data} height={"100px"} /></>} */}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && (c.component_title == "Supply Chain" || c.component_title == "Marketing")) && <>
                            <Title data={{ title: c.component_title }} route={c.component_title == "Supply Chain" ? '/categories/supply-chain' : c.component_title == "Marketing" ? '/categories/marketting' : null} seeMore={true} />
                            <div className='md:flex md:flex-col md:gap-[5px]'><List isHome={'/'} primary_pb={'lg:pb-[5px]'} mb={true} data={data.data[c.cid].data} titleClamp={'line-clamp-2'} line={'line-clamp-1 md:line-clamp-1'} hash_bg={'pt-[10px] md:pt-[10px]'} check={true} imgFlex={'flex-[0_0_calc(35%_-_10px)] md:flex-[0_0_calc(40%_-_10px)]'} imgWidth={"w-full"} imgHeight={"h-[125px] md:h-[115px]"} borderRadius={"rounded-[10px]"} /></div>
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Technology") && <>
                            <Title data={{ title: c.component_title }} route={'/categories/technology'} seeMore={true} />
                            <div className={'border p-[10px] rounded-[5px]'}><List line={'line-clamp-1'} isHome={'/'} titleClamp={'line-clamp-2'} check={true} data={data.data[c.cid].data} imgFlex={'flex-[0_0_calc(30%_-_10px)]'} imgWidth={"w-full"} imgHeight={"h-[92px] md:h-[80px]"} isBB={true} isTop={true} borderRadius={"rounded-[10px] md:rounded-[5px]"} /></div>
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Case Studies") && <>
                            <Title data={{ title: c.component_title }} route={'/categories/case-studies'} seeMore={true} />
                            <div className={`lg:flex no_scroll lg:gap-5`}>
                              {/* <Cards check={true} isHome={'/'} data={data.data[c.cid].data} cardClass={"h-[300px] "} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[180px]"} width={"w-full"} flex={'basis-1/3 md:flex-[0_0_calc(65%_-_10px)]'} isBorder={true} /> */}
                              <CustomSlider hide_scroll_button={true} slider_child_id={'case_studies'+c_index} isHome={'/'} data={data.data[c.cid].data} cardClass={'h-[310px] md:h-[275px] flex-[0_0_calc(33.33%_-_15px)] md:flex-[0_0_calc(65%_-_10px)]'} 
                                 imgClass={'lg:h-[185px] md:h-[140px] w-full'} title_class={'min-h-[35px]'}/>
                              </div>
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Photo Essays") && <>
                            <Title data={{ title: c.component_title }} route={'/categories/photo-essays'} seeMore={true} />
                            <div className='overflow-auto scrollbar-hide gap-[15px] flex '>
                              {/* <CardCarousel isHome={'/'} data={data.data[c.cid].data} cardClass={'lg:h-[300px]  flex-[0_0_calc(70%_-_15px)] '} imgClass={'h-[175px]  w-full'} /> */}
                              <CustomSlider hide_scroll_button={true} slider_child_id={'photo_essays'+c_index} isHome={'/'} data={data.data[c.cid].data} cardClass={'h-[310px] md:h-[275px] flex-[0_0_calc(33%_-_15px)] md:flex-[0_0_calc(65%_-_10px)]'} 
                                 imgClass={'lg:h-[185px] md:h-[140px] w-full'} title_class={'min-h-[35px]'}/>
                              </div>
                            {/* <div className='photo'><MultiCarousel isHome={'/categories/'} check={true} cardHeight={'h-[310px]'} data={data.data[c.cid].data} height={"h-[175px]"} width={'w-full'} perView={2} noPlay={true} none={true} type={'card'} /></div> */}
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IMAGES Group Events") && <>
                            <Title data={{ title: c.component_title }} route={'/events'} seeMore={true} />
                            {isMobile ? <div className='eventSlide'><ListSlider route={'/events/'} isEvent={true} noDots={true} auto={false} data={data.data[c.cid].data} /></div> : <div className='flex gap-5 lg:pb-[30px]'>
                              <div className={`flex-[0_0_calc(30%_-_10px)]`}><ImageGroupEvents isHome={'/events/'} data={data.data[c.cid].data.slice(0, 1)} height={"h-[85%]"} width={"w-[80%]"} /></div>
                              <div className={`flex flex-wrap gap-[20px]`}><EventList isRoute={'/events/'} check={false} data={data.data[c.cid].data.slice(1, 7)} height={"h-[160px] rounded-[0px]"} width={"w-full"} flex={'flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'} isHome={true} /></div>
                            </div>}
                          </>}
                          {/* {(resp.component_title == "Card" && resp.component_type == "card3" && resp.data) && <>
                                        <Title data={resp.data} />
                                        <div className={`flex flex-wrap gap-5 justify-between`}><Cards data={resp.data.data} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[330px]"} width={"w-full"} flex={'flex-[0_0_calc(20%_-_20px)] md:flex-[0_0_calc(50%_-_10px)]'} isBorder={true} /></div>
                                    </>} */}
                          {(c.cid && books && books.length != 0 && c.component_title == "Book Store") && <>
                            <Title data={{ title: c.component_title }} route={'/bookstore'} seeMore={true} />
                            <div className={`lg:grid lg:gap-5 lg:grid-cols-5 no_scroll`}><Card isHome={true} imgClass={'lg:h-[300px] md:h-[225px] mouse'} check={true} flex={'md:flex-[0_0_calc(50%_-_10px)]'} data={books} boxShadow={true} /></div>
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Reconnect") && <>
                            <Title data={{ title: c.component_title }} route={'/categories/reconnect'} seeMore={true} />
                            <div className={`lg:flex lg:gap-5 lg:justify-between no_scroll`}><Cards check={true} isHome={'/'} flex={'flex-[0_0_calc(33.333%_-_15px)] md:flex-[0_0_calc(85%_-_10px)]'} cardClass={'h-[310px] md:h-[290px]'} data={isMobile ? data.data[c.cid].data : data.data[c.cid].data.slice(0, 3)} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[180px] md:h-[160px]"} width={"w-full"} isBorder={true} /></div>
                          </>}
                          {(c.cid && c.component_title == "Image" && !isMobile) && <div className='pt-[30px]'><AdsBaner Class={'flex pt-[10px] flex-col justify-center items-center'} height={"h-[300px]"} width={'w-full'} data={{ ad_image: '/ads_bike.png' }} /></div>}
                        </div>
                      )
                    })}
                    {/* {(res.u_id) &&  data[u_id]} */}
                  </div>
                )
              })}
            </div>
          )
        })}
        <div className='more h-[30px]' ref={cardref}></div>
        {loading && <div id="wave">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>}
      </RootLayout>
    </>
  )
}


export async function getStaticProps() {
  // page_content
  const param = {
    // "application_type": "mobile",
    "route": "home",
    page_no: 1,
    page_size: 10
  }
  const resp = await HomePage(param);
  const data = await resp.message;
  return {
    props: { data }, revalidate: 4
  }

}