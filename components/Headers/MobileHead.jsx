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
    // show_header()
        // Clear the timeout if the component unmounts before the 2 seconds
        return () => clearTimeout(timeout);
       
    }, []);
   const show_header= () =>{

	    // Hide Header on on scroll down
      var didScroll;
      var lastScrollTop = 0;
      var delta = 5;
      var navbarHeight = document.getElementById('header')
	   console.log(navbarHeight);
      window.scroll(function(event){
        didScroll = true;
      });

      setInterval(function() { // wait for it... wait for it... wait for it
        if (didScroll) {
          hasScrolled();
          didScroll = false;
        }
      }, 200);

      function hasScrolled() {
            var scrolltop = winow.scrollTop();
            console.log(scrolltop);
            // Make sure they scroll more than delta
            if(Math.abs(lastScrollTop - scrolltop) <= delta)	return;
            // If they scrolled down and are past the navbar, add class .nav-up.
            // This is necessary so you never see what is "behind" the navbar.
            if (scrolltop > lastScrollTop && scrolltop > navbarHeight){
              // On scroll down we add nav-up
              document.getElementById('header').removeClass('nav-down').addClass('nav-up');
            } else {
              // On scroll up we add nav-down
              if(scrolltop + $(window).height() < $(document).height()) {
                document.getElementById('header').removeClass('nav-up').addClass('nav-down');
              }
            }

            lastScrollTop = scrolltop;
      }
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
            {/* <div  id="header" className='nav-down'> */}
            <div className='flex border_bottom items-center justify-between sticky top-[0px] p-[5px_15px] ' >
                <div className='flex gap-[15px] items-center'>
                    <div >
                    <Image onClick={() => isLanding ? showSidebar() : window.history.back()} className={`${isLanding ? 'w-[20px]' : 'w-[9px]'} mouse`} src={isLanding ? '/menu.svg' : '/back.svg'} height={14} width={15} layout="fixed" alt="Edit" />
                    </div>
                {/* {Heading == '' ? <Image style={{ objectFit: 'contain' }} onClick={() => router.push('/')} className='h-[50px] w-full' height={76.23} priority width={284.65} alt='' src={'/indiaretail.png'}></Image> : <h6 className='text-[16px] font-semibold tex-black capitalize'>{Heading}</h6>} */}
                <Image style={{ objectFit: 'contain' }} onClick={() => router.push('/')} className='w-[100px] mt-[5px]' height={76.23} priority width={284.65} alt='' src={'/indiaretail.png'}></Image> 
                </div>
                <Image className='lg:hidden md:h-[20px] cursor-pointer' onClick={() => router.push("/search?searchText=")} style={{ objectFit: 'contain' }} height={60} priority width={24} alt='search' src={'/search.svg'} ></Image>
            </div>
            {nav && <TopNavBar nav_data={nav}/>}
            {/* </div> */}

        </>
    )
}
