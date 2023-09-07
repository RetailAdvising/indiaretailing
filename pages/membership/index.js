import React, {useEffect, useState } from 'react'
import RootLayout from '@/layouts/RootLayout';
import data from '@/libs/membership';
import Image from 'next/image';
import Faq from '@/components/Membership/faq';
import Benefits from '@/components/Membership/benefits';
import ConfirmationScreen from '@/components/Membership/ConfirmationScreen';
import Modal from '@/components/common/Modal';
import { checkMobile, HomePage, get_subscription_plans } from '@/libs/api'

export default function Membership() {

  let [btnState, setbtnState] = useState(true);
  const  [pageContent, setpageContent] = useState([]);
  let  [memberShipDetails, setMemberShipDetails] = useState([]);
  const [modal, setModal] = useState('login')


  let [isMobile, setIsmobile] = useState();



  useEffect(() => {
    getMembershipLanding()
    getMembershipData()
    checkIsMobile();
    // setTimeout(()=>{},700)
    window.addEventListener('resize',checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  },[])

  const  checkIsMobile = async () => {
    isMobile = await checkMobile();
    setIsmobile(isMobile);
    // console.log('isMobile',isMobile)
  }

  async function getMembershipLanding(){
    let data = {"route" : "membership"}
    const resp = await HomePage(data);
    console.log(resp);
      if (resp && resp.message && resp.message.page_content && resp.message.page_content != 0) {
          let datas = resp.message.page_content
          setpageContent(datas);
      } 
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  });

  async function getMembershipData(){
    let data = { "plan_type": btnState ? "Month" : "Year", "role":"Customer","res_type":"member"}
    const resp = await get_subscription_plans(data);
    console.log(resp);
      if (resp && resp.message && resp.message.status && resp.message.status == 'success') {

          let datas = resp.message.message;
          setMemberShipDetails(datas);

          if(datas.length > 3){
            setTimeout(() => { check_arrow('initial')}, 700);
          }

      } 
  }

  function handleClick(){
    btnState = btnState =! btnState
    setbtnState(btnState);
    getMembershipData()
  }

  const moveLeft = () => {
     let element = document.querySelector(`#scroll_div`);
     element.scrollBy({top: 0, left: 250, behavior: 'smooth'});
     check_arrow('right')
  }

  const moveRight = () => {
    let element = document.querySelector(`#scroll_div`);
    element.scrollBy({top: 0, left: -250, behavior: 'smooth'});
    check_arrow('left')
  }

 function check_arrow(type){

  let element = document.querySelector(`#scroll_div`);
  let left_arrow = document.querySelector(`#left_arrow`);
  let right_arrow = document.querySelector(`#right_arrow`);

  if(type == 'right' || type == 'left'){
    if(element.scrollLeft == 0){
      left_arrow.classList.add('hiding');
      right_arrow.classList.remove('hiding');
    }else if(element.offsetWidth + element.scrollLeft == element.scrollWidth){
      left_arrow.classList.remove('hiding');
      right_arrow.classList.add('hiding');
    }else if(element.scrollLeft > 0){
      left_arrow.classList.remove('hiding');
      right_arrow.classList.remove('hiding');
    }
  }

  if(type == 'initial') {
      left_arrow.classList.add('hiding');
  }

  }

  const [visible_, setVisible_] = useState(false)


  function startPlan(obj,index){
    if(localStorage['apikey']){
      obj.selected = true;

      memberShipDetails.map((res,i)=>{
        if(i != index){
          res.selected = false;
        }
      })
  
      setMemberShipDetails(memberShipDetails);
      show();
      console.log(memberShipDetails);
    }else{
      setVisible_(!visible_);
      setModal('login')
    }


  }

  const [visible, setVisible] = useState(false)

  function show() {
    setVisible(true);
  }

  function hide(obj) {
    setVisible(false);
    setVisible_(false);
  }

  return (
      <RootLayout>

        {visible &&
            <ConfirmationScreen membershipDetails={memberShipDetails} visible={visible} hide={(obj)=> hide(obj)} startPlan={(membership,index)=> startPlan(membership,index)} btnState={btnState} handleClick={handleClick}/>
        }

        <Modal modal={modal} show={show} visible={visible_} hide={hide} />

       <div className="pt-[30px] bg-[url('/membership/bg_membership.svg')] bg-no-repeat bg-contain">
         <div className="max-w-[1200px] m-[0px_auto]">
            <h2 className="font-bold text-4xl md:text-2xl text-center">{data.title}</h2>
            <p className="sub_title text-center pb-10 pt-3">{data.subtitle}</p>
            <div className="flex flex-row m-auto justify-center gap-2 mb-3 border rounded-[35px] w-max p-[5px]">
              <div className='inline-block'>
                  <button className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-[35px] font-medium bg-[red] member-button1 ${btnState ? 'active' : ''}`} onClick={handleClick}>Monthly Billing</button>
              </div>
              <div className='inline-block'>
                  <button className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-[35px] font-medium bg-[red] member-button1 ${!btnState ? 'active' : ''}`} onClick={handleClick}>Yearly Billing</button>
              </div>
            </div>

           
            {memberShipDetails && memberShipDetails.length != 0 &&  
             <div className='relative'>
             { memberShipDetails.length > 3 && <p id={'left_arrow'} className='z-[99] absolute left-[-10px] top-[45%] shadow-[0_0_5px_#ddd] bg-white cursor-pointer h-[35px] w-[35px] border rounded-[50%] p-[6px]' onClick={moveRight}><Image className={`h-[20px] w-[20px]`} src={'/leftArrow.svg'} height={28} width={28} alt={'left'}></Image></p> }
             { memberShipDetails.length > 3 && <p id={'right_arrow'} className='z-[99] absolute right-[-10px] top-[45%] shadow-[0_0_5px_#ddd] bg-white cursor-pointer h-[35px] w-[35px] border rounded-[50%] p-[6px]' onClick={moveLeft}><Image className={`h-[20px] w-[20px]`} src={'/rightArrow.svg'} height={28} width={28} alt={'right'}></Image></p> }
          
              <div id={'scroll_div'} className="flex lg:p-[10px] gap-6 md:p-[15px] overflow-auto scrollbar-hide ">
              {memberShipDetails.map((membership,index) => {
              return(
                  <div key={index} className="flex-[0_0_calc(33.333%_-_16px)] member-card lg:p-8 md:p-[15px] bg-white rounded-2xl active_member_ship relative">
                      <h3 className='text-2xl font-bold'>{membership.plan_name}</h3>
                                        
                      {/* <div className='flex items-center gap-[3px] my-[2px] rounded-[35px] w-max p-[5px_8px] member-button'>
                        <span className='h-[20px] flex items-center'><Image className='h-[18px]' src="/percentage.svg" height={18} width={18} alt={''} /></span> 
                        <p className='text-[12px] member-button leading-[0px]'> Save {membership.offer} % </p>
                      </div> */}

                      <h5 className='font-medium text-3xl'>{formatter.format(membership.total_amount)}</h5>
                      <p className='text-xs'>Per {btnState ? 'month': 'year'} .</p>

                      <p className='py-[6px] text-black text-xs font-bold'>Starter plan for optimal business intelligence</p>

                      {/* <p className='py-[6px] text-black text-xs font-bold'>{membership.descrption}</p> */}
                     
                      <ul className='pb-[48px]'>
                      {membership.features.map((items,index) => {
                      return(
                          <li key={index} className='text-xs leading-6 d__flex gap-0.5'>
                          <Image src="/tick1.svg" alt="Tick" width={18}height={18} className='m-2 w-4 h-4'/>{items.features}</li>
                          )
                        })}
                      </ul>
                      <button onClick={()=> startPlan(membership,index)} className="absolute bottom-[30px] w-[calc(100%_-_60px)] bg-blue-500 text-white font-bold py-2 px-4 rounded-2xl font-medium member-button member-button_"> Start your free Pro trial </button>
                  </div>
                  )
                })}
          </div>
          
             </div>
            }

        </div>
      </div> 

      <div className='container py-[20px]'>
       {pageContent && pageContent.length != 0 && pageContent.map((res)=>{
        return (
            <>
             {res.section_name == 'IR Member Ship' && res.section_type == 'Static Section' &&  
               <div className='container py-[20px] md:p-[15px]'>
                <Benefits data={res}></Benefits>
               </div>
             }
             {res.section_name == 'FAQ Style 4' && res.section_type == 'Custom Section' &&  
              <div className='container py-[30px] md:p-[15px]'>
                  <Faq data={res}></Faq>
              </div>
             }
            </>
         )
        })
       }
      </div>

      </RootLayout>
    )
  }


