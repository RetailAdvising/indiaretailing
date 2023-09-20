// import NewsLetterBuilder from '@/components/Builders/NewsLetterBuilder'
import RootLayout from '@/layouts/RootLayout'
import React, { useState, useEffect } from 'react'
import NewsList from '@/components/Newsletter/NewsList';
import value from '@/libs/newsletter';
import Title from '@/components/common/Title';
import AdsBaner from '@/components/Baners/AdsBaner';
import Subscribe from '@/components/Landing/Subscribe';
import { newsLanding, checkMobile, getAds } from '@/libs/api';
import SEO from '@/components/common/SEO'

export default function newsletter({ ads }) {

  const [isMobile, setIsMobile] = useState();
  let [data,setData] = useState();

  useEffect(() => {
    newsLanding_info();
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [])

  const checkIsMobile = async () => {
    let isMobile = await checkMobile();
    setIsMobile(isMobile);
  }
  
  async function newsLanding_info(){
    let value = await newsLanding();
    let news = value.message;
    setData(news)
  }


  return (
    <>
      <RootLayout homeAd={ads ? ads : null} isLanding={true} head={'Newsletters'}>
      <SEO title={'Newsletters'} siteName={'India Reatiling'} description={'Newsletters'}/>
        {(data) && <div className='container p-[30px_0px] md:p-[15px]'>
          <div className='md:hidden text-center'><Title data={{ title: 'Newsletters' }} /></div>
          <div className='lg:flex md:flex-wrap justify-between gap-[20px]'>
            <div className={`flex-[0_0_calc(70%_-_0px)] md:flex-[0_0_calc(100%_-_0px)] ${isMobile ? '' : 'border p-[20px] rounded-[5px]'} `}>
              <NewsList data={data} />
            </div>

            {(value.col_2 && !isMobile) &&
              <div className='flex-[0_0_calc(30%_-_10px)] md:mt-[15px] md:flex-[0_0_calc(100%_-_0px)]'>
                <div className='pb-[20px]'>
                  <AdsBaner data={value.col_2} />
                </div>
                <div>
                  <Subscribe height={'h-[162px]'} width={'w-full'} data={data} />
                </div>
              </div>
            }

          </div>


        </div>}
      </RootLayout>
    </>
  )
}


export async function getStaticProps() {
  // let param = {
  //   fields: ['custom_day', 'name', 'custom_category', 'custom_description', 'custom_image_', 'custom_title', 'route']
  // }

  // if(localStorage['userid'] && localStorage['userid'] != ''){
  //   arg.email = localStorage['userid']
  // }

  // let value = await newsLanding(param);



  let ads_param = { doctype: 'News Letter', page_type: 'Home' }
  const resp = await getAds(ads_param);
  const ads = resp.message;
  return {
    props: { ads }, revalidate: 50,
  }
}

// export async function getServerSideProps() {
//   let param = {
//     fields: ['custom_day', 'name', 'custom_category', 'custom_description', 'custom_image_', 'custom_title', 'route']
//   }
//   let value = await newsLanding(param);
//   let data = value.message;

//   return {
//     props: { data }
//   }
// }