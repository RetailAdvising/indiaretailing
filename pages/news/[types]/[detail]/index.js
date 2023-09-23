'use client'
import RootLayout from '@/layouts/RootLayout'
import React, { useState, useEffect } from 'react'
import { articleNewsDetail } from '@/libs/api';
import CategoryBuilder from '@/components/Builders/CategoryBuilder';
import { useRouter } from 'next/router';
export default function NewsDetails() {
  const router = useRouter();
  const [values, setValues] = useState([])
  const [prev, setPrev] = useState('')
  const [pagination, setPagination] = useState(true);

  const articleDetail = async () => {
    if (router.query && (router.query.detail && router.query.types)) {
      let Id =  router.query?.detail;
      let category =  router.query?.types;
      let param = {
        "route": category + '/' + Id,
        "category": category,
        "next": 0
      }
      let value = await articleNewsDetail(param);
      let data = await value.message;
      if(data.status == "Success"){

        let val = [data]

        
       if(val && val[0] && val[0]._user_tags && val[0]._user_tags != ''){
         let tags = val[0]._user_tags.split(',');
         tags.splice(0,1);
         val[0]._user_tags = tags
       }else{
        val[0]._user_tags = [];
       }

        // setValues(d => [...d, ...val])
      setValues(val)
      setPrev(router.query.types + '/' + router.query.detail)

      }
    }
  }



  useEffect(() => {
    articleDetail();
  }, [router])


  async function loadMore() {
    // let param = {
    //   "route": prev,
    //   "category": router.query?.types,
    //   "next": 1,
    // }

    // if (pagination) {
    //   let value = await articleNewsDetail(param);
    //   let data = value.message;
    //   if (data && data.status == "Success") {
    //     setPrev(data.route)
    //     let val = [data]

    //     if(val && val[0] && val[0]._user_tags){
    //       let tags = val[0]._user_tags.split(',');
    //       tags.splice(0,1);
    //       val[0]._user_tags = tags
    //     }

    //     setValues(d => d = [...d, ...val])
    //   } else {
    //     setPagination(!pagination)
    //   }
    // }
  }

  // const getAdsList = async () => {
  //   let param = { doctype: 'Articles', page_type: 'Detail' }
  //   const resp = await getAds(param);
  //   const ads = resp.message;
  // }

  return (
    <>
      <RootLayout isLanding={true} head={''}>
        {(values && values.length != 0) ? <>
          {values.map((res, index) => {
            return (
              <div key={index}>
                <CategoryBuilder isPrime={false} isLast={index == values.length - 1} i={index} data={res} load={loadMore} />
                
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