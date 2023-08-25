import React from 'react'
import styles from '@/styles/Components.module.scss'
export default function BulletList({data,isBorder}) {
  return (
    <>
      {data && data.map((res,index)=>{
        return (
            <div key={index} className={`${styles.bulletList} ${index != data.length - 1 ? 'border_bottom' : ''} ${isBorder && `${styles.bullet_none} border_right pl-[10px] border-b-0`}`}>
                <div className={`${styles.bullet}`}></div>
                <p className='text-[15px]	line-clamp-1'>{res.title}</p>
            </div>
        )
      })}
    </>
  )
}
