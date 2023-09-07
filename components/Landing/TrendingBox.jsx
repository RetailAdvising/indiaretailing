import React from 'react'
import Image from 'next/image'
export default function TrendingBox({ data, icons, parentElement }) {

  const moveLeft = () => {
    let element = document.querySelector(`.${parentElement}`);
    element.scrollBy(100, 0);
  }

  const moveRight = () => {
    let element = document.querySelector(`.${parentElement}`);
    element.scrollBy(-100, 0);
  }
  
  return (
    <>
      {data && data.map((res, index) => {
        return (
          <div className={`trendingList cursor-pointer`} key={index}>
            <p className={``} >{res.title}</p>
          </div>
        )
      })}
      {icons && <>
        <p className='cursor-pointer h-[35px] w-[35px] border rounded-[5px] p-[6px]' onClick={moveRight}><Image className={`h-[20px] w-[20px]`} src={icons.left_Arrow} height={28} width={28} alt={'left'}></Image></p>
        <p className='cursor-pointer h-[35px] w-[35px] border rounded-[5px] p-[6px]' onClick={moveLeft}><Image className={`h-[20px] w-[20px]`} src={icons.right_Arrow} height={28} width={28} alt={'right'}></Image></p>

      </>}
    </>
  )
}
