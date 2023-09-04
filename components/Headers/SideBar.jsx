import React, { useEffect, useState,useRef } from 'react'
import header from '@/styles/Header.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function SideBar({ data, close, navbar }) {
    const router = useRouter();
    const [valid, setValid] = useState(false)
    const [member, setMember] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage['apikey'] ? setValid(!valid) : null;
            roleMember()
            // let val = roleMember();
        }

        const handleClickOutside = (event) => {
            // let el = document.getElementById('side')?.classList;
            // let classs = (el && el != null) && Array.from(el);
            // let out = classs && classs.find(res => res == 'sideActive');
            if (ref.current && !ref.current.contains(event.target) && !navbar) {
                // el.remove('sideActive')
                close()
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [])



    const route = async (type) => {
        if (type == 'login') {
            router.push('/login');
            close()
        } else if (type == 'subscribe') {
            router.push('/membership');
            close()
        }
    }

    const logout = () => {
        localStorage.clear();
        router.push('/login')
    }

    const roleMember = () => {
        if(localStorage['roles']){
            const data = JSON.parse(localStorage['roles']);
            if (data && data.length != 0) {
                data.map(res => {
                    if (res.role == 'Member') {
                        setMember(!member)
                    }
                })
            }
        }
    }


    return (
        <>
            {(data.header && data.header.items.length != 0 && navbar) && <div id='side' ref={ref} className={`p-[20px] bg-[#fff] w-[80%] h-screen relative`}>
                {/* <div className=''> */}
                {valid ? <div className='flex items-center gap-[15px] border_bottom pb-[15px]'>
                    <Image className='h-[40px] w-[40px]' src={'/profit.svg'} height={20} width={20} alt={'profile'} />
                    <div>
                        {localStorage && <p className='text-[14px] font-semibold'>{localStorage['userid']}</p>}
                    </div>
                    <div className={`w-full flex justify-end`}>
                        <Image height={30} width={30} alt='hide' onClick={close} src={'/hide.svg'} />
                    </div>

                </div> : <div className='flex gap-[15px] items-center border_bottom pb-[15px]'>
                    <Image className='h-[50px] w-[50px]' src={'/profit.svg'} height={20} width={20} alt={'profile'} />
                    <div className='w-full'>
                        <p className='text-[16px] font-semibold'>Welcome! to indiaretail.com </p>
                        <div className='w-[90%]'>
                            <button style={{ height: '30px', width: '150px', textTransform: 'uppercase', fontSize: '13px', padding: '5px 15px' }} className='uppercase primary_button' onClick={() => router.push('/login')}>Sign in / register</button>
                        </div>
                    </div>

                    <div className={`w-full flex justify-end`}>
                        <Image height={30} width={30} alt='hide' onClick={close} src={'/hide.svg'} />
                    </div>

                </div>}

                {/* </div> */}
                <div className='pt-[15px]'>
                    {data.header.items.map(res => {
                        return (
                            <div key={res.section_name}>
                                {res.section_name == 'Header Menu' && res.menus && <ul className={`flex flex-col items-start gap-20px px-4`}>
                                    {res.menus.map(item => {
                                        return (
                                            // ${nav1 == item.redirect_url ? header.activeMenu : ''}
                                            <div key={item.menu_label} className='flex gap-[10px]'>
                                                <Image src={item.icon} className='h-[20px] w-[20px]' height={40} width={40} alt={item.menu_label} />
                                                <Link href={item.redirect_url} onClick={close} className={`${header.listKey} pb-[20px]  navigation_c `} >
                                                    {item.menu_label}
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </ul>}
                            </div>
                        )
                    })
                    }
                </div>

                {valid && <div className='absolute bottom-[10px] w-[90%]'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-[10px] w-[50%] cursor-pointer' onClick={() => logout()}>
                            <Image className='h-[22px] w-[20px]' src={'/Navbar/Logout.svg'} height={20} width={20} alt={'logout'}></Image>
                            <button className=' text-[14px] cursor-pointer '>Logout</button>
                        </div>
                        {!member && <div className='flex w-[50%] cursor-pointer justify-end'>
                            <div className='flex bg-[#e21b22] rounded-[5px] p-[8px_15px] gap-[5px] items-center justify-end '>
                                <Image className='h-[18px] w-[18px]' src={'/Navbar/premium.svg'} height={20} width={20} alt='premium' />
                                <p onClick={() => route('subscribe')} className='text-[#fff] text-[14px] cursor-pointer '>Subscribe</p>
                            </div>
                        </div>}
                    </div>

                </div>}
                {/* //  :
                //     <div className='absolute w-[90%] bottom-[10px]'>
                //         <div className='flex bg-[#e21b22] justify-center w-[35%] rounded-[5px] p-[8px_15px] gap-[5px] items-center '>
                //             <Image className='h-[18px] w-[18px]' src={'/Navbar/premium.svg'} height={20} width={20} alt='premium' />
                //             <p onClick={() => route('subscribe')} className='text-[#fff] text-[14px] cursor-pointer '>Subscribe</p>
                //         </div>                </div>} */}
            </div>}
        </>
    )
}
