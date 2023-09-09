import RootLayout from '@/layouts/RootLayout'
import React, {useEffect, useState } from 'react'
import { checkMobile } from '@/libs/api';
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common'
import Image from 'next/image'
import Myprofile from '@/components/ProfileCom/Myprofile';

export default function profile() {  

  let [isMobile, setIsmobile] = useState();
  const router = useRouter();

  let profileInfo = [
    {'title':'Edit Profile',icon:'/Profile/edit.svg',route:'edit-profile'},
    {'title':'Orders',icon:'/Profile/orders.svg',route:'orders'},
    {'title':'Newsletter ',icon:'/Profile/newsletter.svg',route:'newsletter '},
    {'title':'Change Password',icon:'/Profile/edit.svg',route:'change-password'},
    {'title':'Subscription  ',icon:'/Profile/subscription.svg',route:'subscription  '},
    {'title':'Logout',icon:'/Profile/logout.svg',route:'logout'},
  ]
  
  useEffect(() => {

    checkIsMobile();
      window.addEventListener('resize',checkIsMobile)
      return () => {
       window.removeEventListener('resize', checkIsMobile);
     };
  },[])  

  const  checkIsMobile = async () => {
    isMobile = await checkMobile();
    setIsmobile(isMobile);
  }

  return(
    <>
       <RootLayout checkout={isMobile ? false : true}>
        <div className='border-t-[1px] border-t-slate-200'>
          <div className='container min-h-[350px] hover:bg-slate-100 hover:text-black flex gap-[10px]'>
              <div className={'p-[20px] border-r-[1px] border-r-slate-200 flex-[0_0_calc(25%_-_10px)]'}><Myprofile profileInfo={profileInfo} /></div>
              <div className={'py-[20px] flex-[0_0_calc(75%_-_0px)]'}>
              </div>  
          </div>
        </div>
       </RootLayout>
    </>
  )
}

// export async function getServerSideProps({ query }) {
//   let searchTxt = query.searchText
//   return {
//    props : { searchTxt }
//   }
// }
