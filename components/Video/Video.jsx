import { check_Image } from '@/libs/api'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
export default function Video({ data, flex, imgClass,big, isBg, isHome = undefined ,isList}) {
    const router = useRouter();
    return (
        <>
            {data.map((res, index) => {
                return (
                    <Link key={index} className={`${flex}`} href={isHome ? isHome + res.route : '/' + router.asPath.split('/')[1] + '/' + res.route}>
                        {/* onClick={() => router.push(`/${router.asPath.split('/')[1]}/${res.route}`)} */}
                        <div className={` ${big ? 'relative' : ''} lg:h-[235px] ${isHome ? 'lg:mb-[15px]' : isList ? 'h-full' : 'h-[235px]'} cursor-pointer relative`}>
                            <Image src={check_Image(res.video_image)} className={`rounded-[5px] ${imgClass ? imgClass : 'h-[175px] w-full'}`} height={150} width={273} alt={res.title} />
                            <Image src={'/irprime/youtube.svg'} className={`absolute ${big ? 'bottom-[70px] left-[10px]':  'bottom-[60px] left-[5px]'}  ${isList ? '' : 'md:bottom-[60px]'}  object-contain h-[20px] w-[30px]`} height={100} width={100} alt={res.title} />
                            <p className={`pt-[10px] text-[14px] md:text-[13px] ${big ? 'text-[17px] lg:absolute bottom-[15px] mx-[10px] leading-[22px] font-[500]' : ''} line-clamp-2 ${isBg ? 'text-white' : ''}`}>{res.title}</p>
                        </div>
                    </Link>
                )
            })}
        </>
    )
}