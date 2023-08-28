import RootLayout from '@/layouts/RootLayout'
import React, { useEffect, useState } from 'react'
import styles from'../styles/checkout.module.scss';

export default function checkout() {

  const payment_methods = [
    { card_number: '**** 7899', payment: 'Visa' },
    { card_number: '**** 7154', payment: 'Paytm' },
    { card_number: '**** 8369', payment: 'Razor Pay' },

  ];

  const [selectedOption, setSelectedOption] = useState('India');
  const [payment, setPaymentMethods] = useState(payment_methods);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');



  const options = [
    { label: 'India', value: 'India' },
  ];



  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const selectMethod = (e) =>{
   console.log(e);
    const updatedItems = payment.map((item) =>
      item.card_number === e.card_number ? { ...item, select: true } : item
    );
   setPaymentMethods(updatedItems);
  };

  const imageChange = (e) =>{
    console.log(e)
    let value = ''
     if(e.payment == 'Visa'){
      value = '/visa.svg'
     }else if(e.payment == 'Paytm'){
      value = '/paypal.svg'
     }else if(e.payment == 'Razor Pay'){
      value = '/Razorpay.svg'
     }   
    return value; 
  };

  return (
    <>
      <RootLayout>
      <div className={`flex ${styles.container_} gap-[10px] py-[10px] container`}>
 
       <div className={`${styles.box_1}`}>
        <h6 className='text-[15px] font-semibold'>Billing Address</h6>

        <form className={styles.forms}>
          <select className={`${styles.custom_input} ${styles.custom_select}`} onChange={handleDropdownChange}>
            {options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>

          <div className={`flex gap-[10px]`}>
            <input className={`${styles.custom_input} ${styles.flex_2}`} type="text" placeholder="First name" value={name}  onChange={handleNameChange} />
            <input className={`${styles.custom_input} ${styles.flex_2}`} type="text" placeholder="Last name"value={email} onChange={handleEmailChange} />
          </div>

          <input className={`${styles.custom_input}`} type="text" placeholder="Company (Optional)"value={email} onChange={handleEmailChange} />
          <input className={`${styles.custom_input}`} type="text" placeholder="Address"value={email} onChange={handleEmailChange} />

          <div className={`flex gap-[10px]`}>
            <input className={`${styles.custom_input} ${styles.flex_3}`} type="text" placeholder="City" value={name}  onChange={handleNameChange} />
           
            <select className={`${styles.custom_input} ${styles.custom_select} ${styles.flex_3}`} onChange={handleDropdownChange}>
            {options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>

            <input className={`${styles.custom_input} ${styles.flex_3}`} type="text" placeholder="Zip code" value={email} onChange={handleEmailChange} />
          </div>
          
          <input className={`${styles.custom_input}`} type="number" placeholder="Phone (Required)"value={email} onChange={handleEmailChange} />

        </form>

        <h6 className='text-[15px] font-semibold'>Payment Methods</h6>

        <div className={`flex ${styles.card_detail} py-[8px] gap-[10px]`}>
          {payment_methods.map((res,index) => (
            <div onClick={() => selectMethod(res)} className={`flex ${styles.payment_sec} ${styles.flex_3} ${res.select ? 'active_border' : null} border rounded-[5px] p-[4px_10px] `}>
              <input type="radio"/>
              <div  className={`flex ${styles.card_info}`}>
                <div  className={`${styles.sec_1}`}>
                  <h6 className='text-[14px] font-semibold'>{res.card_number}</h6> 
                  <h6 className={`${styles.sub_title}`}>{res.payment} <span className={`${styles.span_cls}`}>Edit</span></h6>  
                </div> 
                <div  className={`flex justify-center items-center ${styles.sec_2}`}>
                  <img  className="h-[13px] " src={imageChange(res)} />
                </div> 
              </div>
            </div>
          ))}
      
        </div>

       </div>

       <div className={`${styles.box_2}`}></div>

      </div>


      </RootLayout>
    </>
  )
}

