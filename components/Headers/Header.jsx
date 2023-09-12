import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import styles from '@/styles/Header.module.scss'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common'
import Dropdowns from '../common/Dropdowns';
import { search_product, checkMobile } from '@/libs/api';

export default function Header({ checkout }) {
    const router = useRouter();
    const head = {
        btn1: 'Subscribe',
        btn2: 'Sign in',
    }

    const profile = [{ name: 'Logout', icon: '/Navbar/Logout.svg' }, { name: 'Profile', icon: '/login/profile-01.svg', route: '/profile?my_account=edit-profile', mob_route: '/profile?my_account=' }]
    const [valid, setValid] = useState(false);
    const [member, setMember] = useState(false);
    const [sort, setSort] = useState(false);
    const ref = useRef(null);

    // Search
    const [enableSearch, setEnableSearch] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [searchValue, setSearchValue] = useState(undefined)
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


    // const profileMenu = () => {
    //     setSort(!sort);
    //     let element = document.getElementById('dropdown1');
    //     sort ? element.classList.add('dropdown-menu-active') : element.classList.remove('dropdown-menu-active');
    // }

    const roleMember = () => {
        console.log(localStorage['roles']);
        if (localStorage['roles'] && localStorage['roles'] != 'undefined') {
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

    const myAccounts = () => {
        router.push(isMobile ? '/profile?my_account=' : '/profile?my_account=edit-profile')
        // if (data.name == 'Logout') {
        //     localStorage.clear();
        //     router.push('/login')
        // } else if (data.name == 'Profile') {
        //     router.push(isMobile ? data.mob_route : data.route)
        // }
    }




    async function searchText(eve) {
        let value = eve.target.value;

        if (value) {
            let params = {
                search_txt: value
            }
            const resp = await search_product(params);
            // console.log(resp);
            if (resp && resp.status == 'success') {
                setSearchResult(resp.data)
                setSearchValue(value)
            }
        } else {
            setSearchResult([]);
            setSearchValue(undefined)
        }

    }

    function searchFn() {
        const inputElement = document.getElementById('myInput');

        if (inputElement) {
            inputElement.blur();
            setEnableSearch(true);


            let element = document.getElementById('search');
            if (element) {
                element.focus();
            }

        }
    }

    const clearSearch = (data) => {
        setSearchValue(undefined)
        let element = document.getElementById(data).value = '';
    }

    const navigateSearchScreen = (data) => {
        let element = document.getElementById(data).value;
        if (element && element != '') {
            setSearchResult([]);
            setEnableSearch(false);
            router.push('/search?searchText=' + element);
        }

    }

    const navigateDetail = (data) => {
        // router.push('/login')
        let route = ''
        if (data.type == 'Articles') {
            route = data.ir_prime == '1' ? '/IRPrime/' + data.route : '/categories/' + data.route
        } else if (data.type == 'Product') {
            route = '/bookstore/' + data.route
        } else if (data.type == 'News') {
            route = '/news/' + data.route
        } else if (data.type == 'Podcast') {
            route = '/podcast/' + data.route
        } else if (data.type == 'Video') {
            route = '/ir/' + data.route
        } else if (data.type == 'Newsletter') {
            route = '/newsletters/' + data.route
        }

        if (route) {
            router.push(route);
            setEnableSearch(false);
            setSearchResult([]);
        }
    }

    return (
        <>
            {head &&
                <div className={``}>
                    <div className='container relative p-[0px] md:hidden grid grid-cols-3 items-center justify-between'>
                        {/* <div> */}

                        <div onClick={searchFn} className={`flex items-center `}>
                            <Image style={{ objectFit: 'contain' }} height={60} priority width={24} alt='search' src={'/search.svg'} className="pr-2"></Image>
                            <input id="myInput" className={styles.input1} type="text" placeholder='Search here...' name="search"></input>
                        </div>

                        {enableSearch &&

                            < >
                                {/* onMouseLeave={setEnableSearch(false)} onKeyPress={()=>{navigateSearchScreen('search')}}*/}
                                <div className='absolute top-[15px] z-[99] w-full bg-white h-[150px] opacity-70'></div>
                                <div className='w-full absolute z-[99] top-[25px]'>
                                    <div className='w-[60%] m-[0_auto] relative bg-white '>
                                        <div onClick={() => { setEnableSearch(false) }} className='cursor-pointer absolute right-[-60px] px-[10px] h-[45px]'><Image height={20} priority width={20} alt='search' src={'/cart/close.svg'} className="h-[30px]"></Image></div>
                                        <div className={`flex border rounded-[10px]`}>
                                            <input id='search' className={'border-[0px] p-[10px] w-full rounded-[10px]'} onChange={searchText} type="text" placeholder='Search here...' name="search"></input>
                                            {searchValue && <div onClick={() => { setSearchResult([]), clearSearch('search') }} className='cursor-pointer flex items-center justify-center px-[10px] h-[45px]'><Image height={20} priority width={20} alt='search' src={'/cart/close.svg'} className="h-[24]"></Image></div>}
                                            <div onClick={() => { navigateSearchScreen('search') }} className='border-l-[1px] p-[10px] cursor-pointer border-l-slate-100 flex items-center justify-center'><Image style={{ objectFit: 'contain' }} height={60} priority width={24} alt='search' src={'/search.svg'} className=""></Image></div>
                                        </div>
                                        <div className={`${searchResult && searchResult.length == 0 ? 'min-h-[275px] flex items-center justify-center' : null} bg-white border overflow-auto scrollbar-hide max-h-[275px] mt-[2px] rounded-[10px]`}>
                                            {searchResult && searchResult.length == 0 ? <EmptySection searchValue={searchValue} /> :
                                                searchResult.map((res, index) => {
                                                    return (
                                                        <div onClick={() => { navigateDetail(res) }} className='flex items-center justify-between cursor-pointer border-b-[1px] border-b-slate-100 last-child:border-b-[0px]  p-[10px]'>
                                                            <div className='flex items-center gap-[8px]'>
                                                                <div className='flex items-center justify-center h-[55px]'><Image className='h-[50px]' src={check_Image(res.product_image)} height={50} width={50} alt={res.title} /></div>
                                                                <h6 className='text-[15px] line-clamp-1 font-semibold'>{res.title}</h6>
                                                            </div>
                                                            <div className='flex items-center justify-center'><Image height={8} priority width={8} alt='search' src={'/forwardIcon.svg'} className="opacity-50"></Image></div>

                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    </div>
                                </div>
                            </>
                        }


                        <div className=''>
                            <Image style={{ objectFit: 'cover' }} className='m-auto cursor-pointer' height={66} priority width={200} alt='' onClick={() => router.push('/')} src={'/indiaretail.png'}></Image>
                        </div>
                        {!valid ? <div className={`flex items-center justify-end gap-3 ${!valid ? '' : 'hidden'}`}>
                            <button type='button' onClick={() => router.push('/membership')} className={`${styles.btn_sub}`}>{head.btn1}</button>
                            <button type='button' onClick={() => router.push('/login')} className={`${styles.btn_sig}`}>{head.btn2}</button>
                        </div> :
                            <div className='flex justify-end'>
                                <div onClick={myAccounts} className='flex cursor-pointer items-center gap-[10px]'>
                                    <Image src={'/Navbar/profile.svg'} className={`cursor-pointer  h-[30px] w-[30px] `} height={30} width={30} alt='profile' />
                                    <div>
                                        {localStorage['full_name'] && <p className='cursor-pointer text-[14px] font-[500] capitalize'>{localStorage['full_name']}</p>}
                                    </div>
                                    {/* <div>
                                        <Image className='cursor-pointer h-[8px] w-[13px]' src={'/Navbar/down.svg'} height={20} width={20} alt='down' />
                                    </div> */}
                                </div>

                            </div>

                        }
                    </div>
                </div>
            }

        </>
    )
}


const EmptySection = (searchValue) => {
    return (
        <>
            <div className='flex flex-col items-center justify-center'>
                <div className='h-[140px]'>
                    <Image className='h-full w-full' height={66} priority width={200} alt='' src={searchValue ? '/empty_states/no-news.svg' : '/empty_states/no-comment.svg'}></Image>
                </div>
                <h6 className='text-[15px] font-semibold py-[10px]'>{searchValue ? 'No article found' : 'Enter the text to search a latest news'}</h6>
            </div>
        </>
    )
}      