import React, { useState } from 'react';
import RootLayout from '@/layouts/RootLayout';
import Image from 'next/image';
import data from '@/libs/teams'





export default function Teams() {
  
    return (
      <RootLayout>
        <div className='bg-[#F8F8F8]'>
        <div className='container pt-9 pb-9 md:p-[15px]'>
            <div className="grid-cols-2 md:grid-cols-1 gap-4 md:gap-2 grid">
                <div className="col-span-1">
                    <h2 className='font-bold text-3xl pt-6 text-left'>{data.title}</h2>
                    <p className='sub_title font-bold text-left pt-3'>{data.subtitle}</p>
                </div>
            <div className="col-span-1 text-center m-auto">
                <Image src={data.teamimages} alt="Teams" width={300} height={300} />
            </div>
            </div>
        </div>
        </div>
        {data && data.teammembers.map((teams, index, i) => ( 
        <div >
        <div className='container md:p-[15px]'> 
                <div className="grid-cols-2 md:grid-cols-1 gap-4 md:gap-2 grid  pt-9 pb-9" data-index={index}>
                     <div className="col-span-1 text-center m-auto">
                        <Image src={teams.image} alt="Teams" width={300} height={300} />
                        <div className='d__flex gap-2 pt-6 justify-center'>
                        <a href="teams.instagram" target="_blank"><Image src="/teams/linkdin.svg" alt="linkdin" width={24} height={24} /></a>
                        <a href="teams.x" target="_blank"><Image src="/teams/x.svg" alt="x" width={24} height={24} /></a>
                        <a href="teams.linkedin" target="_blank"><Image src="/teams/instagram.svg" alt="instagram" width={24} height={24} /></a>
                        </div>
                    </div>
                    <div className="col-span-1 m-auto">
                            <h2 className='font-bold text-3xl pt-6 text-left'>{teams.title}</h2>
                            <p className='font-medium text-left pt-1 text-[16px] text-[gray-dark1]'>{teams.designation}</p>
                            <p className='sub_title font-bold text-left pt-3'>{teams.content}</p>
                    </div>
                    
                </div>
        </div>
        </div>
        ))}  
      </RootLayout>
    )
  }

