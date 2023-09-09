import React, {useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
import Image from 'next/image'
import {  get_order_info, getColor } from '@/libs/api';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

export default function OrderDetail({hide,visible,order_id}) {
  
    const [orderInfo,setOrderInfo] = useState([]);

    useEffect(() => {
        order_info(order_id);
    },[])  

    async function order_info(order_id){
        let data = { order_id: order_id};
        const resp = await get_order_info(data);
          if (resp && resp.message && resp.message.info) {
            setOrderInfo(resp.message.info);
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
      <Rodal visible={visible} animation='slideUp' onClose={()=>{hide(undefined)}}>
       { orderInfo && 
       <div className='flex flex-col h-[100%]'>
          <div className='header h-[45px] border-b-[1px] border-b-slate-100 flex items-center px-[10px]'>
            <h6 className='text-[16px] font-semibold'>Order Detail({orderInfo.name})</h6>
          </div>
          <div className='body_sec h-[100%] overflow-auto scrollbar-hide'>

            <div className='border-b-[1px] border-b-slate-100 p-[10px]'>
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

           {orderInfo.shipping_address && <div className='border-b-[1px] border-b-slate-100 p-[10px]'>
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
             <div className='border-b-[1px] border-b-slate-100 p-[10px]'>
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

            <div className='border-b-[1px] border-b-slate-100 p-[10px]'>
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



// <div *ngIf="order_detail" class="order_detail_section">
// <div class="sec-br header_s">
//   <div class="d__flex just-s">
//      <h6 class="m-0 medium_name">{{order_detail.order_id}}</h6>

//      <div class="d__flex sec-d">
//          <p class="m-0 order_status__" [ngClass]="db.get_style(order_detail.status)">{{order_detail.status}}</p>
//          <span *ngIf="!db.ismobile" (click)="db.download_order_invoices(order_detail.order_id)" class="download_icon mouse"><ion-icon  src="/assets/icon/download_b.svg" ></ion-icon></span>
//      </div>

//   </div>
//   <h6 class="m-0 date_ medium_name-14-400 gray_cr">{{ order_detail.order_date | date :'MMM d, y' }}</h6>
//   <p  class="m-0 split_section__ medium_name-13-400">
//      <span class="span span_r medium_name-13-400"> <ion-icon [src]="'/assets/order/' + 'delivery'+'.svg'"></ion-icon> {{ order_detail.shipping_method_name}}</span>
//      <span class="span span_r medium_name-13-400"><ion-icon [src]="'/assets/order/' + (order_detail.payment_method_name == 'Razor Pay' ? 'razorpay' :  'cash')+'.svg'"></ion-icon> {{ order_detail.payment_method_name}}</span>
//      <span class="span span_r medium_name-13-400"><span [class.success]="order_detail.payment_status == 'Paid'"
//        [class.pending]="order_detail.payment_status == 'Pending'"
//        [class.order-shipped]="order_detail.payment_status == 'Partially Paid'" [class.order-shipped]="order_detail.payment_status == 'Partially Refunded'" [class.order-shipped]="order_detail.payment_status == 'Refunded'" class="dot"></span>{{ order_detail.payment_status }}</span>
//   </p>

// </div>

// <div *ngIf="order_detail.shipping_address" class="sec-br address">

//  <h6 class="m-0 heading_ bold_name-15">Shipping Address</h6>

//  <h6 class="m-0 cust_name medium_name-13"> {{order_detail.store_name}}</h6>
//  <p class="m-0 addr_txt medium_name-13">
//      {{order_detail.shipping_address.address}}
//      <br> {{order_detail.shipping_address.city}} - {{order_detail.shipping_address.zipcode}} <br>
//      {{order_detail.shipping_address.phone}}
//  </p>
// </div>

// <div class="sec-br item_detail-s">

//      <h6 class="m-0 heading_ bold_name-15">Item Detail</h6>

//      <div class="item_detail d__flex just-s" *ngFor="let d of (order_detail.Items || order_detail.items || order_detail.order_item || order_detail.order_items)">

//          <div class="product_name">

//              <span class="qty">{{d.quantity}}</span>
//              <span class="symbol"></span>
//              <span class=item_name_detail>
//                  <h6 class="m-0 item_name medium_name-14-400 webkit-text" [style.--line]="2">{{d.item_name}}</h6>
//                  <h6 *ngIf="d.variant_text" [style.--line]="1" class="m-0 webkit-text small_name-400 gray_cr">{{d.variant_text}}</h6>
//                  <h6 *ngIf="d.brand_name" class="m-0 item_name medium_name-14-400 webkit-text" [style.--line]="2">Brand: <span class="available_store"> {{d.brand_name}}</span></h6>
//                  <h6 *ngIf="d.item_sku" class="m-0 item_name sans-font medium_name-14-400 webkit-text" [style.--line]="2">SKU: <span class="available_store"> {{d.item_sku}}</span></h6>
//                  <div class="d__flex price_details">
//                     <h6 *ngIf="d.price" class="m-0 price_ sans-font">{{d.price | currency:db.website_settings.currency}}</h6>
//                     <h6 *ngIf="d.old_price" class="m-0 old_price sans-font">{{d.old_price | currency:db.website_settings.currency}}</h6>
//                  </div>   
//              </span> 
//          </div>
//          <h6 class="m-0 bold_name-14 gray_cr sans-font">{{(d.quantity * d.price) | currency:db.website_settings.currency}}</h6>

//      </div>
 
// </div>

// <div *ngIf="order_detail.delivery_slots && order_detail.delivery_slots.length > 0" class="sec-br item_detail-s delivery__slot">

//      <h6 class="m-0 heading_ bold_name-15">Delivery Slot</h6>

//      <div class="d__flex delivery-sec" *ngFor="let item of order_detail.delivery_slots">
//          <h6 class="m-0 medium_name-13 pr-10">{{item.order_date | date :'MMM-dd,yyyy'}}</h6>
//          <h6 class="m-0 medium_name-13 pr-10">{{formatAMPM(item.from_time)}}</h6>
//          <h6 class="m-0 medium_name-13" *ngIf="item.from_time != item.to_time">{{formatAMPM(item.to_time)}}</h6>
//      </div>
// </div>


// <div class="sec-br payment_details-s">
//   <h6 class="m-0 heading_ bold_name-15">Payment Detail</h6>

//  <div class="d__flex payment-sec">
//      <!-- <span class="payment">Payment Method</span>
//      <span class="payment">{{order_detail.payment_method_name}}</span> -->
//      <span class="payment">Total Items</span>
//      <span class="payment">{{order_detail.Items && order_detail.Items.length || order_detail.order_items &&order_detail.order_items.length}}</span>
//      <span class="payment">Sub Total</span>
//      <span class="payment">{{order_detail.sub_total | currency:db.website_settings.currency}}</span>
//      <span class="payment">Delivery Charges</span>
//      <span class="payment">{{order_detail.shipping_charges | currency:db.website_settings.currency}}</span>
//      <span *ngIf="order_detail.discount" class="payment">Discount</span>
//      <span *ngIf="order_detail.discount" class="payment">{{order_detail.discount | currency:db.website_settings.currency}}</span>
//      <span *ngIf="order_detail.custom_discount" class="payment">You Saved (Discount)</span>
//      <span *ngIf="order_detail.custom_discount" class="payment">{{order_detail.custom_discount | currency:db.website_settings.currency}}</span>
//      <span *ngIf="order_detail.total_tax_amount" class="payment">Tax {{(db.website_settings && db.website_settings.included_tax) ? '(Incl. Tax)' : ''}}</span>
//      <span *ngIf="order_detail.total_tax_amount" class="payment">{{order_detail.total_tax_amount | currency:db.website_settings.currency}}</span>

//      <span *ngIf="order_detail.paid_using_wallet && order_detail.paid_using_wallet > 0" class="payment">Paid Using Wallet</span>
//      <span *ngIf="order_detail.paid_using_wallet && order_detail.paid_using_wallet" class="payment">{{order_detail.paid_using_wallet | currency:db.website_settings.currency}}</span>

//      <span *ngIf="order_detail.redeem_loyalty_points == 1 && order_detail.loyalty_amount" class="payment">Loyalty Amount ({{order_detail.loyalty_points}} pts)</span>
//      <span *ngIf="order_detail.redeem_loyalty_points == 1 && order_detail.loyalty_amount " class="payment">{{order_detail.loyalty_amount | currency:db.website_settings.currency}}</span>

//  </div> 

//  <div *ngIf="order_detail.additional_charges && order_detail.additional_charges.length != 0" class="addtion_pay">
  
//      <h6 class="m-0 sub_heading_ medium_name-15-500">Additional Charges</h6>
    
//      <div *ngFor="let item of order_detail.additional_charges" class="d__flex payment-sec">
//          <span class="payment">{{item.charge_name}}</span>
//          <span class="payment">{{item.amount | currency:db.website_settings.currency}}</span>
//      </div>
//  </div>
  
//  <div class="d__flex border-t payment-sec">
//      <span class="payment">Total</span>
//      <span class="payment">{{order_detail.total_amount | currency:db.website_settings.currency}}</span>
//      <span class="payment">Paid Amount</span>
//      <span class="payment">{{(order_detail.paid_amount ? order_detail.paid_amount : 0) | currency:db.website_settings.currency}}</span>
//      <span class="payment bold_name-14 ">Outstanding amount</span>
//      <span class="payment bold_name-14 ">{{order_detail.outstanding_amount | currency:db.website_settings.currency}}</span>
//  </div> 
// </div>

// <div *ngIf="order_detail && order_detail.customer_status == 'Active'" class="buttons_sec" [class.cust_order]="cust_order">
//  <ion-button class="cancel_order" *ngIf=" allow_cancel_order" fill="clear" (click)="cancel_order(order_detail.order_id)">Cancel Order</ion-button>
//  <ion-button class="reorder" *ngIf="!thank_you && db.website_settings && db.website_settings.enable_reorder == 1" fill="clear" (click)="reorder(order_detail)">Reorder</ion-button>
//  <!-- db.ismobile ? reorder(order_detail) : reorder_(order_detail) -->
// </div>

// </div> 