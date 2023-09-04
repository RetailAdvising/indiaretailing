import RootLayout from '@/layouts/RootLayout'
import React from 'react'
import { video_list_with_categoies, getAds } from '@/libs/api'
export default function Videos({data,ads}) {
  console.log(data)
  console.log(ads)
  return (
    <>
      <RootLayout>
        <h6>Video Sections...</h6>
      </RootLayout>
    </>
  )
}


export async function getStaticProps() {

  let params = {
    fields: ["name", "route", "title", "video_image"]
  }
  const res = await video_list_with_categoies(params);
  const data = await res;

  let param = { doctype: 'Video', page_type: 'Home' }
  const resp = await getAds(param);
  const ads = resp.message;
  return {
    props: { data, ads }, revalidate: 50,
  }
}