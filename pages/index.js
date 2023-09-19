import Image from 'next/image'
import RootLayout from '@/layouts/RootLayout'
import { useDispatch, useSelector } from 'react-redux'
// import { useRouter } from 'next/router'
// import { useEffect } from 'react';
// import {setRoutes} from 'redux/actions/routesAction';
import PageData from '@/libs/buider'
import HomePageBuilder from '@/components/Builders/HomePageBuilder';
import { HomePage, getAds } from '../libs/api';
import { useEffect, useState } from 'react';
import SEO from '@/components/common/SEO'

export default function Home({ data, ads }) {

  const [pageNo, setPageNo] = useState(1);
  const [value, setValue] = useState([])
  let page_no = 1;



  // const userInfo = useSelector(s=>s.user);
  // const dispatch = useDispatch()

  function get_customer_info() {
    let users = {}
    users.cust_email = localStorage['userid'] ? localStorage['userid'] : undefined;
    users.cust_name = localStorage['full_name'] ? localStorage['full_name'] : undefined;
    users.customer_id = localStorage['customer_id'] ? localStorage['customer_id'] : undefined;
    // dispatch(userAction(users));
  }

  useEffect(() => {
    // console.log('userInfo',userInfo);
    // const data = async () => {
    //   let val = await HomePage();
    //   console.log(val)
    // }
    if (data && data.page_content && data.page_content.length != 0) {
      setValue(data.page_content)
      // console.log(ads)
    }

    // const ads = async () => {
    //   let params = { doctype: 'Web Page Builder', page_type: 'Home' }
    //   const res = await getAds(params);
    //   const ads = res.message;
    //   setAdv(ads)
    // }

    // ads()

    // data()
    // if (pageNo > 1) {

    //   console.log('Load more', pageNo)
    //   // console.log('start',start)
    //   // console.log('end',end)
    //   // setEnd(end + 2)
    //   getPageData()
    // }
  }, [])
  // console.log(data)

  const load = () => {
    setPageNo(p => p += 1);
    getPageData();
  }

  const getPageData = async () => {
    // console.log('load...',)
    if (pageNo > 1) {
      const param = {
        // "application_type": "mobile",
        "route": "home",
        page_no: pageNo,
        page_size: 4
      }
      const resp = await HomePage(param);
      if (resp.message && resp.message.page_content && resp.message.page_content.length != 0) {
        setValue(d => d = [...d, ...resp.message.page_content])
        console.log(resp.message.page_content)
      } else {

      }
    }
  }

  return (
    <>
      {/*  isLast={index == value.length - 1} */}
      <RootLayout data={data} isLanding={true} head={''} homeAd={ads ? ads : null}>
        <SEO title={'India Reatiling'} siteName={'India Reatiling'} description={'This is IndiaRetailing and its about news and articles based on the popular site.'} />
        {(value && value.length != 0) && value.map((res, index) => {
          return (
            <HomePageBuilder key={index} isLast={index == value.length - 1} i={index} val={value} data={res} loadMore={() => load()} />
          )
        })}
      </RootLayout>
    </>
  )
}


export async function getStaticProps() {
  // page_content
  const param = {
    // "application_type": "mobile",
    "route": "home",
    page_no: 1,
    page_size: 20
  }
  const resp = await HomePage(param);
  const data = await resp.message;

  let params = { doctype: 'Web Page Builder', page_type: 'Home' }
  const res = await getAds(params);
  const ads = res.message;


  return {
    props: { data, ads }, revalidate: 10
  }

}