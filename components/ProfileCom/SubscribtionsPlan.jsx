import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
import Image from 'next/image'
import {  get_customer_plan_based_subscritpions, getColor } from '@/libs/api';


export default function SubscribtionsPlan({ customerInfo }) {
  
  const router = useRouter();
  const [planList,setPlanList] = useState([])

  useEffect(() => {
    get_sub_plans()
 },[])  

async function get_sub_plans(){
    let data = { customer_id:localStorage['customer_id'] };
    const resp = await get_customer_plan_based_subscritpions(data);
    console.log(resp);
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

      {planList && planList.length != 0 &&
         planList.map((res,index)=>{
            return(
              <div className='border-b-[5px] py-[10px] border-b-slate-100 last:border-b-[0px]'>
                <div className='md:hidden px-[20px] items-center grid grid-cols-6 h-[50px]'>
                    <h6 className='text-[14px]'>{res.subscription_plan}</h6>
                    <h6 className='text-[14px]'>{res.sub_plans[0].plan_info.billing_interval_count + ' ' + res.sub_plans[0].plan_info.billing_interval}</h6>
                    <h6 className='text-[14px]'>{formatDate(res.current_end_date)}</h6>
                    <h6 className='text-[14px]'>{formatter.format(res.sub_plans[0].plan_info.price)}</h6>
                    <div className='flex items-center gap-[5px]'><div style={{background:res.status ? getColor(res.status)  : '#ddd'}} className={`h-[10px] w-[10px] rounded-[50%]`}></div><h6 className='text-[14px]'>{res.status}</h6></div>
               </div>

               <div className='lg:hidden flex flex-wrap p-[10px] cursor-pointer items-center '>
                    <h6 className='md:flex-[0_0_calc(70%_-_0px)] text-[14px] font-semibold'>{res.subscription_plan}</h6>
                    <div className='md:flex-[0_0_calc(30%_-_0px)] justify-end flex items-center gap-[5px]'><div style={{background:res.status ? getColor(res.status)  : '#ddd'}} className={`h-[6px] w-[6px] rounded-[50%]`}></div><h6 className='text-[12px]'>{res.status}</h6></div>
                    <h6 className='md:flex-[0_0_calc(50%_-_0px)] py-[2px] text-[12px] gray_color'>{res.sub_plans[0].plan_info.billing_interval_count + ' ' + res.sub_plans[0].plan_info.billing_interval}</h6>
                    <h6 className='md:flex-[0_0_calc(50%_-_0px)] text-end text-[12px] gray_color'>{formatDate(res.current_end_date)}</h6>
                    <h6 className='text-[12px] '>{formatter.format(res.sub_plans[0].plan_info.price)}</h6>
               </div>

               {res.sub_plans[0].plan_features && res.sub_plans[0].plan_features.length != 0 &&
                <div className='border rounded-[10px] md:m-[0px_10px_10px_10px] lg:m-[5px_10px_10px_10px] p-[10px]'>
                 <h6 className='text-[13px] pb-[5px] gray_color'>Plan Features</h6>
                 {res.sub_plans[0].plan_features.map((plan,index)=>{
                  return(
                    <div key={index} className='flex gap-[5px]'>
                      <div style={{background:'#ddd'}} className={`h-[10px] w-[10px] mt-[7px] rounded-[50%]`}></div>
                      <h6 className='text-[14px] w-[90%]'>{plan.features}</h6>
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