import React, { useState, useRef, useEffect } from 'react'
import styles from '@/styles/category.module.scss'
import Image from 'next/image'
import { check_Image } from '@/libs/api'

import { WhatsappShareButton, LinkedinShareButton, TwitterShareButton, FacebookShareButton } from 'react-share'
import { useRouter } from 'next/router'
import Dropdowns from './Dropdowns'

export default function Content({ res, i }) {
    const router = useRouter()
    const icons = [{ icon: "/bookstore/linkedin.svg", name: 'Linkedin' }, { icon: "/bookstore/FB.svg", name: 'Facebook' }, { icon: "/bookstore/twitter.svg", name: 'Twitter' }, { icon: "/bookstore/whatsapp.svg", name: 'Whatsapp' }]
    const setings = [{ name: 'more stories' }, { name: 'copy link' }, { name: 'comment' }]

    const [sort, setSort] = useState(false);
    const ref = useRef(null);
    const setting = useRef(null);

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         let el = document.getElementById(`dropdown${i}`).classList;
    //         let classs = Array.from(el);
    //         let out = classs.find(res => res == 'dropdown-menu-active');
    //         if (ref.current && !ref.current.contains(event.target) && out) {
    //             el.remove('dropdown-menu-active');
    //         }

    //         let el2 = document.getElementById(`down${i}`).classList;
    //         let class2 = Array.from(el2);
    //         let out2 = class2.find(res => res == 'dropdown-menu-active');
    //         if (setting.current && !setting.current.contains(event.target) && out2) {
    //             el2.remove('dropdown-menu-active');
    //         }
    //     };
    //     document.addEventListener('click', handleClickOutside, true);
    //     return () => {
    //         document.removeEventListener('click', handleClickOutside, true);
    //     };
    // }, [])


    const share = (type) => {
        setSort(!sort);
        let element = type == 'share' ? document.getElementById(`dropdown${i}`) : document.getElementById(`down${i}`);
        sort ? element.classList.add('dropdown-menu-active') : element.classList.remove('dropdown-menu-active');
    }




    return (
        <>
            <div className='flex gap-4 items-center'>
                {res.primary_text && <p className={`${res.primary_text ? 'primary_text' : ''}`}>{res.primary_text ? res.primary_text : ''}</p>}
                <p className='flex items-center gap-2'><Image height={11} width={11} alt={"image"} src={'/views.svg'} /><span className='text-[12px] md:text-[11px] gray-text'>{res.views} Views</span></p>
                <p className='flex  items-center gap-2'><Image height={11} width={13} alt={"image"} className='md:h-[13px] md:w-[11px]' src={'/shares.svg'} /><span className='text-[12px] md:text-[12px] gray-text'>3 Shares</span></p>
                <p className='flex items-center gap-2'><Image height={12} width={12} alt={"image"} src={'/time.svg'} /><span className='text-[12px] md:text-[11px] gray-text'>{res.read_time} Minutes </span></p>
            </div>
            <h1 className='mega_title lg:text-4xl md:text-[18px] md:leading-[29.23px] my-4'>{res.title}</h1>
            <div className={`flex items-center justify-between ${styles.profile_div}`}>
                <div className='flex gap-3 items-center'>
                    <Image className='rounded-full object-contain' priority={true} src={(res.avatar && res.avatar != null) ? check_Image(res.avatar) : '/profit.svg'} height={43.12} width={43.12} alt={"image"} />
                    <p className='flex flex-col'>
                        <h6 className="font-semibold">{res.publisher}</h6><span className='text-gray lg:text-[13px] md:text-[12px] gray-text'>2 days ago</span>
                    </p>
                </div>

                <div className='flex items-center gap-[15px]'>
                    {/* <div className='dropdowns w-[25px] relative cursor-pointer' style={{ height: '20px' }}>
                        <Image onClick={() => share('share')} ref={ref} className={`dropdowns transition-all delay-500 md:h-[17px] md:w-[15px]`} src={'/share.svg'} height={10} width={15} alt={'share'} />
                        <div className={`dropdown-menu p-[10px]  right-0 grid justify-center`} style={{ borderRadius: '10px', width: '150px', position: 'absolute' }} id={`dropdown${i}`}>
                            {icons && icons.map((res, index) => {
                                return (
                                    <div key={index} className='hover:bg-[#FDF5F5] p-[0_10px] rounded'>
                                        {res.name == 'Linkedin' && <LinkedinShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                                            <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] w-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                                            <p>{res.name}</p>
                                        </LinkedinShareButton>}
                                        {res.name == 'Facebook' && <FacebookShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                                            <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] w-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                                            <p>{res.name}</p>
                                        </FacebookShareButton>}
                                        {res.name == 'Twitter' && <TwitterShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                                            <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] w-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                                            <p>{res.name}</p>
                                        </TwitterShareButton>}
                                        {res.name == 'Whatsapp' && <WhatsappShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                                            <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] w-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                                            <p>{res.name}</p>
                                        </WhatsappShareButton>}
                                    </div>
                                )
                            })}
                        </div>
                    </div> */}
                    {/* <Image className='object-contain' src={'/share.svg'} height={14} width={15} alt={"image"} /> */}
                    {/* <Image className='object-contain h-[25px] w-[20px]' src={'/setting.svg'} height={14} width={15} alt={'setting'} /> */}
                    {/* <div className='dropdowns w-[25px] relative cursor-pointer' style={{ height: '20px' }}>
                        <Image onClick={() => share('settings')} ref={setting} className='object-contain md:h-[20px] md:w-[19px] h-[20px] w-[20px]' src={'/setting.svg'} height={14} width={15} alt={'setting'} />
                        <div className={`dropdown-menu p-[10px_0_10px_0] right-0 grid justify-center`} style={{ borderRadius: '10px', width: '190px', position: 'absolute' }} id={`down${i}`}>
                            {setings && setings.map((res, index) => {
                                return (
                                    <div onClick={() => settings(res)} key={index} className='flex p-[5px_10px_0_10px] hover:bg-[#EEEE] hover:rounded-[10px] items-center gap-[15px]'>
                                        <div className='h-[10px] w-[10px] rounded-full bg-[#ddd]'></div>
                                        <p className='capitalize'>{res.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div> */}
                    {icons && <Dropdowns share={true} width={'w-[170px]'} data={icons} />}

                    {setings && <Dropdowns setting={true} img={'/setting.svg'} element={`cmt${i}`} width={'w-[150px]'} data={setings} />}
                </div>
            </div>

            {/* <p className='py-3 text-[18px] md:hidden'>{res.title}</p> */}
            <Image src={check_Image(res.image ? res.image : res.thumbnail_image)} height={600} priority={true} width={1000} alt={res.title} className="py-3 lg:h-[500px] md:object-contain w-full" />
            <p className='py-3 '>{res.blog_intro}</p>
        </>
    )
}
