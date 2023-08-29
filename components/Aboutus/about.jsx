import React from 'react';
import styles from '@/styles/Components.module.scss'
import Image from 'next/image';
import data from '@/libs/publications'


export default function About() {
  return (
    <>
    <div className="pt-3.5 grid-cols-2 md:grid-cols-1 gap-4 md:gap-2 grid">
      <div className="col-span-1">
        <h2 className='font-bold text-3xl md:text-2xl pt-6 md:pt-0 text-left'>{data.abouttitle}</h2>
        <p className='font-medium text-left pt-3 text-[16px] text-[gray-dark1]'>{data.aboutsubtitle}</p>
        <p className='text-left text-[16px]  font-medium text-[gray-dark1]'>{data.aboutsubtitle1}</p>
        <p className='sub_title text-left pb-2 pt-3'>{data.aboutcontent}</p>
        <p className='sub_title text-left pb-2'>{data.aboutcontent1}</p>
      </div>
      <div className="col-span-1 text-center m-auto">
        <Image src={data.aboutimage} alt="About" width={562} height={316} />
      </div>
    </div>
    {data.visionmission.map(visionmission =>(
    <div className="pt-9 pb-9 md:pt-4 md:pb-4 grid-cols-2 md:grid-cols-1 gap-4 md:gap-2 grid m-auto">
        <div className="col-span-1 m-auto">
          <h2 className='font-bold text-3xl md:text-2xl pt-6 md:pt-0 text-left md:text-center'>{visionmission.title}</h2>
          <p className='sub_title text-left pb-2 pt-3 md:text-center'>{visionmission.content}</p>
        </div>
        <div className="col-span-1 text-center m-auto">
          <Image src={visionmission.image} alt="About" width={300} height={300}/>
        </div>
      </div>
      )
      )
    }
      </>
  )
}

