import React,{useState} from 'react'
import Image from 'next/image'
import styles from '@/styles/newsLetter.module.scss'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
import AlertPopup from '../common/AlertPopup';

export default function NewsList({ data }) {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  async function showPopup(data) {
    // console.log(data);
    setShowAlert(true);
  }

  return (
    <>
      {data && data.map((res, index) => {
        return (
          <div className={`flex gap-[10px] items-center justify-between ${index != data.length - 1 ? 'pb-[20px]' : ''}`} key={index}>
            <div className={`cursor-pointer flex gap-[10px] flex-[0_0_calc(75%_-_10px)]`}>
              <Image className={`h-[83px] rounded-[3px] w-[88px]`} src={check_Image(res.custom_image_)} height={100} width={200} alt={res.custom_day} />
              <div className={`leading-[1.7]`}>
                <p className={`sub_title`}>{res.custom_day}</p>
                <p className={`line-clamp-1 font-semibold text-[16px]`}>{res.custom_category}</p>
                <p className={`text-[14px] line-clamp-2`}>{res.custom_title}</p>
              </div>
            </div>
            {/* justify-between */}
            <div className='flex  items-center gap-[10px] flex-[0_0_calc(25%_-_10px)]'>
              <p className='cursor-pointer flex-[0_0_calc(50%_-_10px)]' onClick={() => router.push(`/${res.route}`)}>Preview</p>
              <p className='flex cursor-pointer justify-center items-center seeMore' onClick={() => showPopup(res)}><span className='primary_text '>Sign Up</span> <Image className='img' src={'/arrowrightprimary.svg'} height={15} width={15} alt='signup' /></p>
            </div>
          </div>
        )
      })}

      {showAlert && <AlertPopup show={() => setShowAlert(false)} />}
    </>
  )
}
