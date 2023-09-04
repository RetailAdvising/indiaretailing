import Image from 'next/image'
import RootLayout from '@/layouts/RootLayout'
import { useDispatch, useSelector } from 'react-redux'
import IRPrime from '@/components/Landing/IRPrime';
// import { useRouter } from 'next/router'
// import { useEffect } from 'react';
// import {setRoutes} from 'redux/actions/routesAction';
import PageData from '@/libs/buider'
import HomePageBuilder from '@/components/Builders/HomePageBuilder';
import { HomePage } from '../libs/api';
import { useEffect, useState } from 'react';


export default function Home({ data }) {

  const [pageNo, setPageNo] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(7);
  const [value, setValue] = useState([])



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
      console.log(data.page_content)
      setValue(data.page_content)
    }

    // data()
    // if (pageNo > 0) {
    //   // console.log('Load more')
    //   // console.log('start',start)
    //   // console.log('end',end)
    //   setEnd(end + 2)
    // }
  }, [])
  console.log(data)

  return (
    <>
      <RootLayout isLanding={true} head={''}>
        {/* {(PageData && PageData.page_sections) && PageData.page_sections.slice(start, end).map((res, index) => {
          return (
            <HomePageBuilder data={res} loadMore={() => setPageNo(p => p + 1)} isLast={index == PageData.page_sections.slice(start, end).length - 1} />
          )
        })} */}
        {(value && value.length != 0) && value.map((res, index) => {
          return (
            // isLast={index == value.length - 1}
            <HomePageBuilder key={index} data={res} loadMore={() => setPageNo(p => p + 1)} />
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
    "route": "home"
  }
  const resp = await HomePage(param);
  const data = await resp.message;

  return {
    props: { data }
  }

}