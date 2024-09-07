// import NewsLetterBuilder from '@/components/Builders/NewsLetterBuilder'
import RootLayout from '@/layouts/RootLayout'
import React, { useState, useEffect } from 'react'
import NewsList from '@/components/Newsletter/NewsList';
import Title from '@/components/common/Title';
import AdsBaner from '@/components/Baners/AdsBaner';
import Advertisement from '@/components/Baners/Advertisement';
import Subscribe from '@/components/Landing/Subscribe';
import { newsLanding, checkMobile, getAds, stored_customer_info,getAdvertisements } from '@/libs/api';
import SubscribeNews from '@/components/Newsletter/SubscribeNews';
import AlertUi from '@/components/common/AlertUi';
import SEO from '@/components/common/SEO'
import { useSelector, useDispatch } from 'react-redux';

export default function newsletter({ ads }) {

  const [isMobile, setIsMobile] = useState();
  let [data, setData] = useState();
  let [localValue, setLocalValue] = useState(undefined);
  let [skeleton, setSkeleton] = useState(true);
  const user = useSelector(s => s.user);


  useEffect(() => {
    setSkeleton(true);
    newsLanding_info();
    checkIsMobile();
    let localValue = stored_customer_info()
    setLocalValue(localValue);
    window.addEventListener('resize', checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [user])

  const checkIsMobile = async () => {
    let isMobile = await checkMobile();
    setIsMobile(isMobile);
  }

  const [alertMsg, setAlertMsg] = useState({})
  const [enableModal, setEnableModal] = useState(false)

  async function newsLanding_info() {
    let value = await newsLanding();
    let news = value.message
    setData(news);
    setSkeleton(false);
  }

  function hide(obj) {
    if (obj.status == 'Success') {
      setAlertMsg({ message: 'You have successfully subscribed to our newsletter' });
      setEnableModal(true);
    }
  }

  async function closeModal(value) {
    setEnableModal(false);
  }



  return (
    <>

      {enableModal && <AlertUi isOpen={enableModal} closeModal={(value) => closeModal(value)} headerMsg={'Alert'} button_2={'Ok'} alertMsg={alertMsg} />}

      <RootLayout homeAd={ads ? ads : null} isLanding={true} head={'Newsletters'} adIdH={'news-head'} adIdF={'news-foot'}>
        {/* {!skeleton && localValue && !localValue['cust_name'] &&  */}

        {skeleton ? <SkeletonLoader /> :
          <div className='lg:min-h-[250px]'>
            <SEO title={'Newsletters'} siteName={'India Reatiling'} description={'Newsletters'} />
            {(data) && <div className='container p-[30px_0px] md:p-[15px] '>
              <div className='md:hidden text-center'><Title data={{ title: 'Newsletters' }} /></div>
              <div className='lg:flex md:flex-wrap justify-between gap-[20px]'>
                <div className={`flex-[0_0_calc(70%_-_15px)] md:flex-[0_0_calc(100%_-_0px)] ${isMobile ? '' : 'border p-[20px] rounded-[5px]'} `}>
                  <NewsList data={data} />
                </div>

                {!isMobile &&
                  <div className='flex-[0_0_calc(30%_-_15px)] md:mt-[15px] md:flex-[0_0_calc(100%_-_0px)]'>
                    <div className='pb-[20px]'>
                      <Advertisement adId={'right_first'} divClass={'h-[250px] w-[300px] m-auto'} position={"small"} insStyle={"display:inline-block;width:300px;height:250px;"} data={(ads.right_first && Object.keys(ads.right_first).length != 0) && ads.right_first} />
                    </div>
                    <Subscribe />
                  </div>
                }

              </div>


            </div>}
          </div>
        }
        {/* }
       {!skeleton && localValue && localValue['cust_name'] && 
         <SubscribeNews cssClass={'lg:w-[50%] lg:m-[0_auto] md:pb-[15px]'} data={data} no_modal={true} hide={(obj)=> hide(obj)}/>
       } */}
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



  let ads_param = { page: 'Newsletters', page_type: 'Landing' }
  const resp = await getAdvertisements(ads_param);
  const ads = resp.message;
  return {
    props: { ads }, revalidate: 50,
  }
}


const SkeletonLoader = () => {
  return (
    <div className={'container p-[30px_0px] md:p-[15px] '}>

      <h6 className='h-[20px] w-[120px] bg-slate-200 rounded-[5px] mb-3'></h6>


      <div className='flex gap-[10px] '>
        <div className={'flex-[0_0_calc(70%_-_0px)] md:flex-[0_0_calc(100%_-_0px)] border p-[20px] rounded-[5px]'}>
          {[1, 2, 3, 4, 5].map((res, index) => {
            return (
              <>
                <div className='animate-pulse gap-[10px] flex p-[10px] cursor-pointer items-center border-b-[1px] border-b-slate-100 last-child:border-b[0px]'>
                  <div className={'h-[100px] w-[100px] bg-slate-200 rounded-[5px]'}></div>
                  <div className='w-full'>
                    <h6 className='h-[15px] w-[50%] bg-slate-200 rounded-[5px]'></h6>
                    <h6 className='h-[20px] w-[70%] bg-slate-200 rounded-[5px] my-[7px]'></h6>
                    <h6 className='h-[15px] w-[90%] bg-slate-200 rounded-[5px]'></h6>
                  </div>
                </div>
              </>
            )
          })
          }
        </div>

        <div className={'flex-[0_0_calc(30%_-_10px)]'}>
          <div className={'w-[380px] h-[316px] bg-slate-200 rounded-[5px]'}></div>
        </div>
      </div>
    </div>

  )
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