import RootLayout from '@/layouts/RootLayout'
import React from 'react'
import { video_list_with_categoies, getAds } from '@/libs/api'
import Video from '@/components/Video/Video'
import Title from '@/components/common/Title'
import Tabs from '@/components/Landing/Tabs'
import SEO from '@/components/common/SEO'

export default function Videos({ data, ads }) {
  console.log(data)
  console.log(ads)
  return (
    <>
      <RootLayout isLanding={true} head={'IR Prime Videos'}>
      <SEO title={'IR Prime Videos'} siteName={'India Reatiling'} description={'IR Prime Videos'}/>
        {(data && data.length != 0) ? <div className='container lg:p-[30px_0px] md:p-[15px]'>
          {data.map((res, index) => {
            return (
              <div key={index} className='pb-[20px]'>
                <Title data={res} seeMore={true} />
                <div className={`lg:grid grid-cols-4 no_scroll lg:gap-[15px]`}><Video data={res.videos} flex={'md:flex-[0_0_calc(70%_-_10px)] md:h-[235px]'} imgClass={'h-[180px] w-full'} /></div>
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

  let param = { doctype: 'Video', page_type: 'Home' }
  const resp = await getAds(param);
  const ads = resp.message;
  return {
    props: { data, ads }, revalidate: 50,
  }
}