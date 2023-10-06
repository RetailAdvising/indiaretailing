'use client'
import RootLayout from '@/layouts/RootLayout'
import React, { useState, useEffect, useMemo } from 'react'
import { articlesDetail, getAds, check_Image, getList } from '@/libs/api';
import CategoryBuilder from '@/components/Builders/CategoryBuilder';
import { useRouter } from 'next/router';
import SEO from '@/components/common/SEO'
import { useSelector, useDispatch } from 'react-redux';
import { NextSeo } from 'next-seo'
export default function Details({ data, page_route }) {
  const router = useRouter();
  const [values, setValues] = useState([])
  const [prev, setPrev] = useState('')
  const [pagination, setPagination] = useState(true);
  const [advertisement, setAds] = useState();
  const [pageNo, setPageNo] = useState(1);
  const [meta_info, setMetaInfo] = useState();
  const generateMetaData = (data) => {
    // return{
    //   title: data.meta_title ? data.meta_title : data.title,
    //   openGraph: {
    //     title: data.meta_title ? data.meta_title : data.title,
    //     images: check_Image(data.meta_image ? data.meta_image : data.image),
    //     description: data.meta_description ? data.meta_description : data.title
    //   },
    // }
    // console.log(data,'from memo')
  }
  const meta_inf = useMemo(() => generateMetaData(meta_info), [meta_info])

  let page_no = 1;
  let [divs, setDivs] = useState(['div0']);
  let [routeList, setRouteList] = useState([])

  const articleDetail = async (route) => {
    // console.log(router,'router')
    if (router.query && router.query?.detail && typeof window !== 'undefined') {
      let Id = route ? route : page_route
      values.length = 0
      setValues(values)
      // let Id = await router.query?.detail;
      let param = {
        "route": Id,
        // "category": category,
        "next": 0
      }
      let value = await articlesDetail(param);
      let data = await value.message;
      console.log(data)
      if (data.status == "Success") {
        if (data && data._user_tags && data._user_tags != '') {
          let tags = data._user_tags.split(',');
          tags.splice(0, 1);
          data._user_tags = tags
        } else {
          // data._user_tags = [];
          data ? data._user_tags = [] : null;
        }
        routeList.push(data.route)
        setRouteList(routeList)
        setMetaInfo(data)
        page_no += 1;
        setPageNo(pageNo + 1)
        // let val = [data]
        // setValues(d => [...d, ...val])
        values.push(data)
        setValues(values)
        setPrev(router.query?.detail)
      }
    }
    // console.log('sad'+val)
  }

  const ads = async () => {
    let param = { doctype: 'Articles', page_type: 'Detail' }
    const resp = await getAds(param);
    const ads = resp.message;
    setAds(ads)
  }


  const user = useSelector(s => s.user);

  useEffect(() => {
    // window.addEventListener("scroll", call_observer)
    if (typeof window !== 'undefined') {
      articleDetail(undefined);
      ads();
    }

    console.log(user, 'user')

    if (typeof window !== 'undefined' && localStorage['roles'] && localStorage['roles'] != '') {
      values.map(res => {
        res.ir_prime = 1;
      })
      setValues(values);
    }

  }, [user])


  // Observer for route change
  let boxElList = '';
  let active_Ind = -1;
  const call_observer = () => {
    const observer = new IntersectionObserver(entries => {

      entries.forEach((entry, ind) => {
        if (entry.intersectionRatio > 0) {
          console.log(ind, 'visible');
          console.log('values', values);

          if (values && values.length > 0) {
            // console.log('pushed', values[ind]);
            // console.log('route', values[ind]["route"])
            router.replace({ pathname: '/' + values[ind]["route"] }, undefined, { scroll: false });
            // console.log('replaced',ind,values)
            // console.log('value',values[ind])
          }
        } else {
          // Element is not visible
          console.log(ind, 'not visible');
        }
      });
    });
    boxElList = document.querySelectorAll(".box");
    boxElList.forEach((el) => {
      observer.observe(el);
    });
  }


  async function loadMore() {
    console.log(router);
    let param = {
      "route": prev,
      // "category": router.query?.types,
      "next": 1,
    }

    if (pagination && pageNo <= 5 && router.query.preview != 'true') {
      let value = await articlesDetail(param);
      let data = value.message;
      // console.log(data)
      if (data && data.status == "Success") {
        routeList.push(data.route)
        setRouteList(routeList)
        setPrev(data.route)
        page_no += 1;
        setPageNo(pageNo + 1)
        let val = data
        // router.replace(`/categories/${router.query.types}/${data.name}`)
        // if (val && val[0] && val[0]._user_tags && val[0]._user_tags != '') {
        //   let tags = val[0]['_user_tags'].split(',');
        //   tags.splice(0, 1);
        //   val[0]._user_tags = tags
        // } else {
        //   val[0]._user_tags = [];
        // }

        if (val && val._user_tags && val._user_tags != '') {
          let tags = val['_user_tags'].split(',');
          tags.splice(0, 1);
          val._user_tags = tags
        } else {
          val._user_tags = [];
        }
        values.push(val)
        // setValues(d => d = [...d, ...val]);
        setValues(values);
        divs.push('div' + divs.length)
        setDivs(divs)
      } else {
        setPagination(!pagination)
      }
    }
    // setTimeout(() => {
    //   // console.log('time');
    //   call_observer()
    // }, 500)
  }

  // const getAdsList = async () => {
  //   let param = { doctype: 'Articles', page_type: 'Detail' }
  //   const resp = await getAds(param);
  //   const ads = resp.message;
  // }

  // console.log('meta', data)

  useEffect(() => {
    // Event listener to track scroll events

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      for (const divId of divs) {

        const div = document.getElementById(divId);

        if (!div) continue;

        const divTop = div.getBoundingClientRect().top;
        const divBottom = div.getBoundingClientRect().bottom;

        if (divTop < windowHeight / 2 && divBottom > windowHeight / 2) {
          let ind = divId.replace('div', '')
          ind = Number(ind);

          setTimeout(() => {
            if (routeList && routeList.length > 0 && routeList[ind]) {
              console.log(routeList)
              // router.push('/' + routeList[ind], undefined, { scroll: false });
              router.replace({ pathname: '/' + routeList[ind] }, undefined, { shallow: true, scroll: false });

              // generateMetaData(values[ind])
              if (values && values.length > 0 && values[ind]) {
                setMetaInfo(values[ind])
                // console.log(ind)
              }
            }
          }, 300)
          break;
        }

      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);



  const productNavigation = (obj) => {
    router.replace({ pathname: '/' + obj }, undefined, { shallow: false, scroll: true });
    setRouteList([])
    setPageNo(1);
    setValues([]);
    articleDetail(obj);
    //  window.scrollTo(0, 0);
  }


  return (
    <>
      <RootLayout isLanding={true} homeAd={advertisement ? advertisement : null} head={''}>
        {/* {(values && values.length != 0 && meta_info) && <SEO title={values[0].meta_title ? values[0].meta_title : values[0].title} ogImage={check_Image(values[0].meta_image ? values[0].meta_image : values[0].image)} siteName={'India Reatiling'} ogType={values[0].meta_keywords ? values[0].meta_keywords : values[0].title} description={values[0].meta_description ? values[0].meta_description : values[0].title} />} */}
        
        {/* {(meta_info && Object.keys(meta_info).length > 0) && <SEO title={meta_info.meta_title ? meta_info.meta_title : meta_info.title} ogImage={check_Image(meta_info.meta_image ? meta_info.meta_image : meta_info.image)} siteName={'India Reatiling'} ogType={meta_info.meta_keywords ? meta_info.meta_keywords : meta_info.title} description={meta_info.meta_description ? meta_info.meta_description : meta_info.title} />} */}

        {(meta_info && Object.keys(meta_info).length > 0) &&
          <NextSeo
            title={meta_info.meta_title ? meta_info.meta_title : meta_info.title}
            description={meta_info.meta_description ? meta_info.meta_description : meta_info.title}
            canonical="https://indiaretail.vercel.app/"
            openGraph={{
              type: 'article',
              article: {
                publishedTime: meta_info.published_on,
                modifiedTime: meta_info.modified,
                authors: [
                  'https://www.example.com/authors/@firstnameA-lastnameA',
                  'https://www.example.com/authors/@firstnameB-lastnameB',
                ],
                tags: meta_info._user_tags,
              },
              url: 'https://indiaretail.vercel.app' + router.asPath,
              // images: {
              //   url: check_Image(meta_info.meta_image ? meta_info.meta_image : meta_info.image),
              //   width: 850,
              //   height: 650,
              //   alt: 'India Reatiling',
              // },
              images: [
                {
                  url:check_Image(meta_info.meta_image ? meta_info.meta_image : meta_info.image) ,
                  alt: 'Open Graph Image Alt Text',
                }
              ],
              site_name: 'India Reatiling'
            }}
          />}



        {/* { (values && values.length != 0) && <SEO title={values[0].meta_title ? values[0].meta_title : values[0].title} ogImage={check_Image(values[0].image)} siteName={'India Reatiling'} ogType={values[0].meta_keywords ? values[0].meta_keywords : values[0].title } description={values[0].meta_description ? values[0].meta_description : values[0].title }/>} */}
        {(values && values.length != 0) ? <>
          {values.map((res, index) => {
            return (
              <div id={'div' + index} key={index} className='box'>
                {/* <SEO title={res.meta_title ? res.meta_title : res.title} ogImage={check_Image(res.meta_image ? res.meta_image : res.image)} siteName={'India Reatiling'} ogType={res.meta_keywords ? res.meta_keywords : res.title} description={res.meta_description ? res.meta_description : res.title} /> */}
                <CategoryBuilder productNavigation={(obj) => { productNavigation(obj) }} isLast={index == values.length - 1} i={index} user={user} data={res} load={loadMore} />
              </div>
            )
          })}
        </> : <Skeleton />
        }
      </RootLayout>
    </>
  )
}




{/* <NextSeo
  title="Manage SEO in NextJS with Next SEO"
  description="Next SEO packages simplifies the SEO management in Next Apps with less configurations"
  canonical="www.example.com/next-seo-blog"
  openGraph={{
    type: 'article',
    article: {
      publishedTime: '2022-06-21T23:04:13Z',
      modifiedTime: '2022-01-21T18:04:43Z',
      authors: [
        'https://www.example.com/authors/@firstnameA-lastnameA',
        'https://www.example.com/authors/@firstnameB-lastnameB',
      ],
      tags: ['Tag A', 'Tag B', 'Tag C'],
    },
    url: 'www.example.com/next-seo-blog',
    images: {
      url: 'https://www.test.ie/images/cover.jpg',
      width: 850,
      height: 650,
      alt: 'Photo of text',
    },
    site_name: 'Next Blog'
  }}
/> */}

export async function getServerSideProps({ params }) {
  let page_route = await params?.detail;
  // let Id = 'beauty-wellness';
  let param = {
    doctype: "Articles",
    fields: ["name", "route", "title", "meta_title", "meta_description", "meta_keywords", "meta_image", "image", "published_on", "modified", "_user_tags"],
    filters: { "route": page_route }
  }

  let value = await getList(param);
  let data;
  if (value && value.message && value.message.length != 0) {
    data = value.message[0];
  } else {
    data = value
  }

  return {
    props: { data, page_route }
  }
}


const Skeleton = () => {
  return (
    <>
      <div className='lg:flex md:flex-wrap container justify-between p-[30px_0px] md:p-[20px_15px]'>
        <div className='flex-[0_0_calc(70%_-_10px)] md:overflow-hidden md:flex-[0_0_calc(100%_-_10px)]'>
          <div className='flex gap-[5px]'>
            {[0, 1, 2, 3].map((res, index) => {
              return (
                <p key={index} className='h-[15px] w-[100px] bg-[#E5E4E2]'></p>
              )
            })}
          </div>
          <p className='h-[20px] my-[20px] w-full bg-[#E5E4E2]'></p>
          <div className='flex justify-between items-center'>
            <div className='flex gap-[10px]'>
              <p className='h-[40px]  w-[40px] rounded-full bg-[#E5E4E2]'></p>
              <p className='flex flex-col gap-[5px]'><span className='h-[15px] w-[80px] bg-[#E5E4E2]'></span><span className='h-[15px] w-[80px] bg-[#E5E4E2]'></span></p>
            </div>
            <p className='flex gap-[5px]'><span className='h-[20px] w-[20px] bg-[#E5E4E2]'></span><span className='h-[20px] w-[20px] bg-[#E5E4E2]'></span></p>
          </div>
          <p className='h-[20px] my-[20px] w-full bg-[#E5E4E2]'></p>
          <p className='h-[400px]  w-full bg-[#E5E4E2]'></p>
          <p className='h-[20px] mt-[20px] w-full bg-[#E5E4E2]'></p>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((res, index) => {
            return (
              <p key={index} className='h-[20px] mt-[5px] w-full bg-[#E5E4E2]'></p>
            )
          })}
          <p className='flex justify-between'>
            <span className='h-[20px] mt-[10px] w-[130px] bg-[#E5E4E2]'></span>
            <span className='h-[20px] mt-[10px] w-[140px] bg-[#E5E4E2]'></span>
            <span className='h-[20px] mt-[10px] w-[120px] bg-[#E5E4E2]'></span>
          </p>
          <div className='flex justify-center my-5'>
            <p className='flex justify-center items-center gap-[10px]'>
              {[0, 1, 2, 3].map((res, index) => {
                return (
                  <span key={index} className='h-[40px] rounded-full mt-[10px] w-[40px] bg-[#E5E4E2]'></span>
                )
              })}
            </p>
          </div>
          <p className='h-[20px] mt-[10px] w-[100px] bg-[#E5E4E2]'></p>
          <div className='flex flex-col'>

            {[0, 1, 2].map((res, index) => {
              return (
                <div className='flex gap-[10px] mt-[10px]' key={index}>
                  <p className='h-[50px] rounded-full  w-[50px] bg-[#E5E4E2]'></p>
                  <div className='w-[80%]'>
                    <p className='h-[20px]  w-[120px] bg-[#E5E4E2]'></p>
                    <p className='h-[20px] mt-[5px] w-ful bg-[#E5E4E2]'></p>
                    <p className='flex gap-[10px] mt-[10px]'><span className='h-[20px]  w-[80px] bg-[#E5E4E2]'></span><span className='h-[20px]  w-[100px] bg-[#E5E4E2]'></span><span className='h-[20px]  w-[100px] bg-[#E5E4E2]'></span></p>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
        <div className='flex-[0_0_calc(30%_-_10px)] md:overflow-hidden md:mt-[20px] md:flex-[0_0_calc(100%_-_10px)]'>
          <p className='h-[15px] w-[100px] bg-[#E5E4E2]'></p>
          {[0, 1, 2].map((res, index) => {
            return (
              <div key={index} className='flex gap-[10px] mt-5'>
                <p className='h-[90px] w-[100px] rounded-[5px] bg-[#E5E4E2]'></p>
                <p className='flex flex-col w-[65%] gap-[10px]'>
                  <span className='h-[15px] w-[100px] bg-[#E5E4E2]'></span>
                  <span className='h-[15px] w-full bg-[#E5E4E2]'></span>
                  <span className='h-[15px] w-full bg-[#E5E4E2]'></span>
                  <span className='h-[15px] w-[100px] bg-[#E5E4E2]'></span>
                </p>
              </div>
            )
          })}
          <p className='h-[250px] my-[20px] w-full bg-[#E5E4E2]'></p>
          <p className='h-[15px] w-[100px] bg-[#E5E4E2]'></p>
          {[0, 1, 2].map((res, index) => {
            return (
              <div key={index} className='flex gap-[10px] mt-5'>
                <p className='h-[90px] w-[100px] rounded-[5px] bg-[#E5E4E2]'></p>
                <p className='flex flex-col w-[65%] gap-[10px]'>
                  <span className='h-[15px] w-[100px] bg-[#E5E4E2]'></span>
                  <span className='h-[15px] w-full bg-[#E5E4E2]'></span>
                  <span className='h-[15px] w-full bg-[#E5E4E2]'></span>
                  <span className='h-[15px] w-[100px] bg-[#E5E4E2]'></span>
                </p>
              </div>
            )
          })}
          <p className='h-[600px] my-[20px] w-full bg-[#E5E4E2]'></p>
          <p className='h-[15px] mb-[20px] w-[100px] bg-[#E5E4E2]'></p>
          {[0, 1, 2, 3, 4].map((res, index) => {
            return (
              <div className='mb-[10px]' key={index}>
                <p className='flex gap-[10px]'><span className='h-[15px] w-[45px] bg-[#E5E4E2]'></span> <span className='h-[15px] w-[45px] bg-[#E5E4E2]'></span></p>
                <div className='flex items-center gap-[10px] mt-[10px]'>
                  <p className='h-[70px] w-[100px] rounded-[5px] bg-[#E5E4E2]'></p>
                  <p className='flex gap-[10px] flex-col w-[65%]'><span className='h-[15px] w-full bg-[#E5E4E2]'></span><span className='h-[15px] w-full bg-[#E5E4E2]'></span></p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Cards */}
      <div className='container lg:px-[30px] md:px-[15px] md:mb-[20px] md:overflow-hidden flex justify-between gap-[15px]'>
        {[0, 1, 2, 3, 4].map((res, index) => {
          return (
            <div key={index} className='flex-[0_0_calc(20%_-_10px)]'>
              <p className='h-[140px] w-full bg-[#E5E4E2] rounded-[5px]'></p>
              <p className='flex my-[10px] flex-col gap-[5px]'><span className='h-[15px] w-full bg-[#E5E4E2] rounded-[5px]'></span><span className='h-[15px] w-full bg-[#E5E4E2] rounded-[5px]'></span></p>
              <p className='flex my-[10px] flex-col gap-[5px]'><span className='h-[15px] w-full bg-[#E5E4E2] rounded-[5px]'></span><span className='h-[15px] w-full bg-[#E5E4E2] rounded-[5px]'></span></p>
              <p className='h-[15px] w-[100px] bg-[#E5E4E2] rounded-[5px]'></p>
            </div>
          )
        })}
      </div>
    </>
  )
}

