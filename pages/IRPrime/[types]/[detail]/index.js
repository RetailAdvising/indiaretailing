'use client'
import RootLayout from '@/layouts/RootLayout'
import React, { useState, useEffect } from 'react'
import { articlesDetail, getAds } from '@/libs/api';
import CategoryBuilder from '@/components/Builders/CategoryBuilder';
import { useRouter } from 'next/router';
import SEO from '@/components/common/SEO'
import { check_Image } from '@/libs/common';
import { useSelector, useDispatch } from 'react-redux';

export default function Details() {
  const router = useRouter();
  const [values, setValues] = useState([])
  const [prev, setPrev] = useState('')
  const [pagination, setPagination] = useState(true);
  const [advertisement, setAds] = useState()

  const articleDetail = async () => {
    if (router.query && (router.query.detail && router.query.types)) {
      let Id = router.query?.detail;
      let category = router.query?.types;
      let param = {
        "route": category + '/' + Id,
        "category": category,
        "next": 0
      }
      let value = await articlesDetail(param);
      let data = await value.message;
      if (data.status == "Success") {
        let val = [data]
        // setValues(d => [...d, ...val])
        setValues(val)
        setPrev(router.query.types + '/' + router.query.detail)

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
    if (typeof window !== 'undefined') {
      articleDetail();
      ads();
    }

  

  }, [router, user])


  async function loadMore() {
    let param = {
      "route": prev,
      "category": router.query?.types,
      "next": 1,
    }

    if (pagination) {
      let value = await articlesDetail(param);
      let data = value.message;
      // console.log(data)
      if (data && data.status == "Success") {
        setPrev(data.route)
        let val = [data]
        setValues(d => d = [...d, ...val])
      } else {
        setPagination(!pagination)
      }
    }
  }

  // const getAdsList = async () => {
  //   let param = { doctype: 'Articles', page_type: 'Detail' }
  //   const resp = await getAds(param);
  //   const ads = resp.message;
  // }

  return (
    <>
      <RootLayout isLanding={true} homeAd={advertisement ? advertisement : null} head={''}>
        {(values && values.length != 0) && <SEO title={values[0].meta_title ? values[0].meta_title : values[0].title} ogImage={check_Image(values[0].meta_image ? values[0].meta_image : values[0].image)} siteName={'India Reatiling'} ogType={values[0].meta_keywords ? values[0].meta_keywords : values[0].title} description={values[0].meta_description ? values[0].meta_description : values[0].title} />}
        {/* { (values && values.length != 0) && <SEO title={values[0].meta_title ? values[0].meta_title : values[0].title} ogImage={check_Image(values[0].image)} siteName={'India Reatiling'} ogType={values[0].meta_keywords ? values[0].meta_keywords : values[0].title } description={values[0].meta_description ? values[0].meta_description : values[0].title }/>} */}
        {(values && values.length != 0) ? <>
          {values.map((res, index) => {
            return (
              <div key={index}>
                <SEO title={res.meta_title ? res.meta_title : res.title} ogImage={check_Image(res.meta_image ? res.meta_image : res.image)} siteName={'India Reatiling'} ogType={res.meta_keywords ? res.meta_keywords : res.title} description={res.meta_description ? res.meta_description : res.title} />
                <CategoryBuilder isPrime={true} isLast={index == values.length - 1} i={index} user={user} data={res} load={loadMore} />
              </div>
            )
          })}
        </> : <Skeleton />
        }
      </RootLayout>
    </>
  )
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

// export async function getServerSideProps({ params }) {
//   let Id = await params?.detail;
//   let category = await params?.list;
//   let param = {
//     "article": Id,
//     "category": category,
//     "next": 0
//   }
//   let value = await articlesDetail(param);
//   let data = value.message;

//   return {
//     props: { data }
//   }
// }