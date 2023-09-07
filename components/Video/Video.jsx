import { check_Image } from '@/libs/api'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
export default function Video({ data, flex, imgClass, isBg, isHome = undefined }) {
    const router = useRouter();
    return (
        <>
            {data.map((res, index) => {
                return (
                    <Link key={index} href={isHome ? isHome + res.route : '/' + router.asPath.split('/')[1] + '/' + res.route}>
                        {/* onClick={() => router.push(`/${router.asPath.split('/')[1]}/${res.route}`)} */}
                        <div className={`${flex} cursor-pointer relative`}>
                            <Image src={check_Image(res.video_image)} className={`rounded-[5px] ${imgClass ? imgClass : 'h-[175px] w-full'}`} height={100} width={100} alt={res.title} />
                            <Image src={'/irprime/youtube.svg'} className='absolute bottom-[60px] md:bottom-[55px] left-[5px] object-contain h-[20px] w-[30px]' height={100} width={100} alt={res.title} />
                            <p className={`pt-[10px] md:text-[13px] line-clamp-2 ${isBg ? 'text-white' : ''}`}>{res.title}</p>
                        </div>
                    </Link>
                )
            })}
        </>
    )
}