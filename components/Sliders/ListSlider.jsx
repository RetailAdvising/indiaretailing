import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import { check_Image } from '@/libs/api';
import { useRouter } from 'next/router';


export default function ListSlider({ data, auto }) {

    const router = useRouter();
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
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

    console.log(data)

    return (
        <>
            <Carousel
                // ssr
                // partialVisbile
                // deviceType={deviceType}
                // containerClass="container-with-dots"
                dotListClass="dots"
                // shouldResetAutoplay
                showDots
                // renderDotsOutside={true}
                // sliderClass=""

                autoPlay={auto ? true : false}
                arrows={false}
                autoPlaySpeed={2000}
                infinite
                pauseOnHover
                responsive={responsive}
                slidesToSlide={1}
                swipeable
            // centerMode={true}
            // itemClass="carousel-item-padding-40-px"
            // containerClass="carousel-container"
            // showDots={true}
            >
                {data.map((res, index) => {
                    return (
                        <div onClick={() => router.push(`/${router.asPath.split('/')[1]}/${res.route}`)} className={`flex items-center justify-center border rounded-[5px] p-[10px] gap-[15px] h-full`} key={index}>
                            <div className={`flex-[0_0_calc(32%_-_10px)]`}>
                                <Image className={`h-[72px] w-full rounded-[5px]`} height={50} width={80} src={check_Image(res.thumbnail_image)} alt={res.title ? res.title : ''} />
                            </div>
                            <div className={`flex-[0_0_calc(68%_-_10px)]`}>
                                {(res.primary_text && res.secondary_text) && <p className='flex items-center '><span className='primary_text pr-[10px] ' style={{ fontSize: '11px' }}>{res.primary_text}</span> <span className='h-[13px] w-[2px] bg-[#6f6f6f]'></span> <span className='secondary_text pl-[10px]' style={{ fontSize: '11px' }}>{res.secondary_text}</span></p>}
                                <p className={`line-clamp-2 pt-1 text-[13px] font-semibold`}>{res.title}</p>
                                <p className="text-[11px] pt-1">{res.publisher}</p>
                            </div>
                        </div>
                    )
                })}

            </Carousel>

        </>
    )
}