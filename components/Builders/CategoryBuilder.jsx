import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import AdsBaner from '../Baners/AdsBaner'
import List from '../common/List'
import { useState } from 'react'
import Content from '../common/Content'
import Title from '../common/Title'
import MultiCarousel from '../Sliders/MultiCarousel'
import categories from '@/libs/categories'
import Modal from '../common/Modal'
import { check_Image, checkMobile } from '@/libs/api'
import Comments from '../Category/Comments'

// Social Share
import { WhatsappShareButton, LinkedinShareButton, TwitterShareButton, FacebookShareButton } from 'react-share'
import { useRouter } from 'next/router'
import CustomSlider from '../Sliders/CustomSlider'
import AuthModal from '../Auth/AuthModal';
export default function CategoryBuilder({ data, isPrime, load, isLast, i, ads, placeholder }) {
  const styles = {}
  const [showComment, setshowComment] = useState(true);
  // const [data, setdatas] = useState(datas);

  const [validator, setValidator] = useState(false)
  const router = useRouter();
  const [updateCmts, setupdateCmts] = useState(-1)

  // console.log(ads)
  // let validate;

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
  // const [searchTxt, setSearchTxt] = useState('');
  // useEffect(() => {
  // if (searchTxt && searchTxt != '') {
  //   const timeOut = setTimeout(async () => {
  //     console.log(searchTxt)
  //     console.log('hit api call')
  //     const data = await placeHolder();
  //     console.log(data)
  //     setValue(data)
  //     setShowSection(true)

  //   }, 500);
  //   return () => clearTimeout(timeOut);
  // }

  // }, [])

  // console.log(data);


  useEffect(() => {
    // if(data && i){
    //   if(i == 1){}
    //   // i == 1 ? setPrev([data]) : setPrev(d => d = [...d, ...[data]])
    //   console.log(data)
    //   console.log(i)
    // }
    if (typeof window !== 'undefined' && localStorage['roles'] && localStorage['roles'] != 'undefined') {
      const data = JSON.parse(localStorage['roles']);
      if (data && data.length != 0) {
        data.map(res => {
          if (res.role == 'Member') {
            setValidator(!validator);
          }
        })
      }
    }

    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad);
    }

  }, [updateCmts])

  const cardref = useRef(null)
  useEffect(() => {
    if (!cardref?.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        load()
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardref.current);
  }, [isLast])

  // const more = useRef(null)
  // useEffect(() => {
  //   if (!more?.current) return;
  //   const intersectionObserver = new IntersectionObserver(([entries]) => {
  //     if (entries.isIntersecting) {
  //       console.log(prev, 'route')
  //       console.log(entries, 'route')
  //       intersectionObserver.unobserve(entries.target)
  //     }
  //     // if (!no_product) {
  //     //     page_no > 1 ? get_list() : null
  //     //     page_no = page_no + 1
  //     // }
  //   });
  //   intersectionObserver.observe(more.current);

  //   // return () => {
  //   //     more?.current && intersectionObserver.unobserve(more?.current)
  //   // }
  // }, [])

  // Modal Popup
  const [modal, setModal] = useState('')

  const [visible, setVisible] = useState(false)
  function show() {
    setVisible(true);
  }

  function hide() {
    setVisible(false)
    if (localStorage['roles']) {
      const data = JSON.parse(localStorage['roles']);

      if (data && data.length != 0) {
        data.map(res => {
          if (res.role == 'Member') {
            setValidator(true);
          }
        })
      }
    }
  }



  function onPageLoad() {
    if ((data && data.article_sections && data.article_sections.length != 0)) {
      data.article_sections.map((res) => {
        let element = document.getElementById(`${res.placeholder_key}`);
        // console.log(element)
        element?.classList.add('placeholder')
        let html = ''
        res.data.map((item, index) => {
          html +=
            `<div key=${index} class='${'card'} cursor-pointer'>
              <div>
                <Image class=${'img'} src='${check_Image(item.thumbnail_image)}' height={40} width={50} alt='image' />
              </div>
              <div class='p-[10px]'>
              <h6 class='line-clamp-2 title'>${item.title}</h6>            
              <span class='pt-[5px] line-clamp-2 sub_title'>${item.blog_intro ? item.blog_intro : ''}</span>            
              </div>
            </div>`
        })
        element ? element.innerHTML = html : null
        // element.append(data)
        // console.log(res.placeholder_key)
      })
    }

  }


  //  FUNCTION TO HANDLE CLOSE ACTION ON SIDEDRAWER/MODAL
  const sideDrawerClosedHandler = () => {
    setshowComment(!showComment)
    // Unsets Background Scrolling to use when SideDrawer/Modal is closed
    document.body.style.overflow = 'unset';
  }

  const [isLogin, setIsLogin] = useState(false);
  const [loginModal, setLoginModal] = useState(false)
  // FUNCTION TO HANDLE OPEN ACTION ON SIDEDRAWER/MODAL
  const showSidebar = () => {
    if (data.comments && data.comments.length != 0) {
      setshowComment(!showComment);
      // Disables Background Scrolling whilst the SideDrawer/Modal is open
      if (typeof window != 'undefined' && window.document) {
        document.body.style.overflow = 'hidden';
      }
    } else if (data.comments && data.comments.length == 0) {
      if (localStorage && !localStorage['apikey']) {
        setIsLogin(true);
        setLoginModal(true)
      } else {
        setshowComment(!showComment);
      }
    }
  }

  const hideModal = () => {
    setLoginModal(false)
    console.log('close')
    if (localStorage && localStorage['apikey']) {
      setshowComment(!showComment);
      show()
    }
  }

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


  function store_comments(data) {
    data = data;
    // setdatas(data)
    setupdateCmts(updateCmts + 1)
  }




  return (
    <>

      <div ref={cardref}>
        <div className={`flex w-full gap-11 md:flex-wrap lg:p-[30px_0px] md:p-[15px] ${isMobile ? '' : 'container'}`}>
          <div className='w_70 md:w-full'>

            <p>
              <Content i={i} res={data} />
            </p>

            <div className='relative'>
              <div dangerouslySetInnerHTML={{ __html: data.content }} id={`${i}`} className={`contents ${(isPrime && !validator) && 'prime-article'}`} />
              {/* {(isPrime && !validator && data.ir_prime == 1) && <div className='prime-article-after'></div>} */}
            </div>
            {/* {(isPrime && !validator) && <div className='border-0 p-[20px] my-[20px] rounded-md bg-[#e21b22] mt-6'> */}
            {/* <h6 className='text-center text-[20px] md:text-[16px] font-semibold pb-[15px] text-[white] flex'><Image src={'/ir-icon.svg'} height={38} width={38} alt={"image"} className='mr-3 object-contain' />This story is for Premium Members you  have to buy Membership to Unlock</h6>
              <div className='flex gap-[20px] justify-center pt-[0px]'>
                <button className='primary_btn p-[6px_8px] text-[13px] bg-[#fff] text-[#e21b22] flex' onClick={() => router.push('/membership')}><Image src={'/subscribe.svg'} height={18} width={18} alt={"image"} className='mr-1' />Subscribe</button> */}
            {/* <button className='primary_btn h-[40px] w-[15%]' onClick={() => logInModal('login')}>LogIn</button>
                <button className='border  h-[40px] w-[15%]' onClick={() => logInModal('signup')}>SignUp</button> */}
            {/* </div>
            </div>} */}

            {(isPrime && !validator && data.ir_prime == 1) &&
              <div className='grid place-content-center max-w-[400px] p-[30px_20px_0_20px] md:p-[20px] m-[0_auto]'>
                <div className={`flex items-center gap-[10px] `}>
                  <Image src={'/irprime/premium.svg'} height={20} width={20} alt='premium' />
                  <p className='text-red font-semibold'>IR Prime</p>
                </div>

                {/* <div> */}
                <h6 className='text-[32px] font-[600] leading-[40px] md:text-[17px] md:leading-[22px] pt-[10px]'>Its a Premium Content,Simply buy Membership to Unlock</h6>
                <p className='text-[14px] font-[400] text-gray pt-[10px] leading-[20px] md:leading-[16px] md:pt-[15px]'>50,000+ articles IRPrime is the only subscription you need</p>
                {/* </div> */}

                <div className='w-full mt-[25px] md:mt-[15px] md:text-center'>
                  <button className='primary_button w-full text-[16px] h-[50px] p-[5px_10px] md:text-[14px] md:h-[35px] md:w-max' onClick={() => router.push('/membership')} style={{ borderRadius: '9999px', textTransform: 'unset' }}>Subscribe to IR Prime</button>
                </div>

              </div>
            }

            <Modal modal={modal} show={show} visible={visible} hide={hide} />

            {/* <div className={`${styles.slider_parent}`}>
              <div>
                <Title data={{ title: "Must Read" }} />
              </div>
              <ChildSlider data={categories.sections.section_1.must_read.data} per_view={3} cols={3} colsPerView={1} rows={2} type={'list'} />
            </div> */}

            {/* Comments */}

            {data._user_tags && typeof (data._user_tags) != 'string' && data._user_tags.length != 0 &&
              <div className='flex items-center flex-wrap'>
                <h6 className='w-max text-[13px] text-[#fff] bg-[#e21b22] border rounded-[5px] p-[3px_15px] mr-[6px] mb-[12px]'>Tags</h6>
                {data._user_tags.map((res, index) => {
                  return (
                    <h6 key={index} className='w-max capitalize text-[13px] text-[#000] bg-[#f1f1f1]  rounded-[5px] p-[3px_15px] mr-[6px] mb-[12px]'>{res}</h6>
                  )
                })
                }
              </div>
            }

            {<div className='lg:py-12'>
              {!isMobile && <div className={`flex flex-row justify-between`}>
                {/* <p className="gray-text">Previous Post</p> */}
                <hr></hr>
                <h6 className={`font15_bold`}>Share this Article</h6>
                <hr></hr>
                {/* <p className="gray-text">Next Post</p> */}
              </div>}
              {!isMobile && <div className='flex flex-row gap-3 items-center justify-center py-5'>
                {socials.map((res, index) => {
                  return (
                    <div key={index}>
                      {
                        res.name == 'fb' ? <FacebookShareButton url={`${!isPrime ? '/categories/' + router.query.types + '/' + data.name : '/IRPrime/' + router.query.list + '/' + router.query.detail}`}>
                          <div key={index} className={`rounded-full bg-light-gray p-2`}>
                            <Image src={res.icon} alt={res.name} height={25} width={20} />
                          </div>
                        </FacebookShareButton>
                          : res.name == 'ws' ? <WhatsappShareButton url={`${!isPrime ? '/categories/' + router.query.types + '/' + data.name : '/IRPrime/' + router.query.list + '/' + router.query.detail}`}>
                            <div key={index} className={`rounded-full bg-light-gray p-2`}>
                              <Image src={res.icon} alt={res.name} height={25} width={20} />
                            </div>
                          </WhatsappShareButton>
                            : res.name == 'linkedin' ? <LinkedinShareButton url={`${!isPrime ? '/categories/' + router.query.types + '/' + data.name : '/IRPrime/' + router.query.list + '/' + router.query.detail}`}>
                              <div key={index} className={`rounded-full bg-light-gray p-2`}>
                                <Image src={res.icon} alt={res.name} height={25} width={20} />
                              </div>
                            </LinkedinShareButton>
                              : res.name == 'twitter' ? <TwitterShareButton url={`${!isPrime ? '/categories/' + router.query.types + '/' + data.name : '/IRPrime/' + router.query.list + '/' + router.query.detail}`}>
                                <div key={index} className={`rounded-full bg-light-gray p-2`}>
                                  <Image src={res.icon} alt={res.name} height={25} width={20} />
                                </div>
                              </TwitterShareButton>
                                : null
                      }

                    </div>
                  )
                })}
              </div>}

              {(data.comments && data.disable_comments != 1) && data.doctype == 'Articles' && <>
                <div className={`${!isMobile && 'border_bottom'} py-1.5 ${styles.profile_div}`}>
                  <h6 id={`cmt${i}`} className='font-semibold'>Comments</h6>
                </div>

                {(data.comments && data.comments.length != 0) && data.doctype == 'Articles' &&
                  <div style={{ background: "#efefef" }} className={` ${showComment && 'transition-all ease-in delay-500 duration-500 h-[auto] w-[auto]'} rounded-lg relative  mt-3  `}>
                    {data.comments.map((res, index) => {
                      return (
                        <Comments cmt={true} data={res} key={index} hide_comment={hide} />
                      )
                    })}
                  </div>
                }
              </>
              }

              {data.disable_comments != 1 && data.doctype == 'Articles' &&
                <>
                  {isMobile ? <div className='mt-[10px] flex gap-[10px] justify-center'>
                    <button onClick={showSidebar} className={`justify-center bg-red text-white h-[45px] rounded items-center  ${styles.cmt_btn} lg:w-[25%] md:text-[13px] md:px-[15px]  flex `}>{(data.comments && data.comments.length != 0) ? 'View all comments' : 'Add Comment'}</button>
                    {/* <button onClick={showSidebar} className={`justify-center p-[6px_8px] md:mt-0 mt-3 text-[13px] rounded ${(data.comments && data.comments.length != 0) ? 'text-[#e21b22] border-[#e21b22]' : 'bg-red text-white'} items-center flex border`}>Post a comment </button> */}
                  </div> : <div className={`mt-[10px] flex justify-center`}>
                    <button onClick={showSidebar} className={`justify-center bg-red text-white p-[6px_8px] md:mt-4 mt-3 rounded items-center  ${styles.cmt_btn} text-[13px] flex `}>{(data.comments && data.comments.length != 0) ? 'View Comments' : 'Add Comment'} </button>
                  </div>}
                </>

              }

              {(!showComment && data && data.doctype == 'Articles') ? <>
                <div className='popright'>
                  <Modal visible={true} modal={'comments'} cur={data} store_comments={(cur) => store_comments(cur)} hide={sideDrawerClosedHandler} />
                  {/* scrolling="no" */}
                  {/* <iframe className='w-full ' rel='preload' src="https://www.linkedin.com/embed/feed/update/urn:li:share:7092358111637737472" height="696" width="504" frameborder="0" allowfullscreen="false" title="Embedded post"></iframe> */}
                  {/* <iframe className='w-full' rel='preload' src="https://www.linkedin.com/embed/feed/update/urn:li:share:7092137020289904641" height="725" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe> */}
                </div>
              </> : (showComment && data && data.doctype == 'Articles' && isLogin && loginModal) ? <div className='authModal'><AuthModal visible={loginModal} hide={hideModal} /></div> : null}
            </div>}
          </div>

          <div className='w_30 md:hidden'>

            {/* {(placeholder && placeholder.length != 0) ?
              placeholder.map((resp, index) => {
                return (
                  <div key={index}>
                    {(resp.placeholder_type == 'banner_ad' && resp.data && resp.data.length != 0) && <AdsBaner data={resp.data[0]} height={'260px'} width={'300px'} />}
                    {(resp.placeholder_type == 'google_ad' && resp.data && resp.data.length != 0) && <AdsBaner data={resp.data[0]} height={'260px'} width={'300px'} />}
                    {(resp.placeholder_type == 'list' && resp.data && resp.data.length != 0) && <List data={resp.data} tittleOnly={true} flex={'mb-[10px]'} titleClamp={'line-clamp-2'} check={true} borderRadius={'rounded-[5px]'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'}  imgHeight={'h-[85px]'} imgWidth={'w-full'}  />}
                  </div>
                )
              })
              : <>
              </>} */}
            {(data.related_articles && data.related_articles.length != 0) && <div className='border md:border-0 rounded-[5px] p-[10px_15px_15px]'>
              <Title data={{ title: 'Related Stories' }} />
              <List tittleOnly={true} flex={'mb-[10px]'} titleClamp={'line-clamp-2'} check={true} borderRadius={'rounded-[5px]'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} data={data.related_articles} imgHeight={'h-[85px]'} imgWidth={'w-full'} />
            </div>}

            <div className='py-3'>
              {(data.banner_ad && data.banner_ad.ad_list && data.banner_ad.ad_list.length != 0 && data.banner_ad.ad_list[0]) ?
                <AdsBaner data={data.banner_ad.ad_list[0]} height={'260px'} width={'300px'} />
                : (ads && ads.right && ads.right.length != 0 && ads.right[0]) ? <AdsBaner data={ads.right[0]} height={'260px'} width={'300px'} /> : <></>
              }
            </div>

            {/* {(ads && )} */}

            {(data.must_read && data.must_read.length != 0) && <div className='border md:border-0 rounded-[5px] p-[10px_15px_15px]'>
              <Title data={{ title: 'Must Read' }} />
              <List tittleOnly={true} flex={'mb-[10px]'} titleClamp={'line-clamp-2'} check={true} borderRadius={'rounded-[5px]'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} data={data.must_read} imgHeight={'h-[85px]'} imgWidth={'w-full'} />
            </div>}
            {(data.other_category3 && data.other_category3.data && data.other_category3.data.length != 0) && <div className='border rounded-[5px] p-[10px_15px_15px]'>
              <Title data={data.other_category3} />
              <List isTop={true} flex={'mb-[10px]'} titleClamp={'line-clamp-2'} borderRadius={'rounded-[5px]'} imgFlex={'flex-[0_0_calc(35%_-_10px)]'} tittleOnly={true} check={true} isBB={true} data={data.other_category3.data} imgHeight={'h-[85px]'} imgWidth={'w-full'} />
            </div>}

            <div className='py-3'>
              <AdsBaner text={"Advertisement"} data={{ ad_image: '/ads_music.png' }} height={'h-[600px]'} width={'w-[300px]'} />
            </div>


            {(data.other_category2 && data.other_category2.data && data.other_category2.data.length != 0) && <div className='border md:border-0 rounded-[5px] p-[10px_15px_15px]'>
              <Title data={data.other_category2} />
              <List isTop={true} flex={'mb-[10px]'} titleClamp={'line-clamp-2'} borderRadius={'rounded-[5px]'} imgFlex={'flex-[0_0_calc(35%_-_10px)]'} tittleOnly={true} check={true} isBB={true} data={data.other_category2.data} imgHeight={'h-[85px]'} imgWidth={'w-full'} />
            </div>}

            {/* <div className='py-3'>
              <AdsBaner data={res.baner_img3} text={"Advertisement"} height={'220px'} width={'275px'} />
            </div> */}
          </div>
        </div>

        {data.latest_news && <div className={`${isMobile ? '' : 'container'}  ${styles.section_3}`}>
          {/* Slider */}
          {(data.latest_news) && <div className={`${styles.slider_parent} latestNews_slider lg:mb-[15px] p-[20px 0] md:p-[10px_15px] ${isLast && 'mb-7'}`}>
            <Title data={{ title: 'Latest News' }} />
            <CustomSlider slider_id={"category_builder" + i} slider_child_id={'category_builder_child' + i} data={data.latest_news} cardClass={'flex-[0_0_calc(20%_-_16px)] md:flex-[0_0_calc(70%_-_10px)]'} route={'/news/'} imgClass={'h-[190px] md:h-[160px] w-full'} />
            {/* <MultiCarousel isHome={'/news/'} perView={5} noPlay={true}  height={""} width={'w-full'} type={'card'} check={true} /> */}
          </div>}
        </div>}

        {!isLast && <div className={`flex md:gap-[10px] lg:gap-[20px] items-center md:p-[10px_15px] lg:p-[15px 0] ${isMobile ? '' : 'container'}`}>
          <h6 className={`flex-[0_0_auto] lg:text-[16px] md:text-[14px] font-semibold`}>Next Post</h6>
          <div className='lg:bg-[#EEEEEE] w-full lg:h-[1px] md:bg-stone-200 md:h-[3px]'></div>
        </div>}
      </div>
    </>
  )
}
