import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import styles from '@/styles/Components.module.scss'
import Image from 'next/image';
import { useRouter } from 'next/router';
export default function OTP({ setotp, isModal, hide }) {
    const router = useRouter();
    const [show, setShow] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    async function login(data) {
        if (data) {
            //     let datas = {
            //         usr: data.email,
            //         pwd: data.password
            //     }
            //     let val = await logIn(datas);
            //     if (val.message.status == 'Success') {
            //         localStorage['apikey'] = val.message.api_key
            //         localStorage['secret'] = val.message.api_secret
            //         localStorage['userid'] = val.message.user_id
            //         router.push('/')
            //     } else {
            //         setWrong(!wrong);
            //     }
        }
    }
    return (
        <>
            <div className='flex container p-[20px] justify-center gap-[60px] '>
                <div className={` ${isModal ? 'flex-[0_0_calc(100%_-_10px)]' : 'flex-[0_0_calc(35%_-_10px)]'} flex-col flex justify-center`}>
                    {!isModal && <div className='absolute cursor-pointer top-0 left-[10px]'>
                        <Image src={'/login/indiaretail-logo.png'} height={100} width={200} alt='logo' />
                    </div>}
                    <h6 className='text-[20px] pb-[10px] font-semibold text-center'>Log In</h6>
                    <form onSubmit={handleSubmit((data) => login(data))} autoComplete='off'>
                        <div className={`flex flex-col py-5 relative`}>
                            <label className={`${styles.label} text-[#808D9E]`} htmlFor='mobile' >Mobile Number</label>
                            <input className={`${styles.input} `} {...register('mobile', { required: { value: true, message: 'Mobile Number is required' }, pattern: { value: /^\d{10}$/, message: "Please enter a valid Mobile Number" } },)} />
                            <Image className={`absolute  right-[10px] h-[27px] w-[22px] ${errors.mobile?.message ? 'bottom-[50px]' : 'bottom-[25px]'}`} src={'/login/mobile.svg'} height={15} width={15} alt={"pass"} />
                            {errors?.mobile && <p className={`${styles.danger}`}>{errors.mobile.message}</p>}
                        </div>
                        <div className={`flex flex-col pt-[10px] pb-4 relative`}>
                            <label className={`text-[#808D9E]`} htmlFor='password'>OTP</label>
                            <input type={`${show ? 'text' : 'password'}`} className={`${styles.input} `} {...register('otp', { required: { value: true, message: 'OTP is required' } })} />
                            <Image onClick={() => setShow(!show)} className={`absolute  right-[10px] h-[23px] w-[20px] ${errors.otp?.message ? 'bottom-[45px]' : 'bottom-[20px]'}`} src={show ? '/login/showPass.svg' : '/login/hidePass.svg'} height={15} width={15} alt={"pass"} />
                            {/* <button onClick={()=> setShow(!show)}>show</button> */}
                            {errors.otp && <p className={`${styles.danger}`}>{errors.otp.message}</p>}
                        </div>

                        <div className={`flex items-center justify-between gap-[50px] pb-5`}>
                            <div className='flex cursor-pointer items-center gap-[10px]'>
                                <input type='checkbox' className={`${styles.checkBox} indeterminate:bg-gray-300`} {...register('remember')} />
                                {/* <span className={`${styles.checkmark}`}></span> */}
                                <span >Remember Me</span>
                            </div>
                            <p className='text-blue-500 cursor-pointer font-semibold'>Forget Password</p>
                        </div>
                        <button type="submit" className={`${styles.loginBtn} cursor-pointer`}>Log In</button>
                        {/* {wrong && <p>Please check you email or password</p>} */}
                    </form>
                    <p className='pt-[10px]'>Not registered yet? <span onClick={() => router.push('/signup')} className='text-[#e21b22] font-semibold cursor-pointer'>create an account</span></p>
                    <div className='flex items-center pt-[20px] justify-between'><hr style={{ border: '1px dashed #ddd', width: '35%' }} /><span className='text-center  text-[#B5B5BE] w-[30%]'>Instant Login</span><hr style={{ border: '1px dashed #ddd', width: '35%' }} /></div>

                    {/* <p className='text-center pt-[20px] text-[#B5B5BE]'>Instant Login</p> */}
                    <div onClick={() => setotp()} className='flex cursor-pointer gap-[10px] my-[18px] h-[45px] rounded-[5px] border items-center justify-center '>
                        <Image height={20} width={20} alt='google' src={'/login/Mail.svg'} />
                        <p>Login With Mail</p>
                    </div>
                    <div className='flex gap-[10px] mb-[18px] cursor-pointer h-[45px] rounded-[5px] border items-center justify-center '>
                        <Image height={20} width={20} alt='google' src={'/google-login.svg'} />
                        <p>Continue with Google</p>
                    </div>
                    <div className='flex gap-[10px] items-center cursor-pointer h-[45px] rounded-[5px] justify-center border'>
                        <Image height={20} width={20} alt='apple' src={'/Apple-login.svg'} />
                        <p>Continue with Apple</p>
                    </div>
                </div>
                {!isModal && <div className='flex-[0_0_calc(60%_-_10px)] cursor-pointer bg-[#E9ECF2] border rounded-[5px] p-[20px]'>
                    <Image src={'/image.png'} height={200} width={400} alt={'image retail'} className={`h-full w-full`} />
                </div>}
            </div>
        </>
    )
}
