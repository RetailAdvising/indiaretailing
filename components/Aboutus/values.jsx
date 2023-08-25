import React from 'react';
import styles from '@/styles/Components.module.scss'
import Image from 'next/image';
import data from '@/libs/values'


export default function Values() {
  return (
    <>
    <h2 className='font-bold text-3xl pt-6 text-center'>{data.title}</h2>
    {/* <p className='sub_title text-center pb-3 pt-3'>{data.subtitle}</p> */}
    <div className="pt-3.5 grid-cols-5 md:grid-cols-2 gap-4 grid">
      {data.values.map((values,index) => {
      return(
      <div className="basis-1/5 pastel-bg-parent rounded-2xl p-6 md:p-3 min-h-[220px]" key={index}>
          <Image src="/articles.svg" alt="Article" width={100} height={100} className='m-2 m-auto' />
          <h3 className='text-1xl font-bold pb-2 pt-4'>{values.title}</h3>
          <p className='pb-6 text-xs'>{values.content}</p>
      </div>
      )
      }
      )}

    </div>
    </>
  )
}

