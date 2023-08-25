import RootLayout from '@/layouts/RootLayout'
import React, { useEffect, useState } from 'react'
import data from '@/libs/newsDetail';
import Image from 'next/image';
import Title from '@/components/common/Title';
import NewsCard from '@/components/Newsletter/NewsCard';
import Tabs from '@/components/common/Tabs';
import AlertPopup from '@/components/common/AlertPopup';
import { getList, newsDetail } from '@/libs/api';
import { check_Image } from '@/libs/common';
import { useRouter } from 'next/router';
export default function NewsLists({data}) {
  const tabs = [{ name: 'Current edition' }, { name: 'All Newsletter' }]
  const [isChecked, setIsChecked] = useState(false);
  const [allNewsLetter,setAllNewsLetter] = useState([])
  const [page_no,setPageno] = useState(1)

  const router = useRouter()
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  const [showAlert, setShowAlert] = useState(false);

  const handleButtonClick = () => {
    setShowAlert(true);
    // After a certain duration, hide the alert
    // setTimeout(() => {
    //   setShowAlert(false);
    // }, 100000);
  };

  useEffect(()=>{
    allNews();
  },[router.query])

  // All News
  const allNews = async () =>{
    let param = {
      doctype: "Newsletter",
      fields: ["custom_title", "name", "custom_image_", "route"],
      page_no: page_no,
      page_size: 10,
    }

    const resp = await getList(param);
    if(resp.message && resp.message.length != 0){
      console.log(resp.message);
      setAllNewsLetter(resp.message)
    }
  }

  return (
    <>
      <RootLayout>
        {<div className='container p-[30px]'>
          <label className='themeSwitcherTwo w-full  border_bottom shadow-card relative inline-flex cursor-pointer select-none'>
            <input
              type='checkbox'
              className='sr-only'
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <span
              className={`flex capitalize items-center space-x-[6px]  py-2 px-[18px] text-[16px] font-semibold ${!isChecked ? 'tabActive' : ''
                }`}
            >
              Current edition
            </span>
            <span
              className={`flex capitalize items-center space-x-[6px]  py-2 px-[18px] text-[16px] font-semibold ${isChecked ? 'tabActive' : ''
                }`}
            >
              All Newsletter
            </span>
          </label>

          {!isChecked ? <>
            {data && <div className={`flex pt-[20px] flex-wrap justify-between gap-5`}>
              <div className={`flex-[0_0_calc(55%_-_10px)] pt-[10px] leading-[2] md:flex-[0_0_calc(100%_-_10px)]`}>
                <p className='text-[20px] font-semibold'>{data.custom_title}</p>
                <p className='sub_title py-3'>{data.custom_description}</p>
                <button style={{ borderRadius: '5px' }} onClick={handleButtonClick} className='primary_btn my-3 text-[14px] h-[35px] w-[100px]'>subscribe</button>
              </div>
              <div className={`flex-[0_0_calc(45%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]`}>
                <Image className={`h-full w-full`} src={check_Image(data.custom_image_)} height={300} width={500} alt={data.custom_title} />
              </div>
            </div>}

            {(data.related_newsletters && data.related_newsletters.length != 0) && <div className='p-[30px_0]'>
              <Title data={{title: "More articles from the newsletter"}} />
              <div className='grid grid-cols-4 md:grid-cols-2 gap-5'><NewsCard data={data.related_newsletters} imgClass={'h-[240px] w-full rounded-[10px_10px_0_0]'} cardClass={'h-[310px] md:h-[325px]'} /></div>
            </div>}

            {(data.other_newsletters && data.other_newsletters.length != 0) && <div className='p-[30px_0]'>
              <Title data={{title:"Read other Newsletters"}} />
              <div className='grid grid-cols-4 md:grid-cols-2 gap-5'><NewsCard data={data.other_newsletters} imgClass={'h-[340px] w-full rounded-[10px_10px_0_0]'} cardClass={'h-[410px] md:h-[460px]'} /></div>
            </div>}

            {showAlert && <AlertPopup show={() => setShowAlert(false)} />}
          </> : <>
           {(allNewsLetter && allNewsLetter.length != 0) &&  <div className='grid grid-cols-4 md:grid-cols-2 gap-[20px] pt-[20px]'>
              <NewsCard load={() => handleCheckboxChange()} pagination={true} data={allNewsLetter} imgClass={'h-[340px] w-full rounded-[10px_10px_0_0]'} cardClass={'h-[410px] md:h-[460px]'} />
            </div>}
          </>}
        </div>}
      </RootLayout>
    </>
  )
}


export async function getServerSideProps({ params }) {
  let Id = params?.detail;
  let param = {
    newsletter: Id,
    another_category: "Fashion & Lifestyle",
    newsletter_fields: ["custom_title","custom_image_","route","name","custom_category"]
  }

  const resp = await newsDetail(param);
  const data = resp.message;

  return{
    props:{data}
  }
}