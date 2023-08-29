import Cards from '@/components/common/Cards'
import RootLayout from '@/layouts/RootLayout'
import React, { useState } from 'react'
import Title from '@/components/common/Title'
import List from '@/components/common/List'
import { getList } from '@/libs/api'

export default function Lists({data}) {
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }


    const data1 = [
        {
            "title": "Top 5 iconic Apple stores across the world by designstores across the world by design",
            "image": "/irprime/image7.png",
            "primary_text": "News",
            "secondary_text": "India",
            "sub_title": "From a total of around 522 Apple stores across the worldargest fashion retailer has margest fashion retailer has m..",
            "hashtags": "#kerala sastra sahitya parishad"
        },
        {
            "title": "Rollercoaster ride of four retail industry IPOsstores across the world by design",
            "image": "/irprime/image8.png",
            "primary_text": "News",
            "secondary_text": "India",
            "sub_title": "These companies created a lot of hype when they listed on theargest fashion retailer has argest fashion retailer has mm...",
            "hashtags": "#kerala sastra sahitya parishad"
        },
        {
            "title": "Uniqlo India’s Success Mantra: Making headwaystores across the world by design...",
            "image": "/irprime/image9.png",
            "primary_text": "News",
            "secondary_text": "India",
            "sub_title": "Uniqlo, Asia’s largest fashion retailer has managed to hitargest fashion argest fashion retailer has mretailer has m..",
            "hashtags": "#kerala sastra sahitya parishad"
        }
    ]
    return (
        <>
            <RootLayout>
                <div className='p-[30px] container'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <Title data={''} />
                        </div>
                        {/* <div>
                            <label className='themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1'>
                                <input
                                    type='checkbox'
                                    className='sr-only'
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <span
                                    className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${!isChecked ? 'text-primary bg-[#f4f7ff]' : 'text-body-color'
                                        }`}
                                >
                                    List View
                                </span>
                                <span
                                    className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${isChecked ? 'text-primary bg-[#f4f7ff]' : 'text-body-color'
                                        }`}
                                >
                                    Grid View
                                </span>
                            </label>
                        </div> */}

                    </div>

                    <>
                        {(data) && <div className={`${!isChecked ? 'grid grid-cols-2' : 'grid grid-cols-4'} gap-5`}>
                            {/* {!isChecked ? <List fullWidth={true} check={true} isBB={true} contentWidth={'w-[410px] md:w-[auto]'} imgFlex={'flex-[0_0_calc(35%_-_10px)]'} imgWidth={'w-full'} imgHeight={'h-[160px]'} data={data} borderRadius={'rounded-[5px]'} />
                                : <Cards cardClass={"h-[360px]"} check={true} noPrimaryText={false} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[180px]"}  width={"w-full"} isBorder={true} data={data} />} */}
                             <Cards cardClass={"h-[360px]"} check={true} noPrimaryText={false} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[180px]"}  width={"w-full"} isBorder={true} data={data} />
                        </div>}
                    </>
                </div>
            </RootLayout>
        </>
    )
}

export async function getServerSideProps({ params }) {
    let Id = await params?.types;
    // let Id = 'beauty-wellness';
    let param = {
        doctype: "Articles",
        fields: ["blog_intro", "name", "articles_category", "title", "publisher", "secondary_text", "route", "primary_text", "thumbnail_image"],
        filters: { articles_category: Id },
        ir_prime: 1,
    }
    let value = await getList(param);
    let data = value.message;

    return {
        props: { data }
    }
}