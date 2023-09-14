import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function BottomTabs() {
    const router = useRouter()
    const [tabs,setTabs] = useState([
        {
            "menu_label": "Home",
            "redirect_url": "/",
            "icon": "/tabs_icon/home.svg",
            "active_icon": "/tabs_icon/home_active.svg",
        },
        {
            "menu_label": "IR Prime",
            "redirect_url": "/IRPrime",
            "icon": "/tabs_icon/irprime.svg",
            "active_icon": "/tabs_icon/irprime_active.svg",

        },
        {
            "menu_label": "Event",
            "redirect_url": "/events",
            "icon": "/tabs_icon/events.svg",
            "active_icon": "/tabs_icon/events_active.svg",

        },
        {
            "menu_label": "Book Store",
            "redirect_url": "/bookstore",
            "icon": "/tabs_icon/bookstore.svg",
            "active_icon": "/tabs_icon/bookstore_active.svg",

        },
        {
            "menu_label": "Newsletter",
            "redirect_url": "/newsletters",
            "icon": "/tabs_icon/newsletter.svg",
            "active_icon": "/tabs_icon/newsletter_active.svg",

        },
    ])
    useEffect(()=>{
        console.log(router);
        let route = router.route.split('/')
        let redirect_url = route[1] ? '/'+route[1] : '/'
        tabs.map(nd=>{
            nd.active = nd.redirect_url == redirect_url ? true :false
            // SetNavData(navData)
        })
        console.log(tabs);
     },[])
     const changeNav = (nav) =>{
        router.push(nav.redirect_url)
      }
    return ( <>
    <div id='tabs'>
    <ul  className='flex items-baseline w-full   bg-[#fff] py-[6px]' style={{borderTop:'1px solid #ddd'}}>
            {tabs.map((nav,index)=>{
                return(<li key={index} className={`flex flex-col flex-[0_0_20%] gap-[10px] justify-between cursor-pointer text-[14px] font-medium whitespace-pre text-[#858585] ${nav.active && 'active_nav'}`}
                    onClick={()=>changeNav(nav)} style={{border:'none'}}>
                    <Image alt={nav.menu_label} src={nav.active == true ? nav.active_icon : nav.icon} width={16} height={16} className=" m-auto"/>
                  <p className="text-[12px] text-center">{nav.menu_label}</p> 
                </li>)
            })}   
          </ul>
    </div>
    </> );
}

