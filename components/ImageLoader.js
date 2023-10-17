import { useState, useEffect } from 'react'
import { check_Image } from '@/libs/api'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function ImageLoader({ src, title, style }) {
    const [load, setLoad] = useState(false)
    const [lazy,setLazy] = useState(false)
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

        </>
    )
    // return <>Loading....</>
}