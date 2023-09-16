import React, {useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
import Image from 'next/image'
import {  get_order_info, getColor } from '@/libs/api';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

export default function OrderDetail({hide,visible,order_id}) {
  
    const [orderInfo,setOrderInfo] = useState([]);
    let [Skeleton,setSkeleton] = useState(true);

    useEffect(() => {
        order_info(order_id);
    },[])  

    async function order_info(order_id){
        let data = { order_id: order_id};
        const resp = await get_order_info(data);
          if (resp && resp.message && resp.message.info) {
            setOrderInfo(resp.message.info);
            setSkeleton(false)
          }else{
            setSkeleton(false)
          }
    }
 
    
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  });


 const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
 };


  return (
    <div className='order_detail'>
      {/* animation='slideUp' */}
      <Rodal visible={visible} onClose={()=>{hide(undefined)}}>
       {Skeleton ? <SkeletonLoader /> : 
       <div className='flex flex-col h-[100%]'>
          <div className='header h-[55px] border-b-[1px] border-b-slate-100 flex items-center px-[10px]'>
            <h6 className='text-[16px] font-semibold'>Order Detail({orderInfo.name})</h6>
          </div>
          <div className='body_sec h-[100%] overflow-auto scrollbar-hide'>

            <div className='border-b-[1px] border-b-slate-100 p-[10px_15px]'>
                <div className='flex items-center justify-between'>
                    <h6 className='text-[14px] font-semibold'>{orderInfo.name}</h6>
                    <div className='flex items-center gap-[5px]'><div style={{background:orderInfo.status ? getColor(orderInfo.status)  : '#ddd'}} className={`h-[10px] w-[10px] rounded-[50%]`}></div><h6 className='text-[14px]'>{orderInfo.status}</h6></div>
                    </div>

                    <h6 className='text-[15px]  gray_color'>{formatDate(orderInfo.order_date)}</h6>

                    <p  class="flex items-center gap-[10px] text-[13px]">
                    <span class="flex items-center gap-[10px] text-[13px]"><Image height={10} width={15} src={'/order/' + (orderInfo.payment_method_name == 'Razor Pay' ? 'razorpay' :  'cash')+'.svg'}></Image> { orderInfo.payment_method_name}</span>
                    <span className='flex items-center gap-[5px]'><span style={{background:orderInfo.payment_status ? getColor(orderInfo.payment_status)  : '#ddd'}} className={`h-[10px] w-[10px] rounded-[50%]`}></span><h6 className='text-[14px]'>{orderInfo.payment_status}</h6></span>
                </p>
            </div>

           {orderInfo.shipping_address && <div className='border-b-[1px] border-b-slate-100 p-[10px_15px]'>
              <h6 className='text-[14px] font-semibold'>Shipping Address</h6>

              <h6 className='text-[14px] font-semibold'>{orderInfo.first_name + orderInfo.last_name}</h6>

               <h6 class="m-0 text-[13px]">
                {orderInfo.shipping_address.address}<br></br> 
                {orderInfo.shipping_address.city} - {orderInfo.shipping_address.zipcode}<br></br>
                {orderInfo.shipping_address.phone}
              </h6>
             </div>
            }

            {orderInfo.order_item && orderInfo.order_item.length != 0 && 
             <div className='border-b-[1px] border-b-slate-100 p-[10px_15px]'>
              <h6 className='text-[14px] font-semibold'>Order Items</h6>
              {orderInfo.order_item.map((d,index)=>{return(
                <div className={'flex items-center gap-[10px] py-[10px] border-b-[1px] border-b-slate-100 last:border-b-[0px]'} key={index}>
                    <div class="flex items-center flex-[0_0_calc(80%_-_10px)]">
                        <span class="qty">{d.quantity}</span>
                        <span class="qty mx-[10px]">*</span>
                        <span>
                            <h6 class="m-0 text-[13px] font-semibold">{d.item_name}</h6>
                            {d.variant_text && <h6 class="m-0 text-[12px] gray_color">{d.variant_text}</h6>}
                            <h6 class="text-[12px] gray_color">{formatter.format(d.price)}</h6>
                        </span> 
                    </div>
                    <h6 class="m-0 text-[13px] font-semibold text-end flex-[0_0_calc(20%_-_0px)]">{formatter.format(d.quantity * d.price) }</h6>
                </div>
               )})
              }
             </div>
            }

            <div className='border-b-[1px] border-b-slate-100 p-[10px_15px]'>
              <h6 className='text-[14px] font-semibold'>Payment Details</h6>
              
              <div className='flex flex-wrap  py-[10px] justify-between items-center'>
                      <h6 className='w-3/6 text-[14px] pb-[5px]'>Subtotal</h6>
                      <h6 className='w-3/6 text-[14px] text-end pb-[5px] text-medium'>{formatter.format(orderInfo.total_amount)}</h6>
                      <h6 className='w-3/6 text-[14px] pb-[5px]'>Shipping</h6>
                      <h6 className='w-3/6 text-[14px] text-end pb-[5px] text-medium'>Free</h6>
                      <h6 className='w-3/6 text-[14px] pb-[5px]'>GST</h6>
                      <h6 className='w-3/6 text-[14px] text-end pb-[5px] text-medium'>{formatter.format(orderInfo.total_tax_amount)}</h6>
                      <h6 className='border-t-[1px] border-t-slate-100 w-3/6 text-[14px] mt-[8px] py-[8px]'>Total</h6>
                      <h6 className='border-t-[1px] border-t-slate-100 w-3/6 text-[14px] text-end mt-[8px] py-[8px] text-medium'>{formatter.format(orderInfo.total_amount)}</h6>
                      <h6 className='w-3/6 text-[14px] font-semibold'>Outstanding Amount</h6>
                      <h6 className='w-3/6 text-[14px] text-end font-semibold'>{formatter.format(orderInfo.outstanding_amount)}</h6>
             </div>
             </div>
            
      
     

          </div>
        </div>
       }
     </Rodal>
    </div>
  )
}



const SkeletonLoader = () => {
  return (
   <div className="h-[100%] flex flex-col gap-[10px] items-center  justify-center">
     <div class="animate-spin rounded-full h-[40px] w-[40px] border-l-2 border-t-2 border-black"></div>
    <span className='text-[15px] gray_color'>Loading...</span>
   </div>
  )
}