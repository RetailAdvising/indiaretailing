import RootLayout from '@/layouts/RootLayout'
import React, {useEffect, useState } from 'react'
import { checkMobile, get_customer_info, stored_customer_info } from '@/libs/api';
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common'
import Image from 'next/image'
import Myprofile from '@/components/ProfileCom/Myprofile';
import Editprofile from '@/components/ProfileCom/Editprofile';
import Orders from '@/components/ProfileCom/Orders';
import ChangePwd from '@/components/ProfileCom/ChangePwd';
import SubscribtionsPlan from '@/components/ProfileCom/SubscribtionsPlan';
import AlertUi from '@/components/common/AlertUi';

export default function profile({my_account}) {  

  
  let profileDetail = [
    {'title':'Edit Profile',icon:'/Profile/edit.svg',route:'edit-profile'},
    {'title':'Orders',icon:'/Profile/orders.svg',route:'orders'},
    // {'title':'Newsletter',icon:'/Profile/newsletter.svg',route:'newsletter'},
    {'title':'Change Password',icon:'/Profile/edit.svg',route:'change-password'},
    {'title':'Subscription',icon:'/Profile/subscription.svg',route:'subscription'},
    {'title':'Logout',icon:'/Profile/logout.svg',route:'logout'},
  ]
  
  let [isMobile, setIsmobile] = useState();
  let [tab, setTab] = useState('');
  const [customerInfo,setCustomerInfo] = useState();
  const [profileInfo,setProfileInfo] = useState(profileDetail);
  let [localValue, setLocalValue] = useState(undefined);
  const [alertUi,setAlertUi] = useState(false)
  const [alertMsg, setAlertMsg] = useState({})

  const router = useRouter();

  
  useEffect(() => {
    let localValue = stored_customer_info()
    setLocalValue(localValue);

    if(my_account && my_account != ''){
      tab = my_account;
      setTab(tab);
      getInfo(my_account);
    }else{
      setTab('');
    }

    checkIsMobile();
    window.addEventListener('resize',checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  },[router.query])  

  const navigateToProfile = (data) =>{

    if(data.route == 'logout') {
      setAlertUi(true);
      setAlertMsg({message:'Are you sure do you want to logout ?'});
    }else{
      router.push('/profile?my_account='+ data.route);
    }

  }

  const  checkIsMobile = async () => {
    isMobile = await checkMobile();
    setIsmobile(isMobile);
  }

  function getInfo(my_account){
     
    profileInfo.map(res=>{
      if(res.route == my_account){
        res.selected = 1
      }else{
        res.selected = 0
      }
    })

    setProfileInfo(profileInfo);

    if(my_account == 'edit-profile'){
      customer_info()
    }
  }

  async function customer_info(){

      let data = { guest_id: '',user: localStorage['customer_id'] };
      const resp = await get_customer_info(data);
        if (resp && resp.message && resp.message[0]) {
          setCustomerInfo(resp.message[0]);
        }
  }

  function closeModal(value) {
    setAlertUi(false);
    if(value == 'Yes'){
      localStorage.clear();
      router.push('/login'); 
    }
  }


  return(
    <>
       <RootLayout checkout={isMobile ? false : true}>

       {alertUi && 
            <AlertUi isOpen={alertUi} closeModal={(value)=>closeModal(value)} headerMsg={'Alert'} button_1={'No'} button_2={'Yes'} alertMsg={alertMsg} /> 
       }

        <div className='border-t-[1px] border-t-slate-200'>

          {((tab == '' || !isMobile) && localValue) &&
            <div className='lg:hidden p-[15px_5px] flex items-center gap-10px'>
              <div class="flex items-center h-[75px]"><Image className='h-[70px] object-contain' height={100} width={100} src={'/Navbar/profile.svg'}></Image></div>
               <h6 className='text-[15px] font-semibold'>{localValue.cust_name}</h6>
            </div>
          }

          <div className='container min-h-[350px] w-full flex gap-[10px]'>
              {(tab == '' || !isMobile) && <div className={'p-[10px_20px_20px_0] lg:flex-[0_0_calc(25%_-_10px)]'}><Myprofile profileInfo={profileInfo} navigateToProfile={navigateToProfile} /></div>}
              
              {tab && tab != '' && <div  className={'md:w-full lg:flex-[0_0_calc(75%_-_0px)] pb-[20px] border-l-[1px] border-l-slate-200 '}>
                
                 {tab == 'edit-profile' && 
                 <div>
                   <h6 className='flex items-center px-[10px] text-[16px] font-semibold h-[50px] border-b-[1px] border-b-slate-200 mb-[10px]'>Personal Information</h6>
                   <div className='px-[20px]'>
                    {customerInfo && <Editprofile customerInfo={customerInfo} />}
                   </div>  
                 </div> 
                 }

                 {tab == 'orders' && 
                 <div>
                   <h6 className='flex items-center px-[10px] text-[16px] font-semibold h-[50px] border-b-[1px] border-b-slate-200'>Orders List</h6>
                   <div className=''>
                     <Orders />
                   </div>  
                 </div> 
                 }

                {tab == 'change-password' && 
                 <div>
                   <h6 className='flex items-center px-[10px] text-[16px] font-semibold h-[50px] border-b-[1px] border-b-slate-200 mb-[10px]'>Change Password</h6>
                   <div className='px-[20px]'>
                     <ChangePwd  />
                   </div>  
                 </div> 
                 }

                 {tab == 'subscription' && 
                  <div>
                   <h6 className='flex items-center px-[10px] text-[16px] font-semibold h-[50px] border-b-[1px] border-b-slate-200'>My Subscription</h6>
                   <div className=''>
                     <SubscribtionsPlan />
                   </div>  
                  </div> 
                  }

               </div> 
              } 
          </div>
        </div>
       </RootLayout>
    </>
  )
}

export async function getServerSideProps({ query }) {
  let my_account = query.my_account
  return {
   props : { my_account }
  }
}
