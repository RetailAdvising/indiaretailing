import React, { useEffect, useState } from 'react'
import nav from '@/libs/header'
import header from '@/styles/Header.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import setRoutes from 'redux/actions/routesAction'
import SideBar from './SideBar'
export default function Navbar() {
    const router = useRouter();
    const route = useSelector(state => state.routes)
    const dispatch = useDispatch();
    const [navbar, setNavbar] = useState(false);
    useEffect(() => {
        dispatch(setRoutes(router.route));
    }, [router.query, route])
    return (
        <>
        {/* sticky_header */}
            {nav.header && nav.header.items.length != 0 && <div className={`${(router.asPath == '' || router.asPath == '/') ? 'p-[15px_30px_0]' : 'p-[15px_30px]'} ${header.navHead}`}>
                <div className='container flex flex-wrap items-center justify-between'>
                    {<div className={` lg:hidden sidebar ${navbar ? 'sideActive' : ''} bg-gray`} ><SideBar data={nav} /></div>}
                    {nav.header.items.map(res => {
                        return (
                            <div key={res.section_name} className={`${(res.section_name == 'Header Logo' || res.section_name == 'Header Profile Info') ? 'flex-[0_0_calc(20%_-_10px)]' : (res.section_name == 'Header Category Info' && (router.asPath == '' || router.asPath == '/')) ? 'flex-[0_0_calc(100%_-_10px)] container pt-[10px]' : 'flex-[0_0_calc(60%_-_10px)]'}`}>
                                {res.section_name == 'Header Logo' && <div onClick={() => setNavbar(!navbar)}>
                                    <Image priority height={20} width={20} alt={res.section_name} src={'/menu.svg'} />
                                </div>}


                                {(res.section_name == 'Header Menu' && res.menus) && <ul className={`flex items-center justify-center  md:pb-0 md:hidden md:mt-0 ${navbar ? 'md:hidden' : 'md:hidden'
                                    } lg:gap-[20px] xl:gap-[30px]`}>
                                    {res.menus.map(item => {
                                        return (
                                            // ${nav1 == item.redirect_url ? header.activeMenu : ''}
                                            <Link href={item.redirect_url} className={`${header.listKey} font-semibold navigation_c ${"/" + router.asPath.split('/')[1] == item.redirect_url ? header.activeMenu : ''}`} key={item.menu_label}>
                                                {item.menu_label}
                                            </Link>
                                        )
                                    })}
                                </ul>}
                                {res.section_name == 'Header Profile Info' && <div className='text-end'>
                                    <p>{res.section_name}</p>
                                </div>}

                                {(res.section_name == 'Header Category Info' && (router.asPath == '' || router.asPath == '/')) && <div className='flex justify-between items-center '>
                                    {res.menus.map((item, index) => {
                                        return (
                                            <div key={index} className='cursor-pointer p-[10px_14px] flex gap-[5px] items-center' onClick={()=> router.push(item.redirect_url)}>
                                                <div className='h-[3px] w-[3px] rounded-full bg-red'></div>
                                                <p className=''>{item.menu_name}</p>
                                            </div>
                                        )
                                    })}
                                </div>}
                            </div>
                        )
                    })
                    }
                </div>
            </div>}


        </>
    )
}
