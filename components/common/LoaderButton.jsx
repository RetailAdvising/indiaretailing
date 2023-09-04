import React from 'react'
import Image from 'next/image';

export default function LoaderButton(props) {

  function clickBtn(){
    props.loader ? null : props.buttonClick() 
  }

  return (
    <>
       <button className={`${props.loader ? 'opacity-[0.9]' : null} ${props.width ? props.width : null} m-[0px_auto] primary_btn flex items-center justify-center text-[14px] h-[40px] hover:bg-red-200 focus:outline-none focus-visible:ring-2`} onClick={() => clickBtn()}>
          {!props.loader && props.image_left && <Image className={'mr-[10px]'} height={10} width={20} alt={'add cart'} src={props.image_left} />}
          {!props.loader && props.button_name}
          {!props.loader && props.image_right && <Image className={'ml-[10px]'} height={10} width={20} alt={'add cart'} src={props.image_right} />}
          {props.loader && <div class="animate-spin rounded-full h-[15px] w-[15px] border-l-2 border-t-2 border-white"></div>}
       </button>
    </>
  )
}
