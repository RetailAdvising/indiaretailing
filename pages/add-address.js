import React, { useState, useEffect } from 'react'
import MobileHeader from '@/components/Headers/MobileHeader'
import styles from'../styles/checkout.module.scss';
import { get_customer_info } from '@/libs/api';
import AddressModal from '@/components/Bookstore/AddressModal';
import Image from 'next/image'
import { useDispatch, useSelector, Provider  } from 'react-redux'
// import customerInfoReducer from 'redux/reducers/customerInfoReducer'
import customerInfoAction from 'redux/actions/customerInfoAction'


export default function addAddress() {

  const customer = useSelector(s=>s.customer);
  const [customerInfo, setCustomerInfo] = useState(customer);
  const [editAddress, setEditAddress] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  // const userInfo = useSelector(s=>s.user);

  useEffect(() => {
    // console.log(userInfo);

    // customerInfo 
    if(customer && !customer.address){
      customer_info();
    }
  },[])

  async function customer_info(){
    let data = { guest_id: '',user: localStorage['customer_id'] };
    const resp = await get_customer_info(data);
      if (resp && resp.message && resp.message[0]) {
         let data = resp.message[0];
         setCustomerInfo(data);
      }
  }

  const selectAddress = async (array,index) =>{
    array.map((res,i)=>{
      if(i == index){
        res.is_default = 1;
      }else{
        res.is_default = 0
      }
    })
    setCustomerInfo(
      {...customerInfo,address:array}
    )

    dispatch(customerInfoAction(customerInfo))
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

   function show() {
     setVisible(true);
   }

   function hide(obj) {
    setVisible(false);
    console.log(obj);
    if(obj){
      
      if(customerInfo.address && customerInfo.address.length != 0 && obj.name){
        let addressIndex = customerInfo.address.findIndex((res)=>{ return res.name == obj.name });
        if(addressIndex >= 0){
          customerInfo.address[addressIndex] = obj;
        }else{
          customerInfo.address.push(obj);
        }
      }else{
        customerInfo.address.push(obj);
      }

      setCustomerInfo(
        {...customerInfo,address:customerInfo.address}
      )

    }
  }
 

  return (
    <>

    <div className="flex flex-col h-full">
      <header className="sticky bg-white top-0 z-99">  <MobileHeader Heading={'Address'}></MobileHeader></header>
     
      <main className="overflow-auto h-full">
        
      <h6 className='text-[16px] pt-[10px] px-[10px] font-semibold'>Select Billing Address</h6>
      {customerInfo && customerInfo.address && customerInfo.address.length != 0  && customerInfo.address.map((res,index)=>(
          <div key={index} className={`${styles.address_sec} flex border-b border-slate-200 cursor-pointer overflow-auto p-[10px_20px] gap-[5px]`}>
            <div onClick={() => { selectAddress(customerInfo.address,index) }} className={`flex items-baseline w-[85%] justify-between cursor-pointer gap-[8px]`}>
              <input className={styles.input_radio} checked={res.is_default} type="radio"/>
              <div className='w-full flex flex-col flex-wrap'>
                <span className='flex justify-between items-center'>
                  <h6 className='m-0 text-[15px]  capitalize font-semibold'>{res.first_name + ' ' + res.last_name}</h6>
                </span> 
                <p className='m-0 text-[14px] text-medium'>{res.address} <br></br> {res?.city}, {res?.state}, {res?.country} - {res?.zipcode}</p>
              </div>  
            </div>

            <div className='flex w-max justify-end'> 
                  <div onClick={() =>{edit_address(res,'Edit',index)}} className='cursor-pointer mr-[10px]'>
                    <Image className='h-[16px] w-[16px]' src="/Address/edit_gray.svg" height={17} width={17} layout="fixed" alt="Edit" />
                  </div> 
                  <div onClick={() =>{edit_address(res,'Delete',index)}} className='cursor-pointer'>
                    <Image className='w-[16px]' src="/delete.svg" height={20} width={18} layout="fixed" alt="Ddelete" />
                  </div> 
                  
            </div>  
          </div>  
        ))}


      {visible &&
        <AddressModal edit_address={editAddress} visible={visible} hide={(obj)=> hide(obj)} />
      }
      </main>

      <footer className="sticky bg-white bottom-0 z-99">
      <div class="flex my-[15px] justify-center items-center">
            <button className={`primary_btn text-[14px] h-[40px] w-[90%]`} onClick={() => show() }>Add new billing address</button>
      </div>
      </footer>
    </div>
   

     



     
      
    </>
  )
}
