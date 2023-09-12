import React, { useState } from 'react'
import Image from 'next/image'
import nav from '@/libs/header'
import SideBar from './SideBar';
import { useRouter } from 'next/router';
export default function MobileHead({ isLanding=false, Heading }) {
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
            {<div  className={`fixed sidebar ${navbar ? 'sideActive' : ''} `} ><SideBar data={nav} navbar={navbar} close={() => close()} /></div>}
            <div className='flex border_bottom items-center h-[55px]  p-[0px_15px] justify-between sticky top-[0px]'>
                <Image onClick={() => isLanding ? showSidebar() : window.history.back()} className='h-[16px] mouse' src={isLanding ? '/menu.svg' : '/back.svg'} height={14} width={15} layout="fixed" alt="Edit" />
                {Heading == '' ? <Image style={{ objectFit: 'contain' }} onClick={() => router.push('/')} className='h-[50px] w-full' height={76.23} priority width={284.65} alt='' src={'/indiaretail.png'}></Image> : <h6 className='text-[16px] font-semibold tex-black capitalize'>{Heading}</h6>}
                <Image className='lg:hidden md:h-[20px] cursor-pointer' onClick={() => router.push("/search?searchText=")} style={{ objectFit: 'contain' }} height={60} priority width={24} alt='search' src={'/search.svg'} ></Image>
            </div>
        </>
    )
}
