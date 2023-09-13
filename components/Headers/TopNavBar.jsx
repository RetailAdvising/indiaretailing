import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/router';

export default function TopNavBar({nav_data}) {
    const router = useRouter()
    const [navData,SetNavData] = useState( [
        {
            "menu_label": "Home",
            "redirect_url": "/",
        },
        {
            "menu_label": "Categories",
            "redirect_url": "/categories",
        },
        {
            "menu_label": "IR Prime",
            "redirect_url": "/IRPrime",
        },
        {
            "menu_label": "Event",
            "redirect_url": "/events",

        },
        {
            "menu_label": "Book Store",
            "redirect_url": "/bookstore",
            "icon": "/Navbar/Book-Store.svg",
        },
        {
            "menu_label": "Newsletter",
            "redirect_url": "/newsletters",
            "icon": "/Navbar/newsletter.svg",
        },
        {
            "menu_label": "Video",
            "redirect_url": "/video",
            "icon": "/Navbar/video.svg",
        },
        {
            "menu_label": "Podcast",
            "redirect_url": "/podcast",
            "icon": "/Navbar/Podcasts.svg",
        }
    ])
    useEffect(()=>{
        console.log(router);
        let route = router.route.split('/')
        let redirect_url = route[1] ? '/'+route[1] : '/'
        console.log(redirect_url);
        navData.map(nd=>{
            nd.active = nd.redirect_url == redirect_url ? true :false
            // SetNavData(navData)
        })
     },[])
  const changeNav = (nav) =>{
    router.push(nav.redirect_url)
    console.log(navData);
  }
    return (
        <>
          <ul className='flex items-center gap-[15px] overflow-auto px-[15px] no_scroll' style={{borderBottom:'1px solid #ddd'}}>
            {navData.map((nav,index)=>{
                return(<li key={index} className={`py-[8px] cursor-pointer text-[14px] font-medium whitespace-pre ${nav.active && 'active_nav'}`}
                onClick={()=>changeNav(nav)}>
                   {nav.menu_label}
                </li>)
            })}   
          </ul>
        </>
    )
}
