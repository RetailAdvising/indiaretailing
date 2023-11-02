import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import AdsBaner from '../Baners/AdsBaner'
import List from '../common/List'
import { useState } from 'react'
import Content from '../common/Content'
import Title from '../common/Title'
import Modal from '../common/Modal'
import { check_Image, checkMobile, HomePage } from '@/libs/api'
import Comments from '../Category/Comments'
import Placeholders from '../common/Placeholders'
// Social Share
import { WhatsappShareButton, LinkedinShareButton, TwitterShareButton, FacebookShareButton } from 'react-share'
import { useRouter } from 'next/router'
import CustomSlider from '../Sliders/CustomSlider'
import AuthModal from '../Auth/AuthModal';
import SubscriptionAlert from '../common/SubscriptionAlert'
// import DOMPurify from 'dompurify';
import { useSelector, useDispatch } from 'react-redux';
import Widgets from '../Category/Widgets'
import ReactDOM from 'react-dom/client';
import Benefits from '@/components/Membership/benefits';
export default function CategoryBuilder({ data, load, isLast, i, ads, user, productNavigation, comments, updatedCmt, updateShare, noScroll, plans }) {
  const styles = {}
  const [showComment, setshowComment] = useState(true);
  // const [data, setdatas] = useState(datas);

  const [validator, setValidator] = useState(false)
  const router = useRouter();
  const [updateCmts, setupdateCmts] = useState(false)
  const role = useSelector(s => s.role);

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

    if (typeof window !== 'undefined') {

      //  checkRole()
      // const data = JSON.parse(localStorage['roles']);
      // if (data && data.length != 0) {
      //   data.map(res => {
      //     if (res.role == 'Member') {
      //       setValidator(!validator);
      //       // setRender(!render);
      //     }
      //   })
      // }
      // console.log(role)
    }

    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad);
    }

  }, [user, role])





  const checkRole = () => {
    if (role && role != '' && role.message && role.message.length != 0) {
      // console.log(role)
      // if(updateCmts == -1){
      for (let index = 0; index < role.message.length; index++) {
        if (role.message[index] == 'Member') {
          setValidator(!validator);
        }
      }
      // }
    }
  }



  const cardref = useRef(null)

  useEffect(() => {
    if (!cardref?.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        if (!data.is_member && data.ir_prime == 1) {
          getMembershipLanding()
        } else {
          load();
        }
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardref.current);
  }, [isLast])

  const [pageContent, setpageContent] = useState([]);

  async function getMembershipLanding() {
    let data = { "route": "membership", "page_no": 1, "page_size": 10 }
    const resp = await HomePage(data);
    // console.log(resp);
    if (resp && resp.message && resp.message.page_content && resp.message.page_content != 0) {
      let datas = resp.message.page_content
      setpageContent(datas);
    }
  }

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



  // let [element, setElement] = useState(['parent0'])
  // let [shareEle, setShareEle] = useState(['share0'])
  function onPageLoad() {
    // console.log(data)
    // if (i > 0) {
    //   element.push('parent' + i)
    //   setElement(element)
    //   // shareEle.push('share' + i)
    //   // setShareEle(shareEle)
    // }
    if ((data && data.article_sections && data.article_sections.length != 0)) {
      // console.log('data.article_sections', data.article_sections);
      data.article_sections.map((res, i) => {
        if (res.data && res.data.length != 0) {
          let element = document.getElementById(`${res.placeholder_key}`);
          // element && ReactDOM.render( <SubscriptionAlert />,element)
          // console.log(element)
          // element?.classList.add('placeholder')
          // let html = '';


          // if (res.title) {
          //   const headerElement = document.createElement('h6');
          //   headerElement?.classList.add('mb-[18px]', 'text-[18px]', 'font-semibold')
          //   headerElement.textContent = res.title;
          //   (element && element.parentNode) ? element.parentNode.insertBefore(headerElement, element) : null;
          // }

          // element && element?.classList.add('py-[15px]')

          // element && ReactDOM.render(<CustomSlider type={'widget'} data={res.data} parent={res} routers={router} hide_scroll_button={true} slider_child_id={res.placeholder_key + i} cardClass={'flex-[0_0_calc(33.33%_-_15px)] md:flex-[0_0_calc(65%_-_10px)]'}
          //   imgClass={'lg:h-[185px] md:h-[170px] w-full'} subtitle_class={'line-clamp-1  md:mb-[10px]'} title_class={'min-h-[35px] line-clamp-2'} productNavigation={productNavigation} />, element)
          if (element) {
            // element && ReactDOM.render(<Widgets data={res} productNavigation={productNavigation} routers={router} />, element)
            const root = ReactDOM.createRoot(element)
            root.render(<Widgets data={res} productNavigation={productNavigation} routers={router} />)

          }
          // res.data.map((item, index) => {
          //   if (res.title) {
          //     if (res.title == 'Articles') {
          //       item.route = '/' + item.route
          //     } else if (res.title == 'Community Event' || res.title == 'Events') {
          //       item.route = '/events/' + item.route
          //     } else if (res.title == 'Books') {
          //       item.route = '/bookstore/' + item.category_route + '/' + item.route
          //     } else if (res.title == 'Videos') {
          //       item.route = '/video/' + item.route
          //     } else if (res.title == 'Podcasts') {
          //       item.route = '/podcast/' + item.route
          //     }
          //   } else {
          //     item.route = '/' + item.route
          //   }

          //   //  onClick=${checkRoute(item)} 
          //   // <Image class=${'img'} src='${check_Image(item.thumbnail_imagee ? item.thumbnail_imagee : item.thumbnail_path ? item.thumbnail_path : item.image_path ? item.image_path :  item.image)}' height={40} width={50} alt='image' />
          //   // <span class='pt-[5px] line-clamp-2 sub_title'>${item.blog_intro ? item.blog_intro : item.description ? item.description : ''}</span>            
          //   html +=
          //     `<a href=${item.route ? item.route : '#'} key=${index} class='${'card'} cursor-pointer'>
          //     <div>
          //       <Image class=${'img'} src='${check_Image(item.thumbnail_imagee || item.thumbnail_path || item.image_path || item.image || item.video_image)}' height={40} width={50} alt='image' />
          //     </div>
          //     <div class='p-[10px]'>
          //     <h6 class='line-clamp-2 title'>${(item.title || item.item) ? (item.title || item.item) : ''}</h6>            
          //      <span class='pt-[5px] line-clamp-2 sub_title'>${res.placeholder_key.includes('Product') ? (item.short_description ? item.short_description : '') : (stripHtmlTags(item.blog_intro || item.description))}</span>            
          //     </div>

          //     </a>`
          // })
          // element ? element.innerHTML = html : null
        }
        // element.append(data)
        // console.log(res.placeholder_key)
      })
    }

  }

  const stripHtmlTags = (html) => {
    if (html && html != '') {
      const cleanedHtml = html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
      const withoutStyles = cleanedHtml.replace(/style\s*=\s*".*?"/g, '');
      const withoutTags = withoutStyles.replace(/<\/?[^>]+(>|$)/g, '');
      return withoutTags;
    } else {
      return ''
    }
  };

  const checkRoute = (link) => {
    // console.log(link)
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
    // if (data.comments && data.comments.length != 0) {
    //   setshowComment(!showComment);
    //   // Disables Background Scrolling whilst the SideDrawer/Modal is open
    //   if (typeof window != 'undefined' && window.document) {
    //     document.body.style.overflow = 'hidden';
    //   }
    // } else if (data.comments && data.comments.length == 0) {
    //   if (localStorage && !localStorage['apikey']) {
    //     setIsLogin(true);
    //     setLoginModal(true)
    //   } else {
    //     setshowComment(!showComment);
    //   }
    // }
    // console.log(comments)
    if (comments && comments.length != 0) {
      setshowComment(false);
      // Disables Background Scrolling whilst the SideDrawer/Modal is open
      if (typeof window != 'undefined' && window.document) {
        document.body.style.overflow = 'hidden';
      }
    } else if (comments && comments.length == 0) {
      if (localStorage && !localStorage['apikey']) {
        setIsLogin(true);
        setLoginModal(true)
      } else {
        setshowComment(false);
      }
    }
  }

  const hideModal = () => {
    setLoginModal(false)
    // console.log('close')
    if (localStorage && localStorage['apikey']) {
      setshowComment(true);
      show()
    }
  }

  const [isMobile, setIsMobile] = useState()
  useEffect(() => {
    // checkRole()
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


  const sanitizeHtml = (html) => {
    // Replace all &nbsp; entities with a space character
    if (html && typeof (html) == 'string') {
      let cleanedHtml = html.replace(/&nbsp;/g, ' ');

      // Remove extra spaces (multiple consecutive spaces) without removing tags and colors
      cleanedHtml = cleanedHtml.replace(/<[^>]*>/g, (match) => {
        // Preserve inline colors (style attributes) within tags
        if (match.includes('style="color:')) {
          return match;
        }
        // Remove spaces from other parts of the tags
        return match.replace(/\s+/g, ' ');
      });

      // Parse the cleaned HTML into a DOM tree
      const parser = new DOMParser();
      let doc = parser.parseFromString(cleanedHtml, 'text/html');

      // Remove all elements that do not have any content (including nested content)
      const emptyElements = doc.querySelectorAll('*:empty:not(br):not(img):not(div)');
      for (const element of emptyElements) {
        element.parentNode.removeChild(element);
      }

      cleanedHtml = new XMLSerializer().serializeToString(doc);
      doc = parser.parseFromString(cleanedHtml, 'text/html');
      const brElements = doc.querySelectorAll('br');
      for (const br of brElements) {
        const prevNode = (br.previousSibling && br.previousSibling.data) ? br.previousSibling.data : undefined;
        const nextNode = (br.nextSibling && br.nextSibling.data) ? br.nextSibling.data : undefined;
        // console.log(prevNode)
        if ((prevNode && prevNode != ' ') || (nextNode && nextNode != ' ')) {

        } else {

          if (!br.closest('strong')) {
            br.parentNode.removeChild(br);
          }

        }
      }
      cleanedHtml = new XMLSerializer().serializeToString(doc);
      return cleanedHtml;
    }

  };

  useEffect(() => {
    checkRole()
    // console.log('load role')
  }, [updateCmts, role, comments])

  const reRender = async () => {
    // console.log('rerender....');
    setTimeout(() => {
      setupdateCmts(!updateCmts)
      checkRole()
    }, 500);
  }


  // let [scrolls, setScrolls] = useState(false)
  // useEffect(() => {
  //   // const handleScroll = () => {
  //   //   const scrollTop = document.documentElement.scrollTop
  //   //   const scrollHeight = document.documentElement.scrollHeight
  //   //   const clientHeight = document.documentElement.clientHeight
  //   //   if ((scrollTop + clientHeight)  >= 1700) {
  //   //     let ind = i-1
  //   //     // let element = document.querySelectorAll('.finding')
  //   //     let element = document.getElementById('finding'+ind)
  //   //     // let arr = Array.from(element)
  //   //     // console.log(arr[i].classList.add('fixed','right-0','top-0'))
  //   //     console.log(element?.classList.add('fixed','right-0','top-0'))
  //   //   }else{
  //   //     let ind = i-1
  //   //     // let element = document.querySelectorAll('.finding')
  //   //     let element = document.getElementById('finding'+ind)
  //   //     // let arr = Array.from(element)
  //   //     // console.log(arr[i].classList.remove('fixed','right-0','top-0'))
  //   //     console.log(element?.classList.remove('fixed','right-0','top-0'))

  //   //   }
  //   //   // console.log(scrollTop,'scrollTop')
  //   //   //   console.log(clientHeight,'clientHeight')
  //   //   //   console.log(scrollHeight,'scrollHeight')

  //   // };

  //   // window.addEventListener('scroll', handleScroll);

  //   // return () => {
  //   //   window.removeEventListener('scroll', handleScroll);
  //   // };

  //   const handleScroll = () => {
  //     // const parentElement = document.getElementById('parent');
  //     // const targetElement = document.getElementById('target');

  //     // if (parentElement && targetElement) {
  //     //   const parentRect = parentElement.getBoundingClientRect();
  //     //   const targetRect = targetElement.getBoundingClientRect();

  //     //   if (parentRect.bottom <= targetRect.top) {
  //     //     // setIsSticky(true);
  //     //     console.log(parentRect, 'parentRect')
  //     //     console.log(targetRect, 'targetRect')
  //     //   } else {
  //     //     console.log(parentRect, 'parentRect')
  //     //     console.log(targetRect, 'targetRect')
  //     //     // setIsSticky(false);
  //     //   }
  //     // }
  //     const scrollPosition = window.scrollY;
  //     const windowHeight = window.innerHeight;
  //     const scrollTop = document.documentElement.scrollTop
  //     const scrollHeight = document.documentElement.scrollHeight
  //     const clientHeight = document.documentElement.clientHeight

  //     for (const divId of element) {

  //       const div = document.getElementById(divId);

  //       if (!div) continue;

  //       const divTop = div.getBoundingClientRect().top;
  //       const divBottom = div.getBoundingClientRect().bottom;
  //       if ((scrollTop + clientHeight) >= 1200 && !scrolls) {
  //         // let val = document.getElementById('target' + divId[divId.length - 1])
  //         // // val.classList.add('fixed', 'top-0', 'right-[15px]')
  //         // val.classList.add('sticky', 'top-0', 'z-10','bg-white','h-[calc(100vh_-_10px)]','overflow-auto','scrollbar-hide')

  //         // scrolls = true
  //         // setScrolls(scrolls)
  //       }
  //       // if (divTop < windowHeight / 2 && divBottom > windowHeight / 2) {
  //       //   // let ind = divId.replace('div', '')
  //       //   // ind = Number(ind);
  //       //   // console.log(div, 'reach')
  //       //   // console.log(divId[divId.length - 1], 'reach')
  //       //   let val = document.getElementById('target' + divId[divId.length - 1])
  //       //   val.classList.add('fixed', 'top-0', 'right-[15px]')
  //       //   // console.log(val)
  //       // } else {
  //       //   let val = document.getElementById('target' + divId[divId.length - 1])
  //       //   val.classList.remove('fixed', 'top-[15px]', 'right-[15px]')
  //       //   console.log(div)
  //       // }
  //     }

  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  //   // let ele = document.getElementById('parent' + i)
  //   // let ele = document.getElementById('tg')
  //   // // const observer = new IntersectionObserver(([entry]) => {
  //   // //   console.log(entry)
  //   // //   if (entry.isIntersecting) {

  //   // //     observer.unobserve(entry.target);
  //   // //   }
  //   // // });

  //   // // observer.observe(ele);
  //   // const intersectionObserver = new IntersectionObserver(entries => {
  //   //   if (entries[0].intersectionRatio <= 0){
  //   //     console.log(entries[0])
  //   //   }
  //   //   console.log(entries[0])
  //   // });

  //   // ele && intersectionObserver?.observe(ele);

  //   // return () => {
  //   //   ele && intersectionObserver?.unobserve(ele)
  //   // }
  // }, [])

  // useEffect(() => {
  //   // findingElement()
  //   const handleScroll = () => {
  //     for (const divId of shareEle) {
  //       const div = document.getElementById(divId);

  //       if (!div) continue;

  //       const intersectionObserver = new IntersectionObserver(entries => {
  //         if (entries[0].intersectionRatio >= 0 && scrolls) {
  //           // console.log(entries[0])
  //           // let val = document.getElementById('target' + divId[divId.length - 1])
  //           // val?.classList.remove('sticky', 'top-0', 'z-10','bg-white','h-[calc(100vh_-_10px)]','overflow-auto','scrollbar-hide')
  //           // val?.classList.remove('fixed', 'top-0', 'right-[15px]')
  //           // scrolls = false
  //           // setScrolls(scrolls)
  //         }
  //       });

  //       intersectionObserver?.observe(div);

  //       return () => {
  //         intersectionObserver?.unobserve(div)
  //       }
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };

  // }, [])


  return (
    <>
      {/* {console.log('child',data)}   */}
      <div ref={cardref}>
        <div className={`flex w-full lg:relative lg:gap-[30px] lg:justify-between md:gap-[20px] md:flex-wrap lg:p-[20px_0px] md:p-[15px] ${isMobile ? '' : 'container'}`}>
          <div id={'parent' + i} className={` md:w-full ${(!data.is_member && data.ir_prime == 1) ? 'w-[calc(80%_-_20px)] m-auto' : 'w_70'}`}>
            <p>
              <Content i={i} res={data} updateShare={(data) => updateShare(data)} noScroll={(val) => noScroll(val)} />
            </p>
            <div className='relative article_content overflow-hidden'>
              {data.content && <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.content) }} id={`${i}`} className={`contents ${(data.ir_prime == 1 && !data.is_member) && 'prime-article'}`} />}
              {(!data.is_member && data.ir_prime == 1) && <div className='prime-article-after'></div>}
            </div>
            {/* {(isPrime && !validator) && <div className='border-0 p-[20px] my-[20px] rounded-md bg-[#e21b22] mt-6'> */}
            {/* <h6 className='text-center text-[20px] md:text-[16px] font-semibold pb-[15px] text-[white] flex'><Image src={'/ir-icon.svg'} height={38} width={38} alt={"image"} className='mr-3 object-contain' />This story is for Premium Members you  have to buy Membership to Unlock</h6>
              <div className='flex gap-[20px] justify-center pt-[0px]'>
                <button className='primary_btn p-[6px_8px] text-[13px] bg-[#fff] text-[#e21b22] flex' onClick={() => router.push('/membership')}><Image src={'/subscribe.svg'} height={18} width={18} alt={"image"} className='mr-1' />Subscribe</button> */}
            {/* <button className='primary_btn h-[40px] w-[15%]' onClick={() => logInModal('login')}>LogIn</button>
                <button className='border  h-[40px] w-[15%]' onClick={() => logInModal('signup')}>SignUp</button> */}
            {/* </div>
            </div>} */}

            {(!data.is_member && data.ir_prime == 1) &&
              // <div className='grid place-content-center max-w-[400px] p-[30px_20px_0_20px] md:p-[20px] m-[0_auto]'>
              //   <div className={`flex items-center gap-[10px] `}>
              //     <Image src={'/irprime/premium.svg'} height={20} width={20} alt='premium' />
              //     <p className='text-red font-semibold'>IR Prime</p>
              //   </div>

              //   {/* <div> */}
              //   <h6 className='text-[32px] font-[600] leading-[40px] md:text-[17px] md:leading-[22px] pt-[10px]'>Its a Premium Content,Simply buy Membership to Unlock</h6>
              //   <p className='text-[14px] font-[400] text-gray pt-[10px] leading-[20px] md:leading-[16px] md:pt-[15px]'>50,000+ articles IRPrime is the only subscription you need</p>
              //   {/* </div> */}

              //   <div className='w-full mt-[25px] md:mt-[15px] md:text-center'>
              //     <button className='primary_button w-full text-[16px] h-[50px] p-[5px_10px] md:text-[14px] md:h-[35px] md:w-max' onClick={() => router.push('/membership')} style={{ borderRadius: '9999px', textTransform: 'unset' }}>Subscribe to IR Prime</button>
              //   </div>
              // </div>
              <>
                <SubscriptionAlert data={plans} />

                <div className='py-[20px]'>
                  {pageContent && pageContent.length != 0 && pageContent.map((res, i) => {
                    return (
                      <div key={res.section_name + i}>
                        <Benefits data={res}></Benefits>
                      </div>

                    )
                  })
                  }
                </div>
              </>
            }

            <Modal modal={modal} show={show} visible={visible} hide={hide} />

            {/* <div className={`${styles.slider_parent}`}>
              <div>
                <Title data={{ title: "Must Read" }} />
              </div>
              <ChildSlider data={categories.sections.section_1.must_read.data} per_view={3} cols={3} colsPerView={1} rows={2} type={'list'} />
            </div> */}

            {/* Comments */}

            {/* {data._user_tags && typeof (data._user_tags) != 'string' && data._user_tags.length != 0 &&
              <div className='flex items-center flex-wrap pt-[15px]'>
                <h6 className='w-max text-[13px] text-[#fff] bg-[#e21b22] border rounded-[5px] p-[3px_15px] mr-[6px] mb-[12px]'>Tags</h6>
                {data._user_tags.map((res, index) => {
                  return (
                    <h6 key={index} onClick={() => { router.push('/tag/' + res) }} className='cursor-pointer w-max capitalize text-[13px] text-[#000] bg-[#f1f1f1]  rounded-[5px] p-[3px_15px] mr-[6px] mb-[12px]'>{res}</h6>
                  )
                })
                }
              </div>
            } */}

            {(data.articles_tags && data.articles_tags.length != 0) && ((data.is_member && data.ir_prime == 1) || data.ir_prime == 0) &&
              <div className='flex items-center flex-wrap pt-[15px]'>
                <h6 className='w-max text-[13px] text-[#fff] bg-[#e21b22] border rounded-[5px] p-[3px_15px] mr-[6px] mb-[12px]'>Tags</h6>
                {data.articles_tags.map((res, index) => {
                  return (
                    <h6 key={index} onClick={() => { router.push('/tag/' + res.route) }} className='cursor-pointer w-max capitalize text-[13px] text-[#000] bg-[#f1f1f1]  rounded-[5px] p-[3px_15px] mr-[6px] mb-[12px]'>{res.tag}</h6>
                  )
                })
                }
              </div>
            }

            {((data.is_member && data.ir_prime == 1) || data.ir_prime == 0) && <div className='lg:py-12'>
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
                    <div key={index} onClick={() => updateShare(res)}>
                      {
                        res.name == 'fb' ? <FacebookShareButton url={`${true ? '/categories/' + router.query.types + '/' + data.name : '/IRPrime/' + router.query.list + '/' + router.query.detail}`}>
                          <div key={index} className={`rounded-full bg-light-gray p-2`}>
                            <Image src={res.icon} alt={res.name} height={25} width={20} />
                          </div>
                        </FacebookShareButton>
                          : res.name == 'ws' ? <WhatsappShareButton url={`${true ? '/categories/' + router.query.types + '/' + data.name : '/IRPrime/' + router.query.list + '/' + router.query.detail}`}>
                            <div key={index} className={`rounded-full bg-light-gray p-2`}>
                              <Image src={res.icon} alt={res.name} height={25} width={20} />
                            </div>
                          </WhatsappShareButton>
                            : res.name == 'linkedin' ? <LinkedinShareButton url={`${true ? '/categories/' + router.query.types + '/' + data.name : '/IRPrime/' + router.query.list + '/' + router.query.detail}`}>
                              <div key={index} className={`rounded-full bg-light-gray p-2`}>
                                <Image src={res.icon} alt={res.name} height={25} width={20} />
                              </div>
                            </LinkedinShareButton>
                              : res.name == 'twitter' ? <TwitterShareButton url={`${true ? '/categories/' + router.query.types + '/' + data.name : '/IRPrime/' + router.query.list + '/' + router.query.detail}`}>
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
                {/* <div className={`py-1.5 relative w-[120px] ${styles.profile_div}`}> */}
                {/* id={`cmt${data.route}`} */}
                {/* <h6 className={`font-semibold text-[19px] md:text-[15px] ${'cmt' + i}`}>Comments</h6>
                  <p className={`absolute top-0 right-0 bg-[#ddd] rounded-[50%] text-center min-w-[25px] min-h-[25px] max-w-max`}><span className='text-[13px]'>{comments && comments.length ? comments.length : 0}</span></p> */}
                {/* </div> */}

                {(comments && comments.length != 0) &&
                  comments.map((res, i) => {
                    return (
                      <div key={i}>
                        {/* style={{ background: "#efefef" }} */}
                        {(res.route == data.name && res.data && res.data.length != 0) ? <div className={` ${showComment && 'transition-all ease-in delay-500 duration-500 h-[auto] w-[auto]'} rounded-lg relative  `}>
                          {/* {data.comments.map((res, index) => {
                      return ( */}
                          <div className={`py-1.5 relative w-[120px] md:w-[105px] ${styles.profile_div}`}>
                            {/* id={`cmt${data.route}`} */}
                            <h6 className={`font-semibold text-[19px] md:text-[15px] ${'cmt' + data.name}`}>Comments</h6>
                            <p className={`absolute top-0 right-0 bg-[#ddd] rounded-[50%] text-center min-w-[25px] min-h-[25px] max-w-max`}><span className='text-[13px]'>{res.data.length ? res.data.length : 0}</span></p>
                          </div>
                          <Comments cur={data} noScroll={(val) => noScroll(val)} updatedCmt={(cmt, route, index) => { updatedCmt(cmt, route, index), reRender() }} route={res.route} data={res.data.slice(0, 3)} hide_comment={hide} />
                          {/* )
                    })} */}
                          {isMobile && (res.data && res.data.length != 0) ? <div className='mt-[10px] flex gap-[10px] justify-center'>
                            <button onClick={showSidebar} className={`justify-center bg-red text-white h-[45px] rounded items-center  ${styles.cmt_btn} lg:w-[25%] md:text-[13px] md:px-[15px]  flex`}>{(res.data && res.data.length != 0) ? 'View Comments' : 'Add Comment'}</button>
                            {/* <button onClick={showSidebar} className={`justify-center p-[6px_8px] md:mt-0 mt-3 text-[13px] rounded ${(data.comments && data.comments.length != 0) ? 'text-[#e21b22] border-[#e21b22]' : 'bg-red text-white'} items-center flex border`}>Post a comment </button> */}
                          </div> : <div className={`mt-[10px] flex justify-center`}>
                            {res.data && res.data.length != 0 && <button onClick={showSidebar} className={`justify-center bg-red text-white p-[10px_20px] md:mt-4 mt-3 rounded items-center  ${styles.cmt_btn} text-[13px] flex`}>{(res.data && res.data.length != 0) && 'View Comments'} </button>}
                          </div>}
                        </div> :
                          (res.route == data.name && res.data && res.data.length == 0) ? <><div className={`py-1.5 relative w-[120px] md:w-[105px] ${styles.profile_div}`}>
                            {/* id={`cmt${data.route}`} */}
                            <h6 className={`font-semibold text-[19px] md:text-[15px] ${'cmt' + data.name}`}>Comments</h6>
                            <p className={`absolute top-0 right-0 bg-[#ddd] rounded-[50%] text-center min-w-[25px] min-h-[25px] max-w-max`}><span className='text-[13px]'>0</span></p>
                          </div>

                            <Comments cur={data} noScroll={(val) => noScroll(val)} updatedCmt={(cmt, route, index) => { updatedCmt(cmt, route, index), reRender() }} route={res.route} data={[]} hide_comment={hide} />
                            {isMobile && (res.data && res.data.length != 0) ? <div className='mt-[10px] flex gap-[10px] justify-center'>
                              <button onClick={showSidebar} className={`justify-center bg-red text-white h-[45px] rounded items-center  ${styles.cmt_btn} lg:w-[25%] md:text-[13px] md:px-[15px]  flex`}>{(res.data && res.data.length != 0) ? 'View Comments' : 'Add Comment'}</button>
                              {/* <button onClick={showSidebar} className={`justify-center p-[6px_8px] md:mt-0 mt-3 text-[13px] rounded ${(data.comments && data.comments.length != 0) ? 'text-[#e21b22] border-[#e21b22]' : 'bg-red text-white'} items-center flex border`}>Post a comment </button> */}
                            </div> : <div className={`mt-[10px] flex justify-center`}>
                              {res.data && res.data.length != 0 && <button onClick={showSidebar} className={`justify-center bg-red text-white p-[10px_20px] md:mt-4 mt-3 rounded items-center  ${styles.cmt_btn} text-[13px] flex`}>{(res.data && res.data.length != 0) && 'View Comments'} </button>}
                            </div>}
                          </> : <></>


                        }
                      </div>
                    )
                  })
                }
              </>
              }

              {/* <div id={`share` + i}></div> */}

              {/* {data.disable_comments != 1 &&
                <>
                  {isMobile ? <div className='mt-[10px] flex gap-[10px] justify-center'>
                    <button onClick={showSidebar} className={`justify-center bg-red text-white h-[45px] rounded items-center  ${styles.cmt_btn} lg:w-[25%] md:text-[13px] md:px-[15px]  flex`}>{(data.comments && data.comments.length != 0) ? 'View Comments' : 'Add Comment'}</button>
                  </div> : <div className={`mt-[10px] flex justify-center`}>
                    <button onClick={showSidebar} className={`justify-center bg-red text-white p-[10px_20px] md:mt-4 mt-3 rounded items-center  ${styles.cmt_btn} text-[13px] flex`}>{(data.comments && data.comments.length != 0) ? 'View Comments' : 'Add Comment'} </button>
                  </div>}
                </>

              } */}
              {(!showComment && data) ? <>
                <div className='popright'>
                  <Modal visible={true} cur={data} modal={'comments'} hide={sideDrawerClosedHandler} />
                </div>
                {comments && comments.length != 0 && comments.map((res, i) => {
                  return (
                    <div key={i}>
                      {(res.route == data.name && res.data && res.data.length != 0) && <div className='popright'>
                        {/* <Modal visible={true} modal={'comments'} cur={data} store_comments={(cur) => store_comments(cur)} hide={sideDrawerClosedHandler} /> */}
                        <Modal updatedCmt={(cmt, route, index) => { updatedCmt(cmt, route, index), reRender() }} cur={data} visible={true} modal={'comments'} route={res.route} comments={res.data} hide={sideDrawerClosedHandler} />
                        {/* scrolling="no" */}
                        {/* <iframe className='w-full ' rel='preload' src="https://www.linkedin.com/embed/feed/update/urn:li:share:7092358111637737472" height="696" width="504" frameborder="0" allowfullscreen="false" title="Embedded post"></iframe> */}
                        {/* <iframe className='w-full' rel='preload' src="https://www.linkedin.com/embed/feed/update/urn:li:share:7092137020289904641" height="725" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe> */}
                      </div>}
                    </div>
                  )
                })}
              </> : (showComment && data && data.doctype == 'Articles' && isLogin && loginModal) ? <div className='authModal'><AuthModal visible={loginModal} hide={hideModal} /></div> : null}
            </div>}
          </div>

          {((data.is_member && data.ir_prime == 1) || data.ir_prime == 0) && <div className={`w_30 md:hidden finding relative`}>
            {/* {data.advertisement_tags && data.advertisement_tags.length != 0 && <AdsBaner data={data.advertisement_tags[0]} />} */}
            {(data.place_holders_ads && data.place_holders_ads.length != 0) &&
              // h-[calc(100vh_-_10px)] scrollbar-hide
              <div id={'target' + i} className={`sticky h-[calc(100vh_-_10px)] scrollbar-hide top-0 z-10 bg-white  overflow-auto `}><Placeholders placeholder={data.place_holders_ads} tagbasedAd={data.banner_ad && data.banner_ad.length != 0 && data.banner_ad.banner_ad_item.length != 0 ? data.banner_ad.banner_ad_item : []} productNavigation={productNavigation} /></div>}
          </div>}
        </div>


        {data.latest_news && data.latest_news.length != 0 && <div className={`${isMobile ? '' : 'container'}  ${styles.section_3}`}>
          {/* Slider */}
          <div className={`${styles.slider_parent} latestNews_slider lg:mb-[15px] p-[20px 0] md:p-[10px_15px] ${isLast && 'mb-7'}`}>
            <Title data={{ title: 'Latest News' }} />
            <CustomSlider slider_id={"category_builder" + i} slider_child_id={'category_builder_child' + i} data={data.latest_news} cardClass={'flex-[0_0_calc(20%_-_16px)] md:flex-[0_0_calc(70%_-_10px)]'} route={'/news/'} imgClass={'h-[190px] md:h-[160px] w-full'} />
          </div>
        </div>}

        {/* {!isLast && <div className={`flex md:gap-[10px]  lg:m-[20px_auto_0] lg:gap-[20px] items-center md:p-[10px_15px] lg:p-[15px 0] ${isMobile ? '' : 'container'}`}>
          <h6 className={`flex-[0_0_auto] lg:text-[18px] md:text-[14px] font-semibold`}>Next Post</h6>
          <div className='lg:bg-[#999] w-full lg:h-[2px] md:bg-stone-200 md:h-[3px]'></div>
        </div>} */}
      </div>
    </>
  )
}
