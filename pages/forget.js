import { forget_password } from '@/libs/api';
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form';
import styles from '@/styles/Components.module.scss'
export default function forget() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    async function forgetPass(data) {
        if (data) {
            // console.log(data);
            const resp = await forget_password(data);
            // console.log(resp);
        }
    }
    return (
        <>
            <div className='flex container justify-between p-[30px] relative'>
                <div className='flex-[0_0_calc(40%_-_10px)] relative'>
                    <div className='absolute cursor-pointer top-0 left-[-50px]'>
                        <Image src={'/login/indiaretail-logo.png'} height={100} width={200} alt='logo' />
                    </div>
                    <div className='flex flex-col items-center justify-center h-full'>
                        <div>
                            <h6 className='text-center text-[40px] font-semibold '>Reset Password</h6>
                            <Image src={'/login/reset password.svg'} className='h-[250px] w-full' height={100} width={100} alt='reset' />
                        </div>
                        <form className='w-full' onSubmit={handleSubmit((data) => forgetPass(data))} autoComplete='off'>
                            <div className={`flex flex-col py-5 gap-[10px] relative`}>
                                <label htmlFor='email' className='text-[#808D9E]'>Email</label>
                                <input className='border-none border_bottom p-[5px_10px]' placeholder='Enter your email' {...register('user', { required: { value: true, message: 'Email is required' }, pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Please enter a valid email" } },)} />
                                <Image className={`absolute  right-[10px] h-[21px] w-[25px] ${errors.user?.message ? 'bottom-[60px]' : 'bottom-[25px]'}`} src={'/login/email.svg'} height={15} width={15} alt={"pass"} />
                                {errors?.user && <p className={`${styles.danger}`}>{errors.user.message}</p>}
                            </div>
                            <button className={`${styles.loginBtn} cursor-pointer`} type='submit'>Send</button>
                        </form>
                    </div>
                </div>
                <div className='flex-[0_0_calc(60%_-_10px)] bg-[#E9ECF2] border rounded-[5px] p-[20px]'>
                    <Image src={'/image.png'} height={200} width={400} alt={'image retail'} className={` w-full`} />
                </div>
            </div>
        </>
    )
}
