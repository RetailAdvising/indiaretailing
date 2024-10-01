import { check_Image } from '@/libs/api'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ImageLoader from '../ImageLoader';
import { Nunito } from 'next/font/google'
const nunito = Nunito({
    weight: ["300","400","500","600","700"],
    display: "block",
    preload: true,
    style: 'normal',
    subsets: ["latin"],
    variable: '--font-inter',
  })
export default function Video({ data, flex, imgClass,big, isBg, isHome = undefined ,isList , vh,abs}) {
    const router = useRouter();
    return (
        <>
            {data.map((res, index) => {
                return (
                    <Link key={index} className={`${flex} ${isHome && big ? 'lg:grid lg:h-full' : ''}`} href={isHome ? isHome + res.route : '/' + router.asPath.split('/')[1] + '/' + res.route}>
                        {/* onClick={() => router.push(`/${router.asPath.split('/')[1]}/${res.route}`)} */}
                        <div className={` ${big ? 'relative' : ''} ${vh ? vh : ''} ${isHome ? 'lg:mb-[20px] ' : isList ? 'h-full' : 'h-[235px]'} cursor-pointer relative`}>
                            <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' src={check_Image(res.video_image)} className={`rounded-[5px] ${imgClass ? imgClass : 'h-[175px] w-full'}`} height={150} width={273} alt={res.title} />
                            {/* <ImageLoader style={`rounded-[5px] ${imgClass ? imgClass : 'h-[175px] w-full'}`} src={res.video_image} title={res.title ? res.title : 's'} /> */}
                            <Image src={'/irprime/youtube.svg'} className={`absolute ${big ? 'bottom-[50px] left-[10px]':  'bottom-[60px] left-[5px]'} ${abs ? abs : ''} ${isList ? '' : 'md:bottom-[60px]'}  object-contain h-[20px] w-[30px]`} height={100} width={100} alt={res.title} />
                            <p className={`pt-[10px] text-[14px] md:text-[13px] ${big ? 'text-[17px] absolute bottom-[15px] mx-[10px] leading-[22px] font-[500]' : ''} line-clamp-2 ${isBg ? 'text-white' : ''} !font-[700] ${nunito.className}`}>{res.title}</p>
                        </div>
                    </Link>
                )
            })}
        </>
    )
}