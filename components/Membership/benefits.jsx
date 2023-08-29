import React from 'react';
import styles from '@/styles/Components.module.scss'
import Image from 'next/image';
import data from '@/libs/benefits'


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
    </>
  )
}

