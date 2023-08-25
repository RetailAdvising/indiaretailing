import React from 'react'
import header from '@/styles/Header.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function SideBar({data}) {
    const router = useRouter()
  return (
    <>
      {data.header && data.header.items.length != 0 && <div className={``}>
                <div className=''>
                    {data.header.items.map(res => {
                        return (
                            <div key={res.section_name}>
                               
                                {res.section_name == 'Header Menu' && res.menus && <ul className={`flex flex-col items-start gap-20px px-4`}>
                                    {res.menus.map(item => {
                                        return (
                                            // ${nav1 == item.redirect_url ? header.activeMenu : ''}
                                            <Link href={item.redirect_url}  className={`${header.listKey} font-semibold navigation_c ${router.route == item.redirect_url ? header.activeMenu : ''}`} key={item.menu_label}>
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
