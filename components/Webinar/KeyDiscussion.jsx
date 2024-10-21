import React from 'react'
import Title from '../common/Title'
import Image from 'next/image'
import KeyPointsCard from './KeyPointsCard'

const KeyDiscussion = ({setShowMore,webinar_data,showMore}) => {
    return (
        <>
            <div className="mt-5">
                <div className="flex justify-between">
                    <Title data={{ title: "KEY DISCUSSION POINTS" }} />

                    <div>
                        <div
                            className="flex items-center text-[20px] font-bold gap-[5px] cursor-pointer"
                            onClick={() => setShowMore(!showMore)}
                        >
                            <p className={`nunito`}>
                                {showMore ? "More" : "Less"}
                            </p>
                            <Image
                                className="h-[11px] w-[5px] object-contain"
                                src="/forwardIcon.svg"
                                height={5}
                                width={5}
                                alt="View All"
                            />
                        </div>
                    </div>

                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mt-[15px]">
                {webinar_data.key_points.slice(0, !showMore ? webinar_data.key_points.length : 4).map((res, i) => (
                    <div key={i}>
                        <KeyPointsCard data={res} len={webinar_data.key_points.length} />
                    </div>
                ))}
            </div>


        </>
    )
}

export default KeyDiscussion