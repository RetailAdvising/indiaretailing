import React, { useEffect, useState } from 'react'
import nav from '@/libs/header'
import header from '@/styles/Header.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import setRoutes from 'redux/actions/routesAction'
import { checkMobile } from '@/libs/api';
import format from 'date-fns/format'
import MobileHead from './MobileHead'
export default function Navbar({heading,isLanding}) {
    const router = useRouter();
    const route = useSelector(state => state.routes)
    const dispatch = useDispatch();
    const [navbar, setNavbar] = useState(false);
    // const [isMobile, setIsMobile] = useState(false)
    const [date, setDate] = useState(undefined)

    useEffect(() => {
        dispatch(setRoutes(router.route));
        const formattedDate = format(new Date(), "iiii, d MMMM yyyy");
        setDate(formattedDate)
        // console.log(formattedDate); 
    }, [router.query, route])

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

    return (
        <>
            {/* sticky_header */}
            {/* {<div className={` lg:hidden sidebar ${navbar ? 'sideActive' : ''} `} ><SideBar data={nav} close={() => close()} /></div>} */}
            {/* onClick={showSidebar} */}
            {(nav.header && nav.header.items.length != 0 && !isMobile) ? <div className={`sticky_header ${(router.asPath == '' || router.asPath == '/') ? 'lg:p-[15px_30px_0]' : 'lg:p-[15px_30px]'} ${navbar ? '' : 'md:p-[0_20px]'} ${header.navHead} md:h-[55px]`}>
                <div className={`${navbar ? '' : 'container'}  flex flex-wrap items-center justify-between`}>
                    {nav.header.items.map(res => {
                        return (
                            <div key={res.section_name} className={`${(res.section_name == 'Header Logo' || res.section_name == 'Header Profile Info') ? 'flex-[0_0_calc(20%_-_10px)]' : (res.section_name == 'Header Category Info') ? 'lg:flex-[0_0_calc(100%_-_10px)] container pt-[10px]' : 'flex-[0_0_calc(60%_-_10px)]'}`}>
                                {res.section_name == 'Header Logo' && <div>
                                    <Image priority height={20} width={20} alt={res.section_name} src={'/menu.svg'} />
                                </div>}

                                {(res.section_name == 'Header Menu' && res.menus) && <>
                                    <ul className={`flex items-center justify-center  md:pb-0 md:hidden md:mt-0 ${navbar ? 'md:hidden' : 'md:hidden'
                                        } lg:gap-[20px] xl:gap-[30px]`}>
                                        {res.menus.map(item => {
                                            return (
                                                // ${nav1 == item.redirect_url ? header.activeMenu : ''}
                                                <Link href={item.redirect_url} className={`${header.listKey} font-semibold navigation_c tracking-wide ${"/" + router.asPath.split('/')[1] == item.redirect_url ? header.activeMenu : ''}`} key={item.menu_label}>
                                                    {item.menu_label}
                                                </Link>
                                            )
                                        })}
                                    </ul>

                                    <div className='lg:hidden'>
                                        <Image style={{ objectFit: 'contain' }} className='h-[60px] w-full' height={76.23} priority width={284.65} alt='' src={'/indiaretail.png'}></Image>
                                    </div>

                                </>}
                                {res.section_name == 'Header Profile Info' && <div className={`text-end ${date && 'lg:flex lg:items-center lg:gap-[10px] lg:justify-end'} md:float-right ${navbar ? 'md:pr-[20px]' : ''}`}>
                                    {date && <><Image src={'/Navbar/weather.svg'} className='md:hidden' height={20} width={20} alt={'weather'} /> <p className='md:hidden text-[#66161]'>{date ? date : ''}</p></>}
                                    <Image className='lg:hidden' style={{ objectFit: 'contain' }} height={50} priority width={24} alt='search' src={'/search.svg'} ></Image>
                                </div>}

                                {res.section_name == 'Header Category Info' && <div className='flex justify-center items-center md:hidden'>
                                    {res.menus.map((item, index) => {
                                        return (
                                            <div key={index} className='cursor-pointer justify-center p-[10px_8px] flex gap-[5px] items-center' onClick={() => router.push(item.redirect_url)}>
                                                <div className='h-[3px] w-[3px] rounded-full bg-red'></div>
                                                <p className='text-[13px]'>{item.menu_name}</p>
                                            </div>
                                        )
                                    })}
                                </div>}
                            </div>
                        )
                    })
                    }
                </div> 
            </div> : <MobileHead isLanding={isLanding} Heading={heading} />}


        </>
    )
}
