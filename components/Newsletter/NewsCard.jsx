import React from 'react'
import Image from 'next/image'
import styles from '@/styles/newsLetter.module.scss'
import { check_Image } from '@/libs/common'
import { useRouter } from 'next/router'
export default function NewsCard({data,imgClass,imgFlex,cardClass,pagination,load}) {
  const router = useRouter();
  return (
    <>
     {data && data.map((res,index)=>{
      return(
        <div key={index} onClick={()=> {router.push('/'+ res.route); pagination ? load() : null}} className={`border cursor-pointer rounded-[10px] ${cardClass}`}>
          <div className={`${imgFlex}`}> 
            <Image className={`${imgClass}`} src={check_Image(res.custom_image_)} height={100} width={200} alt={res.title} />
          </div>
          <div className={`p-[10px]`}>
           {res.primary_text && <p className={`primary_text line-clamp-1`}>{res.primary_text}</p>}
            {res.custom_title && <p className={`line-clamp-2`}>{res.custom_title}</p>}
          </div>
        </div>
      )
     })}
    </>
  )
}



