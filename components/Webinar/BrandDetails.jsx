import Dropdowns from '../common/Dropdowns'
import ImageLoader from '../ImageLoader'
import Image from 'next/image'

const BrandDetails = ({webinar_data,updateShare,icons}) => {
    return (
        <>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
                <div className="flex gap-3 items-center">
                    <div className="border p-2 rounded-lg flex">
                        <ImageLoader
                            src={webinar_data.brand_logo}
                            style="rounded-[5px] h-[50px] w-[60px] lg:h-[65px] lg:w-[80px]"
                        />
                    </div>
                    <div>
                        <h1 className="text-[22px] lg:text-[28px] font-bold">
                            {webinar_data.brand_name}
                        </h1>
                        <p className="text-base  lg:text-lg font-normal text-[#202121]">
                            {webinar_data.title}
                        </p>
                        <div className="flex gap-1 items-center">
                            <Image src="/calendar-minus.png" width={14} height={14} />
                            <span className="text-xs lg:text-sm">{webinar_data.creation}</span>
                        </div>
                    </div>
                </div>

                {typeof window !== "undefined" &&<div className="flex justify-end lg:justify-center mt-4 lg:mt-0 md:hidden">
                    {/* <Image
                        src="/shares.svg"
                        width={20}
                        height={20}
                        className="lg:w-[24px] lg:h-[24px]"
                    /> */}
                    {icons && <Dropdowns noBg={true} updateShare={(data) => updateShare(data)} share={true} type={'articles'} width={'w-[170px]'} showLeft={true} data={icons} />}
                
                </div>}
            </div>
        </>
    )
}

export default BrandDetails