// import NewsLetterBuilder from '@/components/Builders/NewsLetterBuilder'
import RootLayout from '@/layouts/RootLayout'
import React, { useState, useEffect } from 'react'
import NewsList from '@/components/Newsletter/NewsList';
import value from '@/libs/newsletter';
import Title from '@/components/common/Title';
import AdsBaner from '@/components/Baners/AdsBaner';
import Subscribe from '@/components/Landing/Subscribe';
import { newsLanding, checkMobile, getAds, stored_customer_info } from '@/libs/api';
import SubscribeNews from '@/components/Newsletter/SubscribeNews';
import AlertUi from '@/components/common/AlertUi';
import SEO from '@/components/common/SEO'
import { useSelector,useDispatch } from 'react-redux';

export default function newsletter({ ads }) {

  const [isMobile, setIsMobile] = useState();
  let [data,setData] = useState();
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
  const [enableModal,setEnableModal] = useState(false)

  async function newsLanding_info(){
    let value = await newsLanding();
    let news = value.message;
    console.log(news);
    setData(news);
    setSkeleton(false);
  }

  function hide(obj) {
    if(obj.status == 'Success'){
      setAlertMsg({message:'You have successfully subscribed to our newsletter'});
      setEnableModal(true);
    }
  }
 
  async function closeModal(value){
    setEnableModal(false);
  }

  return (
    <>

     { enableModal && <AlertUi isOpen={enableModal} closeModal={(value)=>closeModal(value)} headerMsg={'Alert'} button_2={'Ok'} alertMsg={alertMsg} />}

      <RootLayout homeAd={ads ? ads : null} isLanding={true} head={'Newsletters'}>
      {/* {!skeleton && localValue && !localValue['cust_name'] &&  */}
       <div className='lg:min-h-[250px]'>
        <SEO title={'Newsletters'} siteName={'India Reatiling'} description={'Newsletters'}/>
        {(data) && <div className='container p-[30px_0px] md:p-[15px] '>
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
        </div>
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