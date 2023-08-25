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
        // console.log(router)
        // console.log(router.query)
    // console.log( "/"+router.asPath.split('/')[1])
    }, [router.query, route])
    return (
        <>
            {nav.header && nav.header.items.length != 0 && <div className={`sticky_header  p03015 ${header.navHead}`}>
                <div className='container flex items-center justify-between'>
                    {<div className={` lg:hidden sidebar ${navbar ? 'sideActive' : ''} bg-gray`} ><SideBar data={nav} /></div>}
                    {nav.header.items.map(res => {
                        return (
                            <div key={res.section_name} className={`${(res.section_name == 'Header Logo' || res.section_name == 'Header Profile Info') ? 'flex-[0_0_calc(20%_-_10px)]': 'flex-[0_0_calc(60%_-_10px)]'}`}>
                                {res.section_name == 'Header Logo' && <div onClick={() => setNavbar(!navbar)}>
                                    <Image priority height={20} width={20} alt={res.section_name} src={'/menu.svg'} />
                                </div>}


                                {(res.section_name == 'Header Menu' && res.menus) && <ul className={`flex items-center justify-center  md:pb-0 md:hidden md:mt-0 ${navbar ? 'md:hidden' : 'md:hidden'
                                    } lg:gap-[20px] xl:gap-[30px]`}>
                                    {res.menus.map(item => {
                                        return (
                                            // ${nav1 == item.redirect_url ? header.activeMenu : ''}
                                            <Link href={item.redirect_url}  className={`${header.listKey} font-semibold navigation_c ${"/"+ router.asPath.split('/')[1] == item.redirect_url ? header.activeMenu : ''}`} key={item.menu_label}>
                                                {item.menu_label}
                                            </Link>
                                        )
                                    })}
                                </ul>}
                                {res.section_name == 'Header Profile Info' && <div className='text-end'>
                                    <p>{res.section_name}</p>
                                </div>}

                                {/* {
                                    <div
                                    className={`flex-1 justify-self-center lg:block md:pb-0 md:mt-0 ${navbar ? 'md:hidden' : 'md:hidden'
                                        }`}
                                >
                                    
                                    <ul className="items-center justify-center   lg:flex ">
                                        </ul>
                                </div>
                                } */}
                            </div>
                        )
                    })
                    }
                </div>
            </div>}
        </>
    )
}
