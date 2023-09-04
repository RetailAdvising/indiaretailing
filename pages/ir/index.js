import RootLayout from '@/layouts/RootLayout'
import React from 'react'
import { video_list_with_categoies, getAds } from '@/libs/api'
import Video from '@/components/Video/Video'
import Title from '@/components/common/Title'
export default function Videos({ data, ads }) {
  console.log(data)
  console.log(ads)
  return (
    <>
      <RootLayout>
        {/* {(data && data.length != 0) ? <>
          {data.map((res, index) => {
            return (
              <div key={index}>
                <Title data={res} seeMore={true} />
                <div className={`lg:grid grid-cols-4 lg:gap[15px]`}><Video data={res.video} /></div>
              </div>
            )
          })}


        </> : <>Loading</>} */}
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