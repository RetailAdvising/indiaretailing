import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import styles from '@/styles/Components.module.scss'
import Image from 'next/image';
import { logIn } from '@/libs/api';
import { useRouter } from 'next/router';
import OTP from './OTP';
import { GoogleLogin } from 'react-google-login';

// import { LoginSocialGoogle } from 'reactjs-social-login';

import { useDispatch, useSelector } from 'react-redux';
import setUser from 'redux/actions/userAction';
export default function LogIn({ isModal, hide }) {
    const [show, setShow] = useState(false)
    const [wrong, setWrong] = useState(false)
    const [otp, setOtp] = useState(false)
    const router = useRouter();
    const user = useSelector(s => s.user);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    async function login(data) {
        if (data) {
            let datas = {
                usr: data.email,
                pwd: data.password
            }
            let val = await logIn(datas);
            if (val.message.status == 'Success') {
                localStorage['apikey'] = val.message.api_key
                localStorage['secret'] = val.message.api_secret
                localStorage['userid'] = val.message.user_id;
                localStorage['customer_id'] = val.message.customer_id;
                localStorage['full_name'] = val.full_name;
                localStorage['roles'] = JSON.stringify(val.message.roles)
                dispatch(setUser(val.message));
                isModal ? hide() : router.push('/')
            } else {
                setWrong(!wrong);
            }
        }
    }

    async function loginGoogle(){

    }

    const responseGoogle = (response) => {
        console.log(response);
        // Handle the response from Google here (e.g., send it to your server for authentication).
      };

    async function go_to_home() {
        isModal ? hide() : router.push('/')
    }

    return (
        <>
            {!otp ? <div className='flex container p-[20px] justify-center gap-[60px] '>
                <div className={`${isModal ? 'flex-[0_0_calc(100%_-_10px)] relative h-[calc(87vh_-_10px)] overflow-auto' : 'flex-[0_0_calc(35%_-_10px)] md:flex-[0_0_calc(100%_-_10px)] mt-[30px]'} flex-col flex justify-center`}>
                    {!isModal && <div className=' top-0 left-[10px] cursor-pointer'>
                        <Image onClick={() => go_to_home()} src={'/login/indiaretail-logo.png'} height={100} width={200} alt='logo' />
                    </div>}
                    <h6 className='text-[20px] pb-[10px] font-semibold text-center'>Log In</h6>
                    <form onSubmit={handleSubmit((data) => login(data))} autoComplete='off'>
                        <div className={`flex flex-col py-5 relative`}>
                            <label className={`${styles.label} text-[#808D9E]`} htmlFor='email' >Email or Username</label>
                            <input className={`${styles.input} `} {...register('email', { required: { value: true, message: 'Email is required' }, pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Please enter a valid email" } },)} />
                            <Image className={`absolute  right-[10px] h-[20px] w-[25px] ${errors.email?.message ? 'bottom-[50px]' : 'bottom-[25px]'}`} src={'/login/email.svg'} height={15} width={15} alt={"pass"} />
                            {errors?.email && <p className={`${styles.danger}`}>{errors.email.message}</p>}
                        </div>
                        <div className={`flex flex-col pt-[10px] pb-4 relative`}>
                            <label className={`text-[#808D9E]`} htmlFor='password'>Password</label>
                            <input type={`${show ? 'text' : 'password'}`} className={`${styles.input} `} {...register('password', { required: { value: true, message: 'Password is required' } })} />
                            <Image onClick={() => setShow(!show)} className={`absolute  right-[10px] h-[23px] w-[20px] ${errors.password?.message ? 'bottom-[45px]' : 'bottom-[20px]'}`} src={show ? '/login/showPass.svg' : '/login/hidePass.svg'} height={15} width={15} alt={"pass"} />
                            {/* <button onClick={()=> setShow(!show)}>show</button> */}
                            {errors.password && <p className={`${styles.danger}`}>{errors.password.message}</p>}
                        </div>

                        <div className={`flex items-center justify-between gap-[50px] pb-5`}>
                            <div className='flex cursor-pointer items-center gap-[10px]'>
                                <input type='checkbox' className={`${styles.checkBox} indeterminate:bg-gray-300`} {...register('remember')} />
                                {/* <span className={`${styles.checkmark}`}></span> */}
                                <span >Remember Me</span>
                            </div>
                            <p className='text-blue-500 font-semibold text-[13px] cursor-pointer' onClick={() => router.push('/forget   ')}>Forget Password</p>
                        </div>
                        <button type="submit" className={`${styles.loginBtn}`}>Log In</button>
                        {wrong && <p className='text-center pt-[5px] text-[#ff1010] font-semibold'>Please check your email or password</p>}
                    </form>
                    <p className='pt-[10px] '>Not registered yet? <span onClick={() => router.push('/signup')} className='text-[#e21b22] font-semibold cursor-pointer'>Create an account</span></p>
                    <div className='flex items-center pt-[20px] justify-between'><hr style={{ border: '1px dashed #ddd', width: '35%' }} /><span className='text-center  text-[#B5B5BE] w-[30%]'>Instant Login</span><hr style={{ border: '1px dashed #ddd', width: '35%' }} /></div>

                    {/* <p className='text-center pt-[20px] text-[#B5B5BE]'>Instant Login</p> */}
                    <div onClick={() => setOtp(!otp)} className='flex gap-[10px] my-[18px] h-[45px] cursor-pointer rounded-[5px] border items-center justify-center '>
                        <Image height={20} width={20} alt='google' src={'/login/Login-OTP.svg'} />
                        <p>Login With OTP</p>
                    </div>
                    {/* <div onClick={() => loginGoogle()} className='flex gap-[10px] mb-[18px] h-[45px] rounded-[5px] border cursor-pointer items-center justify-center '>
                        <Image height={20} width={20} alt='google' src={'/google-login.svg'} />
                        <p>Continue with Google</p>
                    </div> */}
                    <>{
                        <GoogleLogin
                            clientId="630423705748-pg41popq5up1nsvs08i7n0ia47fkpt01.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        }
                    </>
                    <div className='flex gap-[10px] items-center h-[45px] rounded-[5px] cursor-pointer justify-center border'>
                        <Image height={20} width={20} alt='apple' src={'/Apple-login.svg'} />
                        <p>Continue with Apple</p>
                    </div>
                </div>
                {!isModal && <div className='flex-[0_0_calc(60%_-_10px)] md:hidden bg-[#E9ECF2] cursor-pointer border rounded-[5px] p-[20px]'>
                    <Image src={'/image.png'} height={200} width={400} alt={'image retail'} className={` w-full`} />
                </div>}
            </div> : <OTP hide={hide} isModal={isModal} setotp={() => setOtp(!otp)} />
            }


        </>
    )
}
