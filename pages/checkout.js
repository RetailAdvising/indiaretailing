import RootLayout from '@/layouts/RootLayout'
import React, { useEffect, useState } from 'react'
import styles from'../styles/checkout.module.scss';
import { get_cart_items, get_country_list, get_country_states, get_customer_info, insert_address } from '@/libs/api';
import { check_Image } from '@/libs/common'
import Image from 'next/image'
import { checkMobile } from '@/libs/api';
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';

export default function checkout() {

  const payment_methods = [
    { card_number: '**** 7899', payment: 'Visa' },
    { card_number: '**** 7154', payment: 'Paytm' },
    { card_number: '**** 8369', payment: 'Razor Pay' },
  ];

  const [selectedOption, setSelectedOption] = useState('India');
  const [currentIndex, setIndex] = useState(-1);
  const [payment, setPaymentMethods] = useState(payment_methods);
  const [cart_items, setCartItems] = useState({});
  const [isMobile, setIsmobile] = useState(false);
  const [countryList, setCounty] = useState([]);
  const [stateList, setState] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({});


  useEffect(() => {
    getCartItem();
    get_country();
    customer_info();
    let value = checkMobile();
    setIsmobile(value)
  },[])

async function getCartItem(){
  const resp = await get_cart_items();
    if (resp && resp.message && resp.message.status == 'success') {
       let data = resp.message.cart
       setCartItems(data)
    }
}

async function customer_info(){
  let data = { guest_id: '',user: localStorage['customer_id'] };
  const resp = await get_customer_info(data);
    if (resp && resp.message && resp.message[0]) {
       let data = resp.message[0];
       setCustomerInfo(data);
    }
}

async function get_country(){
  const resp = await get_country_list();
    if (resp && resp.message && resp.message.length != 0) {
       let data = resp.message;
       setCounty(data);
       get_state(data[0].value);
    }
}

async function get_state(data){
  console.log(data)
  const resp = await get_country_states(data);
    if (resp && resp.message && resp.message.length != 0) {
       let data = resp.message
       setState(data);
    }
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
  //  setPaymentMethods(updatedItems);
  };

  const checkout = (e) =>{

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

  // const { register, handleSubmit, formState: { errors } } = useForm();

  // const onSubmit = (data) => {
  //   console.log('Form submitted:', data);
  // };

  const { handleSubmit, control, reset , formState: { errors } } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      state : '',
      city:'',
      country:'',
      company:'',
      phone:'',
      pincode:'',
      address:''
    }
  });

  const onSubmit = (data) => {
    data.zipcode = data.pincode;
    data.addr1 = data.address;
    data.is_default = false;
    let datas = {
      "name": "5185d91993",
      "owner": "x1testy1@gmail.com",
      "creation": "2023-08-29 18:53:38.553832",
      "modified": "2023-08-29 18:53:38.553832",
      "modified_by": "x1testy1@gmail.com",
      "parent": "CUST-00090",
      "parentfield": "table_6",
      "parenttype": "Customers",
      "idx": 0,
      "docstatus": 0,
      "first_name": "Test",
      "last_name": "",
      "house_type": "",
      "address": "100 lake view",
      "city": "chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "landmark": "",
      "zipcode": 600116,
      "is_default": 0,
      "door_no": null,
      "unit_number": null,
      "phone": 8608558005,
      "address_type": "Home",
      "latitude": null,
      "longitude": null,
      "doctype": "Customer Address"
  }
    customerInfo.address.push(datas);
    reset();
    setCustomerInfo(customerInfo);
  };

  async function insert_address(data) {
    const resp = await insert_address(data);
    if(resp && resp.message){
      console.log(resp.message);
      // customerInfo.address.push(resp.message);
      setCustomerInfo(
        {...customerInfo,address:customerInfo.address.push(resp.message)}
      )
      console.log(customerInfo);
    }
  }

  const selectAddress = (array,index) =>{
    array.map((res,i)=>{
      if(i == index){
        res.checked = true
      }else{
        res.checked = false
      }
    })
    setCustomerInfo(
      {...customerInfo,address:array}
    )
  }

  return (
    <>
      <RootLayout>
      <div className={`flex ${styles.container_} gap-[10px] py-[10px] container`}>
 
       <div className={`${styles.box_1}`}>
       
        <h6 className='text-[16px] font-semibold'>Billing Address</h6>

        {customerInfo && customerInfo.address && customerInfo.address.length != 0  && customerInfo.address.map((res,index)=>(
          <div onClick={() => { selectAddress(customerInfo.address,index) }} className='flex items-baseline py-[10px] gap-[10px]'>
            <input className={styles.input_radio} checked={res.checked} type="radio"/>
            <div >
              <span className='flex items-center'>
               <h6 className='m-0 font-[15px] font-semibold'>{res.first_name + ' ' + res.last_name}</h6>
              </span> 
              <p className='m-0 font-[14px] text-medium'>{res.address} <br></br> {res?.city}, {res?.state}, {res?.country} - {res?.zipcode}</p>
            </div>  
          </div>  
        ))}

        <form onSubmit={handleSubmit(onSubmit)}>

        <Controller
           name="country"
           control={control}
           render={({ field }) => 
           <Select className={`${styles.custom_input} custom-select_ w-full`} placeholder='Country'
            {...field} 
            options={countryList} 
           />}
          />
          
        <div className={`box_ flex gap-[10px]`}>
          <div className={`${styles.flex_2} `}>
            <Controller name="first_name" control={control} rules={{ required: 'First Name is required' }} render={({ field }) => ( <input className={`${styles.custom_input} w-full`} type="text" placeholder="First name" id="first_name" {...field} />)} />
            {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}
          </div>
          <div className={`${styles.flex_2} `}>
            <Controller name="last_name" control={control} rules={{ required: 'Last Name is required' }} render={({ field }) => ( <input className={`${styles.custom_input} w-full`} type="text" placeholder="Last name" id="last_name" {...field} />)} />
            {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}
          </div>
        </div>

        <Controller name="company" control={control} rules={{ required: 'Company is required' }} render={({ field }) => ( <input className={`${styles.custom_input} w-full`} type="text" placeholder="Company (Optional)" id="company" {...field} />)} />
        {errors.company && <p className="text-red-500">{errors.company.message}</p>}

        <Controller name="address" control={control} rules={{ required: 'Address is required' }} render={({ field }) => ( <input className={`${styles.custom_input} w-full`} type="text" placeholder="Address" id="address" {...field} />)} />
        {errors.address && <p className="text-red-500">{errors.address.message}</p>}


        <div className={`box_ flex gap-[10px]`}>
         <div className={`${styles.flex_3} `}>
          <Controller name="city" control={control} rules={{ required: 'City is required' }} render={({ field }) => ( <input className={`${styles.custom_input} w-full`} type="text" placeholder="City" id="city" {...field} />)} />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
         </div>
         
         <div className={`${styles.flex_3} `}>
          <Controller
           name="state"
           control={control}
           render={({ field }) => 
           <Select className={`${styles.custom_input} w-full`} placeholder='State'
            {...field} 
            options={stateList} 
           />}
          />
         </div>
      

         <div className={`${styles.flex_3} `}>
          <Controller name="pincode" control={control} rules={{ required: 'Zip Code is required' }} render={({ field }) => ( <input className={`${styles.custom_input} w-full`} type="text" placeholder="Last name" id="pincode" {...field} />)} />
          {errors.pincode && <p className="text-red-500">{errors.pincode.message}</p>}
         </div>

        </div>

        <Controller name="phone" control={control} rules={{ required: 'Phone is required' }} render={({ field }) => ( <input className={`${styles.custom_input} w-full`} type="text" placeholder="Phone (Required" id="phone" {...field} />)} />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

        <div class="flex mb-[15px] justify-center items-center">
            <button className={`primary_btn text-[14px] h-[40px] w-[50%]`} type="submit" >Save</button>
        </div>

        </form>

        <h6 className='text-[16px] font-semibold'>Payment Methods</h6>

        <div className={`flex ${styles.card_detail} py-[8px] gap-[10px]`}>
          {payment_methods.map((res,index) => (
            <div key={index} onClick={() => selectMethod(res,index)} className={`flex ${styles.payment_sec} ${styles.flex_3} ${index == currentIndex ? 'active_border' : null} h-[60px] items-center border rounded-[5px] p-[4px_10px] `}>
              <input className={styles.input_radio} checked={index == currentIndex} type="radio"/>
              
                {isMobile &&
                    <div  className={`flex justify-center items-center ${styles.sec_2}`}>
                      <img  className="h-[13px]" src={imageChange(res)} />
                   </div> 
                }
                {!isMobile &&
              <div  className={`flex ${styles.card_info}`}>
                <div  className={`${styles.sec_1}`}>
                  <h6 className='text-[14px] font-semibold'>{res.card_number}</h6> 
                  <h6 className={`${styles.sub_title}`}>{res.payment} <span className={`${styles.span_cls}`}>Edit</span></h6>  
                </div> 
                <div  className={`flex justify-center items-center ${styles.sec_2}`}>
                  <img  className="h-[13px]" src={imageChange(res)} />
                </div> 
              </div>
              }
            </div>
          ))}
      
        </div>

       </div>

       <div className={`${styles.box_2}`}>

       <div className='border rounded-[10px]'>

          <h6 className='text-[16px] pt-[10px] px-[10px]  font-semibold'>Your Orders</h6>
            {cart_items && cart_items.marketplace_items && cart_items.marketplace_items.map((res,index) =>(
              <div className="flex py-[10px] px-[25px] border-b-[1px] border-slate-200 last:border-b-[0px] gap-[7px] items-center">
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
               <h6 className='w-3/6 text-[14px] border-y-[1px] border-slate-200 text-end my-[8px] py-[8px] text-medium'>{formatter.format(cart_items.total)}</h6>

             </div>
     
             <div class="flex mb-[15px] justify-center items-center">
              <button className={`primary_btn text-[14px] h-[40px] w-[90%]`} onClick={() => checkout() }>Checkout Order</button>
             </div>

            </div>
         }
       </div>   
      </div>


      </RootLayout>
    </>
  )
}

