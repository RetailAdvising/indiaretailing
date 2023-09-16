import React, { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form';
import styles from '@/styles/Components.module.scss'
import Image from 'next/image';
import { logIn } from '@/libs/api';
import { useRouter } from 'next/router';
import OTP from './OTP';
// import GoogleLogin from './GoogleLogin';
// import { GoogleLogin } from 'react-google-login';
// import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';
// import { signIn, useSession } from 'next-auth/react';

// import { LoginSocialGoogle } from 'reactjs-social-login';
// import { GoogleLoginButton } from "reactjs-social-login";

import { useDispatch, useSelector } from 'react-redux';
import setUser from 'redux/actions/userAction';

// import {
//     LoginSocialGoogle,
//     LoginSocialFacebook,
//     LoginSocialApple,
// } from 'reactjs-social-login';

// import {
//     FacebookLoginButton,
//     GoogleLoginButton,
//     AppleLoginButton,
// } from 'react-social-login-buttons';

// const REDIRECT_URI =
//     'https://plenty-planets-beam-42-118-51-2.loca.lt/account/login';
export default function LogIn({ isModal, hide, auth }) {
    // providers: [
    //     Providers.Google({
    //       clientId: "630423705748-pg41popq5up1nsvs08i7n0ia47fkpt01.apps.googleusercontent.com",
    //       clientSecret: "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",
    //     }),
    // ]
    const [show, setShow] = useState(false)
    const [wrong, setWrong] = useState(false)
    const [otp, setOtp] = useState(false)
    const router = useRouter();
    const user = useSelector(s => s.user);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    // const [ islogin, setislogin] = useState(false)
    // const GoogleLoginButton = ({ onSuccess, onError }) => {
    //     const responseGoogle = (response) => {
    //         if (response && response.profileObj) {
    //         onSuccess(response.profileObj);
    //         } else {
    //         onError("Google authentication failed.");
    //         }
    //     };

    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         setislogin(true);
    //     }
    // }, []);

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

    // async function loginGoogle(){

    // }

    // const handleSuccess = (response) => {
    //     console.log("Google authentication success:", response);
    //     // Handle successful authentication here
    //   };

    //   const handleFailure = (error) => {
    //     console.error("Google authentication error:", error);
    //     // Handle authentication failure here
    //   };

    // const responseGoogle = (response) => {
    //     if (response && response.profileObj) {
    //     onSuccess(response.profileObj);
    //     } else {
    //     onError("Google authentication failed.");
    //     }
    // };

    // const responseGoogle = (response) => {
    //     console.log(response);
    //     // Handle the response from Google here (e.g., send it to your server for authentication).
    //   };

    async function go_to_home() {
        isModal ? hide() : router.push('/')
    }

    // const [provider, setProvider] = useState('');
    // const [profile, setProfile] = useState();
    // const onLoginStart = useCallback(() => {
    //     alert('login start');
    // }, []);
    return (
        <>
            {!otp ? <div className='flex container h-full p-[20px] justify-center gap-[20px] '>
                {(!isModal || auth) && <div className='flex-[0_0_calc(60%_-_10px)] md:hidden bg-[#E9ECF2] cursor-pointer border h-full rounded-[5px] p-[20px]'>
                    <Image src={'/image.png'} height={200} width={400} alt={'image retail'} className={`w-full ${auth ? 'h-full object-contain' : ''}`} />
                </div>}
                <div className={`${isModal ? 'flex-[0_0_calc(100%_-_10px)] relative h-[calc(87vh_-_10px)] overflow-auto' : 'flex-[0_0_calc(40%_-_10px)] md:flex-[0_0_calc(100%_-_10px)] '} flex-col flex justify-center`}>
                    {/* {!isModal && <div className=' top-0 left-[10px] cursor-pointer'>
                        <Image onClick={() => go_to_home()} src={'/login/indiaretail-logo.png'} height={100} width={200} alt='logo' />
                    </div>} */}
                    <h6 className='text-[20px] pb-[10px] font-semibold text-center'>Log In</h6>
                    <form onSubmit={handleSubmit((data) => login(data))} autoComplete='off'>
                        <div className={`flex flex-col py-5 relative`}>
                            <label className={`${styles.label} text-[#808D9E]`} htmlFor='email' >Email or Username</label>
                            <div className='border rounded-[5px] flex gap-[10px] mt-[5px] p-[0_10px] h-[45px] items-center'>
                                {/* absolute  left-[10px] ${errors.email?.message ? 'bottom-[50px]' : 'bottom-[30px]'} */}
                                {/* <Image className={` h-[20px] w-[25px] object-contain`} src={'/login/email.svg'} height={15} width={15} alt={"pass"} /> */}
                                <input className={`${styles.input}`} {...register('email', { required: { value: true, message: 'Email is required' }, pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Please enter a valid email" } },)} />
                            </div>
                            {errors?.email && <p className={`${styles.danger}`}>{errors.email.message}</p>}
                        </div>
                        <div className={`flex flex-col pt-[10px] pb-4 relative`}>
                            <label className={`text-[#808D9E]`} htmlFor='password'>Password</label>
                            <div className='border rounded-[5px] flex gap-[10px] mt-[5px] p-[0_10px] h-[45px] items-center'>
                                {/* absolute  left-[10px] ${errors.password?.message ? 'bottom-[45px]' : 'bottom-[25px]'} */}
                                <input type={`${show ? 'text' : 'password'}`} className={`${styles.input} `} {...register('password', { required: { value: true, message: 'Password is required' } })} />
                                <Image onClick={() => setShow(!show)} className={` h-[23px] w-[20px] cursor-pointer object-contain`} src={show ? '/login/eye_open.svg' : '/login/eye_close.svg'} height={15} width={15} alt={"pass"} />
                                {/* <button onClick={()=> setShow(!show)}>show</button> */}
                            </div>
                            {errors.password && <p className={`${styles.danger}`}>{errors.password.message}</p>}
                        </div>

                        <div className={`flex items-center justify-between gap-[50px] pb-5`}>
                            <div className='flex cursor-pointer items-center gap-[10px]'>
                                <input type='checkbox' className={`${styles.checkBox} indeterminate:bg-gray-300 cursor-pointer`} {...register('remember')} />
                                {/* <span className={`${styles.checkmark}`}></span> */}
                                <span className='text-[14px]'>Remember Me</span>
                            </div>
                            <p className='text-blue-500 font-semibold text-[14px] cursor-pointer' onClick={() => router.push('/forget   ')}>Forget Password</p>
                        </div>
                        <button type="submit" className={`${styles.loginBtn} `}>Log In</button>
                        {wrong && <p className='text-center pt-[5px] text-[#ff1010] font-semibold'>Please check your email or password</p>}
                    </form>
                    <p className='pt-[10px] '>Not registered yet? <span onClick={() => router.push('/signup')} className='text-[#e21b22] font-semibold cursor-pointer'>Create an account</span></p>
                    <div className='flex items-center pt-[20px] justify-between'><hr style={{ border: '1px dashed #ddd', width: '35%' }} /><span className='text-center  text-[#B5B5BE] w-[30%]'>Instant Login</span><hr style={{ border: '1px dashed #ddd', width: '35%' }} /></div>

                    {/* <p className='text-center pt-[20px] text-[#B5B5BE]'>Instant Login</p> */}

                    <div className='flex gap-[15px] m-[18px_auto] lg:w-[75%] items-center justify-center'>
                        <div onClick={() => signIn('google')} className='flex h-[60px] w-[100px] rounded-[10px] border cursor-pointer items-center justify-center '>
                            <Image height={20} className='h-[30px] w-[30px] object-contain' width={20} alt='google' src={'/google-login.svg'} />
                            {/* <p>Continue with Google</p> */}
                            {/* { islogin && <GoogleLogin onSuccess={handleSuccess} onFailure={handleFailure} />} */}
                        </div>

                        <div className='flex items-center h-[60px] w-[100px] rounded-[10px] cursor-pointer justify-center border'>
                            <Image height={20} className='h-[30px] w-[30px] object-contain' width={20} alt='apple' src={'/Apple-login.svg'} />
                            {/* <p>Continue with Apple</p> */}
                        </div>

                        <div className='flex  items-center h-[60px] w-[100px] rounded-[10px] cursor-pointer justify-center border'>
                            <Image height={20} className='h-[30px] w-[30px] object-contain' width={20} alt='apple' src={'/login/fb-01.svg'} />
                            {/* <p>Continue with Facebook</p> */}
                        </div>

                    </div>
                    
                    <div onClick={() => setOtp(!otp)} className='flex gap-[10px]  w-[75%] m-[0_auto] h-[45px] cursor-pointer rounded-[5px] border items-center justify-center '>
                        <Image height={20} width={20} alt='google' src={'/login/Login-OTP.svg'} />
                        <p className='text-[#808D9E] font-[500]'>Login With OTP</p>
                    </div>
                </div>

            </div> : <OTP hide={hide} auth={auth} isModal={isModal} setotp={() => setOtp(!otp)} />
            }


        </>
    )
}


// Login Social

{/* <LoginSocialGoogle
                        client_id={'630423705748-pg41popq5up1nsvs08i7n0ia47fkpt01.apps.googleusercontent.com'}
                        onLoginStart={onLoginStart}
                        redirect_uri={REDIRECT_URI}
                        scope="openid profile email"
                        discoveryDocs="claims_supported"
                        access_type="offline"
                        onResolve={({ provider, data }) => {
                            // setProvider(provider);
                            // setProfile(data);
                            console.log(provider)
                            console.log(data)
                        }}
                        onReject={err => {
                            console.log(err);
                        }}
                    >
                        <GoogleLoginButton />
                    </LoginSocialGoogle> */}




{/* <LoginSocialApple
                        client_id={process.env.REACT_APP_APPLE_ID || ''}
                        scope={'name email'}
                        redirect_uri={REDIRECT_URI}
                        onLoginStart={onLoginStart}
                        onResolve={({ provider, data }) => {
                            // setProvider(provider);
                            // setProfile(data);
                            console.log(provider)
                            console.log(data)
                        }}
                        onReject={err => {
                            console.log(err);
                        }}
                    >
                        <AppleLoginButton />
                    </LoginSocialApple> */}
{/* <>{
                        <GoogleLogin
                            clientId="630423705748-pg41popq5up1nsvs08i7n0ia47fkpt01.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        }
                    </> */}