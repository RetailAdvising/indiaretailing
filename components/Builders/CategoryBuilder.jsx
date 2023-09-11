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
import { check_Image,checkMobile } from '@/libs/api'
import Comments from '../Category/Comments'

// Social Share
import { WhatsappShareButton, LinkedinShareButton, TwitterShareButton, FacebookShareButton } from 'react-share'
import { useRouter } from 'next/router'

export default function CategoryBuilder({ data, isPrime, load, isLast, i, ads }) {
  const styles = {}
  const [showComment, setshowComment] = useState(true);
  const [validator, setValidator] = useState(false)
  const router = useRouter();
  // console.log(router)
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


  useEffect(() => {
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

  }, [])

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
    if ((data && data.article_sections && data.article_sections.length != 0) && localStorage['apikey']) {
      data.article_sections.map((res) => {
        let element = document.getElementById(`${res.placeholder_key}`);
        // console.log(element)
        element?.classList.add('placeholder')
        let html = ''
        res.data.map((item, index) => {
          html +=
            `<div key=${index} class='${'card'}'>
              <div>
                <Image class=${'img'} src='${check_Image(item.thumbnail_image)}' height={40} width={50} alt='image' />
              </div>
              <p class=p-[10px]>${item.title}</p>            
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

  // FUNCTION TO HANDLE OPEN ACTION ON SIDEDRAWER/MODAL
  const showSidebar = () => {
    setshowComment(!showComment);
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
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



  return (
    <>
                            
      <div ref={cardref}>
        <div className={`flex w-full gap-11 md:flex-wrap lg:p-[30px_0px] md:p-[15px] ${isMobile ? '' : 'container'}`}>
          <div className='w_70 md:w-full'>
            <p>
              <Content i={i} res={data} />
            </p>
            <div dangerouslySetInnerHTML={{ __html: data.content }} id={`${i}`} className={`contents ${(isPrime && !validator) && 'line-clamp-5'}`} />

            {(isPrime && !validator) && <div className='border md:border-0 p-[20px] shadow-xl my-[20px] rounded-lg'>
              <h6 className='text-center text-[20px] md:text-[16px] font-semibold pb-[15px]'>This story is for Premium Members you  have to buy Membership to Unlock</h6>
              <div className='flex gap-[20px] justify-center pt-[0px]'>
                <button className='primary_btn p-[8px_16px]' onClick={() => router.push('/membership')}>Subscribe</button>
                {/* <button className='primary_btn h-[40px] w-[15%]' onClick={() => logInModal('login')}>LogIn</button>
                <button className='border  h-[40px] w-[15%]' onClick={() => logInModal('signup')}>SignUp</button> */}
              </div>
            </div>}

            <Modal modal={modal} show={show} visible={visible} hide={hide} />

            {/* <div className={`${styles.slider_parent}`}>
              <div>
                <Title data={{ title: "Must Read" }} />
              </div>
              <ChildSlider data={categories.sections.section_1.must_read.data} per_view={3} cols={3} colsPerView={1} rows={2} type={'list'} />
            </div> */}

            {/* Comments */}
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

              {(data.comments && data.disable_comments != 1) && <>
                <div className={`${!isMobile && 'border_bottom'} py-1.5 ${styles.profile_div}`}>
                  <h6 id={`cmt${i}`} className='font-semibold'>Comments</h6>
                </div>

                {(data.comments && data.comments.length != 0) &&
                  <div style={{ background: "#efefef" }} className={` ${showComment && 'transition-all ease-in delay-500 duration-500 h-[auto] w-[auto]'} rounded-lg relative  mt-3  `}>
                    {data.comments.map((res, index) => {
                      return (
                        <Comments cmt={true} data={res} key={index} />
                      )
                    })}
                  </div>
                }
              </>}
              {data.disable_comments != 1 &&
                <>
                  {isMobile ? <div className='mt-[10px] flex gap-[10px] justify-center'>
                    {(data.comments && data.comments.length != 0) && <button onClick={showSidebar} className={`justify-center bg-red text-white h-[45px] rounded items-center  ${styles.cmt_btn} lg:w-[25%] md:w-[45%] flex `}>Read all comments</button>}
                    <button onClick={showSidebar} className={`justify-center p-[6px_8px] md:mt-0 mt-3 text-[13px] rounded ${(data.comments && data.comments.length != 0) ? 'text-[#e21b22] border-[#e21b22]' : 'bg-red text-white'} items-center flex border`}>Post a comment </button>
                  </div> : <div className={`mt-[10px] flex justify-center`}>
                    <button onClick={showSidebar} className={`justify-center bg-red text-white p-[6px_8px] w-[20%] h-[40px] md:mt-4 mt-3 rounded items-center  ${styles.cmt_btn} text-[13px] flex `}>{(data.comments && data.comments.length != 0) ? 'View Comments' : 'Add Comment'} </button>
                  </div>}


                </>

              }

              {(!showComment && data) && <>
                <div className='popright'>
                  <Modal visible={true} modal={'comments'} cur={data} hide={sideDrawerClosedHandler} />
                  {/* scrolling="no" */}
                  {/* <iframe className='w-full ' rel='preload' src="https://www.linkedin.com/embed/feed/update/urn:li:share:7092358111637737472" height="696" width="504" frameborder="0" allowfullscreen="false" title="Embedded post"></iframe> */}
                  {/* <iframe className='w-full' rel='preload' src="https://www.linkedin.com/embed/feed/update/urn:li:share:7092137020289904641" height="725" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe> */}
                </div>
              </>}
            </div>}
          </div>

          <div className='w_30 md:hidden'>
            {(data.related_articles && data.related_articles.length != 0) && <div className='border md:border-0 rounded-[5px] p-[10px]'>
              <Title data={{ title: 'Related Stories' }} />
              <List tittleOnly={true} titleClamp={'line-clamp-2'} check={true} borderRadius={'rounded-[5px]'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} data={data.related_articles} imgHeight={'h-[85px]'} imgWidth={'w-full'} />
            </div>}

            <div className='py-3'>
              <AdsBaner text={"Advertisement"} data={{ ad_image: '/ads_baner.png' }} height={'260px'} width={'300px'} />
            </div>

            {/* {(ads && )} */}

            {(data.must_read && data.must_read.length != 0) && <div className='border md:border-0 rounded-[5px] p-[10px]'>
              <Title data={{ title: 'Must Read' }} />
              <List tittleOnly={true} titleClamp={'line-clamp-2'} check={true} borderRadius={'rounded-[5px]'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} data={data.must_read} imgHeight={'h-[85px]'} imgWidth={'w-full'} />
            </div>}
            {(data.other_category3 && data.other_category3.data && data.other_category3.data.length != 0) && <div className='border rounded-[5px] p-[10px]'>
              <Title data={data.other_category3} />
              <List isTop={true} titleClamp={'line-clamp-2'} borderRadius={'rounded-[5px]'} imgFlex={'flex-[0_0_calc(35%_-_10px)]'} tittleOnly={true} check={true} isBB={true} data={data.other_category3.data} imgHeight={'h-[85px]'} imgWidth={'w-full'} />
            </div>}

            <div className='py-3'>
              <AdsBaner text={"Advertisement"} data={{ ad_image: '/ads_music.png' }} height={'h-[600px]'} width={'w-[300px]'} />
            </div>


            {(data.other_category2 && data.other_category2.data && data.other_category2.data.length != 0) && <div className='border md:border-0 rounded-[5px] p-[10px]'>
              <Title data={data.other_category2} />
              <List isTop={true} titleClamp={'line-clamp-2'} borderRadius={'rounded-[5px]'} imgFlex={'flex-[0_0_calc(35%_-_10px)]'} tittleOnly={true} check={true} isBB={true} data={data.other_category2.data} imgHeight={'h-[85px]'} imgWidth={'w-full'} />
            </div>}

            {/* <div className='py-3'>
              <AdsBaner data={res.baner_img3} text={"Advertisement"} height={'220px'} width={'275px'} />
            </div> */}
          </div>
        </div> 

        {data.latest_news && <div className={`${isMobile ? '' : 'container'}  ${styles.section_3}`}>
          {/* Slider */}
          {(data.latest_news ) && <div className={`${styles.slider_parent} latestNews_slider p-[20px 0] md:p-[10px_15px] ${isLast && 'mb-7'}`}>
            <Title data={{ title: 'Latest News' }} />
            <MultiCarousel isHome={'/news/'} perView={5} noPlay={true} data={data.latest_news} height={"h-[190px] md:h-[160px]"} width={'w-full'} type={'card'} check={true}/>
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
