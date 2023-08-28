import React, { useState } from 'react';
import RootLayout from '@/layouts/RootLayout';
import Image from 'next/image';
import data from '@/libs/teams'


export default function Teams() {
const [isodd, setIsodd] = useState(false);
let oddevenClassCheck = isodd ? 'odd': 'even';
if (oddevenClassCheck  % 2 == 0) {
    console.log("The number is even.");
} else {
    console.log("The number is odd.");
}
    return (
      <RootLayout>
        <div className='bg-[#F8F8F8]'>
        <div className='container pt-9 pb-9'>
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
        {data && data.teammembers.map((teams, index) => ( 
        <div className="{oddevenClassCheck}">
        <div className='container'> 
                <div className="grid-cols-2 md:grid-cols-1 gap-4 md:gap-2 grid  pt-9 pb-9" data-index={index}>
                     <div className="col-span-1 text-center m-auto">
                        <Image src={teams.image} alt="Teams" width={300} height={300} />
                        <div className='d__flex gap-2 pt-6 '>
                        <Image src="/teams/linkdin.svg" alt="linkdin" width={24} height={24} />
                        <Image src="/teams/x.svg" alt="x" width={24} height={24} />
                        <Image src="/teams/instagram.svg" alt="instagram" width={24} height={24} />
                        </div>
                    </div>
                    <div className="col-span-1">
                            <h2 className='font-bold text-3xl pt-6 text-left'>{teams.title}</h2>
                            <p className='sub_title font-bold text-left pt-3'>{teams.designation}</p>
                            <p className='sub_title font-bold text-left pt-3'>{teams.content}</p>
                    </div>
                    
                </div>
        </div>
        </div>
        ))}  
      </RootLayout>
    )
  }

