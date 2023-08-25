import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import styles from '@/styles/Components.module.scss'
import Image from 'next/image';
import { signUp, logIn } from '@/libs/api';
import { useRouter } from 'next/router';

export default function SignUp({ isModal, hide }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter()
    const [show, setShow] = useState(false);
    const [wrong, setWrong] = useState(false)
    async function signup(data) {
        if (data) {
            const resp = await signUp(data)
            console.log(resp)
            if (resp.message.status == 'Success') {
                let data = {
                    usr: data.email,
                    pwd: data.new_password
                }
                const val = await logIn(data);
                if (val.message.status == 'Success') {
                    localStorage['apikey'] = val.message.api_key
                    localStorage['secret'] = val.message.api_secret
                    localStorage['userid'] = val.message.user_id;
                    localStorage['customer_id'] = val.message.customer_id;
                    isModal ? hide() : router.push('/')
                } else {
                    setWrong(!wrong);
                }

                // isModal ? hide() : router.push('/')
            } else {
                // alert(resp.message.message)
                setWrong(!wrong);
            }
        }
    }
    return (
        <>
            <div className='flex container p-[20px] justify-center gap-[60px] '>
                <div className={` ${isModal ? 'flex-[0_0_calc(100%_-_10px)] h-[calc(87vh_-_10px)] overflow-auto' : 'flex-[0_0_calc(35%_-_10px)]'} flex-col flex justify-center`}>
                    {!isModal && <div className='absolute top-0 cursor-pointer left-[10px]'>
                        <Image src={'/login/indiaretail-logo.png'} height={100} width={200} alt='logo' />
                    </div>}
                    <h6 className='text-[20px] pb-[10px] font-semibold text-center'>Sign Up</h6>
                    <form onSubmit={handleSubmit((data) => signup(data))} autoComplete='off'>
                        <div className={`flex flex-col py-5 relative`}>
                            <label className={`${styles.label} text-[#808D9E]`} htmlFor='first_name' >First Name</label>
                            <input className={`${styles.input} `} {...register('first_name', { required: { value: true, message: 'Full Name is required' } },)} />
                            <Image className={`absolute  right-[10px] h-[20px] w-[24px] ${errors.first_name?.message ? 'bottom-[50px]' : 'bottom-[25px]'}`} src={'/login/profile-01.svg'} height={15} width={15} alt={"pass"} />
                            {errors?.first_name && <p className={`${styles.danger}`}>{errors.first_name.message}</p>}
                        </div>
                        <div className={`flex flex-col pb-5 relative`}>
                            <label className={`${styles.label} text-[#808D9E]`} htmlFor='first_name' >Last Name</label>
                            <input className={`${styles.input} `} {...register('last_name')} />
                            <Image className={`absolute  right-[10px] h-[20px] w-[24px] bottom-[25px]`} src={'/login/profile-01.svg'} height={15} width={15} alt={"pass"} />
                        </div>
                        <div className={`flex flex-col pb-5 relative`}>
                            <label className={`${styles.label} text-[#808D9E]`} htmlFor='mobile' >Mobile Number</label>
                            <input className={`${styles.input} `} {...register('phone', { required: { value: true, message: 'Mobile Number is required' }, pattern: { value: /^\d{10}$/, message: "Please enter a valid Mobile Number" } },)} />
                            <Image className={`absolute  right-[10px] h-[27px] w-[22px] ${errors.phone?.message ? 'bottom-[50px]' : 'bottom-[25px]'}`} src={'/login/mobile.svg'} height={15} width={15} alt={"pass"} />
                            {errors?.phone && <p className={`${styles.danger}`}>{errors.phone.message}</p>}
                        </div>
                        <div className={`flex flex-col pb-5 relative`}>
                            <label className={`${styles.label} text-[#808D9E]`} htmlFor='email' >Email</label>
                            <input className={`${styles.input} `} {...register('email', { required: { value: true, message: 'Email is required' }, pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Please enter a valid email" } },)} />
                            <Image className={`absolute  right-[10px] h-[20px] w-[25px] ${errors.email?.message ? 'bottom-[50px]' : 'bottom-[25px]'}`} src={'/login/email.svg'} height={15} width={15} alt={"pass"} />
                            {errors?.email && <p className={`${styles.danger}`}>{errors.email.message}</p>}
                        </div>
                        <div className={`flex flex-col pt-[10px] pb-4 relative`}>
                            <label className={`text-[#808D9E]`} htmlFor='password'>Password</label>
                            <input type={`${show ? 'text' : 'password'}`} className={`${styles.input} `} {...register('new_password', { required: { value: true, message: 'Password is required' } })} />
                            <Image onClick={() => setShow(!show)} className={`absolute  right-[10px] h-[23px] w-[20px] ${errors.new_password?.message ? 'bottom-[45px]' : 'bottom-[20px]'}`} src={show ? '/login/showPass.svg' : '/login/hidePass.svg'} height={15} width={15} alt={"pass"} />
                            {/* <button onClick={()=> setShow(!show)}>show</button> */}
                            {errors.new_password && <p className={`${styles.danger}`}>{errors.new_password.message}</p>}
                        </div>

                        <button type="submit" className={`${styles.loginBtn}`}>Signup</button>
                        {wrong && <p className={`${styles.danger}`}>Please check your email or password</p>}
                    </form>
                    <p className='pt-[10px]'>already have an account? <span onClick={() => router.push('/login')} className='text-[#e21b22] font-semibold cursor-pointer'>login</span></p>
                    <div className='flex items-center pt-[20px] justify-between'><hr style={{ border: '1px dashed #ddd', width: '35%' }} /><span className='text-center  text-[#B5B5BE] w-[30%]'>Instant Login</span><hr style={{ border: '1px dashed #ddd', width: '35%' }} /></div>

                    {/* <p className='text-center pt-[20px] text-[#B5B5BE]'>Instant Login</p> */}
                    <div className='flex gap-[10px] cursor-pointer mb-[18px] h-[45px] rounded-[5px] border items-center justify-center '>
                        <Image height={20} width={20} alt='google' src={'/google-login.svg'} />
                        <p>Continue with Google</p>
                    </div>
                    <div className='flex gap-[10px] cursor-pointer items-center h-[45px] rounded-[5px] justify-center border'>
                        <Image height={20} width={20} alt='apple' src={'/Apple-login.svg'} />
                        <p>Continue with Apple</p>
                    </div>
                </div>
                {!isModal && <div className='flex-[0_0_calc(60%_-_10px)] cursor-pointer bg-[#E9ECF2] border rounded-[5px] p-[20px]'>
                    <Image src={'/image.png'} height={200} width={400} alt={'image retail'} className={` w-full`} />
                </div>}
            </div>
        </>
    )
}
