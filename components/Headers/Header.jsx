import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import styles from '@/styles/Header.module.scss'
import { useRouter } from 'next/router'
// import Dropdowns from '@/components/common/Dropdowns'
export default function Header({checkout}) {
    const router = useRouter();
    const head = {
        btn1: 'Subscribe',
        btn2: 'Sign in',
    }

    const profile = [{ name: 'Logout', icon: '/Navbar/logout.svg' }, { name: 'Subscribe', icon: '/Navbar/crown.svg', route: '/membership' }]
    const [valid, setValid] = useState(false);
    const [member, setMember] = useState(false);
    const [sort, setSort] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage['apikey'] ? setValid(!valid) : null;
            roleMember();
        }

        const handleClickOutside = (event) => {
            let el = document.getElementById('dropdown1')?.classList;
            let classs = (el && el != null) && Array.from(el);
            let out = classs && classs.find(res => res == 'dropdown-menu-active');
            if (ref.current && !ref.current.contains(event.target) && out) {
                el.remove('dropdown-menu-active')
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [])


    const profileMenu = () => {
        setSort(!sort);
        let element = document.getElementById('dropdown1');
        sort ? element.classList.add('dropdown-menu-active') : element.classList.remove('dropdown-menu-active');
    }

    const roleMember = () => {
        if (localStorage['roles']) {
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

    const myAccounts = async (data) => {
        if (data.name == 'Logout') {
            localStorage.clear();
            router.push('/login')
        } else if (data.name == 'Subscribe') {
            router.push('/membership')
        }
    }
    return (
        <>
            {head && <div className={``}>
                <div className='container p-[0px] md:hidden grid grid-cols-3 items-center justify-between'>
                    {/* <div> */}
                      <div className={`flex items-center `}>
                        <Image style={{ objectFit: 'contain' }}  height={60} priority width={24} alt='search' src={'/search.svg'} className="pr-2"></Image>
                        <input className={styles.input1} type="text" placeholder='Search here...' name="search"></input>
                      </div>
                    {/* </div> */}
                    <div className=''>
                        <Image style={{ objectFit: 'cover' }} className='m-auto' height={66} priority width={200} alt='' onClick={()=> router.push('/')} src={'/indiaretail.png'}></Image>
                    </div>
                    {!valid ? <div className={`flex items-center justify-end gap-3 ${!valid ? '' : 'hidden'}`}>
                        <button type='button' onClick={() => router.push('/membership')} className={`${styles.btn_sub}`}>{head.btn1}</button>
                        <button type='button' onClick={() => router.push('/login')} className={`${styles.btn_sig}`}>{head.btn2}</button>
                    </div> :
                        <div className='flex justify-end'>
                            <div className='dropdowns h-[20px]'>
                                <div onClick={profileMenu} className='flex cursor-pointer items-center gap-[10px]'>
                                    <Image src={'/Navbar/profile.svg'} className={`cursor-pointer  ${member ? 'h-[40px] w-[40px]' : 'h-[25px] w-[25px]'}`} height={30} width={30} alt='profile' />
                                    <div>
                                        {localStorage['full_name'] && <p className='cursor-pointer capitalize font-semibold'>{localStorage['full_name']}</p>}
                                        {member && <div className='flex text-[13px] items-center gap-[10px]'><p>Premium</p>  <Image src={'/Navbar/premium.svg'} className='h-[15px] w-[15px]' height={20} width={20} alt='premium' /></div>}
                                    </div>
                                    <div>
                                        <Image className='cursor-pointer h-[8px] w-[13px]' src={'/Navbar/down.svg'} height={20} width={20} alt='down' />
                                    </div>
                                </div>
                                <div className={`dropdown-menu`} ref={ref} style={{ width: 'auto' }} id='dropdown1'>
                                    {profile && profile.map((res, index) => {
                                        return (
                                            <div key={index} >
                                                <div onClick={() => myAccounts(res)} className='flex cursor-pointer gap-[10px] p-[10px] items-center'>{res.icon && <Image src={res.icon} height={20} alt={res.name} width={20} />}<p className='capitalize text-[13px]'>{res.name}</p></div>
                                            </div>
                                        )
                                    })}
                                </div>

                            </div>

                        </div>

                    }
                </div>
            </div>
            }

            {/* <Dropdowns /> */}
        </>
    )
}
