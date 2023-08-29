import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import AdsBaner from '../Baners/AdsBaner'
import ChildSlider from '../Sliders/ChildSlider'
import List from '../common/List'
import { useState } from 'react'
import Content from '../common/Content'
import Title from '../common/Title'
import MultiCarousel from '../Sliders/MultiCarousel'
import categories from '@/libs/categories'
import Modal from '../common/Modal'
import Placeholders from '../Category/Placeholders'
import { check_Image } from '@/libs/common'
import Comments from '../Category/Comments'

// Social Share
import { WhatsappShareButton, LinkedinShareButton, TwitterShareButton, FacebookShareButton } from 'react-share'
import { useRouter } from 'next/router'

export default function CategoryBuilder({ data, isPrime, load, isLast, i }) {
  const styles = {}
  const [showComment, setshowComment] = useState(true);
  const [placeholder, setPlaceholder] = useState([]);
  const [validator, setValidator] = useState(false)
  const router = useRouter();
  // console.log(router)
  // let validate;
  // const [searchTxt, setSearchTxt] = useState('');

  function handleComment() {
    setshowComment(!showComment);
  }
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
    if (typeof window !== 'undefined' && localStorage['roles'] ) {
      const data = JSON.parse(localStorage['roles']);
      if (data && data.length != 0) {
        data.map(res => {
          if (res.role == 'Member') {
            setValidator(!validator);
          }
        })
      }
    }

    console.log(validator);


    if (document.readyState === 'complete') {
      // setTimeout(() => {
      onPageLoad();
      // }, 500);
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

  const checkMobile = async () => {
    if (window.innerWidth < 767) {
      return true;
    } else if (window.innerWidth > 767) {
      return false;
    }
  }

  const logInModal = async (type) => {
    if (checkMobile()) {
      type == 'login' ? router.push('/login') : router.push('/signup');
    } else {
      if (type == 'login') {
        setVisible(true)
        setModal('login')
      } else {
        setVisible(true)
        setModal('signup')
      }
    }
  }



  return (
    <>
      <div ref={cardref}>
        <div className='flex w-full gap-11 md:flex-wrap p-[30px] container'>
          <div className='w_70 md:w-full'>
            <div>
              <Content i={i} res={data} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.content }} id={`${i}`} className={`contents ${(isPrime && !validator) && 'line-clamp-5'}`} />


            {validator}
            {(isPrime && !validator) && <div className='border p-[20px] shadow-2xl h-[10%] my-[20px]'>
              <p className='text-center text-[20px] font-semibold pb-[15px]'>This story is free you simply have to Login / Signup to Unlock</p>
              <div className='flex gap-[20px] justify-center pt-[20px]'>
                <button className='primary_btn h-[40px] w-[15%]' onClick={() => logInModal('login')}>LogIn</button>
                <button className='border  h-[40px] w-[15%]' onClick={() => logInModal('signup')}>SignUp</button>
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
            {<div className='py-12'>
              <div className={`flex flex-row justify-between`}>
                {/* <p className="gray-text">Previous Post</p> */}
                <hr></hr>
                <p className={`font15_bold`}>Share this Article</p>
                <hr></hr>
                {/* <p className="gray-text">Next Post</p> */}
              </div>
              <div className='flex flex-row gap-3 items-center justify-center py-5'>
                {socials.map((res, index) => {
                  return (
                    <div key={index}>
                      {
                        res.name == 'fb' ? <FacebookShareButton url={`${!isPrime ? '/categories/' + router.query.types + '/' + data.name : '/IRPrime/' + router.query.list + '/' + router.query.detail}`}>
                          <div key={index} className={`rounded-full bg-light-gray p-4`}>
                            <Image src={res.icon} alt={res.name} height={25} width={20} />
                          </div>
                        </FacebookShareButton>
                          : res.name == 'ws' ? <WhatsappShareButton url={`${!isPrime ? '/categories/' + router.query.types + '/' + data.name : '/IRPrime/' + router.query.list + '/' + router.query.detail}`}>
                            <div key={index} className={`rounded-full bg-light-gray p-4`}>
                              <Image src={res.icon} alt={res.name} height={25} width={20} />
                            </div>
                          </WhatsappShareButton>
                            : res.name == 'linkedin' ? <LinkedinShareButton url={`${!isPrime ? '/categories/' + router.query.types + '/' + data.name : '/IRPrime/' + router.query.list + '/' + router.query.detail}`}>
                              <div key={index} className={`rounded-full bg-light-gray p-4`}>
                                <Image src={res.icon} alt={res.name} height={25} width={20} />
                              </div>
                            </LinkedinShareButton>
                              : res.name == 'twitter' ? <TwitterShareButton url={`${!isPrime ? '/categories/' + router.query.types + '/' + data.name : '/IRPrime/' + router.query.list + '/' + router.query.detail}`}>
                                <div key={index} className={`rounded-full bg-light-gray p-4`}>
                                  <Image src={res.icon} alt={res.name} height={25} width={20} />
                                </div>
                              </TwitterShareButton>
                                : null
                      }

                    </div>
                  )
                })}
              </div>

              {(data.comments) && <>
                <div className={` border_bottom py-1.5 ${styles.profile_div}`}>
                  <p id={`cmt${i}`} className='font-semibold'>Comments</p>
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
              {data.disable_comments != 1 && <div className={` mt-[10px] flex justify-center`}>
                <button onClick={showSidebar} className={`justify-center bg-red text-white h-[45px] rounded items-center  ${styles.cmt_btn} lg:w-[25%] md:w-[50%] flex `}>{(data.comments && data.comments.length != 0) ? 'View Comments' : 'Add Comment'} </button>
              </div>}

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

          <div className='w_30'>
            {(data.related_articles && data.related_articles.length != 0) && <div className='border rounded-[5px] p-[10px]'>
              <Title data={{ title: 'Related Stories' }} />
              <List tittleOnly={true} check={true} borderRadius={'rounded-[5px]'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} data={data.related_articles} imgHeight={'h-[110px]'} imgWidth={'w-full'} />
            </div>}

            <div className='py-3'>
              <AdsBaner text={"Advertisement"} data={{ ad_image: '/ads_baner.png' }} height={'260px'} width={'300px'} />
            </div>

            {(data.must_read && data.must_read.length != 0) && <div className='border rounded-[5px] p-[10px]'>
              <Title data={{ title: 'Must Read' }} />
              <List tittleOnly={true} check={true} borderRadius={'rounded-[5px]'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} data={data.must_read} imgHeight={'h-[110px]'} imgWidth={'w-full'} />
            </div>}

            <div className='py-3'>
              <AdsBaner text={"Advertisement"} data={{ ad_image: '/ads_music.png' }} height={'h-[600px]'} width={'w-[300px]'} />
            </div>


            {(data.other_category2 && data.other_category2.data && data.other_category2.data.length != 0) && <div className='border rounded-[5px] p-[10px]'>
              <Title data={data.other_category2} />
              <List isTop={true} borderRadius={'rounded-[5px]'} imgFlex={'flex-[0_0_calc(35%_-_10px)]'} tittleOnly={true} check={true} isBB={true} data={data.other_category2.data} imgHeight={'h-full'} imgWidth={'w-full'} />
            </div>}

            {/* <div className='py-3'>
              <AdsBaner data={res.baner_img3} text={"Advertisement"} height={'220px'} width={'275px'} />
            </div> */}

          </div>


        </div>

        {categories.sections.section_3 && <div className={`container ${styles.section_3}`}>
          {/* Slider */}
          {(categories.sections.section_3.section_type == 'slider' && categories.sections.section_3.type == 'card') && <div className={`${styles.slider_parent} p03015 mb-7`}>
            <Title data={{ title: 'Latest News' }} />
            <MultiCarousel perView={5} data={categories.sections.section_3.data} height={"h-full"} width={'w-full'} type={'card'} />
          </div>}
        </div>}
      </div>
    </>
  )
}
