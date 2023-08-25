import React, { useState } from 'react';
import RootLayout from '@/layouts/RootLayout';
import data from '@/libs/membership';
import Image from 'next/image';
import Faq from '@/components/Membership/faq';
import Benefits from '@/components/Membership/benefits';


export default function Membership() {
  const  [btnState, setbtnState] = useState(false);

  function handleClick(){
    setbtnState(btnState => !btnState);
  }
  let toggleClassCheck = btnState ? 'active': '';
    return (
      <RootLayout>
        <div className='container p-[30px]'>
            <h2 className="font-bold text-5xl md:text-2xl text-center">{data.title}</h2>
            <p className="sub_title text-center pb-10 pt-3">{data.subtitle}</p>
            <div className="flex flex-row m-auto justify-center gap-2 mb-3">
              <div className='inline-block rounded-2xl p-1 border-gray-300 border border-solid'>
                  <button className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-2xl font-medium bg-[red] member-button1 ${toggleClassCheck}`} onClick={handleClick}>Monthly Billing</button>
              </div>
            </div>
            <div className="flex flex-row pt-3.5 gap-6">
            {data.membership.map((membership,index) => {
            return(
                  <div key={index} className="basis-1/3 member-card p-8 rounded-2xl">
                      <h3 className='text-2xl font-bold pb-1'>{membership.plan}</h3>
                      <p className='pb-6 text-xs'>{membership.descrption}</p>
                      <p className='text-xs'>Save {membership.offer}%</p>
                      <h5 className='font-medium text-3xl'>{membership.price}</h5>
                      <p className='text-xs'>Per month .</p>
                     
                      <ul className='pb-4'>
                      {membership.items.map((items,index) => {
                      return(
                          <li key={index} className='text-xs leading-6 d__flex gap-0.5'>
                          <Image src="/tick1.svg" alt="Tick" width={18}height={18} className='m-2 w-4 h-4'/>{items.list}</li>
                          )
                        })}
                      </ul>
                      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-2xl font-medium w-full member-button">
                          Get started
                      </button>
                  </div>
                  )
                })}
          </div>
        </div>
        <div className='container p-[30px]'>
            <Benefits></Benefits>
        </div>
        <div className='container p-[30px]'>
              <Faq></Faq>
        </div>
      </RootLayout>
    )
  }


