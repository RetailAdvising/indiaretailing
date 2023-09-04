import {check_Image} from '@/libs/api'
import Image from 'next/image'
export default function Video({data,flex,imgClass}) {
    return (
        <>
            {data.map((res, index) => {
                return (
                    <div key={index} className={`${flex}`}>
                        <Image src={check_Image(res.video_image)} className={`${imgClass ? imgClass : 'h-[175px] w-full'}`} height={100} width={100} alt={res.title} />
                        <p className='pt-[10px]'>{res.title}</p>
                    </div>
                )
            })}
        </>
    )
}