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
  const [validator, setValidator] = useState(undefined)
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
    setValidator(localStorage['apikey'] ? localStorage['apikey'] : undefined);

    if (document.readyState === 'complete') {
      // setTimeout(() => {
      onPageLoad();
      // }, 500);
    } else {
      window.addEventListener('load', onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad);
    }

  }, [validator])

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
    if (localStorage['apikey']) {
      setValidator(localStorage['apikey']);
      router.reload();
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

    // let element = document.getElementsByClassName('content');
    // var arr = Array.prototype.slice.call(element)

    // let matchingWords = []
    // const searchTerm = '['; // Replace with your specific word
    // const searchTerm2 = ']'; // Replace with your specific word

    // if (arr && arr.length != 0) {
    //   let start;
    //   arr.map((val) => {
    //     let word = val.innerText;
    //     let val1 = word.split(" ");
    //     val1.forEach((word) => {
    //       for (let i = 0; i < word.length; i++) {
    //         if (word[i] == searchTerm) {
    //           start = i;
    //           // matchingWords.push(word.slice(i,word.length));
    //         }
    //         if (word[i] == searchTerm2) {
    //           let arr = [];
    //           let splits = word.slice(start, i + 1)
    //           arr.push(splits.split("[")[1].split("]")[0])

    //           let obj = { attr: val.getAttribute('id'), data: arr }
    //           // let obj = {attr: val.getAttribute('id'),data:arr}
    //           // obj[val.getAttribute('id')] = obj[val.getAttribute('id')] ? obj[val.getAttribute('id')] : [];
    //           // obj[val.getAttribute('id')].push(arr[0])
    //           if (matchingWords.length == 0) {
    //             matchingWords.push(obj);
    //           } else {
    //             let index = matchingWords.findIndex(res => { return res.attr == val.getAttribute('id') })
    //             if (index >= 0) {
    //               matchingWords[index].data = [...matchingWords[index].data, ...obj.data]
    //             } else {
    //               matchingWords.push(obj);
    //             }
    //           }
    //           // matchingWords.push(word.slice(start, i + 1));
    //         }
    //       }
    //     });
    //   })
    // }
    // console.log(matchingWords);

    // let content = document.getElementById('c');

    // let div = document.createElement("div");
    // div.setAttribute("class", "democlass");
    // div.addEventListener('scroll',handleClick)
    // document.getElementById('container1').appendChild(div)
    // let data = document.createElement(`<div>${data}</div`);
    // div.append(data)
    // console.log(data)
    // div.after(<AdsBaner data={{ad_image: '/ads_baner.png'}} />)

    // div.innerHTML = `${el}`
    // content.after(div)

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



  return (
    <>
      <div ref={cardref}>
        <div className='flex w-full gap-11 md:flex-wrap p-[30px] container'>
          <div className='w_70 md:w-full'>
            <div>
              <Content i={i} res={data} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.content }} id={`${i}`} className={`contents ${(isPrime && !validator) && 'line-clamp-5'}`} />

            {(isPrime && !validator) && <div className='border p-[20px] shadow-2xl h-[7%] my-[20px]'>
              <p className='text-center text-[20px] font-semibold pb-[15px]'>This story is free you simply have to Login / Signup to Unlock</p>
              <div className='flex gap-[20px] justify-center pt-[20px]'>
                <button className='primary_btn h-[40px] w-[15%]' onClick={() => { setVisible(true), setModal('login') }}>LogIn</button>
                <button className='border  h-[40px] w-[15%]' onClick={() => { setVisible(true), setModal('signup') }}>SignUp</button>
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
                <p className="gray-text">Previous Post</p>
                <hr></hr>
                <p className={`font15_bold`}>Share this Article</p>
                <hr></hr>
                <p className="gray-text">Next Post</p>
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
                  <p className='font-semibold'>Comments</p>
                </div>

                {(data.comments && data.comments.length != 0) &&
                  <div style={{ background: "#efefef" }} className={` ${showComment && 'transition-all ease-in delay-500 duration-500 h-[auto] w-[auto]'} rounded-lg relative  mt-3  `}>
                    {data.comments.map((res, index) => {
                      return (
                        <Comments cmt={true} data={res} key={index} />
                      )
                    })}
                    <Image src={'/categories/PNG.png'} height={30} width={100} alt='hide' className='absolute h-[85px] w-full bottom-0' />
                  </div>
                }
              </>}
              <div className={`${(data.comments && data.comments.length != 0) ? '': 'mt-[10px]'} flex justify-center`}>
                <button onClick={showSidebar} className={`justify-center bg-red text-white h-[45px] rounded items-center  ${styles.cmt_btn} w-[25%] flex `}>{(data.comments && data.comments.length != 0) ? 'View Comments' : 'Add Comment'} </button>
              </div>

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


          {
            (categories.sections && categories.sections.section_2) &&
            <div className='w_30'>
              {categories.sections.section_2.message.map(res => {
                return (
                  <div key={res.section_type}>
                    {
                      res.child_section_data &&
                      <div className='py-3'>
                        {res.child_section_data.map((item, index) => {
                          return (
                            <div key={index}>
                              {(item.section_type == 'list' && item.section_name == 'Must Read' && item.data) && <div className='border rounded-[5px] p-[10px]'>
                                <Title data={item} />
                                <List borderRadius={'rounded-[5px]'} imgFlex={'flex-[0_0_calc(35%_-_10px)]'} data={item.data} imgHeight={'h-full'} imgWidth={'w-full'} />
                              </div>}

                              {
                                item.section_type == 'Ad1' && <div className='py-3'>
                                  <AdsBaner text={"Advertisement"} data={item} height={'260px'} width={'300px'} />
                                </div>
                              }


                              {(item.section_type == 'list' && item.section_name != 'Must Read' && item.data) && <div className='border rounded-[5px] p-[10px]'>
                                <Title data={item} />
                                <List borderRadius={'rounded-[5px]'} imgFlex={'flex-[0_0_calc(35%_-_10px)]'} data={item.data} imgHeight={'h-full'} imgWidth={'w-full'} />
                              </div>}

                              {
                                item.section_type == 'Ad2' && <div className='py-3'>
                                  <AdsBaner text={"Advertisement"} data={item} height={'h-[600px]'} width={'w-[300px]'} />
                                </div>
                              }

                              {(item.section_type == 'list1' && item.section_name != 'Must Read' && item.data) && <div className='border rounded-[5px] p-[10px]'>
                                <Title data={item} />
                                <List isTop={true} borderRadius={'rounded-[5px]'} imgFlex={'flex-[0_0_calc(35%_-_10px)]'} isBB={true} data={item.data} imgHeight={'h-full'} imgWidth={'w-full'} />
                              </div>}
                            </div>
                          )
                        })}
                      </div>
                    }

                    {
                      res.section_type == 'Ad' && <div className='py-3'>
                        <AdsBaner data={res.baner_img3} text={"Advertisement"} height={'220px'} width={'275px'} />
                      </div>
                    }
                  </div>
                )
              })}
            </div>
          }

        </div>

        {categories.sections.section_3 && <div className={`container ${styles.section_3}`}>
          {/* Slider */}
          {(categories.sections.section_3.section_type == 'slider' && categories.sections.section_3.type == 'card') && <div className={`${styles.slider_parent} p03015 mb-7`}>
            <div className='title_div pb10'>
              <h6 className='title'>{categories.sections.section_3.title}</h6>
              <div className='line'></div>
            </div>
            {((categories.sections.section_3.type == 'list' || categories.sections.section_3.type == 'card') && categories.sections.section_3.data) && <MultiCarousel perView={5} data={categories.sections.section_3.data} height={"h-full"} width={'w-full'} type={'card'} />}
          </div>}

        </div>}
      </div>
    </>
  )
}
