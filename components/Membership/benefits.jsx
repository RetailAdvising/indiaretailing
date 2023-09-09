import React from 'react';
import styles from '@/styles/Components.module.scss'
import Image from 'next/image';
// import data from '@/libs/benefits';
import irprime from '@/libs/benefitscolumn';
import { check_Image } from '@/libs/common'

export default function Benefits({data}) {

  return (
    <>
    <h2 className='font-bold text-3xl md:text-2xl pt-6 text-center'>{data.heading}</h2>
    <p className='sub_title text-center pb-3 pt-3'>{data.sub_heading}</p>
    <div className="pt-3.5 grid-cols-4 md:grid-cols-1 gap-4 grid overflow-auto md:p-[15px] md:flex md:items-center">
    {data.member_ship_options.map((benefits,index) => {
       return(
       <div style={{background:benefits.color ?  benefits.color  : '#EEF8F9'}} className={`lg:basis-1/4 benefitcard md:min-h-[330px] rounded-2xl p-6 md:flex-[0_0_calc(75%_-_10px)]`} key={index}>
          <h3 className='text-1xl  font-bold pb-2'>{benefits.list_heading}</h3>
          <p className='content_ lg:pb-6 text-xs mb-[15px] line-clamp-5'>{benefits.list_sub_heading}</p>
          <div className='md:h-[150px]'> <Image src={check_Image(benefits.image)} alt="Article" width={150} height={150} className='m-2 m-auto h-[145px] object-cover' /></div>
       </div>
      )}
    )}
    </div>

    <div className='container' >
        {irprime.memberships.map((membership, index) =>  {
        return(
          <div className={`${index % 2 === 0 ? 'oddabout' : 'evenabout'} !bg-transparent md:py-4`} >
                  <div className="flex md:flex-col-reverse flex-row gap-4 md:gap-2 pt-9 pb-9  md:pt-4 md:pb-4">
                      <div className="m-auto basis-2/4 md:basis-full">
                        <h2 className='font-bold text-3xl md:text-2xl pt-6 md:pt-0 text-left md:text-left'>{membership.title}</h2>
                        <p className='sub_title text-left pb-2 pt-3 md:text-left'>{membership.content}</p>
                      </div>
                      <div className="text-center m-auto basis-2/4 md:basis-full">
                        <Image src={membership.image} alt="About" width={400} height={400} className='m-auto'/>
                      </div>
                </div>
          </div>
            )
        }
      )}
    </div>
    </>
  )
}

