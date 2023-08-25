import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useReducer } from 'react'

export default function Title({ data, textClass, seeMore,font,query }) {
  const router = useRouter()

  async function goTo(data){
    if(query){
      router.push(`${router.asPath}/${data.category_name}?c=${data.category}`)
    }else{
      router.push(`/${router.asPath.split('/')[1]}/${data.route}`)
    }
  }
  return (
    <>
      {data &&
        <div className='title_div pb-3 flex justify-between'>
          <div className='cursor-pointer'>
            <h6 style={{fontSize: font}} className={`title text-[18px] ${textClass}`}>{data.title ? data.title : data.category_name ? data.category_name : ''}</h6>
            <div className='line'></div>
          </div>
          {
            seeMore &&
            <div className='flex items-center gap-[5px] cursor-pointer' onClick={()=> goTo(data)}>
              <p>See More</p>
              <Image className='h-[18px] w-[18px]' src={'/rightArrow.svg'} height={7} width={7} alt='see more' />
            </div>
          }

        </div>
      }
    </>
  )
}
