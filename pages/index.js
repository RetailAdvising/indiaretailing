import Image from 'next/image'
import RootLayout from '@/layouts/RootLayout'
import { useDispatch,useSelector } from 'react-redux'
import IRPrime from '@/components/Landing/IRPrime';
// import { useRouter } from 'next/router'
// import { useEffect } from 'react';
// import {setRoutes} from 'redux/actions/routesAction';
import PageData from '@/libs/buider'
import HomePageBuilder from '@/components/Builders/HomePageBuilder';
import { useEffect, useState } from 'react';

export default function Home() {
  const [pageNo,setPageNo] = useState(0);
  const [start,setStart] = useState(0);
  const [end,setEnd] = useState(7);
  useEffect(()=>{
    if(pageNo > 0){
      // console.log('Load more')
      // console.log('start',start)
      // console.log('end',end)
      setEnd(end+2)
    }
  },[pageNo,])
  return (
    <>
      <RootLayout>
        {(PageData && PageData.page_sections) && PageData.page_sections.slice(start,end).map((res,index)=>{
          return(
            <HomePageBuilder data={res} loadMore={()=> setPageNo(p=> p+1)} isLast={index == PageData.page_sections.slice(start,end).length-1}/>
          )
        })}        
      </RootLayout>
    </>
  )
}
