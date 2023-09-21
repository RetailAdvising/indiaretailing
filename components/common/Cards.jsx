import React from 'react'
import styles from '@/styles/Cards.module.scss'
import { check_Image } from '@/libs/common'
import Image from 'next/image'
import { useRouter } from 'next/router'
export default function Cards({ searchNavigation, noPrimaryText, data, isHome=undefined, check, contentHeight, flex, border_none, isBorder, width, height, borderRadius, cardClass }) {
  
  const router = useRouter();

  const navigateDetail = (data) =>{
    // router.push('/login')
    let route = ''
    if(data.type == 'Articles'){
        route = data.ir_prime == '1' ?'/IRPrime/' + data.route : '/categories/' + data.route
    }else if(data.type == 'Product'){
        route = '/bookstore/' + data.route
    }else if(data.type == 'News'){
        route = '/news/' + data.route
    }else if(data.type == 'Podcast'){
        route = '/podcast/' + data.route
    }else if(data.type == 'Video'){
        route = '/ir/' + data.route
    }else if(data.type == 'Newsletter'){
        route = '/newsletters/' + data.route
    }

    if(route){
        router.push(route);
    }
}


  return (
    <>
      {data && data.map((res, index) => {
        return (
          <div key={index} onClick={() => searchNavigation ? navigateDetail(res): (router.push(`${isHome ? isHome + res.route : '/' + router.asPath.split('/')[1] + '/' + res.route}`))} className={`${styles.cards} ${flex} cursor-pointer ${isBorder && 'border rounded-[10px]'} ${cardClass}`} >
            <div className={`${styles.img_div}`}>
              {/* layout="fill" sizes="(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw"  objectFit="cover" */}
              <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' height={100} width={200} className={` ${height} ${width} ${borderRadius} ${styles.card_img} ${border_none ? 'rounded-[5px]' : 'rounded-[10px]'} `} src={check ? check_Image(res.thumbnail_image || res.image || res.product_image) : res.image} alt={"cards"} />
            </div>
            <div className={`${styles.content} ${isBorder && 'p-[10px] '} ${contentHeight}  flex justify-between flex-col`}>
              {((res.primary_text && res.secondary_text) && !noPrimaryText) && <p className='flex gap-2 line-clamp-1 items-center'><span className='primary_text fnt_13 line-clamp-1'>{res.primary_text || res.type}</span> <span className='h-[10px] w-[1px] bg-[#6f6f6f]'></span> <span className='secondary_text line-clamp-1'>{res.secondary_text}</span></p>}
              {(!res.primary_text && res.type) && <p className='flex gap-2 '><span className='primary_text fnt_13'>{res.type}</span></p>}

              {res.title && <h4 className={`card-title line-clamp-2 ${isHome ? '' : 'mt-2'} `}>{res.title ? res.title : ''}</h4>}
              {(res.sub_title || res.blog_intro) && <p className={`sub_title pt-1 ${(isHome && res.title) ? 'line-clamp-1 lg:pt-[10px]' : (isHome && !res.title) ? 'line-clamp-2' : 'line-clamp-2'}`}>{res.sub_title ? res.sub_title : res.blog_intro ? res.blog_intro : ''}</p>}
              {((res.publisher) && !noPrimaryText) && <p className={`hashtags pt-[10px]`}>{res.hashtags ? res.hashtags : res.publisher ? res.publisher : ''}</p>}
              {((res.hashtags) && !noPrimaryText) && <p className={`light_text pt-[10px]`}>{res.hashtags ? res.hashtags : ''}</p>}
            </div>
          </div>
        )
      })}
    </>
  )
}
