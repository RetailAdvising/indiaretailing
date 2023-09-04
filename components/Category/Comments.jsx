import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { like } from '@/libs/api';
export default function Comments({ data, isLast, load, cmt }) {
    const [input, setInput] = useState({ index: -1, show: false })
    function showInputs(index) {
        setInput({ index: index, show: true });
        console.log(input)
    }

    const cardref = useRef(null)
    useEffect(() => {
        if (!cardref?.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (isLast && entry.isIntersecting) {
                load()
                observer.unobserve(entry.target);
            }
        });

        observer.observe(cardref.current);
    }, [isLast])

    const likeCmt = async (data) => {
        console.log(data)
        let param = {
            name: data.name,
            like: 'yes'
        }

        const resp = await like(param);
        console.log(resp);
    }
    return (
        <>
            <div ref={cardref} className={`transition-all ease-in delay-500 duration-500 rounded-lg ${cmt ? 'p-[10px]' : ''}`}>
                <div className={`flex gap-3 p10 ${!isLast ? 'border_bottom' : ''}`}>
                    <div>
                        <Image className='rounded-full object-contain' src={'/profit.svg'} height={48} width={48} alt={data.name} />
                    </div>
                    <div className='max-w-full w-full'>
                        <p className='flex gap-3 '><span className='font14_bold'>{data.comment_by}</span> | <span>{data.duration}</span></p>
                        <div className='py-2 sub_title' dangerouslySetInnerHTML={{ __html: data.content }} />
                        <div className='flex justify-between items-center py-[5px]'>
                            <div className='flex gap-3'>
                                <p className='flex gap-2 items-center sub_title'><span>{data.likes}</span><Image className='h-[20px] w-[20px]' onClick={() => likeCmt(data)} src={'/like.svg'} height={20} width={20} alt={""} /></p>
                                <p className='flex gap-2 items-center sub_title'><span>{data.dislikes}</span><Image className='h-[20px] w-[20px]' src={'/dislike.svg'} height={20} width={20} alt={""} /></p>
                                {/* <p className='sub_title'>Share</p>
                                        <p className='sub_title' onClick={() => showInputs(index)}>Reply</p> */}
                            </div>
                            {/* <div>
                                        <Image src={'/flag.svg'} height={16} width={16} alt={"image"} />
                                    </div> */}
                        </div>
                        {/* {(input.index == index && input.show) &&
                                    <div>
                                        <input type='text' />
                                    </div>
                                } */}
                    </div>
                </div>
            </div>

        </>
    )
}
