import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
import Image from 'next/image'
import {  get_customer_plan_based_subscritpions, getColor } from '@/libs/api';
import NoProductFound from '@/components/common/NoProductFound';

export default function SubscribtionsPlan({ index, payNow }) {
  
  const router = useRouter();
  const [planList,setPlanList] = useState([])

  useEffect(() => {
    setPlanList([]);
    get_sub_plans()
  },[index])  

async function get_sub_plans(){
    let data = { customer_id:localStorage['customer_id'] };
    const resp = await get_customer_plan_based_subscritpions(data);
    // console.log(resp);
      if (resp && resp.message && resp.message.length != 0) {
        setPlanList((d)=> d = [...d,...resp.message]);
      }else{
        // no_product = true;
        // setPlanList([]) : null
      }
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  });

 // Replace this with your date object
 const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
 };

  return(
    <>
 <div className='md:hidden px-[20px] items-center grid grid-cols-6 h-[50px] bg-slate-100'>
       <h6 className='text-[15px] font-semibold'>Plan</h6>
       <h6 className='text-[15px] font-semibold'>Plan Duration</h6>
       {/* <h6 className='text-[15px] font-semibold'>Validity In Days</h6> */}
       <h6 className='text-[15px] font-semibold'>Expiry Date</h6>
       <h6 className='text-[15px] font-semibold'>Amount</h6>
       <h6 className='text-[15px] font-semibold'>Status</h6>
       <h6></h6>

      </div>

      {planList && planList.length == 0 ? 
         <NoProductFound cssClass={'flex-col h-[calc(100vh_-_220px)]'} empty_icon={'/empty_states/no-subscriptions.svg'} heading={'No Subscription Found'}/>
        :
         planList.map((res,index)=>{
            return(
              <div className='border-b-[5px] py-[10px] border-b-slate-100 last:border-b-[0px]'>
                <div className='md:hidden px-[20px] items-center grid grid-cols-6 h-[50px]'>
                    <h6 className='text-[14px]'>{res.subscription_plan}</h6>
                    <h6 className='text-[14px]'>{res.sub_plans[0].plan_info.billing_interval_count + ' ' + res.sub_plans[0].plan_info.billing_interval}</h6>
                    <h6 className='text-[14px]'>{formatDate(res.current_end_date)}</h6>
                    <h6 className='text-[14px]'>{formatter.format(res.sub_plans[0].plan_info.price)}</h6>
                    <div className='flex items-center gap-[5px]'><div style={{background:res.status ? getColor(res.status)  : '#ddd'}} className={`h-[10px] w-[10px] rounded-[50%]`}></div><h6 className='text-[14px]'>{res.status}</h6></div>
                    {res.status == 'Unpaid' && <div className=''><button onClick={()=>{payNow(res)}} className='bg-black text-white w-max p-[5px_25px] text-[13px] rounded-[5px]'>Pay</button> </div>}
               </div>

               <div className='lg:hidden flex flex-wrap p-[10px] cursor-pointer items-center '>
                    <h6 className='md:flex-[0_0_calc(70%_-_0px)] text-[14px] font-semibold'>{res.subscription_plan}</h6>
                    <div className='md:flex-[0_0_calc(30%_-_0px)] justify-end flex items-center gap-[5px]'><div style={{background:res.status ? getColor(res.status)  : '#ddd'}} className={`h-[6px] w-[6px] rounded-[50%]`}></div><h6 className='text-[12px]'>{res.status}</h6></div>
                    <h6 className='md:flex-[0_0_calc(50%_-_0px)] py-[2px] text-[12px] gray_color'>{res.sub_plans[0].plan_info.billing_interval_count + ' ' + res.sub_plans[0].plan_info.billing_interval}</h6>
                    <h6 className='md:flex-[0_0_calc(50%_-_0px)] text-end text-[12px] gray_color'>{formatDate(res.current_end_date)}</h6>
                    <h6 className='text-[12px] md:flex-[0_0_calc(50%_-_0px)]'>{formatter.format(res.sub_plans[0].plan_info.price)}</h6>
                    {res.status == 'Unpaid' && <div className='md:flex-[0_0_calc(50%_-_0px)] flex items-center justify-end'><button onClick={()=>{payNow(res)}} className='bg-black text-white w-max p-[5px_25px] text-[13px] rounded-[5px]'>Pay</button> </div>}
               </div>

               {res.items && res.items.length != 0 &&
                <div className='md:m-[0px_10px_10px_10px] lg:m-[5px_10px_10px_10px] p-[10px]'>
                 <h6 className='text-[13px] gray_color font-semibold'>Item Details</h6>
                 {res.items.map((d,index)=>{
                  return(
                    <div className={'flex items-center gap-[10px] py-[10px] border-b-[1px] border-b-slate-100 last:border-b-[0px]'} key={index}>
                     <div class="flex items-center flex-[0_0_calc(80%_-_10px)]">
                        <span class="qty">{d.qty}</span>
                        <span class="qty mx-[10px]">*</span>
                        <span>
                            <h6 class="m-0 text-[13px] font-semibold">{d.item_name}</h6>
                            {d.type && <h6 class="m-0 text-[12px] gray_color"><span className='text-[12px]'>Type : </span> {d.type}</h6>}
                            <h6 class="text-[12px] gray_color">{formatter.format(d.price)}</h6>
                        </span> 
                     </div>
                     {/* <h6 class="m-0 text-[13px] font-semibold text-end flex-[0_0_calc(20%_-_0px)]">{formatter.format(d.qty * d.price) }</h6> */}
                    </div>
                   )
                  })
                  }
                </div>
              }

               {res.sub_plans[0].plan_features && res.sub_plans[0].plan_features.length != 0 &&
                <div className='border rounded-[10px] md:m-[0px_10px_10px_10px] lg:m-[5px_10px_10px_10px] p-[10px_15px]'>
                 <h6 className='text-[13px] pb-[5px] gray_color font-semibold'>Plan Features</h6>
                 {res.sub_plans[0].plan_features.map((plan,index)=>{
                  return(
                    <div key={index} className='flex gap-[5px]'>
                      <div style={{background:'#ddd'}} className={`h-[7px] w-[7px] mt-[5px] rounded-[50%]`}></div>
                      <h6 className='text-[12px] w-[90%]'>{plan.features}</h6>
                    </div>
                  )
                  })
                 }
               </div>
              }
              </div> 
            )
         })

      }
    </>
  )
} 