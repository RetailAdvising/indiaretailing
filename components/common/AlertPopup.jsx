import React, { useState } from 'react'
import Image from 'next/image'
import { newsSubscribe } from '@/libs/api';
export default function AlertPopup({ message, show,data }) {
    const [valid, setInvalid] = useState(true);
    async function checkEmail() {
        let element = document.getElementById('email');
        if (element.value != null || element.value != '') {
            if (validateEmail(element.value)) {
                setInvalid(true)
                let param = {
                    email: element.value, group: data.custom_category
                }
                const res = await newsSubscribe(param);
                if(res.status == 'Success'){
                    show();
                }else{
                    show();
                }
            } else {
                setInvalid(false)
                alert('Enter valid email')
            }
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    return (
        <>

           <div style={{boxShadow:'0 -6px 5px ##dddddd1f'}} className="p-[15px_10px]">
                <div className='flex w-[100%] h-[45px] border rounded-[5px_20px_20px_5px] bg-white mb-[10px]'>
                    <div className='pl-[10px] flex items-center justify-center h-[45px]'><Image className={`h-[20px]`} src={'/email.svg'} height={30} width={30} alt='email' /></div> 
                    <input id='email' placeholder="What's your email?" type='email' className={`text-[13.5px] border-0 w-full px-[10px]`} />
                    <button onClick={checkEmail} className='h-[43px] rounded-[0px_20px_20px_0px] p-[0_15px] text-[14px] primary_btn'>Subscribe</button>
                </div>
                {/* {!valid && <p className='text-red text-[12px] mb-[10px]'>Enter a Valid Email</p>} */}
                {/* <p className='text-[12px] font-semibold'>By subscribing, you understand and agree that we will store, process and manage your personal information according to our Privacy Policy.</p> */}
            </div>
            {/* <div className="" style={{ backgroundColor: "rgb(255, 237, 239)" }}>
                <div className="contents">
                    <div className='w-full flex justify-end'>
                        <Image onClick={show} className='cursor-pointer' src={'/newsletter/close.svg'} height={30} width={30} alt='close' />
                    </div>
                    <div className='flex relative w-[100%] md:w-[100%] flex-wrap'>
                        <Image className={`h-[25px] w-[25px] absolute ${valid ? 'bottom-[10px]' : 'bottom-[30px]'}  left-[10px]`} src={'/email.svg'} height={30} width={30} alt='email' />
                        <input id='email' placeholder="What's your email?" type='email' className={`h-[45px] w-[75%] md:w-[70%] pl-[50px] text-[13.5px]`} />
                        <button onClick={checkEmail} style={{ borderRadius: 'unset' }} className='border w-[25%] md:w-[30%] primary_btn'>Subscribe</button>
                        {!valid && <p className='text-red'>Enter a Valid Email</p>}
                    </div>
                    <p>By subscribing, you understand and agree that we will store, process and manage your personal information according to our Privacy Policy.</p>
                </div>
            </div> */}
        </>
    )
}
