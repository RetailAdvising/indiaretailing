import React from 'react'
import Image from 'next/image'
import styles from '@/styles/newsLetter.module.scss'
export default function NewsCard({data,imgClass,imgFlex,cardClass}) {
  return (
    <>
     {data && data.map((res,index)=>{
      return(
        <div key={index} className={`border rounded-[10px] ${cardClass}`}>
          <div className={`${imgFlex}`}> 
            <Image className={`${imgClass}`} src={res.image} height={100} width={200} alt={res.title} />
          </div>
          <div className={`p-[10px]`}>
           {res.primary_text && <p className={`primary_text line-clamp-1`}>{res.primary_text}</p>}
            {res.title && <p className={`line-clamp-2`}>{res.title}</p>}
          </div>
        </div>
      )
     })}
    </>
  )
}
