import React from 'react';
import styles from '@/styles/Components.module.scss'
import Image from 'next/image';
import data from '@/libs/publications'


export default function Publications() {
  return (
    <>
    <h2 className='font-bold text-3xl pt-6 text-center'>{data.title}</h2>
    <p className='sub_title text-center pb-3 pt-3'>{data.subtitle}</p>
    <div className="pt-3.5 grid-cols-3 md:grid-cols-2 gap-4 md:gap-2 grid">
      {data.publication.map((publication,index) => {
      return(
      <div className="basis-1/3 md:basis-1/2" key={index}>
        <div className='bg-[#FBFBFB] rounded-2xl p-6'>
          <Image src="/articles.svg" alt="Article" width={150} height={150} className='m-2 m-auto' />
          <h3 className='text-1xl font-bold pb-2 text-center mt-4'>{publication.title}</h3>        </div>
      </div>
      )
      }
      )}
    </div>
    </>
  )
}

