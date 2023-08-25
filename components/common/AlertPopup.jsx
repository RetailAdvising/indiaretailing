import React, { useState } from 'react'
import Image from 'next/image'
export default function AlertPopup({ message, show }) {
    const [valid, setInvalid] = useState(true);
    function checkEmail() {
        let element = document.getElementById('email');
        if(element.value != null || element.value != ''){
            if (validateEmail(element.value)) {
                setInvalid(true)
                alert("You're Subscribed Successfully");
                show();
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
            <div className="alert-popup " style={{backgroundColor: "rgb(255, 237, 239)"}}>
                <div className="contents">
                    <div className='w-full flex justify-end'>
                        <Image onClick={show} className='cursor-pointer' src={'/newsletter/close.svg'} height={30} width={30} alt='close' />
                    </div>
                    <div className='flex relative w-[40%] flex-wrap'>
                        <Image className={`h-[25px] w-[25px] absolute ${valid ? 'bottom-[10px]' : 'bottom-[30px]'}  left-[10px]`} src={'/email.svg'} height={30} width={30} alt='email' />
                        <input id='email' placeholder="What's your email?" type='email' className={`h-[45px] w-[60%] pl-[50px] text-[13.5px]`} />
                        <button onClick={checkEmail} style={{borderRadius: 'unset'}} className='border w-[25%] primary_btn'>Subscribe</button>
                        {!valid && <p className='text-red'>Enter a Valid Email</p>}
                    </div>
                    <p>By subscribing, you understand and agree that we will store, process and manage your personal information according to our Privacy Policy.</p>
                </div>
            </div>
        </>
    )
}
