import RootLayout from '@/layouts/RootLayout'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Title from '@/components/common/Title';
import NewsCard from '@/components/Newsletter/NewsCard';
import Tabs from '@/components/common/Tabs';
import AlertPopup from '@/components/common/AlertPopup';
import { get_all_newsletter, newsDetail, newsLanding, getAds, newsletter_category, newsletter_category_list, getList } from '@/libs/api';
import { check_Image } from '@/libs/common';
import { useRouter } from 'next/router';
import SEO from '@/components/common/SEO'
import NewsList from '@/components/Newsletter/NewsList';
import SubscribeNews from '@/components/Newsletter/SubscribeNews';
import NoProductFound from '@/components/common/NoProductFound';
import AlertUi from '@/components/common/AlertUi';
import { Montserrat, Inter } from 'next/font/google'
import format from 'date-fns/format'

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  display: "block",
  preload: true,
  style: 'normal',
  subsets: ["latin"],
  variable: '--font-inter'
})
export default function NewsLists({ data, Id }) {
  const tabs = [{ name: 'Current edition' }, { name: 'All Newsletter' }]
  const [isChecked, setIsChecked] = useState(false);
  const [allNewsLetter, setAllNewsLetter] = useState([])
  const [page_no, setPageno] = useState(1)

  const router = useRouter()
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  const [showAlert, setShowAlert] = useState(false);
  const [enableModal, setEnableModal] = useState(false)
  const [alertMsg, setAlertMsg] = useState({})
  const [visible, setVisible] = useState(false)

  function show() {
    setVisible(true);
  }

  async function closeModal(value) {
    setEnableModal(false);
  }

  function hide(obj) {
    setVisible(false);
    if (obj.status == 'Success') {
      setAlertMsg({ message: 'Newsletters subscribed successfully' });
      setEnableModal(true);
    }
  }

  async function closeModal(value) {
    setEnableModal(false);
  }

  const handleButtonClick = () => {

    let get_check = news.filter(res => { return res.selected == 1 })

    if (get_check.length == data.length) {
      setAlertMsg({ message: 'Already you have subscribed all the Newsletters' });
      setEnableModal(true);
    } else {
      news.map((res, i) => {
        if (Id == res.name) {
          res.selected = 1;
        } else {
          res.selected = 0;
        }
      })
      setVisible(true);
    }
  };

  useEffect(() => {
    allNews();
    getAd();
    newsLanding_info();
    getCategory()
  }, [router.query])

  // All News
  const allNews = async () => {
    let param = {
      route: 'newsletters/' + await router.query.detail,
      // newsletter_id: await router.query.detail,
      page_no: page_no,
      page_size: 10,
    }

    const resp = await get_all_newsletter(param);
    if (resp.message && resp.message.length != 0) {
      setAllNewsLetter(resp.message)
    }
  }

  const [news, setData] = useState();

  async function newsLanding_info() {
    let value = await newsLanding();
    let news = value.message;
    setData(news)
  }

  const [ads, setAds] = useState()

  const getAd = async () => {
    let params = { doctype: 'News letter', page_type: 'Detail' }
    const res = await getAds(params);
    const ads = res.message;
    if (ads) {
      setAds(ads)
    }
  }

  let [newsCategory, setNewsCategory] = useState([])
  let [newsList, setNewsList] = useState([])
  let [selectedCategory, setSelectedCategory] = useState()
  const getCategory = async () => {
    // let resp = await newsletter_category()
    let params = {
      doctype: 'Newsletter Category',
      fields: ["title", "name", "route", "article_category", "category_name"],
      filters: { 'published': 1 }
    }
    let resp = await getList(params)
    if (resp.message && resp.message.length != 0) {
      newsCategory = resp.message;
      selectedCategory = resp.message[0].title;
      setSelectedCategory(selectedCategory)
      setNewsCategory(newsCategory)
      getCategoryBaseddata(resp.message[0])
      // console.log(resp)
    }
  }

  const getCategoryBaseddata = async (data) => {
    let params = {
      doctype: 'Newsletter',
      fields: ["name", "route", "subject", "custom_image_ as image"],
      filters: { 'custom_day': data.title },
      page_no: 1,
      page_size: 12
    }
    let resp = await getList(params)
    if (resp.message && resp.message.length != 0) {
      newsList = resp.message;
      setNewsList(newsList)
      // console.log(resp)
    }
  }

  const activeCategory = async (res, index) => {
    selectedCategory = res.title;
    setSelectedCategory(selectedCategory)
    getCategoryBaseddata(res)
  }

  const changeDateFormat = (data) => {
    if (data && data != null) {
      const formattedDate = format(new Date(data), "iii, d LLL yyyy");
      return formattedDate
    } else {
      return data
    }
  }


  return (
    <>
      <RootLayout isLanding={false} homeAd={ads ? ads : null} head={'Newsletters'}>

        {enableModal &&
          <AlertUi isOpen={enableModal} closeModal={(value) => closeModal(value)} headerMsg={'Alert'} button_2={'ok'} alertMsg={alertMsg} />
        }

        <SEO title={data.meta_title ? data.meta_title : data.custom_title} ogImage={check_Image(data.custom_image_)} siteName={'India Reatiling'} ogType={data.meta_keywords ? data.meta_keywords : data.custom_title} description={data.meta_description ? data.meta_description : data.custom_title} />
        {<div className='container p-[30px_0px] md:p-[15px]'>
          {(data && data.article_detail) && <label className='themeSwitcherTwo w-full  border_bottom shadow-card relative inline-flex cursor-pointer select-none'>
            <input type='checkbox' className='sr-only' checked={isChecked} onChange={handleCheckboxChange} />
            <span
              className={`flex capitalize items-center space-x-[6px]  py-2 px-[18px] text-[16px] font-semibold text-[#111111] ${!isChecked ? 'tabActive' : ''
                }`}>
              {(data && data.article_detail && data.article_detail.is_current_edition == 1) ? 'Current edition' : changeDateFormat(data.article_detail.date)}
            </span>
            <span
              className={`flex capitalize items-center space-x-[6px]  py-2 px-[18px] text-[16px] font-semibold text-[#111111] ${isChecked ? 'tabActive' : ''
                }`}>
              All Newsletter
            </span>
          </label>}

          {!isChecked ? <>
            {(data && data.article_detail) && <div className={`flex pt-[20px] md:pt-[0px] md:flex-wrap justify-between gap-5 lg:relative`}>
              <div className={`flex-[0_0_calc(55%_-_10px)] pt-[10px] leading-[2] md:flex-[0_0_calc(100%_-_0px)]`}>
                {/* <h6 className='text-[20px] md:text-[16px] font-semibold leading-7'>{data.article_detail.title}</h6> */}
                <p className={`text-[20px] md:text-[16px] font-semibold py-3 md:hidden ${inter.className}`}>{data.article_detail.subject}</p>
                <div dangerouslySetInnerHTML={{ __html: data.article_detail.message }} className={`contents sub_title py-3 md:hidden`} />
                <button style={{ borderRadius: '5px' }} onClick={handleButtonClick} className='primary_btn md:hidden my-3 text-[14px] block h-[35px] w-[100px]'>subscribe</button>
              </div>
              <div className={`flex-[0_0_calc(45%_-_10px)] lg:sticky lg:top-[10px]  lg:bg-white lg:h-[400px] overflow-hidden md:flex-[0_0_calc(100%_-_0px)]`}>
                <Image className={`h-[380px] w-full`} src={check_Image(data.article_detail.image)} height={300} width={500} alt={data.custom_title ? data.custom_title : data.subject ? data.subject : 'newsletter'} />
                <div dangerouslySetInnerHTML={{ __html: data.article_detail.message }} className={`contents sub_title py-3 lg:hidden`} />
                {/* <p className='sub_title py-3 lg:hidden'>{data.article_detail.description}</p> */}
                <div className='w-full text-center lg:hidden'>
                  <button style={{ borderRadius: '5px' }} onClick={handleButtonClick} className='primary_btn block my-3 text-[14px] h-[35px] w-[50%] md:w-full'>subscribe</button>
                </div>
              </div>
            </div>}

            {(data.more_articles && data.more_articles.length != 0) && <div className='p-[30px_0] md:p-[15px_0]'>
              <Title data={{ title: "More articles from the newsletter" }} />
              <div className='lg:grid grid-cols-4 no_scroll lg:gap-5'><NewsCard data={data.more_articles} imgClass={'h-[215px] md:h-[180px] w-full rounded-[10px_10px_0_0]'} cardClass={'h-[310px] md:h-[280px] md:flex-[0_0_calc(50%_-_10px)]'} /></div>
            </div>}

            {/* {(data.other_newsletters && data.other_newsletters.length != 0) && <div className='p-[30px_0]'>
              <Title data={{ title: "Read other Newsletters" }} />
              <div className='lg:grid grid-cols-4 no_scroll lg:gap-5'><NewsCard data={data.other_newsletters} imgClass={'h-[315px] md:h-[180px] w-full rounded-[10px_10px_0_0]'} cardClass={'h-[410px] md:h-[280px] md:flex-[0_0_calc(50%_-_10px)]'} /></div>
            </div>} */}

            <div className='border p-[10px] rounded-[5px]'>
              <div className={`flex items-center m-[10px] gap-[15px]`}>
                {newsCategory && newsCategory.length != 0 && newsCategory.map((res, i) => {
                  return (
                    <div key={i} onClick={() => activeCategory(res, i)} className='cursor-pointer'>
                      <p className={`${selectedCategory == res.title ? 'tabActive' : ''} pb-[5px] text-[14px] font-semibold capitalize ${inter.className}`}>{res.category_name.split('-').join(" ")}</p>
                    </div>
                  )
                })}
              </div>

              <div className={`m-[25px_10px]`}>
                {newsList && newsList.length != 0 ? <div className='lg:grid grid-cols-4  no_scroll lg:gap-5'><NewsCard data={newsList} imgClass={'h-[215px] md:h-[180px] w-full rounded-[10px_10px_0_0]'} cardClass={'h-[310px] md:h-[280px] md:flex-[0_0_calc(50%_-_10px)]'} /></div> :
                  <>No Newsletters Found</>}
              </div>
            </div>

            {/* {showAlert && <AlertPopup data={data} show={() => setShowAlert(false)} />} */}
            {/* {showAlert && <NewsList data={news} />} */}

            {visible && <SubscribeNews data={news} visible={visible} hide={(obj) => hide(obj)} />}

          </> : <>
            {(allNewsLetter && allNewsLetter.length != 0) ?
              <div className='grid grid-cols-4 md:grid-cols-2 gap-[20px] md:gap-[10px] pt-[20px] md:pt-[15px] '>
                <NewsCard load={() => handleCheckboxChange()} pagination={true} data={allNewsLetter} imgClass={'h-[315px] md:h-[200px] w-full rounded-[10px_10px_0_0]'} cardClass={'h-[410px] md:h-[300px]'} />
              </div> :
              <NoProductFound cssClass={'flex-col h-[calc(100vh_-_220px)]'} empty_icon={'/empty_states/no-newsletter.svg'} heading={'No Newsletters Found'} />
            }
          </>}
        </div>}
      </RootLayout>
    </>
  )
}


export async function getServerSideProps({ params }) {
  let Id = params?.detail;
  let param = {
    route: 'newsletters/' + Id,
    // another_category: "Fashion & Lifestyle",
    // newsletter_fields: ["custom_title", "custom_image_", "route", "name", "custom_category"]
  }

  const resp = await newsDetail(param);
  const data = resp.message;


  // let arg = {
  //   fields: ['custom_day', 'name', 'custom_category', 'custom_description', 'custom_image_', 'custom_title', 'route']
  // }

  // if(localStorage['userid'] && localStorage['userid'] != ''){
  //   arg.email = localStorage['userid']
  // }

  // let value = await newsLanding(arg);

  // let value = await newsLanding();
  // let news = value.message;

  return {
    props: { data, Id }
  }
}