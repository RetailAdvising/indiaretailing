import React, { useState } from 'react'
import styles from '@/styles/category.module.scss'
import Image from 'next/image'
import { check_Image } from '@/libs/common'

import { WhatsappShareButton, LinkedinShareButton, TwitterShareButton, FacebookShareButton } from 'react-share'
import { useRouter } from 'next/router'

export default function Content({ res,i }) {
    const router = useRouter()
    const icons = [{ icon: "/bookstore/linkedin.svg", name: 'Linkedin' }, { icon: "/bookstore/FB.svg", name: 'Facebook' }, { icon: "/bookstore/twitter.svg", name: 'Twitter' }, { icon: "/bookstore/whatsapp.svg", name: 'Whatsapp' }]
    const setings = [{name: 'more stories',route: +'/'+router.asPath.split('/')[1]+'/'+router.query.types},{name: 'copy link'},{name:'comment'}]
    
    const [sort, setSort] = useState(false);
    const share = (type) => {
        setSort(!sort);
        let element = type == 'share' ? document.getElementById(`dropdown${i}`) : document.getElementById(`down${i}`);
        sort ? element.classList.add('dropdown-menu-active') : element.classList.remove('dropdown-menu-active');
    }


    return (
        <>
            <div className='flex gap-4'>
                {res.primary_text && <p className={`${res.primary_text ? 'primary_text' : ''}`}>{res.primary_text ? res.primary_text : ''}</p>}
                <p className='flex items-center gap-2'><Image height={13} width={11} alt={"image"} src={'/views.svg'} /><span className='fnt_14 gray-text'>500 Views</span></p>
                <p className='flex items-center gap-2'><Image height={15} width={15} alt={"image"} src={'/shares.svg'} /><span className='fnt_14 gray-text'>3 Shares</span></p>
                <p className='flex items-center gap-2'><Image height={15} width={15} alt={"image"} src={'/time.svg'} /><span className='fnt_14 gray-text'>2 Minutes </span></p>
            </div>
            <h1 className='mega_title text-5xl my-5'>{res.title}</h1>
            <div className={`flex items-center justify-between ${styles.profile_div}`}>
                <div className='flex gap-3 items-center'>
                    <Image className='rounded-full object-contain' priority={true} src={res.avatar ? check_Image(res.avatar) : '/profit.svg'} height={43.12} width={43.12} alt={"image"} />
                    <p className='flex flex-col'>
                        <span className="font-semibold">{res.publisher}</span><span className='text-gray fnt_13 gray-text'>2 days ago</span>
                    </p>
                </div>

                <div className='flex items-center gap-2'>
                    <div className='dropdown w-[25px] relative cursor-pointer' style={{ height: '10px' }}>
                        <Image onClick={()=> share('share')} className={`dropdown transition-all delay-500`} src={'/share.svg'} height={10} width={15} alt={'share'} />
                        <div className={`dropdown-menu p-[20px]  right-0 grid justify-center`} style={{ borderRadius: '10px', width: '190px', position: 'absolute' }} id={`dropdown${i}`}>
                            {icons && icons.map((res, index) => {
                                return (
                                    <div key={index}>
                                        {res.name == 'Linkedin' && <LinkedinShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                                            <Image src={res.icon} className='h-[23px] w-[21px]' height={40} width={40} alt={'imgs'} />
                                            <p>{res.name}</p>
                                        </LinkedinShareButton>}
                                        {res.name == 'Facebook' && <FacebookShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                                            <Image src={res.icon} className='h-[25px] w-[15px]' height={40} width={40} alt={'imgs'} />
                                            <p>{res.name}</p>
                                        </FacebookShareButton>}
                                        {res.name == 'Twitter' && <TwitterShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                                            <Image src={res.icon} className='h-[20px] w-[18px]' height={40} width={40} alt={'imgs'} />
                                            <p>{res.name}</p>
                                        </TwitterShareButton>}
                                        {res.name == 'Whatsapp' && <WhatsappShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                                            <Image src={res.icon} className='h-[23px] w-[21px]' height={40} width={40} alt={'imgs'} />
                                            <p>{res.name}</p>
                                        </WhatsappShareButton>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* <Image className='object-contain' src={'/share.svg'} height={14} width={15} alt={"image"} /> */}
                    {/* <Image className='object-contain h-[25px] w-[20px]' src={'/setting.svg'} height={14} width={15} alt={'setting'} /> */}
                    <div  className='dropdown w-[25px] relative cursor-pointer' style={{ height: '20px' }}>
                        <Image onClick={()=> share('settings')} className='object-contain h-[25px] w-[20px]' src={'/setting.svg'} height={14} width={15} alt={'setting'} />
                        <div className={`dropdown-menu p-[10px_0_10px_0] right-0 grid justify-center`} style={{ borderRadius: '10px', width: '190px', position: 'absolute' }} id={`down${i}`}>
                            {setings && setings.map((res,index)=>{
                                return(
                                    <div key={index} className='flex p-[5px_10px_0_10px] hover:bg-[#EEEE] hover:rounded-[10px] items-center gap-[15px]'>
                                        <div className='h-[10px] w-[10px] rounded-full bg-[#ddd]'></div>
                                        <p className='capitalize'>{res.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <p className='py-3 text-[18px]'>{res.title}</p>
            <Image src={check_Image(res.thumbnail_image)} height={600} priority={true} width={1000} alt={res.title} className="py-3 h-[500px] w-full" />
            <p className='py-3 '>{res.blog_intro}</p>
        </>
    )
}
