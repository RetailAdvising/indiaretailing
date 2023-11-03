import { useState, useEffect } from 'react'
import { check_Image } from '@/libs/api'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Image from 'next/image'
export default function ImageLoader({ src, title, style, type }) {
    const [load, setLoad] = useState(false)
    const [lazy, setLazy] = useState(false)
    // useEffect(()=>{
    //     setTimeout(() => {
    //         setLoad(true) 
    //     }, 500);
    // },[])
    return (
        <>
            {/* {!load  && (
                <img
                    className={style}
                    src="/empty_state.svg"
                    alt="Placeholder"
                />
            ) } */}
            <LazyLoadImage
                effect="blur" // You can choose different effects here
                src={!load ? '/empty_state.svg' : check_Image(src)}
                alt={title}
                className={style}
                style={{
                    opacity: load ? 1 : 0.7,
                    // transition: 'opacity 0.5s',
                    transition: 'all 0.2s',
                    // width: '100%',
                    // height: '100%',
                    // objectFit: 'cover',
                }}
                afterLoad={() =>
                    setTimeout(() => {
                        setLoad(true)
                    }, 250)

                }
            />

            { type && type.type && type.type == 'video' && <div className='absolute bottom-[25px] z-10 right-[10px] md:bottom-[25px]'>
                <Image src={'/irprime/youtube.svg'} className='h-[35px] w-[35px] object-contain' height={50} width={50} alt={title + 'video'} />
            </div>}

        </>
    )
    // return <>Loading....</>
}