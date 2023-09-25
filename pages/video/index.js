// import React, { useState, useEffect } from 'react'
import RootLayout from '@/layouts/RootLayout'
import React, { useState, useEffect } from 'react'
import { video_list_with_categoies, getAds, checkMobile,sliders } from '@/libs/api'
import Video from '@/components/Video/Video'
import Title from '@/components/common/Title'
import Tabs from '@/components/Landing/Tabs'
import SEO from '@/components/common/SEO'
import Sliders from '@/components/Sliders/index'

export default function Videos({ data, ads, slider_data }) {
  // console.log(data)
  // console.log(ads)
  const [isMobile, setIsMobile] = useState()
  useEffect(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [])

  const checkIsMobile = async () => {
    let isMobile = await checkMobile();
    setIsMobile(isMobile);

    slider_data && slider_data.map((res) => {
      !isMobile ? res.web_image ? res.image = res.web_image : res.image = '' : ''
      isMobile ? res.mobile_image ? res.image = res.mobile_image : res.image = '' : ''
    })
  }
  return (
    <>
      <RootLayout homeAd={ads ? ads : null} isLanding={true} head={'IR Prime Videos'}>
        <SEO title={'IR Prime Videos'} siteName={'India Reatiling'} description={'IR Prime Videos'} />
        <div className="container zero-gap ">
          {slider_data && slider_data.length != 0 && <Sliders imgClass={'h-[400px] md:h-[220px] w-full'} event={true} data={slider_data} perView={1} className='gap-0' />}
        </div>
        {(data && data.length != 0) ? <div className='container lg:p-[30px_0px] md:p-[15px]'>
          {data.map((res, index) => {
            return (
              <div key={index} className='pb-[20px]'>
                <Title data={res} seeMore={true} />
                <div className={`lg:grid grid-cols-4 no_scroll lg:gap-[15px]`}><Video data={res.videos.slice(0,4)} flex={'md:flex-[0_0_calc(70%_-_10px)] md:h-[235px]'} imgClass={'h-[180px] w-full'} /></div>
              </div>
            )
          })}


        </div> : <>Loading</>}
        {/* <Tabs /> */}
      </RootLayout>
    </>
  )
}


export async function getStaticProps() {
  let params = {
    fields: ["name", "route", "title", "video_image"]
  }
  const res = await video_list_with_categoies(params);
  let data = await res.message;
  if (res.status != 'Success') {
    data = [];
  }

  let slider_params = {
    page: 'Video',
    fields: ['name', 'title', 'web_image', 'mobile_image', 'mobile_app_image']
  }
  const ress = await sliders(slider_params)
  const slider_data = ress.message

  let param = { doctype: 'Video', page_type: 'Home' }
  const resp = await getAds(param);
  const ads = resp.message;
  return {
    props: { data, slider_data, ads }, revalidate: 50,
  }
}