import RootLayout from '@/layouts/RootLayout'
import React, {useEffect, useState } from 'react'
import { checkMobile, get_customer_info, newsLanding, stored_customer_info, get_razorpay_settings, make_payment_entry } from '@/libs/api';
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common'
import Image from 'next/image'
import Myprofile from '@/components/ProfileCom/Myprofile';
import Editprofile from '@/components/ProfileCom/Editprofile';
import Orders from '@/components/ProfileCom/Orders';
import ChangePwd from '@/components/ProfileCom/ChangePwd';
import SubscribtionsPlan from '@/components/ProfileCom/SubscribtionsPlan';
import AlertUi from '@/components/common/AlertUi';
import SubscribeNews from '@/components/Newsletter/SubscribeNews';

export default function profile({my_account}) {  

  
  let profileDetail = [
    {'title':'My Profile',icon:'/Profile/profile.svg',route:'edit-profile'},
    {'title':'My Orders',icon:'/Profile/orders.svg',route:'orders'},
    {'title':'Membership',icon:'/Profile/membership.svg',route:'membership'},
    {'title':'Subscription',icon:'/Profile/subscription.svg',route:'subscription'},
    {'title':'Newsletter',icon:'/Profile/newsletter.svg',route:'newsletter'},
    {'title':'Change Password',icon:'/Profile/edit.svg',route:'change-password'},
    {'title':'Logout',icon:'/Profile/logout.svg',route:'logout'},
  ]
  
  let [isMobile, setIsmobile] = useState();
  let [tab, setTab] = useState('');
  const [customerInfo,setCustomerInfo] = useState();
  const [news,setNews] = useState();

  const [profileInfo,setProfileInfo] = useState(profileDetail);
  let [localValue, setLocalValue] = useState(undefined);
  const [alertUi,setAlertUi] = useState(false)
  const [alertMsg, setAlertMsg] = useState({})
  const [razorpay_settings, setRazorpay_settings] = useState({}) ;
  const [enableModal,setEnableModal] = useState(false)

  const [index,setIndex] = useState(-1)


  const router = useRouter();

  
  useEffect(() => {
    get_razor_pay_values();
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

  async function get_razor_pay_values(){
    let razorpay = await get_razorpay_settings();
    setRazorpay_settings(razorpay);
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
    }else if(my_account == 'newsletter'){
      newsLanding_info()
    }
  }

  async function customer_info(){

      let data = { guest_id: '',user: localStorage['customer_id'] };
      const resp = await get_customer_info(data);
        if (resp && resp.message && resp.message[0]) {
          setCustomerInfo(resp.message[0]);
        }
  }

  async function newsLanding_info(){
    let arg = {
      fields: ['custom_day', 'name', 'custom_category', 'custom_description', 'custom_image_', 'custom_title', 'route']
    }
  
    let value = await newsLanding(arg);
    let news = value.message;
    setNews(news)
  }


  function closeModal(value) {
    console.log(value);
    setEnableModal(false);
    if(value == 'Yes' && alertUi){
      setAlertUi(false);
      localStorage.clear();
      router.push('/login'); 
    }else{
      setAlertUi(false);
    }
  }
  
  function logout(value) {
    console.log(value);
    setEnableModal(false);
    if(value == 'Yes' && alertUi){
      setAlertUi(false);
      localStorage.clear();
      router.push('/login'); 
    }else{
      setAlertUi(false);
    }
  }

  const payNow = (obj) =>{
    // setIndex(index + 1);
    load_razorpay(obj.sub_plans[0].plan_info.price,obj.subscription_plan,obj.sub_plans[0].order_info.name,obj)
  }
 
  function payment_error_callback(error){
   setAlertMsg({message: 'Payment failed'});
   setEnableModal(true);
 }
 
 async function payment_Success_callback(response,amount,order_id,obj){
  let params;

  if(obj.items && obj.items.length == 0){
    params = {
      "customer_id": localStorage['customer_id'],
      "payment_method": "PAY-M00001",
      "amount": amount,
      "remarks": "paid",
      "transaction_id": response.razorpay_payment_id,
      "order_id": order_id,
      "payment_method_name": "Razor Pay",
      "subscription_type": "member"
    }
  }else{
    params = {
      "customer_id": localStorage['customer_id'],
      "payment_method": "PAY-M00001",
      "amount":amount,
      "remarks":"paid",
      "transaction_id":response.razorpay_payment_id,
      "order_id":order_id,
      "payment_method_name":"Razor Pay"
    }
  }

   const resp = await make_payment_entry(params);
   if(resp && resp.message && resp.message.status && resp.message.status == 'success'){
    setAlertMsg({message:'Payment successfully received'});
    setEnableModal(true);
    obj.status = 'Active';
    setIndex(index + 1);

    if(localStorage['roles'] && obj.items && obj.items.length == 0){
      let get_values = JSON.parse(localStorage['roles']);
      get_values.push({role:'Member'})
      localStorage['roles'] = JSON.stringify(get_values)
    }
    
   }
 }
 
 const load_razorpay = async (amount,description,order_id,obj) => { 
 // console.log(razorpay_settings.api_key)
   let r_pay_color ='#e21b22';
   const app_name = 'India Retail';
   var options = {
     "key": razorpay_settings.api_key,
     "amount": (amount * 100).toString(),
     "currency": "INR",
     "name": app_name,
     "description": "Payment for" + description,
     "image": (razorpay_settings.site_logo ? check_Image(razorpay_settings.site_logo) : null),
     "prefill": { "name": localStorage['full_name'],"email": localStorage['userid']},
     "theme": { "color": r_pay_color },
     "modal": { "backdropclose": false, "ondismiss": () => { payment_error_callback(description)} },
     "handler" : async (response, error) => {
       if(response){
         payment_Success_callback(response,amount,order_id,obj)
         // response.razorpay_payment_id
       } else if(error){
         payment_error_callback(error)
       }
 
     }
   };
 
   const script = document.createElement('script');
   script.src = 'https://checkout.razorpay.com/v1/checkout.js';
   script.async = true;
   script.onload = () => {const rzp = new window.Razorpay(options); rzp.open();};
   document.body.appendChild(script);
   return () => {
     document.body.removeChild(script);
   };
 
 }

 const [showAlert, setShowAlert] = useState(false);
 const [visible, setVisible] = useState(false)

 function show() {
   setVisible(true);
 }

 async function closeModal(value){
     setEnableModal(false);
 }

 function hide(obj) {
   setVisible(false);
   if(obj.status == 'Success'){
     setAlertMsg({message:'Newsletters subscribed successfully'});
     setEnableModal(true);
   }
 }


  return(
    <>
       <RootLayout checkout={isMobile ? false : true}>

       {alertUi && 
            <AlertUi isOpen={alertUi} closeModal={(value)=>logout(value)} headerMsg={'Alert'} button_1={'No'} button_2={'Yes'} alertMsg={alertMsg} /> 
       }

       { enableModal && <AlertUi isOpen={enableModal} closeModal={(value)=>closeModal(value)} headerMsg={'Alert'} button_2={'Ok'} alertMsg={alertMsg} />}


        <div className=''>

          {((tab == '' || !isMobile) && localValue) &&
            <div className='lg:hidden p-[15px_5px] flex items-center gap-10px'>
              <div class="flex items-center h-[75px]"><Image className='h-[65px] object-contain' height={100} width={100} src={'/Navbar/profile.svg'}></Image></div>
               <h6 className='text-[15px] font-semibold'>{localValue.cust_name}</h6>
            </div>
          }

          <div className='min-h-[350px] w-full flex'>
              {(tab == '' || !isMobile) && 
              // p-[10px_20px_20px_0]
              <div className={'lg:flex-[0_0_calc(20%_-_0px)]'}>

                <h6 className='md:hidden flex items-center p-[0_25px] text-[16px] font-semibold h-[50px] border-b-[0px] border-b-slate-200'>Account Settings</h6>

                 <Myprofile profileInfo={profileInfo} navigateToProfile={navigateToProfile} />
                </div>}
              
              {tab && tab != '' && 
              <div  className={'min-h-[calc(100vh_-_70px)] md:w-full lg:flex-[0_0_calc(80%_-_0px)] pb-[20px] border-l-[1px] border-l-slate-200 '}>
                <div className='border rounded-[5px] lg:m-[20px] md:m-[10px] pb-[20px]'>

                 {tab == 'edit-profile' && 
                 <div>
                   <h6 className='bg-[#FBFBFB] rounded-[5px_5px_0_0] flex items-center px-[10px] text-[16px] font-semibold h-[50px] border-b-[0px] border-b-slate-200 mb-[10px]'>Personal Information</h6>
                   <div className='px-[20px]'>
                    {customerInfo && <Editprofile customerInfo={customerInfo} />}
                   </div>  
                 </div> 
                 }

                 {tab == 'orders' && 
                 <div>
                   <h6 className='bg-[#FBFBFB] rounded-[5px_5px_0_0] flex items-center px-[10px] text-[16px] font-semibold h-[50px] border-b-[0px] border-b-slate-200'>Orders List</h6>
                   <div className=''>
                     <Orders />
                   </div>  
                 </div> 
                 }

                {tab == 'change-password' && 
                 <div>
                   <h6 className='bg-[#FBFBFB] rounded-[5px_5px_0_0] flex items-center px-[10px] text-[16px] font-semibold h-[50px] border-b-[0px] border-b-slate-200 mb-[10px]'>Change Password</h6>
                   <div className='px-[20px]'>
                     <ChangePwd  />
                   </div>  
                 </div> 
                 }

                 {tab == 'subscription' && 
                  <div>
                   <h6 className='bg-[#FBFBFB] rounded-[5px_5px_0_0] flex items-center px-[10px] text-[16px] font-semibold h-[50px] border-b-[0px] border-b-slate-200'>My Subscription</h6>
                   <div className=''>
                     <SubscribtionsPlan type='items' index={index} payNow={(obj)=>payNow(obj)}/>
                   </div>  
                  </div> 
                  }

                  {tab == 'membership' && 
                  <div>
                   <h6 className='bg-[#FBFBFB] rounded-[5px_5px_0_0] flex items-center px-[10px] text-[16px] font-semibold h-[50px] border-b-[0px] border-b-slate-200'>My Membership</h6>
                   <div className=''>
                     <SubscribtionsPlan type='member' index={index} payNow={(obj)=>payNow(obj)}/>
                   </div>  
                  </div> 
                  }

                  {tab == 'newsletter' && 
                  <div>
                   <h6 className='bg-[#FBFBFB] rounded-[5px_5px_0_0] flex items-center px-[10px] text-[16px] font-semibold h-[50px] border-b-[0px] border-b-slate-200'>News Letter</h6>
                   <div className=''>
                     {news &&  <SubscribeNews data={news} no_modal={true} hide={(obj)=> hide(obj)}/>}
                   </div>  
                  </div> 
                  }
                </div>
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
