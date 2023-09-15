import RootLayout from '@/layouts/RootLayout'
import React, { useState, useEffect } from 'react'
import val from '@/libs/bookstore'
import Sliders from '@/components/Sliders/index'
import Title from '@/components/common/Title'
import Card from '@/components/Bookstore/Card'
import AdsBaner from '@/components/Baners/AdsBaner'
import List from '@/components/Bookstore/List'
import { booksLanding, getCategories, getAds, sliders } from '@/libs/api'
import { checkMobile } from '@/libs/api'
import SEO from '@/components/common/SEO'

// import BreadCrumb from '@/components/common/BreadCrumb';

export default function Bookstore({ data,resp,ads_data, slider_data }) {


  // const images = [
  //   'https://indiaretailing.go1cms.com/files/Screenshot%202023-09-11%20144600.jpg',
  //   'https://indiaretailing.go1cms.com/files/Screenshot%202023-09-11%20144600.jpg',
  //   'https://indiaretailing.go1cms.com/files/Screenshot%202023-09-11%20144600.jpg',

  // ];

  // console.log(data);
  // console.log(resp);
  console.log(slider_data);
  let [isMobile, setIsmobile] = useState();
  let [breadCrumbs,setBreadCrumbs] = useState([
    {name:'Home',route:'/'},
    {name:'Bookstore'},
  ])

  useEffect(()=>{
    slider_data.map((res)=> {
      res.web_image ? res.image = res.web_image : res.image = ''
    })
    checkIsMobile();
    window.addEventListener('resize',checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  },[])

  const  checkIsMobile = async () => {
    isMobile = await checkMobile();
    setIsmobile(isMobile);
    // console.log('isMobile',isMobile)
  }
  // useEffect(() => {
  // const category = async () => {
  //   let data = await booksLanding();
  //   console.log(data);
  // }

  // category();
  // }, [])
  return (
    <>
      <RootLayout homeAd={ads_data ? ads_data : null}>
      <SEO title={'Bookstore'} siteName={'India Reatiling'} description={'Bookstore'}/>

      {/* {!isMobile && <BreadCrumb BreadCrumbs={breadCrumbs} cssClass={'pb-[10px]'}/>} */}

        
        {(data && data.length != 0) && <>
          <div className="container zero-gap !mt-6">
              {slider_data && slider_data.length != 0 && <Sliders imgClass={'h-[400px] md:h-auto w-full'} event={true} data={slider_data} perView={1} className='gap-0' />}
          </div>
          {/* {(resp.recent_products && resp.recent_products.length != 0) && 
          <div className='pt-[10px] container' style={{ background: "#f0f0f0" }}>
            <Sliders data={resp.recent_products} perView={1} imgClass={'h-[400px] w-full'} />
          </div>} */}

          <div className={`lg:bg-[#FBFBFD]`}>
            {/* {data.map((res, index) => {
              return ( */}
            <div className='md:flex-wrap  md:p-[15px] py-8 container justify-between gap-[15px] flex'>
              <div className={`flex-[0_0_calc(100%_-_10px)] md:flex-[0_0_calc(100%_-_0px)]`}>
                <Title data={data[0]}  seeMore={true} />
                {/* [270px] w-[181px] */}
                <div className={`grid gap-[20px] grid-cols-5 md:grid-cols-2 `}><Card imgClass={'h-[300px] mouse'} category={data[0].category_name} check={true} isLanding={true} data={data[0].products.slice(0, 10)} boxShadow={true} /></div>
              </div>
              {/* <div className={`flex-[0_0_calc(30%_-_10px)] md:flex-[0_0_calc(100%_-_0px)]`}><AdsBaner data={val.section_2.col_2} /></div> */}
            </div>
            {/* )
            })} */}
          </div>

          {(data[1] && data[2]) && <div className='container md:p-[10px_15px_10px_15px] pt-[2rem] pb-[6rem] md:flex-wrap md:flex-col flex justify-between gap-[15px]'>
            <div className={`flex-[0_0_calc(70%_-_10px)] md:flex-[0_0_calc(100%_-_0px)]`}>
              <Title data={data[1]}  seeMore={true} />
              <div className={`flex lg:gap-[15px] h-full rounded-[5px] flex-wrap border p-[15px]`}><List category={data[1].category_name} check={true} isLanding={true} boxShadow={true} imgWidth={'flex-[0_0_calc(40%_-_10px)]'} height={isMobile ? 'h-[180px]' : 'h-[210px]'} width={'w-full'} data={data[1].products.slice(0, 4)} flex={'flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(100%_-_10px)] lg:h-[220px] md:h-[190px] object-contain'} /></div>
            </div>

            <div className={`flex-[0_0_calc(30%_-_10px)] md:pt-[10px] md:flex-[0_0_calc(100%_-_10px)]`}>
              <Title  data={data[2]} />
              <div className={`flex gap-[10px]  h-full lg:rounded-[5px] flex-wrap  flex-col lg:border lg:border-slate-200 lg:p-[15px]`}><List category={data[2].category_name} border_b={'md:border-b-[1px] md:p-[0px_0_10px_0] md:border-slate-200 md:last:border-b-[0]'} check={true} boxShadow={true} isLanding={true} imgWidth={'flex-[0_0_calc(35%_-_10px)]'} height={'h-[150px]'} width={'w-full'} data={data[2].products.slice(0, 3)} /></div>
            </div>
          </div>}

          { data[3] && <div className='' style={{ background: '#fbfbfd' }}>
            <div className={`flex-[0_0_calc(100%_-_10px)] m-[40px_auto]  md:m-[0px_auto] container md:p-[15px] lg:py-8`}>
              <Title data={data[3]} />
              <div className={`flex gap-[15px] flex-wrap `}><Card category={data[3].category_name} object_fit={'object-contain'} padding={true} isBorder={true} check={true} isLanding={true} height={isMobile ? 'h-[160px]' : 'h-[280px]'} flex={'flex-[0_0_calc(20%_-_15px)] md:flex-[0_0_calc(50%_-_10px)]'} data={data[3].products} /></div>
            </div>
          </div>}

          {/* {(data.section_2) && <div style={{ background: "#fbfbfd" }} className='m-[30px_0]'>
            <div className='p-[30px] container  md:flex-wrap flex justify-between gap-[15px]'>
              {data.section_2.col_1.data && <div className={`flex-[0_0_calc(70%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]`}>
                <Title data={data.section_2.col_1} seeMore={true} />
            
                <div className={`grid gap-[35px] grid-cols-4 md:grid-cols-2 justify-between`}><Card imgClass={'h-[270px] w-[181px]'} isLanding={true} data={data.section_2.col_1.data} boxShadow={true} /></div>
              </div>}

              {val.section_2.col_2 && <div className={` flex-[0_0_calc(30%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]`}>
                <AdsBaner data={data.section_2.col_2} />
              </div>}
            </div>

          </div>} */}

          {/* 

          <div key={index} className='p-[30px] container  md:flex-wrap flex justify-between gap-[15px]'>
                <div className={`${(res.category_name == "Magazines" || res.category_name == "Books & Publications") ? 'flex-[0_0_calc(70%_-_10px)]' : ''} md:flex-[0_0_calc(100%_-_10px)]`}>
                  <Title data={res} query={true} seeMore={true} />
                  {res.category_name == "Magazines" && <div className={`grid gap-[35px] grid-cols-4 md:grid-cols-2 justify-between`}><Card imgClass={'h-[270px] w-[181px]'} category={res.category_name} check={true} isLanding={true} data={res.products.slice(0, 8)} boxShadow={true} /></div>}
                  {res.category_name == "Books & Publications" && <div className={`flex gap-[15px] h-full rounded-[5px] flex-wrap justify-between border p-[10px]`}><List isLanding={true} boxShadow={true} imgWidth={'flex-[0_0_calc(33%_-_10px)]'} height={'h-full'} width={'w-full'} data={res.products.slice(0,4)} flex={'flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'} /></div>}
                </div>
                {res.category_name == "Magazines" && <div className={` flex-[0_0_calc(30%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]`}><AdsBaner data={val.section_2.col_2} /></div>}
                {res.category_name == "Lifestyle" && <div className={`flex gap-[10px] h-full rounded-[5px] flex-wrap justify-between flex-col border p-[10px]`}><List boxShadow={true} isLanding={true} imgWidth={'flex-[0_0_calc(28%_-_10px)]'} height={'h-full'} width={'w-full'} data={val.section_3.col_2.data} /></div>}
              </div>
           */}

          {/* {(val.section_3) && <div className='container p-[30px] md:flex-wrap flex justify-between gap-[15px]'>
            {val.section_3.col_1.data && <div className={`flex-[0_0_calc(70%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]`}>
              <Title data={val.section_3.col_1} seeMore={true} />
              <div className={`flex gap-[15px] h-full rounded-[5px] flex-wrap justify-between border p-[10px]`}><List isLanding={true} boxShadow={true} imgWidth={'flex-[0_0_calc(33%_-_10px)]'} height={'h-full'} width={'w-full'} data={val.section_3.col_1.data} flex={'flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'} /></div>
            </div>}

            {val.section_3.col_2.data && <div className={`flex-[0_0_calc(30%_-_10px)] md:pt-[40px] md:flex-[0_0_calc(100%_-_10px)]`}>
              <Title data={val.section_3.col_2} />
              <div className={`flex gap-[10px] h-full rounded-[5px] flex-wrap justify-between flex-col border p-[10px]`}><List boxShadow={true} isLanding={true} imgWidth={'flex-[0_0_calc(28%_-_10px)]'} height={'h-full'} width={'w-full'} data={val.section_3.col_2.data} /></div>
            </div>}
          </div>}

          {val.section_4.data && <div className='mb-[30px] mt-[60px]' style={{ background: '#fbfbfd' }}>
            <div className={`flex-[0_0_calc(100%_-_10px)] container  p-[30px]`}>
              <Title data={val.section_4} />
              <div className={`flex gap-[15px] flex-wrap justify-between`}><Card isBorder={true} isLanding={true} flex={'flex-[0_0_calc(25%_-_15px)] md:flex-[0_0_calc(50%_-_10px)]'} data={val.section_4.data} /></div>
            </div>
          </div>} */}

        </>}
      </RootLayout>
    </>
  )
}


export async function getStaticProps() {
  const resp = await booksLanding();
  const data = resp?.message;

  let ads_params = { doctype: 'Product', page_type: 'Home' }
  const res_ads = await getAds(ads_params);
  const ads_data = res_ads.message;
  
  
  let slider_params = {
    page: 'Product',
    fields: ['name', 'title', 'web_image', 'mobile_image', 'mobile_app_image']
  }
  const res = await sliders(slider_params)
  const slider_data = res.message

  
  return {
    props: { data,resp, ads_data, slider_data}, revalidate: 50,
  }

}

// export async function getServerSideProps() {
//   const resp = await booksLanding();
//   const data = resp.message;

//   return {
//     props: { data }
//   }

// }