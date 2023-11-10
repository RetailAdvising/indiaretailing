import Video from './Video'
import VideoSlide from './VideoSlide'
import Title from '../common/Title'
import { Nunito } from 'next/font/google'
import Image from 'next/image'
import { useRouter } from 'next/router'
const nunito = Nunito({
    weight: ["300", "400", "500", "600", "700"],
    display: "block",
    preload: true,
    style: 'normal',
    subsets: ["latin"],
    variable: '--font-inter',
})
export default function IrVideoWall({ data }) {
    // console.log(data, 'data')
    const router = useRouter()
    const goTo = (data) => {
        // console.log(data,'data')
        if(data.category == 'IR Studio'){
            router.push('/video/ir-studio')
        }else if(data.category == 'Retail with Rasul Bailay'){
            router.push('/video/retail-with-rasul-bailay')
        }else if(data.category == 'The Store'){
            router.push('/video/the-store')
        }
    }
    return (
        <>
            <div className={`wrapper md:!block`}>
                {data.map((res, i) => {
                    return (
                        <div key={i} className={`${i == 0 ? 'sidebar_1' : i == 1 ? 'right_1' : 'right_2'} rounded-[5px] p-[15px] md:my-[10px]`} style={{ background: 'rgba(53, 53, 53, 1)' }}>
                            <div className='flex justify-between pb-5'>
                                <h6 className={`text-white ${nunito.className}`}>{res.category}</h6>
                                <div className='flex items-center gap-[5px] cursor-pointer' onClick={() => goTo(res)}>
                                    <p className={`text-[12px] font-normal text-white ${nunito.className}`}>View All</p>
                                    <Image className='h-[11px] w-[5px] object-contain' src={'/arrow-white.svg'} height={5} width={5} alt='View All' />
                                </div>
                            </div>

                            {res.data && res.data.length != 0 && res.category == 'Retail with Rasul Bailay' && <Video data={res.data.slice(0, 1)} isBg={true} big={true} isHome={'/video/'} imgClass={'h-[330px] w-full md:h-[200px]'} />}
                            {res.data && res.data.length != 0 && res.category == 'Retail with Rasul Bailay' && <div className={`flex gap-5 items-center`}><Video isBg={true} abs={'!bottom-[60px]'} data={res.data.slice(1, 3)} isHome={'/video/'} imgClass={'h-[177px] md:h-[120px] w-full'} /></div>}
                            {res.data && res.data.length != 0 && res.category == 'The Store' && <><VideoSlide  slider_child_id={'slide_1' + i} slider_id={'slide_parent_1' + i} data={res.data} title_class={'text-white'} isHome={'/video/'} cardClass={'flex-[0_0_calc(45%_-_15px)] md:flex-[0_0_calc(60%_-_15px)]'} imgClass={'h-[200px] w-full'} /></>}
                            {res.data && res.data.length != 0 && res.category == 'IR Studio' && <><VideoSlide slider_child_id={'slide_2' + i} slider_id={'slide_parent_2' + i} data={res.data} title_class={'text-white'} isHome={'/video/'} cardClass={'flex-[0_0_calc(45%_-_15px)] md:flex-[0_0_calc(60%_-_15px)]'} imgClass={'h-[200px] w-full'} /></>}

                        </div>
                    )
                })}
            </div>
        </>
    )
}