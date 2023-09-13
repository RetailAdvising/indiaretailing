import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
import Image from 'next/image'
import { useForm } from 'react-hook-form';
import styles from '@/styles/Components.module.scss'
import { insert_doc } from '@/libs/api';

export default function Editprofile({ customerInfo }) {
  
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm();

  async function signup(data) {
          if(data){
            console.log(data);
            updateProfile(data)
          } 
  }
  
  async function updateProfile(values){
    let data = { "doctype":"Customers", name:customerInfo['name'] , first_name :values.first_name, last_name :values.last_name}
    const res = await insert_doc(data);
    console.log(res)
  }  

  return (
    <>
      <div className={`flex-col flex justify-center lg:w-[50%]`}>
            <form onSubmit={handleSubmit((data) => signup(data))} autoComplete='off'>
                <div className={`flex flex-col py-[10px] relative`}>
                    <label className={`text-[14px] font-semibold`} htmlFor='first_name' >First Name</label>
                    <input placeholder='First Name' defaultValue={customerInfo.first_name ? customerInfo.first_name : ''} className={`h-[40px] rounded-[5px] gray_color px-[10px] mt-[5px] text-[14px]`} {...register('first_name', { required: { value: true, message: 'Full Name is required' } },)} />
                    {errors?.first_name && <p className={`${styles.danger}`}>{errors.first_name.message}</p>}
                </div>

                <div className={`flex flex-col pb-[10px] relative`}>
                    <label className={`text-[14px] font-semibold`} htmlFor='first_name' >Last Name</label>
                    <input placeholder='Last Name' defaultValue={customerInfo.last_name ? customerInfo.last_name : ''} className={`h-[40px] rounded-[5px] gray_color px-[10px] mt-[5px] text-[14px]`} {...register('last_name')} />   
                </div>

                <div className={`flex flex-col pb-[10px] relative`}>
                    <label className={`text-[14px] font-semibold`} htmlFor='mobile' >Mobile Number</label>
                    <input readOnly  placeholder='Mobile Number' defaultValue={customerInfo.phone ? customerInfo.phone : ''} className={`h-[40px] rounded-[5px] gray_color px-[10px] mt-[5px] text-[14px]`} {...register('phone')} />
                    {/* { required: { value: true, message: 'Mobile Number is required' }, pattern: { value: /^\d{10}$/, message: "Please enter a valid Mobile Number" } } */}
                    {/* {errors?.phone && <p className={`${styles.danger}`}>{errors.phone.message}</p>} */}
                </div>

                <div className={`flex flex-col pb-[10px] relative`}>
                    <label className={`text-[14px] font-semibold`} htmlFor='email' >Email</label>
                    <input readOnly  defaultValue={customerInfo.email ? customerInfo.email : ''} className={`h-[40px] rounded-[5px] gray_color px-[10px] mt-[5px] text-[14px]`} {...register('email')} />
                    {/* , { required: { value: true, message: 'Email is required' }, pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Please enter a valid email" } }, */}
                    {/* {errors?.email && <p className={`${styles.danger}`}>{errors.email.message}</p>} */}
                </div>
            
                <div className='w-[60%] m-[0px_auto] mt-[10px]'>
                   <button type="submit" className={`${styles.loginBtn}`}>Save</button>
                </div> 

            </form>
      </div>
    </>
  )
}