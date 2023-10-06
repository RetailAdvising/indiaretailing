import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import styles from '@/styles/Components.module.scss'
import Image from 'next/image';
import { signUp, logIn, checkMobile } from '@/libs/api';
import { useRouter } from 'next/router';
import LogIn from './LogIn';
import { useDispatch } from 'react-redux';
import setUser from 'redux/actions/userAction';
// import AlertUi from '../common/AlertUi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function SignUp({ isModal, hide, auth }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter()
    const [show, setShow] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [modal, setModal] = useState('');
    const [show_pass, setShowPass] = useState(false)

    const [isMobile, setIsMobile] = useState()
    useEffect(() => {
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile)
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [])

    const checkIsMobile = async () => {
        let isMobile = await checkMobile();
        setIsMobile(isMobile);
    }

    const dispatch = useDispatch();

    // const [alertMsg, setAlertMsg] = useState('')
    // const [isOpen, setIsOpen] = useState(false)
    // const notify = () => toast.error('Password and Confirm Password not matched');

    async function signup(data) {
        if (data) {

            if (data.new_password === data.confirm_password) {
                delete data.confirm_password
                // alert('perfect')
                const resp = await signUp(data)
                // console.log(resp)
                if (resp.message.status == 'Success') {
                    let datas = {
                        usr: data.email,
                        pwd: data.new_password
                    }
                    const val = await logIn(datas);
                    if (val.message.status == 'Success') {
                        localStorage['apikey'] = val.message.api_key
                        localStorage['secret'] = val.message.api_secret
                        localStorage['userid'] = val.message.user_id;
                        localStorage['customer_id'] = val.message.customer_id;
                        localStorage['roles'] = JSON.stringify(val.message.roles)
                        localStorage['full_name'] = val.full_name;
                        dispatch(setUser(val))
                        isModal || !isMobile ? hide() : router.push('/')
                    } else {
                        setWrong(!wrong);
                        toast.error(val.message.message)
                    }

                    // isModal ? hide() : router.push('/')
                } else {
                    // console.log(resp.message["message:"])
                    toast.error(resp.message["message"]);
                    // alert(resp.message.message)
                    // setWrong(!wrong);
                }
            } else {
                // console.log(data);
                toast.error('Password and Confirm Password not matched');
                // alert('check password')
                // notify();
                // setIsOpen(true)
                // setAlertMsg({ message: 'Password and Confirm Password not matched' })
            }
            //
        }
    }


    function closeModal(value) {
        // alert_dispatch(alertAction(false))

        // if (alertMsg && alertMsg.navigate) {
        //   setAlertMsg({});
        //   router.push('/bookstore');
        // } else if ('Yes') {

        // }

    }

    const hide_and_show = (data) => {
        if (data == 'new') {
            setShowPass(!show_pass);
            // setShow(1)
        } else {
            // setShowPass(data);
            setShow(!show)
        }
    }

    return (
        <>
            {/* {isOpen && <AlertUi isOpen={isOpen} closeModal={(value) => closeModal(value)} headerMsg={'Alert'} button_2={'Ok'} alertMsg={alertMsg} />} */}
            <ToastContainer position={'bottom-right'} autoClose={2000} />

            {(auth && modal != 'login') || isMobile ? <div className='flex container p-[20px]  gap-5 justify-between h-full '>
                {!isModal && <div className='flex-[0_0_calc(60%_-_10px)] md:hidden cursor-pointer bg-[#E9ECF2] border rounded-[5px] p-[20px]'>
                    <Image src={'/image.png'} height={200} width={400} alt={'image retail'} className={` w-full h-full object-contain`} />
                </div>}
                <div className={` ${isModal ? 'flex-[0_0_calc(100%_-_10px)] h-[calc(87vh_-_10px)] overflow-auto' : 'flex-[0_0_calc(40%_-_10px)] md:flex-[0_0_calc(100%_-_10px)] md:mt-[40px]'} flex-col gap-5 md:gap-[10px] flex justify-center`}>
                    {/* {!isModal && <div className='top-0 cursor-pointer left-[10px]'>
                        <Image src={'/login/indiaretail-logo.png'} height={100} width={200} alt='logo' />
                    </div>} */}
                    <h6 className='text-[20px] pb-[10px] font-semibold text-center'>Sign Up</h6>
                    {isMobile && <div className=' cursor-pointer'>
                        <Image className='w-full h-[70%] object-contain' onClick={() => router.push('/')} src={'/login/indiaretail-logo.png'} height={100} width={200} alt='logo' />
                    </div>}
                    <form onSubmit={handleSubmit((data) => signup(data))} autoComplete='off'>
                        <div className='flex items-center justify-between pb-[10px] gap-[10px]'>
                            <div className={`flex flex-col relative flex-[0_0_calc(50%_-_10px)]`}>
                                <label className={`${styles.label} text-[#808D9E]`} htmlFor='first_name' >First Name</label>
                                <input className={`${styles.input} ${styles.input1}`} {...register('first_name', { required: { value: true, message: 'Full Name is required' } },)} />
                                {/* <Image className={`absolute  right-[10px] h-[20px] w-[24px] ${errors.first_name?.message ? 'bottom-[50px]' : 'bottom-[25px]'}`} src={'/login/profile-01.svg'} height={15} width={15} alt={"pass"} /> */}
                            </div>
                            <div className={`flex flex-col relative flex-[0_0_calc(50%_-_10px)]`}>
                                <label className={`${styles.label} text-[#808D9E]`} htmlFor='last_name' >Last Name</label>
                                <input className={`${styles.input} ${styles.input1}`} {...register('last_name')} />
                                {/* <Image className={`absolute  right-[10px] h-[20px] w-[24px] bottom-[25px]`} src={'/login/profile-01.svg'} height={15} width={15} alt={"pass"} /> */}
                            </div>
                        </div>
                        {errors?.first_name && <p className={`${styles.danger}`}>{errors.first_name.message}</p>}
                        <div className={`flex flex-col pb-[10px] relative`}>
                            <label className={`${styles.label} text-[#808D9E]`} htmlFor='mobile' >Mobile Number</label>
                            <input type='number' className={`${styles.input} ${styles.input1}`} {...register('phone', { required: { value: true, message: 'Mobile Number is required' }, pattern: { value: /^\d{10}$/, message: "Please enter a valid Mobile Number" } },)} />
                            {/* <Image className={`absolute  right-[10px] h-[27px] w-[22px] ${errors.phone?.message ? 'bottom-[50px]' : 'bottom-[25px]'}`} src={'/login/mobile.svg'} height={15} width={15} alt={"pass"} /> */}
                            {errors?.phone && <p className={`${styles.danger}`}>{errors.phone.message}</p>}
                        </div>
                        <div className={`flex flex-col pb-[10px] relative`}>
                            <label className={`${styles.label} text-[#808D9E]`} htmlFor='email' >Email</label>
                            <input className={`${styles.input} ${styles.input1}`} {...register('email', { required: { value: true, message: 'Email is required' }, pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Please enter a valid email" } },)} />
                            {/* <Image className={`absolute  right-[10px] h-[20px] w-[25px] ${errors.email?.message ? 'bottom-[50px]' : 'bottom-[25px]'}`} src={'/login/email.svg'} height={15} width={15} alt={"pass"} /> */}
                            {errors?.email && <p className={`${styles.danger}`}>{errors.email.message}</p>}
                        </div>
                        <div  className='flex items-center pb-[20px] justify-between gap-[10px]'>
                            <div className={`flex flex-col  relative flex-[0_0_calc(50%_-_10px)]`}>
                                <label className={`text-[#808D9E] ${styles.label}`} htmlFor='password'>Password</label>
                                <input type={`${(show_pass) ? 'text' : 'password'}`} className={`${styles.input} ${styles.input1}`} {...register('new_password', { required: { value: true, message: 'Password is required' } })} />
                                <Image onClick={() => hide_and_show('new')} className={`absolute cursor-pointer object-contain right-[10px] h-[23px] w-[20px] ${errors.new_password?.message ? 'bottom-[30px]' : 'bottom-[10px]'}`} src={(show_pass) ? '/login/eye_open.svg' : '/login/eye_close.svg'} height={15} width={15} alt={"pass"} />
                                {/* <button onClick={()=> setShow(!show)}>show</button> */}
                                {errors.new_password && <p className={`${styles.danger}`}>{errors.new_password.message}</p>}
                            </div>
                            <div className={`flex flex-col  flex-[0_0_calc(50%_-_10px)] relative`}>
                                <label className={`text-[#808D9E] ${styles.label}`} htmlFor='password'>Confirm Password</label>
                                <input type={`${(show) ? 'text' : 'password'}`} className={`${styles.input} ${styles.input1}`} {...register('confirm_password', { required: { value: true, message: 'Confirm Password is required' } })} />
                                <Image onClick={() => hide_and_show('confirm')} className={`absolute object-contain cursor-pointer right-[10px] h-[23px] w-[20px] ${errors.new_password?.message ? 'bottom-[30px]' : 'bottom-[10px]'}`} src={(show) ? '/login/eye_open.svg' : '/login/eye_close.svg'} height={15} width={15} alt={"pass"} />
                                {/* <button onClick={()=> setShow(!show)}>show</button> */}
                                {errors.confirm_password && <p className={`${styles.danger}`}>{errors.confirm_password.message}</p>}
                            </div>
                        </div>

                        <button type="submit" className={`${styles.loginBtn}`}>Signup</button>
                        {/* {wrong && <p className={`${styles.danger}`}>Please check your email or password</p>} */}
                    </form>
                    <p className='pt-[10px] text-[14px]'>already have an account? <span onClick={() => auth ? setModal('login') : router.push('/login')} className='text-[#e21b22] text-[13px] font-semibold cursor-pointer'>login</span></p>
                    {/* <div className='flex items-center pt-[20px] justify-between'><hr style={{ border: '1px dashed #ddd', width: '35%' }} /><span className='text-center  text-[#B5B5BE] w-[30%]'>Instant Login</span><hr style={{ border: '1px dashed #ddd', width: '35%' }} /></div> */}

                    {/* <p className='text-center pt-[20px] text-[#B5B5BE]'>Instant Login</p> */}
                    {/* <div className='flex gap-[15px] m-[18px_auto] lg:w-[75%] items-center justify-center'>
                        <div className='flex h-[50px] w-[75px] rounded-[10px] border cursor-pointer items-center justify-center '>
                            <Image height={20} className='h-[25px] w-[25px] object-contain' width={20} alt='google' src={'/google-login.svg'} />
                        </div>

                        <div className='flex items-center h-[50px] w-[75px] rounded-[10px] cursor-pointer justify-center border'>
                            <Image height={20} className='h-[25px] w-[25px] object-contain' width={20} alt='apple' src={'/Apple-login.svg'} />

                        </div>

                        <div className='flex  items-center h-[50px] w-[75px] rounded-[10px] cursor-pointer justify-center border'>
                            <Image height={20} className='h-[25px] w-[25px] object-contain' width={20} alt='apple' src={'/login/fb-01.svg'} />
                        </div>
                    </div> */}
                    {/* <div className='flex gap-[10px] cursor-pointer mb-[18px] h-[45px] rounded-[5px] border items-center justify-center '>
                        <Image height={20} width={20} alt='google' src={'/google-login.svg'} />
                        <p>Continue with Google</p>
                    </div>
                    <div className='flex gap-[10px] cursor-pointer items-center h-[45px] rounded-[5px] justify-center border'>
                        <Image height={20} width={20} alt='apple' src={'/Apple-login.svg'} />
                        <p>Continue with Apple</p>
                    </div> */}
                </div>

            </div> : <><LogIn auth={auth} hide={hide} /></>}
        </>
    )
}
