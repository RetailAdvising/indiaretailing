import React from 'react'
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import styles from '@/styles/Slider.module.scss'
import Image from 'next/image';
import { check_Image } from '@/libs/common';
import { useRouter } from 'next/router';
export default function Sliders({ data,perView }) {
  const router = useRouter();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: perView ? perView : 3,
      paritialVisibilityGutter: 60
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 50
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 30
    }
  }
  return (
    <>


      <Carousel
        // ssr
        // partialVisbile
        // deviceType={deviceType}
        autoPlay
        arrows={false}
        autoPlaySpeed={2000}
        // containerClass="container-with-dots"
        // dotListClass="dots"
        infinite
        pauseOnHover
        responsive={responsive}
        // shouldResetAutoplay
        // showDots
        // renderDotsOutside={false}
        // sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {data.map((res, index) => {
          return (
            <div onClick={()=> router.push(`/${router.asPath.split('/')[1]}/category/${res.item ? res.item : ''}?id=${res.name}`)} className={`flex items-center gap-[15px] h-full`} key={index}>
              <div className={`lg:flex-[0_0_calc(50%_-_10px)]`}>
                <Image alt={''} src={check_Image(res.image)} height={200} width={400} className={`h-[310px] w-[210px]`} />
              </div>
              <div className={`flex flex-col items-start justify-between lg:h-[175px]`}>
                <p className={`text-[15px]`}>{res.item}</p>
                <p className={`sub_title`}>{res.short_description ? res.short_description : 'Retail in the New Phygital Era Arguably the Indian consumers have come of age'}</p>
                <button className={`p-[8px] text-[14px] rounded-[5px] ${styles.optionsBtn} bg-[#fff]`} >Select options</button>
              </div>
            </div>
          )
        })}


      </Carousel>

    </>
  )
}
