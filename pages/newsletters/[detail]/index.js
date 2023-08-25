import RootLayout from '@/layouts/RootLayout'
import React, { useState } from 'react'
import data from '@/libs/newsDetail';
import Image from 'next/image';
import Title from '@/components/common/Title';
import NewsCard from '@/components/Newsletter/NewsCard';
import Tabs from '@/components/common/Tabs';
import AlertPopup from '@/components/common/AlertPopup';
export default function NewsLists() {
  const tabs = [{ name: 'Current edition' }, { name: 'All Newsletter' }]
  const [isChecked, setIsChecked] = useState(false)

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
            {data.section_1 && <div className={`flex pt-[20px] flex-wrap justify-between gap-5`}>
              <div className={`flex-[0_0_calc(55%_-_10px)] pt-[10px] leading-[2] md:flex-[0_0_calc(100%_-_10px)]`}>
                <p className='text-[20px] font-semibold'>{data.section_1.title}</p>
                <p className='sub_title py-3'>{data.section_1.description}</p>
                {data.section_1.subscribe && <button style={{ borderRadius: '5px' }} onClick={handleButtonClick} className='primary_btn my-3 text-[14px] h-[35px] w-[100px]'>subscribe</button>}
              </div>
              <div className={`flex-[0_0_calc(45%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]`}>
                <Image className={`h-full w-full`} src={data.section_1.image} height={300} width={500} alt={data.section_1.title} />
              </div>
            </div>}

            {data.section_2 && <div className='p-[30px_0]'>
              <Title data={data.section_2} />
              <div className='grid grid-cols-4 md:grid-cols-2 gap-5'><NewsCard data={data.section_2.data} imgClass={'h-full w-full rounded-[10px_10px_0_0]'} cardClass={'h-[265px] md:h-[325px]'} /></div>
            </div>}

            {data.section_3 && <div className='p-[30px_0]'>
              <Title data={data.section_3} />
              <div className='grid grid-cols-4 md:grid-cols-2 gap-5'><NewsCard data={data.section_3.data} imgClass={'h-full w-full rounded-[10px_10px_0_0]'} cardClass={'h-[410px] md:h-[460px]'} /></div>
            </div>}

            {showAlert && <AlertPopup show={() => setShowAlert(false)} />}
          </> : <>
            <div className='grid grid-cols-4 md:grid-cols-2 gap-[20px] pt-[20px]'>
              <NewsCard data={data.allNews} imgClass={'h-full w-full rounded-[10px_10px_0_0]'} cardClass={'h-[410px] md:h-[460px]'} />
            </div>


          </>}
        </div>}
      </RootLayout>
    </>
  )
}
