import React, { useEffect, useState } from 'react'
import header from '@/styles/Header.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Image from 'next/image';
export default function SideBar({ data, close }) {
    const router = useRouter();
    const [valid, setValid] = useState(false)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage['apikey'] ? setValid(!valid) : null;
        }
    }, [])
    return (
        <>
            {data.header && data.header.items.length != 0 && <div className={`p-[20px] relative`}>
                {/* <div className=''> */}
                {valid ? <div className='flex items-center gap-[15px] border_bottom pb-[15px]'>
                    <Image className='h-[40px] w-[40px]' src={'/profit.svg'} height={20} width={20} alt={'profile'} />
                    <div>
                        {localStorage && <p className='text-[16px] font-semibold'>{localStorage['userid']}</p>}
                    </div>


                </div> : <div className='flex gap-[15px] items-center border_bottom pb-[15px]'>
                    <Image className='h-[50px] w-[50px]' src={'/profit.svg'} height={20} width={20} alt={'profile'} />
                    <div className='w-full'>
                        <p className='text-[16px] font-semibold'>Welcome! to indiaretail.com </p>
                        <div className='w-[90%]'>
                            <button style={{ height: '30px', width: '65%', textTransform: 'uppercase', fontSize: '13px', padding: '5px 15px' }} className='uppercase primary_button' onClick={() => router.push('/login')}>Sign in / register</button>
                        </div>
                    </div>

                </div>}
                <div className={`absolute top-[30px] right-[30px]`}>
                    <Image height={30} width={30} alt='hide' onClick={close} src={'/hide.svg'} />
                </div>
                {/* </div> */}
                <div className='pt-[15px]'>
                    {data.header.items.map(res => {
                        return (
                            <div key={res.section_name}>
                                {res.section_name == 'Header Menu' && res.menus && <ul className={`flex flex-col items-start gap-20px px-4`}>
                                    {res.menus.map(item => {
                                        return (
                                            // ${nav1 == item.redirect_url ? header.activeMenu : ''}
                                            <Link href={item.redirect_url} onClick={close} className={`${header.listKey} pb-[20px] font-semibold navigation_c ${router.route == item.redirect_url ? header.activeMenu : ''}`} key={item.menu_label}>
                                                {item.menu_label}
                                            </Link>
                                        )
                                    })}
                                </ul>}
                            </div>
                        )
                    })
                    }
                </div>
            </div>}
        </>
    )
}
