import React from 'react'
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import styles from '@/styles/Slider.module.scss'
import Image from 'next/image';
import { check_Image } from '@/libs/common';
export default function Sliders({ data,perView }) {
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
            <div className={`flex items-center gap-[15px] h-full`} key={index}>
              <div className={`lg:flex-[0_0_calc(50%_-_10px)]`}>
                <Image alt={res.title} src={res.image} height={200} width={400} className={`h-full lg:w-full`} />
              </div>
              <div className={`flex flex-col items-start justify-between lg:h-[175px]`}>
                <p className={`text-[15px]`}>{res.title}</p>
                <p className={`sub_title`}>{res.description}</p>
                <button className={`p-[8px] text-[14px] rounded-[5px] ${styles.optionsBtn}`} style={{background: res.button_bg}}>{res.button}</button>
              </div>
            </div>
          )
        })}


      </Carousel>

    </>
  )
}
