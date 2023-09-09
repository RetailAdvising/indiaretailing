import React, { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Image from 'next/image';
import { WhatsappShareButton, LinkedinShareButton, TwitterShareButton, FacebookShareButton } from 'react-share'
import { useRouter } from 'next/router';
import { checkMobile } from '@/libs/api'
// import { Menu } from '@headlessui/react'
export default function Dropdowns({ data, img, width, share, setting, element, type }) {
    const router = useRouter();

    const settings = async (data) => {
        if (data.name == 'more stories') {
            router.push('/' + router.asPath.split('/')[1] + '/' + router.query.types)
        } else if (data.name == 'copy link') {
            console.log('/' + router.asPath.split('/')[1] + '/' + res.route)
            let str = '/' + router.asPath.split('/')[1] + '/' + res.route
            await navigator?.clipboard?.writeText(str)
        } else {
            let el = document.getElementById(element)
            el.scrollIntoView({ block: 'center', behavior: 'smooth', inline: 'nearest' })
        }
    }

    const [isMobile, setIsMobile] = useState()
    useEffect(() => {
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile)
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [])

    const checkIsMobile = async () => {
        let isMobile = await checkMobile();
        setIsMobile(isMobile);
    }

    const myAccounts = (data) => {
        if (data.name == 'Logout') {
            localStorage.clear();
            router.push('/login')
        } else if (data.name == 'Profile') {
            router.push(isMobile ? data.mob_route : data.route)
        }
    }


    return (
        <>
            <Popover className={`relative ${share ? 'w-[17px]' : type == 'head' ? 'w-[auto]' : 'w-[8px]'}`}>
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={`
                ${open ? '' : ''}
                 `}
                        >
                            {/* <span>{btn_name}</span> */}
                            <div className='flex gap-[10px] items-center'>
                                <Image src={share ? '/share.svg' : img} height={30} width={30} alt='img' className={`${type == 'head' ? 'h-[35px] w-[35px]' : ''}`} />
                                {(localStorage['full_name'] && type == 'head') && <p className='text-[14px] font-semibold'>{localStorage['full_name']}</p>}
                            </div>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute md:left-[-55px] z-[99] mt-3 bg-white -translate-x-1/2 transform  ">
                                <div className={`overflow-hidden ${width} shadow-lg`}>
                                    <div className=" p-4">
                                        {!share ? <>
                                            {data.map((res, index) => {
                                                return (
                                                    <div onClick={() => setting ? settings(res) : type == 'head' ? myAccounts(res) : null} className={`cursor-pointer ${res.icon ? 'flex items-center gap-[10px] pb-[10px]' : ''}`} key={index}>
                                                        {res.icon && <Image className='object-contain' src={res.icon} height={20} alt={res.name} width={20} />}
                                                        <p className={`${(index != data.length - 1 && !res.icon) ? 'pb-[15px]' : ''}`}>{res.name}</p>
                                                    </div>
                                                )
                                            })}
                                        </> : <>
                                            {data && data.map((res, index) => {
                                                return (
                                                    <div key={index} className=' p-[10px] rounded'>
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
                                        </>

                                        }
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </>
    )
} 
