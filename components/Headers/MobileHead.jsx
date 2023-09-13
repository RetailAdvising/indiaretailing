import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import nav from '@/libs/header'
import SideBar from './SideBar';
import TopNavBar from './TopNavBar';
import { useRouter } from 'next/router';
export default function MobileHead({ isLanding=false, Heading }) {

    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        // After 2 seconds, set the isVisible state to true
        const timeout = setTimeout(() => {
          setIsVisible(true);
    }, 2000);
    show_header()
        // Clear the timeout if the component unmounts before the 2 seconds
        return () => clearTimeout(timeout);
       
    }, []);
   const show_header= () =>{
    var lastScrollTop = 0;
    var element = document.getElementById('scroll_div')
    var main = document.getElementById('main')
    var header = document.getElementById('header')
    element.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
       var st = element.scrollTop // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
       if(st < 100){
        main.className = 'mt-[95px]'
       }
       else if (st > lastScrollTop) {
        header.className = 'nav-up'

       } else if (st < lastScrollTop && st > 100) {
        header.className = 'nav-down'
       } // else was horizontal scroll
       lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }, false);
    }
    const [navbar, setNavbar] = useState(false);
    const router = useRouter()

    const showSidebar = () => {
        setNavbar(!navbar)
        if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
        }
    }

    const close = async () => {
        setNavbar(false)
        if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'auto';
        }
    }

  

    return (
        <>
            {<div  className={`fixed sidebar ${navbar ? 'sideActive' : ''} `} ><div className={`${isVisible ? 'visible' : ''}`}></div><SideBar data={nav} navbar={navbar} close={() => close()} /></div>}
            <div  id="header" className=''>
                <div className='flex border_bottom items-center justify-between p-[5px_15px]' >
                <div className='flex gap-[15px] items-center'>
                    <div >
                    <Image onClick={() => isLanding ? showSidebar() : window.history.back()} className={`${isLanding ? 'w-[20px]' : 'w-[9px]'} mouse`} src={isLanding ? '/menu.svg' : '/back.svg'} height={14} width={15} layout="fixed" alt="Edit" />
                    </div>
                {/* {Heading == '' ? <Image style={{ objectFit: 'contain' }} onClick={() => router.push('/')} className='h-[50px] w-full' height={76.23} priority width={284.65} alt='' src={'/indiaretail.png'}></Image> : <h6 className='text-[16px] font-semibold tex-black capitalize'>{Heading}</h6>} */}
                <Image style={{ objectFit: 'contain' }} onClick={() => router.push('/')} className='w-[120px] mt-[5px]' height={76.23} priority width={284.65} alt='' src={'/indiaretail.png'}></Image> 
                </div>
                <Image className='lg:hidden md:h-[20px] cursor-pointer' onClick={() => router.push("/search?searchText=")} style={{ objectFit: 'contain' }} height={60} priority width={24} alt='search' src={'/search.svg'} ></Image>
            </div>
             <TopNavBar nav_data={nav}/>
            </div>
        </>
    )
}
