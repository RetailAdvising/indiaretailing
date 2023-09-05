import React from 'react';
import styles from '@/styles/Components.module.scss'
import Image from 'next/image';
import data from '@/libs/benefits';
import irprime from '@/libs/benefitscolumn';


export default function Benefits() {

  return (
    <>
    <h2 className='font-bold text-3xl md:text-2xl pt-6 text-center'>{data.title}</h2>
    <p className='sub_title text-center pb-3 pt-3'>{data.subtitle}</p>
    <div className="pt-3.5 grid-cols-4 md:grid-cols-1 gap-4 grid">
      {data.benefits.map((benefits,index) => {
      return(
      <div className="basis-1/4 benefitcard rounded-2xl p-6" key={index}>
          <h3 className='text-1xl font-bold pb-2'>{benefits.title}</h3>
          <p className='pb-6 text-xs'>{benefits.content}</p>
          <Image src={benefits.image} alt="Article" width={150} height={150} className='m-2 m-auto' />
      </div>
      )
      }
      )}
    </div>

    <div className='container md:p-[15px]' >
        {irprime.memberships.map((membership, index) =>  {
          <div className={index % 2 === 0 ? 'oddabout' : 'evenabout'}>
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
        }
      )}
    </div>
    </>
  )
}

