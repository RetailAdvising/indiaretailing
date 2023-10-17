import React from 'react'
import Image from 'next/image'
import styles from '@/styles/newsLetter.module.scss'
import { check_Image } from '@/libs/common'
import { useRouter } from 'next/router'
import ImageLoader from '../ImageLoader';

export default function NewsCard({data,imgClass,imgFlex,cardClass,pagination,load}) {
  const router = useRouter();
  return (
    <>
     {data && data.map((res,index)=>{
      return(
        <div key={index} onClick={()=> {router.push('/'+ res.route); pagination ? load() : null}} className={`border cursor-pointer rounded-[10px] ${cardClass}`}>
          <div className={`${imgFlex}`}> 
            {/* <Image className={`${imgClass}`} src={check_Image(res.image)} height={100} width={200} alt={res.title} /> */}
            <ImageLoader style={`${imgClass}`} src={res.image} title={res.title || res.subject} />

          </div>
          <div className={`p-[10px]`}>
           {(res.title || res.subject) && <p className={`line-clamp-2 title`}>{res.title ? res.title : res.subject ? res.subject : ''}</p>}
            {/* {res.title && <p className={`${res.title ? 'line-clamp-1' : 'line-clamp-2'} sub_title pt-[10px]`}>{res.title}</p>} */}
          </div>
        </div>
      )
     })}
    </>
  )
}



