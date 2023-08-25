import React from 'react';
import styles from '@/styles/Components.module.scss'
import Image from 'next/image';
import data from '@/libs/publications'


export default function About() {
  return (
    <>
    <div className="pt-3.5 grid-cols-2 md:grid-cols-1 gap-4 md:gap-2 grid">
         <div className="col-span-1">
            <h2 className='font-bold text-3xl pt-6 text-left'>{data.abouttitle}</h2>
            <p className='sub_title font-bold text-left pt-3'>{data.aboutsubtitle}</p>
            <p className='sub_title text-left'>{data.aboutsubtitle1}</p>
            <p className='sub_title text-left pb-2 pt-3'>{data.aboutcontent}</p>
            <p className='sub_title text-left pb-2'>{data.aboutcontent1}</p>
        </div>
        <div className="col-span-1 text-center m-auto">
          <Image src={data.aboutimage} alt="About" width={300} height={300} />
        </div>
    </div>

    <div className="grid-cols-2 md:grid-cols-1 gap-4 md:gap-2 grid pb-6 pt-6">
        <div className="col-span-1 text-center m-auto">
          <Image src={data.aboutimage} alt="About" width={300} height={300} />
        </div>
         <div className="col-span-1">
            <h2 className='font-bold text-3xl pt-6 text-left'>{data.abouttitle}</h2>
            <p className='sub_title text-left pb-2 pt-3'>{data.aboutcontent}</p>
        </div>
    </div>
    <div className="pt-3.5 grid-cols-2 md:grid-cols-1 gap-4 md:gap-2 grid pb-6 pt-6">
         <div className="col-span-1">
            <h2 className='font-bold text-3xl pt-6 text-left'>{data.abouttitle}</h2>
            <p className='sub_title text-left pb-2 pt-3'>{data.aboutcontent}</p>
        </div>
        <div className="col-span-1 text-center m-auto">
          <Image src={data.aboutimage} alt="About" width={300} height={300} />
        </div>
    </div>
    </>
  )
}

