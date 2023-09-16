import { articlesDetail, getAds } from '@/libs/api';
import React, { useEffect, useState } from 'react'
import CategoryBuilder from '@/components/Builders/CategoryBuilder';

import RootLayout from '@/layouts/RootLayout';
import { useRouter } from 'next/router';
import SEO from '@/components/common/SEO'
import { check_Image } from '@/libs/common';

// Redux
// import { useDispatch, useSelector } from 'react-redux'
// import setPagination from 'redux/actions/paginationAction';

export default function CategoryDetail({ data }) {
  // Store
  // const pagination = useSelector(s => s.pagination);
  // const dispatch = useDispatch();

  const router = useRouter();
  const [values, setValues] = useState([])
  const [prev, setPrev] = useState('')
  const [pagination, setPagination] = useState(true);
  const [ads, setAds] = useState();
  // let pagination = false;
  // let prev = router.query.detail;
  let boxElList = ''
  useEffect(() => {
    if (data) {
      let val = [data]
      setValues(val)
      getAd()
    }
    // call_observer()
    setPrev(router.query.types + '/' + router.query.detail)
  }, [router.query])


  // const call_observer = async () => {
    
  //   const observer = new IntersectionObserver(entries => {
  //     entries.forEach((entry,ind) => {
  //       if (entry.intersectionRatio > 0) {
  //         console.log(ind,'visible');
  //         console.log(router );
  //         console.log(values[ind]);
  //         // Element is visible
  //       } else {
  //         // Element is not visible
  //         console.log(ind,'not visible');
  //       }
  //     });
  //   });
  //    boxElList = document.querySelectorAll(".box");
  //   console.log(boxElList);
  //   boxElList.forEach((el) => {
  //    observer.observe(el);
  //  }); 
  // }

  const getAd = async () => {
    let paras = { doctype: 'Articles', page_type: 'Detail' }
    const resp = await getAds(paras);
    const ads = resp.message;
    setAds(ads)
  }




  async function loadMore() {
    let param = {
      "route": prev,
      "category": router.query.types,
      "next": 1
    }


    if (pagination) {
      let value = await articlesDetail(param);
      let data = value.message;
      if (data && data.status == "Success") {
        setPrev(data.route)
        // router.replace(`/categories/${router.query.types}/${data.name}`)
        let val = [data]
        setValues(d => d = [...d, ...val])
      } else {
        setPagination(!pagination)
      }
    }
    // setTimeout(()=>{
    //   console.log('time');
    //     call_observer()
    //   },500)
  }


  return (
    <>
      <RootLayout isLanding={true} head={''} homeAd={ads ? ads : null}>
        <SEO title={data.meta_title ? data.meta_title : data.title} ogImage={check_Image(data.image)} siteName={'India Reatiling'} ogType={data.meta_keywords ? data.meta_keywords : data.title} description={data.meta_description ? data.meta_description : data.title} />
        {/* {data && <div> */}
        {/* setPage={(data) => setPagination(data)} pagination={pagination} */}
        {(values && values.length != 0) ? <>
          {values.map((res, index) => {
            return (
              <div key={index} className={'box'}>
                <CategoryBuilder isLast={index == values.length - 1} ads={ads ? ads : undefined} i={index} data={res} load={loadMore} />
              </div>
            )
          })}
        </> : <Skeleton />
        }
        {/* </div>} */}
      </RootLayout>
    </>
  )
}

const Skeleton = () => {
  return (
    <>
      <div className='lg:flex md:flex-wrap container justify-between p-[30px_0px] md:p-[15px]'>
        <div className='lg:flex-[0_0_calc(70%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'>
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
        <div className='lg:flex-[0_0_calc(30%_-_10px)] md:mt-[20px] md:flex-[0_0_calc(100%_-_10px)]'>
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
      <div className='container lg:px-[30px] md:px-[15px] md:mb-[20px] overflow-hidden flex justify-between gap-[15px]'>
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


export async function getServerSideProps({ params }) {
  let Id = await params?.detail;
  let Category = await params?.types;
  let param = {
    "route": Category + '/' + Id,
    "category": Category,
    "next": 0
  }
  let value = await articlesDetail(param);
  let data = value.message;



  return {
    props: { data }
  }
}