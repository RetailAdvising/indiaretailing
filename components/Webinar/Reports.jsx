import React from 'react'
import ImageLoader from '../ImageLoader'
import { useRouter } from 'next/router'

const Reports = ({data, click_data}) => {
  const router = useRouter();
  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-3 mt-5 gap-[15px]'>
         {
            data.map((res,i)=>(
                <div key={i} className='border rounded-xl p-3 flex gap-4 cursor-pointer' onClick={()=> click_data(res)}>
                   <div>
                     <ImageLoader style={'w-full object-contain h-[90px] rounded-lg'} src={res.image} />
                   </div>
                   <div>
                     <h2 className='uppercase text-[#E21B22] font-semibold'>{res.title}</h2>
                     <p className='text-[16px] font-normal mt-2'>{res.description}</p>
                   </div>
                </div>
            ))
         }
      </div>
    </>
  )
}

export default Reports