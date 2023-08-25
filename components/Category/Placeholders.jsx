import React from 'react'
import categories from '@/libs/categories'
import Cards from '../common/Cards'
export default function Placeholders({data,index}) {
    console.log(data)
  return (
    <>
      {categories.sections.section_1.must_read && < >
        {
            data.map((res,i)=>{
                return(
                    <div key={i} className='grid grid-cols-3 gap-5'>
                        {res.attr == index && <Cards border_none={true} noPrimaryText={true} isBorder={true} height={'h-[200px]'} width={'w-full'} data={categories.sections.section_1.must_read.data.splice(0,3)} />}
                    </div>
                )
            })
        }
        
        </>}
      {/* {(data && data.length != 0) && data.map((res,i)=>{
        return(
            <div key={i}>
                {i == index ? 
                    res.data.map((item,n)=>{
                        return(
                            <h6 className='font-semibold text-[20px]'>{item}</h6>
                        )
                    })
                : null}
            </div>
        )
      })} */}
    </>
  )
}
