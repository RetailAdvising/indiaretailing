import RootLayout from '@/layouts/RootLayout'
import React, {useEffect, useState } from 'react'
import styles from'../styles/checkout.module.scss';
import { get_cart_items, get_customer_info, stored_customer_info, get_payment_method, delete_address, get_razorpay_settings, load_razorpay, insertOrder } from '@/libs/api';
import { check_Image } from '@/libs/common'
import Image from 'next/image'
import { checkMobile } from '@/libs/api';
import AddressModal from '@/components/Bookstore/AddressModal';
import Address from '@/components/Bookstore/Address';
import AlertUi from '@/components/Common/AlertUi';
import { format } from 'date-fns';
import { useRouter } from 'next/router'
import { useDispatch, useSelector, Provider  } from 'react-redux'
import customerInfoAction from 'redux/actions/customerInfoAction'
import alertAction from 'redux/actions/alertAction'

export default function checkout() {


  const [selectedOption, setSelectedOption] = useState('India');
  const [currentIndex, setIndex] = useState(-1);
  const [payment_methods, setPaymentMethods] = useState([]);
  const [cart_items, setCartItems] = useState({});
  let [isMobile, setIsmobile] = useState();
  const [customerInfo, setCustomerInfo] = useState({});
  const [editAddress, setEditAddress] = useState(undefined);
  const router = useRouter();
  const customer = useSelector(s=>s.customer);
  // const userInfo = useSelector(s=>s.user);

  const dispatch = useDispatch()
  
  let [localValue, setLocalValue] = useState(undefined);

  
  useEffect(() => {
    // console.log(userInfo);
    getCartItem();
    customer_info();
    get_payments();
    let localValue = stored_customer_info()
    setLocalValue(localValue);
    get_razorpay_settings();	
    checkIsMobile();
    window.addEventListener('resize',checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  },[])

const  checkIsMobile = async () => {
  isMobile = await checkMobile();
  setIsmobile(isMobile);
  console.log('isMobile',isMobile)
}

  async function getCartItem(){
    const resp = await get_cart_items();
      if (resp && resp.message && resp.message.status == 'success') {
          let data = resp.message.cart
          setCartItems(data)
      }
  }

  async function get_payments(){
    const resp = await get_payment_method();
      if (resp && resp.message && resp.message.length != 0) {
          let data = resp.message
          setPaymentMethods(data)
      } 
  }


// let customer_info_mobile = {};  

async function customer_info(){
  console.log('customer',customer);
  if(customer && customer.address && customer.address.length != 0){
    check_info(customer);
  }else{
    let data = { guest_id: '',user: localStorage['customer_id'] };
    const resp = await get_customer_info(data);
      if (resp && resp.message && resp.message[0]) {
         isMobile ? dispatch(customerInfoAction(resp.message[0])) : null;
         let data = resp.message[0];
         check_info(data)
      }
  }
}

function check_info(data){


  if(isMobile && data.address && data.address.length != 0){
    let is_default = data.address.filter((res)=>{return res.is_default == 1})
    if(is_default && is_default.length != 0){
      // data.address = is_default;
    }else{
      data.address[0].is_default = 1;
      // let is_default = data.address.filter((res)=>{return res.is_default == 1})
      // data.address = is_default
    }
  }
 setCustomerInfo(data);
}

function goToAddres(){
  router.push('/add-address');
}

  const [name, setName] = useState('');
  const options = [
    { label: 'India', value: 'India' },
  ];

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const selectMethod = (e,index) =>{
    setIndex(index);
  };

  const checkout = (e) =>{
    check_checkout_values()
  }

  const alert = useSelector(s=>s.alert);
  const alert_dispatch = useDispatch()
  const [alertMsg, setAlertMsg] = useState('')

  function closeModal(value) {
    alert_dispatch(alertAction(false))

    if('Yes'){

    }
  }


  function check_checkout_values(){
    let check_address = (customerInfo.address && customerInfo.address.length != 0) ?  customerInfo.address.find((res)=> {return res.is_default == 1}) : undefined
    
    if(!check_address){
      setAlertMsg('Please select Billing address')
      alert_dispatch(alertAction(true))
      // openModal();
      // dispatch(openDialog('OPEN_DIALOG'))
    }else if(currentIndex < 0){
      setAlertMsg('Please select Payment Method');
      alert_dispatch(alertAction(true))
      // openModal()
    }else{
      pay(check_address)
    }

  }

  async function pay(check_address){
    var orderdata = {
      "customer_name": localStorage['customer_id'],
      "order_type" : "Shopping Cart",
      "bill_addr" : check_address.name ?  check_address.name :  check_address.name,
      "ship_addr" : check_address.name,
      "payment_method" : payment_methods[currentIndex].name,
      "payment_gateway_charges" : "",
      "order_date" : format(new Date(), 'yyyy/MM/dd'),
      "slot_time" : 0,
      "from_time" : null,
      "to_time" : null,
      "date" : null,
      "coupon_code" : '',

      // "order_date" : formatDate(new Date(), 'yyyy/MM/dd', 'en'),
      // "shipping_charge" : this.db.shipping_settings.shipping_charges,
      // "shipping_method" : this.db.shipping_settings.selected_shipping_method,
      // "order_time" : this.time,
      // "discount_amount" : this.db.discounts.discount_amount + this.db.coupon_discounts.discount_amount,
      // "discount" : this.db.discounts.discount,
      // "discount_free_products" : this.db.coupon_discounts.discount_products,
      // "order_from" : this.db.current_device,
      // "checkout_attributes" : this.selected_checkout_attributes,
      // "manual_wallet_debit": this.wallet_amount > 0 ? 1 : 0, 
    
      // "loyalty_points" : this.loyalty_settings && this.loyalty_settings.selected_royalty ?this.loyalty_settings.selected_royalty.noof_points:0,
      // "loyalty_amount" : this.loyalty_settings && this.loyalty_settings.selected_royalty ?this.loyalty_settings.selected_royalty.amount:0 ,
      // "redeem_loyalty_points" : this.royalty_amount > 0 ? true:false,
      // 'delivery_slots' : ''
   }

   const resp = await insertOrder(orderdata);
      if (resp && resp.message && resp.message.status == 'Success') {
          let data = resp.message
          load_razorpay(data.message.order.outstanding_amount,data.message.order.name,);
      } 

  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  });

  const imageChange = (e) =>{
    // console.log(e);
    let value = '/visa.svg';
     if(e.payment == 'Visa'){
      value = '/visa.svg'
     }else if(e.payment == 'Paytm'){
      value = '/paypal.svg'
     }else if(e.payment == 'Razor Pay'){
      value = '/Razorpay.svg'
     }   
    return value; 
  };

  const selectAddress = (array,index) =>{
    array.map((res,i)=>{
      if(i == index){
        res.is_default = 1
      }else{
        res.is_default = 0
      }
    })
    setCustomerInfo(
      {...customerInfo,address:array}
    )
  }

  // Modal
  const [visible, setVisible] = useState(false)

  function show() {
    setVisible(true);
  }

  function hide(obj) {
    setVisible(false);
    if(obj){
      
      if(customerInfo.address && customerInfo.address.length != 0 && obj.name){
        let addressIndex = customerInfo.address.findIndex((res)=>{ return res.name == obj.name });
        if(addressIndex >= 0){
          customerInfo.address[addressIndex] = obj;
        }else{
          customerInfo.address.push(obj);
        }
      }else{
        isMobile ? obj.is_default = 1 : null;
        customerInfo.address.push(obj);
      }

      setCustomerInfo(
        {...customerInfo,address:customerInfo.address}
      )
      // setCustomerInfo(customerInfo);
    }
  }



  function edit_address(res,type,index){
    if(type == 'New'){
      setEditAddress(undefined);
      show();
    }else if(type == 'Edit'){
      setEditAddress(res);
      show();
    }else if(type == 'Delete'){
      deleteAddress(res,index);
    }

  }

  async function deleteAddress(delete_obj,index) {
    console.log(delete_obj)
    let data ={ "id": delete_obj.name,"customer": localStorage['customer_id']}
    const resp = await delete_address(data);
    if(resp && resp.message && resp.message == 'Success'){
      customerInfo.address.splice(index,1);
      setCustomerInfo(
        {...customerInfo,address:customerInfo.address}
      )
    }
  }

  return (
    <>
       <RootLayout checkout={true}>
       {alert.isOpen && 
            <AlertUi isOpen={alert.isOpen} closeModal={(value)=>closeModal(value)} headerMsg={'Alert'} button_2={'Ok'} alertMsg={alertMsg} /> 
       }

      <div className='border-t-[1px] border-slate-200 pt-[25px]'>
           <div className={`flex ${styles.container_} gap-[20px] py-[10px] container`}>

              <div className={`${styles.box_1}`}>

              <div className='flex lg:bg-slate-100 h-[45px] px-[10px] rounded-md items-center'>
                  <span className='flex items-center justify-center w-[25px]'><Image className='h-[23px] object-contain' src="/checkout/login.svg" height={20} width={20} layout="fixed" alt="Edit" /></span>
                  <h6 className='text-[16px] ml-[10px] font-semibold' >Login / Register</h6>
              </div>

              <div className={`${styles.address_sec} ${isMobile ? null : 'w-[95%] m-[0px_8px_auto_auto] '} py-[10px] cursor-pointer justify-between  gap-[5px]`}>
               {localValue && localValue['cust_name'] && <p className='m-0 text-[14px] text-medium'>{localValue['cust_name']}</p> }
               {localValue && localValue['cust_email'] && <p className='m-0 text-[14px] py-[5px] text-medium'>{localValue['cust_email']}</p> }
               {localValue && localValue['phone'] && <p className='m-0 text-[14px] text-medium'>{localValue['phone']}</p> }
              </div> 


                <div className='flex justify-between lg:bg-slate-100 h-[43px] px-[10px] rounded-md items-center'>
                  <div className='flex'>
                  <span className='flex items-center justify-center w-[25px]'><Image className='h-[23px] object-contain' src="/checkout/Billing.svg" height={20} width={20} layout="fixed" alt="Edit" /></span>
                   <h6 className='text-[16px] ml-[10px] font-semibold' >Billing Address</h6>
                  </div>
                  {customerInfo && customerInfo.address && customerInfo.address.length != 0  &&
                    <button className={`${styles.add_new} ${isMobile ? 'text-[14px] font-semibold primary_color' : 'border rounded-[5px] py-[2px] px-[7px] text-[14px] text-medium'}`} onClick={()=>isMobile ? goToAddres() : edit_address(undefined,'New','')} >{isMobile ? 'Edit' : 'Add New'}</button>  
                  }
                </div>

                {customerInfo && customerInfo.address && customerInfo.address.length != 0  && customerInfo.address.map((res,index)=>(

                    <div key={index} className={`${styles.address_sec} ${(isMobile && res.is_default != 1) ? 'hidden' : null}  flex cursor-pointer justify-between ${isMobile ? null : 'w-[95%] m-[0px_8px_auto_auto] '} py-[10px] gap-[5px]`}>
                      <div onClick={() => { selectAddress(customerInfo.address,index) }} className={`flex w-full justify-between cursor-pointer gap-[10px]`}>
                        {!isMobile && <input className={styles.input_radio} checked={res.is_default} type="radio"/>}
                        <div className='w-full'>
                          <span className='flex justify-between items-center'>
                            <h6 className='m-0 text-[15px]  capitalize font-semibold'>{res.first_name + ' ' + res.last_name}</h6>
                          </span> 
                          <p className='m-0 text-[14px] text-medium'>{res.address} <br></br> {res?.city}, {res?.state}, {res?.country} - {res?.zipcode}</p>
                        </div>  
                      </div>

                      {!isMobile && 
                        <div className='flex items-center'> 
                            <div onClick={() =>{edit_address(res,'Edit',index)}} className='flex cursor-pointer mr-[15px] items-center'>
                              <span className={`${styles.edit_text} text-[12px] mr-[5px]`}>Edit</span>
                              <Image className='h-[14px]' src="/edit.svg" height={14} width={15} layout="fixed" alt="Edit" />
                            </div> 
                            <div onClick={() =>{edit_address(res,'Delete',index)}} className='flex cursor-pointer  items-center'>
                              <span className={`${styles.delete_text} text-[12px] mr-[5px]`}>Delete</span>
                              <Image className='h-[14px]' src="/delete.svg" height={14} width={15} layout="fixed" alt="Ddelete" />
                            </div> 
                            
                        </div>  
                      }
                    </div>  

                ))}

                {customerInfo && customerInfo.address && customerInfo.address.length == 0 &&
                  <Address hide={(obj)=> hide(obj)} />
                }

                {visible &&
                  <AddressModal edit_address={editAddress} visible={visible} hide={(obj)=> hide(obj)} />
                }

                <div className='flex lg:bg-slate-100 flex items-center h-[43px] px-[10px] rounded-md'>
                   <span className='flex items-center justify-center w-[25px]'><Image className='h-[23px] object-contain' src="/checkout/payment.svg" height={20} width={20} layout="fixed" alt="Edit" /></span>
                   <h6 className='text-[16px] ml-[10px] font-semibold' >Payment Methods</h6>
                  </div>

                <div className={`flex ${styles.card_detail} ${isMobile ? null : 'w-[95%] m-[0px_8px_auto_auto]'} py-[10px] gap-[10px]`}>
                  {payment_methods.map((res,index) => (
                    <div key={index} onClick={() => selectMethod(res,index)} className={`flex ${styles.payment_sec} ${isMobile ? 'w-max' : 'w-[15%]'} ${index == currentIndex ? 'active_border' : null} h-[50px] cursor-pointer items-center border rounded-[5px] p-[4px_10px] `}>
                      <input className={styles.input_radio} checked={index == currentIndex} type="radio"/>
                    
                      <div  className={`flex justify-center items-center ${styles.sec_2}`}>
                        <img  className="h-[13px]" src={check_Image(res.logo)} />
                      </div> 
                        
                      {/* {!isMobile &&
                      <div  className={`flex ${styles.card_info}`}>
                        <div  className={`${styles.sec_1}`}>
                          <h6 className='text-[14px] font-semibold'>{res.card_number}</h6> 
                          <h6 className={`${styles.sub_title}`}>{res.payment} <span className={`${styles.span_cls}`}>Edit</span></h6>  
                        </div> 
                        <div  className={`flex justify-center items-center ${styles.sec_2}`}>
                          <img  className="h-[13px]" src={imageChange(res)} />
                        </div> 
                      </div>
                      } */}
                    </div>
                  ))}

                </div>

              </div>

              <div className={`${styles.box_2}`}>

                <div className='border rounded-[10px]'>

                  <h6 className='text-[16px]  pt-[10px] px-[10px]  font-semibold'>Your Orders</h6>
                    {cart_items && cart_items.marketplace_items && cart_items.marketplace_items.map((res,index) =>(
                      <div key={index} className="flex py-[10px] px-[25px] border-b-[1px] border-slate-200 last:border-b-[0px] gap-[7px] items-center">
                        <div className="relative w-1/4">
                          <Image  src={check_Image(res.image)} height={130} width={130} layout="fixed" alt={res.name} />
                          <span className="absolute inline-flex items-center justify-center w-[24px] h-[24px] text-[12px] border border-slate-400 font-bold text-black bg-white rounded-full -top-2 -right-2">{res.quantity}</span>
                        </div>
                        <div className="w-3/4">
                          <h6 className='font-semibold line-clamp-2 opacity-[70px] text-[15px]'>{res.item}</h6>
                          <h6 className='font-semibold pt-[5px] text-[15px]'>Rs {res.price}</h6>
                        </div>
                      </div>
                    ))}

                </div>

                {cart_items && 
                    <div className='border mt-[10px] rounded-[10px]'>

                    <h6 className='text-[16px] pt-[10px] px-[10px] font-semibold'>Discount Code</h6>
                  
                    {/* border-sky-600 */}
                    <div className="flex border h-[40px]  rounded-[5px] py-[5px] px-[7px] mt-[10px] mr-[10px] ml-[10px] items-center">
                      <Image className='' src={imageChange('Visa')} height={10} width={30} layout="fixed" />
                      <input className={`border-transparent !important text-[14px] mx-[5px] w-[217px]`} type="text" placeholder="Enter the coupon code" value={name}  onChange={handleNameChange} />
                      <button className='button text-end text-[14px] text-sky-400 font-semibold w-1/4'>Apply</button>
                    </div> 

                    <div className='flex flex-wrap  py-[10px] px-[25px] justify-between items-center'>
                      <h6 className='w-3/6 text-[14px] pb-[5px]'>Subtotal</h6>
                      <h6 className='w-3/6 text-[14px] text-end pb-[5px] text-medium'>{formatter.format(cart_items.total)}</h6>
                      <h6 className='w-3/6 text-[14px] pb-[5px]'>Shipping</h6>
                      <h6 className='w-3/6 text-[14px] text-end pb-[5px] text-medium'>Free</h6>
                      <h6 className='w-3/6 text-[14px] pb-[5px]'>GST</h6>
                      <h6 className='w-3/6 text-[14px] text-end pb-[5px] text-medium'>{formatter.format(cart_items.tax_rate)}</h6>

                      <h6 className='w-3/6 text-[14px] border-y-[1px] border-slate-200 my-[8px] py-[8px]'>Total</h6>
                      <h6 className='w-3/6 text-[14px] border-y-[1px] border-slate-200 text-end my-[8px] py-[8px] text-medium'>{formatter.format(cart_items.total + cart_items.tax_rate)}</h6>

                    </div>

                    <div class="flex mb-[15px] justify-center items-center">
                    <button className={`primary_btn text-[14px] h-[40px] w-[90%] hover:bg-red-200 focus:outline-none focus-visible:ring-2`} onClick={() => checkout() }>Checkout Order</button>
                    </div>

                  </div>
                }
              </div>   

          </div>
      </div>  



      </RootLayout>
    </>
  )
}

